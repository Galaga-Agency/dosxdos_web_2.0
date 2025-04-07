import React, { useRef, useEffect, useCallback } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from "lexical";
import { $createImageNode } from "@/nodes/image";

export const INSERT_IMAGE_COMMAND = createCommand<void>();

export function ImagesPlugin({
  onImageUpload,
}: {
  onImageUpload?: (file: File) => Promise<string>;
}) {
  const [editor] = useLexicalComposerContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!onImageUpload) return;

    const removeCommand = editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      () => {
        fileInputRef.current?.click();
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );

    return removeCommand;
  }, [editor, onImageUpload]);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0 || !onImageUpload) return;

      const file = files[0];

      try {
        const imageUrl = await onImageUpload(file);

        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const imageNode = $createImageNode({
              src: imageUrl,
              altText: file.name || "Blog image",
            });

            selection.insertNodes([imageNode]);
          }
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error al subir la imagen. Por favor, inténtalo de nuevo.");
      } finally {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    [editor, onImageUpload]
  );

  return (
    <input
      type="file"
      ref={fileInputRef}
      style={{ display: "none" }}
      accept="image/*"
      onChange={handleFileChange}
    />
  );
}