import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  $createTextNode,
} from "lexical";
import { useCallback, useState, useEffect } from "react";
import {
  $isLinkNode,
  $createLinkNode,
  TOGGLE_LINK_COMMAND,
} from "@lexical/link";
import { $setBlocksType } from "@lexical/selection";
import { createPortal } from "react-dom";

export default function LexicalLinkDialogPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("https://");
  const [linkText, setLinkText] = useState("");
  interface SelectionInfo {
    anchorKey: string;
    anchorOffset: number;
    focusKey: string;
    focusOffset: number;
    text: string;
  }

  const [selectionInfo, setSelectionInfo] = useState<SelectionInfo | null>(null);

  // Set up a listener for the toggle link command
  useEffect(() => {
    return editor.registerCommand(
      TOGGLE_LINK_COMMAND,
      (payload) => {
        // If payload is null, we're removing a link
        if (payload === null) {
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              // Use the correct API to remove formatting
              const nodes = selection.getNodes();
              selection.getNodes().forEach((node) => {
                if ($isLinkNode(node)) {
                  node.selectNext();
                  node.remove();
                }
              });
            }
          });
          setIsOpen(false);
          return true;
        }

        // Extract URL from payload if provided
        if (payload && typeof payload === "object" && payload.url) {
          setUrl(payload.url);
        } else {
          setUrl("https://");
        }

        // Remember important info about the selection
        editor.getEditorState().read(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const anchor = selection.anchor;
            const focus = selection.focus;
            const text = selection.getTextContent();

            setSelectionInfo({
              anchorKey: anchor.key,
              anchorOffset: anchor.offset,
              focusKey: focus.key,
              focusOffset: focus.offset,
              text,
            });
            setLinkText(text);
          }
        });

        setIsOpen(true);
        return true;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor]);

  const handleSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      e.stopPropagation();

      // Format URL - ensure it has http/https
      const formattedUrl = url.trim().startsWith("http")
        ? url.trim()
        : `https://${url.trim()}`;

      // Insert the link using a more reliable method
      editor.update(() => {
        const selection = $getSelection();

        if (!$isRangeSelection(selection)) {
          return;
        }

        // If there's no text selected, or the user provided custom link text
        if (
          selection.isCollapsed() ||
          (linkText && linkText !== selectionInfo?.text)
        ) {
          // Create and insert link node with the specified text
          const linkNode = $createLinkNode(formattedUrl, {
            target: "_blank",
            rel: "noopener noreferrer",
          });

          // Add the text node inside the link node
          linkNode.append($createTextNode(linkText || formattedUrl));

          // Insert at current selection
          selection.insertNodes([linkNode]);
        } else {
          // There's text already selected, just convert it to a link
          selection.insertRawText(selection.getTextContent()); // Preserve the text

          // Apply link format
          if (selection.getTextContent().length > 0) {
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, {
              url: formattedUrl,
              target: "_blank",
              rel: "noopener noreferrer",
            });
          }
        }
      });

      setIsOpen(false);
    },
    [editor, url, linkText, selectionInfo]
  );

  const handleRemoveLink = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        // Fix: Use the correct method to remove links
        const nodes = selection.getNodes();
        nodes.forEach((node) => {
          if ($isLinkNode(node)) {
            const textContent = node.getTextContent();
            const textNode = $createTextNode(textContent);
            node.replace(textNode);
          }
        });
      }
    });
    setIsOpen(false);
  }, [editor]);

  const handleClose = useCallback((e: any) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsOpen(false);
  }, []);

  // If dialog is not open, return null
  if (!isOpen || typeof window === "undefined") return null;

  // Use createPortal to render the dialog outside the editor hierarchy
  return createPortal(
    <div className="link-dialog-overlay" onClick={handleClose}>
      <div className="link-dialog-content" onClick={(e) => e.stopPropagation()}>
        <h3>Insert Link</h3>
        <form onSubmit={handleSubmit}>
          <div className="link-input-group">
            <label>URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
              autoFocus
            />
          </div>
          <div className="link-input-group">
            <label>Link Text (optional)</label>
            <input
              type="text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              placeholder="Enter link text"
            />
          </div>
          <div className="link-dialog-actions">
            <button
              type="button"
              onClick={handleRemoveLink}
              className="link-remove-button"
            >
              Remove Link
            </button>
            <div>
              <button
                type="button"
                onClick={handleClose}
                className="link-cancel-button"
              >
                Cancel
              </button>
              <button type="submit" className="link-insert-button">
                Insert
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
