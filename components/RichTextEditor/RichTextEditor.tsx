"use client";

import React, { useEffect, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { EditorState } from "lexical";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableNode, TableCellNode, TableRowNode } from "@lexical/table";
import { ListNode, ListItemNode } from "@lexical/list";
import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import { ImageNode } from "@/nodes/image";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { ToolbarPlugin } from "@/plugins/blog-form-toolbar";
import { ImagesPlugin } from "@/plugins/images-blog-form";
import { EditorBlock } from "@/types/blog-post-types";
import "./RichTextEditor.scss";
import {
  $convertToLexicalState,
  $convertFromLexicalState,
} from "@/utils/converter";

export const processEditorContent = (blocks: EditorBlock[]): string => {
  if (!blocks.length) return "";

  const serializedContent = blocks
    .map((block) => {
      switch (block.type) {
        case "heading_1":
          return `<h1 style="text-align:${block.alignment || "left"}">${
            block.content
          }</h1>`;

        case "heading_2":
          return `<h2 style="text-align:${block.alignment || "left"}">${
            block.content
          }</h2>`;

        case "quote":
          return `<blockquote>${block.content}</blockquote>`;

        case "list_item":
          return `<ul><li>${block.content}</li></ul>`;

        case "ordered_list_item":
          return `<ol><li>${block.content}</li></ol>`;

        case "image":
          return `<figure>
          <img src="${block.content}" alt="${
            block.meta?.alt || "Imagen del blog"
          }" />
          ${
            block.meta?.caption
              ? `<figcaption>${block.meta.caption}</figcaption>`
              : ""
          }
        </figure>`;

        case "separator":
          return "<hr />";

        default: // paragraph
          return `<p style="text-align:${block.alignment || "left"}">${
            block.content
          }</p>`;
      }
    })
    .join("\n\n");

  return serializedContent;
};

export const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 225;
  const text = content.replace(/<[^>]*>/g, "");
  const wordCount = text.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readTime} min`;
};

const theme = {
  // Lexical theme - customize as needed
  paragraph: "rich-text-editor__paragraph",
  heading: {
    h1: "rich-text-editor__heading-1",
    h2: "rich-text-editor__heading-2",
  },
  quote: "rich-text-editor__quote",
  list: {
    ul: "rich-text-editor__list",
    ol: "rich-text-editor__list",
    listitem: "rich-text-editor__list-item",
  },
  image: "rich-text-editor__image",
};

interface RichTextEditorProps {
  value?: EditorBlock[];
  onChange?: (blocks: EditorBlock[]) => void;
  onImageUpload?: (file: File) => Promise<string>;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  onImageUpload,
  className = "",
  placeholder = "Comienza a escribir aquí...",
  disabled = false,
}) => {
  const [editorState, setEditorState] = useState<EditorState | null>(null);
  const [imageCount, setImageCount] = useState(0);
  const [blockCount, setBlockCount] = useState(0);

  // Configure Lexical
  const initialConfig = {
    namespace: "BlogEditor",
    theme,
    onError(error: any) {
      console.error("Lexical editor error:", error);
    },
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      CodeNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      ImageNode,
      LinkNode,
    ],
    editable: !disabled,
  };

  // Handle editor content changes
  const handleEditorChange = (editorState: React.SetStateAction<EditorState | null>) => {
    setEditorState(editorState);

    // Convert Lexical state to your format
    if (onChange) {
      (editorState as EditorState)?.read(() => {
        const blocks = $convertFromLexicalState();

        // Update image and block counts
        const imageNodes = blocks.filter((block) => block.type === "image");
        const nonEmptyBlocks = blocks.filter(
          (block) => block.type !== "image" && block.type !== "separator"
        );

        setImageCount(imageNodes.length);
        setBlockCount(nonEmptyBlocks.length);

        onChange(blocks);
      });
    }
  };

  // Initialize editor with value if provided
  useEffect(() => {
    if (value && value.length > 0 && editorState) {
      const editor = editorState?.getEditor();
      editor?.update(() => {
        $convertToLexicalState(value);
      });
    }
  }, [value, editorState]);

  return (
    <div
      className={`rich-text-editor ${className} ${
        disabled ? "is-disabled" : ""
      }`}
    >
      <LexicalComposer initialConfig={initialConfig}>
        {/* Editor toolbar */}
        <ToolbarPlugin />

        {/* Main editor */}
        <div className="rich-text-editor__content">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="rich-text-editor__editable" />
            }
            placeholder={
              <div className="rich-text-editor__placeholder">{placeholder}</div>
            }
            ErrorBoundary={LexicalErrorBoundary as any}
          />
        </div>

        {/* Image handling */}
        <ImagesPlugin onImageUpload={onImageUpload} />

        {/* Additional plugins */}
        <HistoryPlugin />
        <AutoFocusPlugin />
        <ListPlugin />
        <OnChangePlugin onChange={handleEditorChange} />
      </LexicalComposer>

      {/* Footer with count */}
      <div className="rich-text-editor__footer">
        <div className="rich-text-editor__char-count">
          {blockCount} bloques | {imageCount} imágenes
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
