// LexicalImagePlugin.tsx
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  LexicalCommand,
  $getRoot,
} from "lexical";
import { useEffect, useState, useCallback, JSX } from "react";
import { $createImageNode, ImageNode } from "@/nodes/image-node";
import { $createDualImageNode, DualImageNode } from "@/nodes/dual-image-node";
import ImageLayoutModal from "@/components/ImageLayoutModal/ImageLayoutModal";

export type InsertImagePayload = {
  src: string;
  altText: string;
  width?: number;
  height?: number;
  caption?: string;
  alignment?: "left" | "center" | "right";
};

export type InsertDualImagePayload = {
  leftImage: {
    src: string;
    altText: string;
    caption?: string;
  };
  rightImage: {
    src: string;
    altText: string;
    caption?: string;
  };
  alignment?: "left" | "center" | "right";
};

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> =
  createCommand("INSERT_IMAGE_COMMAND");

export const INSERT_DUAL_IMAGE_COMMAND: LexicalCommand<InsertDualImagePayload> =
  createCommand("INSERT_DUAL_IMAGE_COMMAND");

export default function LexicalImagePlugin({
  onImageUpload,
  onImageInserted,
}: {
  onImageUpload?: (file: File) => Promise<string>;
  onImageInserted?: (imageBlock: any) => void;
}): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  const [showDualImageModal, setShowDualImageModal] = useState(false);

  // Register single image command
  useEffect(() => {
    if (!editor) {
      return;
    }

    return editor.registerCommand<InsertImagePayload>(
      INSERT_IMAGE_COMMAND,
      (payload) => {
        const { src, altText, width, height, caption, alignment } = payload;

        editor.update(() => {
          const selection = $getSelection();

          if (!$isRangeSelection(selection)) {
            return;
          }

          const imageNode = $createImageNode(
            src,
            altText,
            width,
            height,
            caption,
            alignment || "center"
          );

          selection.insertNodes([imageNode]);

          // Create a paragraph after the image if at the end of the editor
          const anchor = selection.anchor;
          if (
            anchor.type === "element" &&
            anchor.offset === anchor.getNode().getChildrenSize()
          ) {
            const paragraph = $createParagraphNode();
            imageNode.insertAfter(paragraph);
          }

          // If callback is provided, call it with image block info
          if (onImageInserted) {
            onImageInserted({
              id: Date.now().toString(),
              type: "image",
              content: src,
              alignment: alignment || "center",
              meta: {
                alt: altText || "",
                caption: caption || "",
              },
            });
          }
        });

        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor, onImageInserted]);

  // Register dual image command
  useEffect(() => {
    if (!editor) {
      return;
    }

    return editor.registerCommand<InsertDualImagePayload>(
      INSERT_DUAL_IMAGE_COMMAND,
      (payload) => {
        const { leftImage, rightImage, alignment } = payload;

        try {
          // Signal that we need to allow editor focus temporarily
          document.dispatchEvent(new CustomEvent("allowEditorFocus"));

          // Wait a moment for the event to be processed
          setTimeout(() => {
            editor.focus();

            editor.update(() => {
              try {
                let selection = $getSelection();

                // If no selection, create one at the end of the editor
                if (!selection || !$isRangeSelection(selection)) {
                  const root = $getRoot();
                  const paragraph = $createParagraphNode();
                  root.append(paragraph);
                  paragraph.select();
                  selection = $getSelection();
                }

                if ($isRangeSelection(selection)) {
                  const dualImageNode = $createDualImageNode(
                    leftImage,
                    rightImage,
                    alignment || "center"
                  );

                  selection.insertNodes([dualImageNode]);

                  // Create a paragraph after the dual image
                  const anchor = selection.anchor;
                  if (
                    anchor.type === "element" &&
                    anchor.offset === anchor.getNode().getChildrenSize()
                  ) {
                    const paragraph = $createParagraphNode();
                    dualImageNode.insertAfter(paragraph);
                  }
                }
              } catch (updateError) {
                console.error("Error in editor.update:", updateError);
              }
            });
          }, 100);
        } catch (commandError) {
          console.error("Error in dual image command:", commandError);
        }

        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  // Handle dual image upload
  const handleDualImageUpload = useCallback(
    async (leftFile: File, rightFile: File) => {
      if (!onImageUpload) {
        return;
      }

      try {
        const [leftUrl, rightUrl] = await Promise.all([
          onImageUpload(leftFile),
          onImageUpload(rightFile),
        ]);

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

        setShowDualImageModal(false);
      } catch (error) {
        console.error("Dual image upload failed:", error);
      }
    },
    [editor, onImageUpload]
  );

  // Listen for show dual image modal event from toolbar
  useEffect(() => {
    const handleShowDualImageModal = () => {
      setShowDualImageModal(true);
    };

    document.addEventListener("showDualImageModal", handleShowDualImageModal);

    return () => {
      document.removeEventListener(
        "showDualImageModal",
        handleShowDualImageModal
      );
    };
  }, []);

  return (
    <>
      {showDualImageModal && (
        <ImageLayoutModal
          onClose={() => setShowDualImageModal(false)}
          onDualImageUpload={handleDualImageUpload}
          onImageUpload={onImageUpload}
        />
      )}
    </>
  );
}
