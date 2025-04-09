import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  LexicalCommand,
} from "lexical";
import { useEffect, useState, useCallback, JSX } from "react";
import { $createImageNode, ImageNode } from "@/nodes/image-node";

export type InsertImagePayload = {
  src: string;
  altText: string;
  width?: number;
  height?: number;
  caption?: string;
  alignment?: "left" | "center" | "right";
};

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> =
  createCommand("INSERT_IMAGE_COMMAND");

export default function LexicalImagePlugin({
  onImageUpload,
  onImageInserted,
}: {
  onImageUpload?: (file: File) => Promise<string>;
  onImageInserted?: (imageBlock: any) => void;
}): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  // Register the command
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

  return null;
}
