import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
  $createParagraphNode,
} from "lexical";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { $isAtNodeEnd } from "@lexical/selection";
import { $getNearestNodeOfType, $findMatchingParent } from "@lexical/utils";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  $isListNode,
  ListNode,
  ListItemNode,
} from "@lexical/list";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  HeadingTagType,
} from "@lexical/rich-text";
import { useCallback, useEffect, useState, useRef } from "react";
import {
  INSERT_IMAGE_COMMAND,
  INSERT_DUAL_IMAGE_COMMAND,
} from "./LexicalImagePlugin";
import { EMOJI_LIST } from "./LexicalEmojiPlugin";
import EmojiList from "@/components/EmojiList/EmojiList";
// ADD THIS IMPORT - This is the fix!
import dynamic from "next/dynamic";

// Dynamic import to prevent SSR issues
const ImageLayoutModal = dynamic(
  () => import("@/components/ImageLayoutModal/ImageLayoutModal"),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

const LowPriority = 1;

function Divider() {
  return <div className="divider" />;
}

export default function LexicalToolbarPlugin({
  disabled = false,
  onImageUpload,
}: {
  disabled?: boolean;
  onImageUpload?: (file: File) => Promise<string>;
}) {
  const [editor] = useLexicalComposerContext();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [blockType, setBlockType] = useState<string>("paragraph");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiButtonRef = useRef(null);
  // ADD THIS STATE - This is the fix!
  const [showImageLayoutModal, setShowImageLayoutModal] = useState(false);

  // Helper function to get selected node
  const getSelectedNode = useCallback((selection: any) => {
    const anchor = selection.anchor;
    const focus = selection.focus;
    const anchorNode = selection.anchor.getNode();
    const focusNode = selection.focus.getNode();

    if (anchorNode === focusNode) {
      return anchorNode;
    }

    const isBackward = selection.isBackward();
    if (isBackward) {
      return $isAtNodeEnd(focus) ? anchorNode : focusNode;
    } else {
      return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
    }
  }, []);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));

      // Check if link is selected
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      setIsLink($isLinkNode(parent) || $isLinkNode(node));

      // Update the block type
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && parent.getKey() === "root";
            });

      if (element) {
        if ($isHeadingNode(element)) {
          setBlockType(element.getTag());
        } else if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode
          );
          const type = parentList
            ? parentList.getListType()
            : element.getListType();
          setBlockType(type === "bullet" ? "bullet" : "number");
        } else {
          setBlockType(element.getType());
        }
      }
    }
  }, [getSelectedNode]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar]);

  // Formatting methods
  const formatHeading = useCallback(
    (headingType: HeadingTagType) => {
      if (blockType !== headingType) {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const anchorNode = selection.anchor.getNode();
            const targetNode = $findMatchingParent(anchorNode, (node) => {
              return (
                node.getType() === "paragraph" ||
                ($isHeadingNode(node) && node.getTag() !== headingType)
              );
            });

            if (targetNode) {
              const headingNode = $createHeadingNode(headingType);

              if (
                targetNode &&
                "getChildren" in targetNode &&
                typeof targetNode.getChildren === "function"
              ) {
                const children = targetNode.getChildren();
                children.forEach((child: any) => {
                  headingNode.append(child);
                });
              }

              targetNode.replace(headingNode);
            }
          }
        });
      }
    },
    [blockType, editor]
  );

  const formatParagraph = useCallback(() => {
    if (blockType !== "paragraph") {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const anchorNode = selection.anchor.getNode();
          const targetNode = $findMatchingParent(anchorNode, (node) => {
            return $isHeadingNode(node) || node.getType() === "quote";
          });

          if (targetNode) {
            const paragraphNode = $createParagraphNode();

            if (
              targetNode &&
              "getChildren" in targetNode &&
              typeof targetNode.getChildren === "function"
            ) {
              const children = targetNode.getChildren();
              children.forEach((child: any) => {
                paragraphNode.append(child);
              });
            }

            targetNode.replace(paragraphNode);
          }
        }
      });
    }
  }, [blockType, editor]);

  const formatQuote = useCallback(() => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const anchorNode = selection.anchor.getNode();
          const targetNode = $findMatchingParent(anchorNode, (node) => {
            return node.getType() === "paragraph" || $isHeadingNode(node);
          });

          if (targetNode) {
            const quoteNode = $createQuoteNode();

            if (
              targetNode &&
              "getChildren" in targetNode &&
              typeof targetNode.getChildren === "function"
            ) {
              const children = targetNode.getChildren();
              children.forEach((child: any) => {
                quoteNode.append(child);
              });
            }

            targetNode.replace(quoteNode);
          }
        }
      });
    }
  }, [blockType, editor]);

  const formatList = useCallback(
    (listType: "bullet" | "number") => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          if (listType === "bullet") {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
          } else {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
          }
        }
      });
    },
    [editor]
  );

  const insertLink = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      editor.dispatchCommand(TOGGLE_LINK_COMMAND as any, {});
    },
    [editor]
  );

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      event.stopPropagation();

      const files = event.target.files;
      if (files && files.length > 0 && onImageUpload) {
        const file = files[0];
        onImageUpload(file)
          .then((uploadedUrl) => {
            if (uploadedUrl) {
              editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                src: uploadedUrl,
                altText: file.name,
              });
            }
          })
          .catch(console.error);

        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    [editor, onImageUpload]
  );

  // REPLACE THE OLD showImageLayoutChoice WITH THIS - This is the fix!
  const showImageLayoutChoice = useCallback(() => {
    setShowImageLayoutModal(true);
  }, []);

  // ADD THIS FUNCTION - Handle single image choice
  const handleSingleImageChoice = useCallback(() => {
    // Trigger single image upload
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  // ADD THIS FUNCTION - Handle dual image upload
  const handleDualImageUpload = useCallback(
    async (leftFile: File, rightFile: File) => {
      if (!onImageUpload) return;

      try {
        const [leftUrl, rightUrl] = await Promise.all([
          onImageUpload(leftFile),
          onImageUpload(rightFile),
        ]);

        // Dispatch the dual image command directly to the editor
        editor.dispatchCommand(INSERT_DUAL_IMAGE_COMMAND, {
          leftImage: {
            src: leftUrl,
            altText: leftFile.name,
          },
          rightImage: {
            src: rightUrl,
            altText: rightFile.name,
          },
        });

        setShowImageLayoutModal(false);
      } catch (error) {
        console.error("Dual image upload failed:", error);
      }
    },
    [editor, onImageUpload]
  );

  if (disabled) {
    return null;
  }

  // Create a hidden file input for image uploads
  const FileInput = (
    <input
      type="file"
      ref={fileInputRef}
      accept="image/*"
      onChange={handleImageUpload}
      style={{ display: "none" }}
    />
  );

  return (
    <>
      <div className="toolbar">
        {/* Undo Button */}
        <button
          type="button"
          disabled={!canUndo}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            editor.dispatchCommand(UNDO_COMMAND, undefined);
          }}
          className="toolbar-item spaced"
          aria-label="Undo"
          title="Undo"
        >
          <i className="icon icon-undo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 10h10c4 0 7 3 7 7v0c0 4-3 7-7 7H9"></path>
              <path d="M3 10l5-5"></path>
              <path d="M3 10l5 5"></path>
            </svg>
          </i>
        </button>

        {/* Redo Button */}
        <button
          type="button"
          disabled={!canRedo}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            editor.dispatchCommand(REDO_COMMAND, undefined);
          }}
          className="toolbar-item"
          aria-label="Redo"
          title="Redo"
        >
          <i className="icon icon-redo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 10H11c-4 0-7 3-7 7v0c0 4 3 7 7 7h4"></path>
              <path d="M21 10l-5-5"></path>
              <path d="M21 10l-5 5"></path>
            </svg>
          </i>
        </button>

        <Divider />

        {/* Text Formatting Buttons */}
        {[
          {
            format: "bold",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
                <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
              </svg>
            ),
            state: isBold,
          },
          {
            format: "italic",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="19" y1="4" x2="10" y2="4"></line>
                <line x1="14" y1="20" x2="5" y2="20"></line>
                <line x1="15" y1="4" x2="9" y2="20"></line>
              </svg>
            ),
            state: isItalic,
          },
          {
            format: "underline",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path>
                <line x1="4" y1="21" x2="20" y2="21"></line>
              </svg>
            ),
            state: isUnderline,
          },
          {
            format: "strikethrough",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17 9V4H7v5"></path>
                <path d="M16 15.5c-.5 1.5-2.5 2.5-4 2.5-2.5 0-4-1-4-4"></path>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            ),
            state: isStrikethrough,
          },
        ].map(({ format, icon, state }) => (
          <button
            key={format}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, format as any);
            }}
            className={`toolbar-item spaced ${state ? "active" : ""}`}
            aria-label={`Format ${format}`}
            title={format.charAt(0).toUpperCase() + format.slice(1)}
          >
            <i className={`icon icon-${format}`}>{icon}</i>
          </button>
        ))}

        {/* Link Button */}
        <button
          type="button"
          onClick={insertLink}
          className={`toolbar-item spaced ${isLink ? "active" : ""}`}
          aria-label="Insert Link"
          title="Insert Link"
        >
          <i className="icon icon-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
          </i>
        </button>

        <Divider />

        {/* Block Type Buttons */}
        {[
          {
            type: "paragraph",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M13 4v16"></path>
                <path d="M19 4H9.5a4.5 4.5 0 0 0 0 9H13"></path>
              </svg>
            ),
          },
          { type: "h1", text: "H1" },
          { type: "h2", text: "H2" },
          { type: "h3", text: "H3" },
          {
            type: "quote",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 21c3.8-2.3 4-7.6 4-10.3C7 7.5 5.3 5 7 3h0c5.5 7.5-2 14.3-4 18.3z"></path>
                <path d="M15 21c3.8-2.3 4-7.6 4-10.3C19 7.5 17.3 5 19 3h0c5.5 7.5-2 14.3-4 18.3z"></path>
              </svg>
            ),
          },
        ].map(({ type, icon, text }) => (
          <button
            key={type}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              switch (type) {
                case "paragraph":
                  formatParagraph();
                  break;
                case "h1":
                case "h2":
                case "h3":
                  formatHeading(type as HeadingTagType);
                  break;
                case "quote":
                  formatQuote();
                  break;
              }
            }}
            className={`toolbar-item spaced ${
              blockType === type ? "active" : ""
            }`}
            aria-label={type.charAt(0).toUpperCase() + type.slice(1)}
            title={type.charAt(0).toUpperCase() + type.slice(1)}
          >
            <i className={`icon icon-${type}`}>{icon || text}</i>
          </button>
        ))}

        {/* List Buttons */}
        {[
          {
            type: "bullet",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            ),
          },
          {
            type: "number",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="10" y1="6" x2="21" y2="6"></line>
                <line x1="10" y1="12" x2="21" y2="12"></line>
                <line x1="10" y1="18" x2="21" y2="18"></line>
                <path d="M4 6h1v4"></path>
                <path d="M4 10h2"></path>
                <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
              </svg>
            ),
          },
        ].map(({ type, icon }) => (
          <button
            key={type}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              formatList(type as "bullet" | "number");
            }}
            className={`toolbar-item spaced ${
              blockType === type ? "active" : ""
            }`}
            aria-label={`${type === "bullet" ? "Bullet" : "Numbered"} List`}
            title={`${type === "bullet" ? "Bullet" : "Numbered"} List`}
          >
            <i className={`icon icon-${type === "bullet" ? "ul" : "ol"}`}>
              {icon}
            </i>
          </button>
        ))}

        <Divider />

        {/* Alignment Buttons */}
        {["left", "center", "right", "justify"].map((alignment) => (
          <button
            key={alignment}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment as any);
            }}
            className="toolbar-item spaced"
            aria-label={`${
              alignment.charAt(0).toUpperCase() + alignment.slice(1)
            } Align`}
            title={`${
              alignment.charAt(0).toUpperCase() + alignment.slice(1)
            } Align`}
          >
            <i className={`icon icon-align-${alignment}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {alignment === "left" && (
                  <>
                    <line x1="17" y1="10" x2="3" y2="10"></line>
                    <line x1="21" y1="6" x2="3" y2="6"></line>
                    <line x1="21" y1="14" x2="3" y2="14"></line>
                    <line x1="17" y1="18" x2="3" y2="18"></line>
                  </>
                )}
                {alignment === "center" && (
                  <>
                    <line x1="18" y1="10" x2="6" y2="10"></line>
                    <line x1="21" y1="6" x2="3" y2="6"></line>
                    <line x1="21" y1="14" x2="3" y2="14"></line>
                    <line x1="18" y1="18" x2="6" y2="18"></line>
                  </>
                )}
                {alignment === "right" && (
                  <>
                    <line x1="21" y1="10" x2="7" y2="10"></line>
                    <line x1="21" y1="6" x2="3" y2="6"></line>
                    <line x1="21" y1="14" x2="3" y2="14"></line>
                    <line x1="21" y1="18" x2="7" y2="18"></line>
                  </>
                )}
                {alignment === "justify" && (
                  <>
                    <line x1="21" y1="10" x2="3" y2="10"></line>
                    <line x1="21" y1="6" x2="3" y2="6"></line>
                    <line x1="21" y1="14" x2="3" y2="14"></line>
                    <line x1="21" y1="18" x2="3" y2="18"></line>
                  </>
                )}
              </svg>
            </i>
          </button>
        ))}

        <Divider />

        {/* Emoji and Image Buttons */}
        <button
          type="button"
          ref={emojiButtonRef}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowEmojiPicker(!showEmojiPicker);
          }}
          className="toolbar-item spaced"
          aria-label="Insert Emoji"
          title="Insert Emoji"
        >
          <i className="icon icon-emoji">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
          </i>
        </button>

        {/* Updated Image Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            showImageLayoutChoice();
          }}
          className="toolbar-item"
          aria-label="Insert Image"
          title="Insert Image"
        >
          <i className="icon icon-image">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </i>
        </button>

        {FileInput}

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div
            className="emoji-toolbar-picker"
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
              width: "50%",
            }}
          >
            <EmojiList
              emojis={EMOJI_LIST}
              selectedIndex={-1}
              onSelectEmoji={(emoji) => {
                editor.update(() => {
                  const selection = $getSelection();
                  if ($isRangeSelection(selection)) {
                    selection.insertText(emoji);
                  }
                });
                setShowEmojiPicker(false);
              }}
              onMouseEnter={() => {}}
            />
          </div>
        )}
      </div>

      {showImageLayoutModal && (
        <ImageLayoutModal
          onClose={() => setShowImageLayoutModal(false)}
          onDualImageUpload={handleDualImageUpload}
          onImageUpload={onImageUpload}
          onSingleImageUpload={handleSingleImageChoice}
        />
      )}
    </>
  );
}
