import { useRef, useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createImageNode } from "@/nodes/image";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
} from "lexical";
import { $insertNodes } from "@lexical/utils";

export function ImagesPlugin({ onImageUpload }) {
  const [editor] = useLexicalComposerContext();
  const fileInputRef = useRef <HTMLInputElement> null;

  useEffect(() => {
    if (!onImageUpload) return;

    // Register custom command for image insertion
    return editor.registerCommand(
      "INSERT_IMAGE_COMMAND",
      () => {
        // Open file dialog
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }

        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor, onImageUpload]);

  // Register separator command
  useEffect(() => {
    return editor.registerCommand(
      "INSERT_SEPARATOR_COMMAND",
      () => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            // Create a separator (HR) node
            const hrNode = $createImageNode({
              src: "separator",
              altText: "horizontal rule",
            });
            $insertNodes([hrNode]);
          }
        });
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !onImageUpload) return;

    const file = files[0];

    try {
      // Upload using the provided function
      const imageUrl = await onImageUpload(file);

      // Insert image into editor
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const imageNode = $createImageNode({
            src: imageUrl,
            altText: file.name || "Blog image",
          });
          $insertNodes([imageNode]);
        }
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error al subir la imagen. Por favor, inténtalo de nuevo.");
    } finally {
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
      />
    </>
  );
}
