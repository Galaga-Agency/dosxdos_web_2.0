"use client";

import React, { useEffect, useState, useRef } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { ImageNode } from "@/nodes/image-node";
import { EditorState } from "lexical";
import { lexicalToEditorBlocks, editorBlocksToLexical } from "@/utils/editor";
import "./RichTextEditor.scss";
import LexicalImagePlugin from "@/plugins/blog/LexicalImagePlugin";
import LexicalLinkDialogPlugin from "@/plugins/blog/LexicalLinkDialogPlugin";
import LexicalToolbarPlugin from "@/plugins/blog/LexicalToolbarPlugin";
import LexicalEmojiPlugin from "@/plugins/blog/LexicalEmojiPlugin";

// Export the interface to be reused in index.tsx
export interface RichTextEditorProps {
  value?: any;
  onChange?: (content: any) => void;
  onImageUpload?: (file: File) => Promise<string>;
  placeholder?: string;
  disabled?: boolean;
}

export default function RichTextEditor({
  value,
  onChange,
  onImageUpload,
  placeholder = "Start writing...",
  disabled = false,
}: RichTextEditorProps) {
  const [initialEditorState, setInitialEditorState] = useState<string | null>(
    null
  );
  const [editorReady, setEditorReady] = useState(false);
  const [localImageBlocks, setLocalImageBlocks] = useState<any[]>([]);
  const editorRef = useRef<HTMLDivElement>(null);

  // URL matching function for auto-links
  function createUrlMatcherFunction() {
    const URL_REGEX =
      /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

    return (text: string) => {
      const match = URL_REGEX.exec(text);
      if (match === null) {
        return null;
      }
      const startIndex = match.index;
      const url = match[0];
      return {
        index: startIndex,
        length: url.length,
        text: url,
        url: url.startsWith("www.") ? `https://${url}` : url,
      };
    };
  }

  const URL_MATCHER = createUrlMatcherFunction();

  // Process the initial value to convert it to Lexical format
  useEffect(() => {
    if (value) {
      try {
        // Extract image blocks from incoming value
        if (Array.isArray(value)) {
          const images = value.filter((block) => block.type === "image");
          setLocalImageBlocks(images);
        }

        if (typeof value === "string") {
          // Check if it's a JSON string
          try {
            JSON.parse(value);
            setInitialEditorState(value);
          } catch (e) {
            // It's not a JSON string, treat it as HTML content
            const dummyBlocks = [
              {
                id: "initial",
                type: "paragraph",
                content: value,
                alignment: "left",
                meta: {},
              },
            ];
            setInitialEditorState(editorBlocksToLexical(dummyBlocks as any));
          }
        } else if (Array.isArray(value)) {
          // Filter out image blocks before creating Lexical state
          const textBlocks = value.filter((block) => block.type !== "image");
          const lexicalState = editorBlocksToLexical(textBlocks);
          setInitialEditorState(lexicalState);
        }
      } catch (error) {
        console.error("Error setting initial editor state:", error);
        // Initialize with empty editor state
        setInitialEditorState(null);
      }
    }

    // After a short delay, mark the editor as ready
    const timer = setTimeout(() => {
      setEditorReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [value]);

  // Theme configuration
  const theme = {
    // Base theme
    text: {
      bold: "editor-text-bold",
      italic: "editor-text-italic",
      underline: "editor-text-underline",
      strikethrough: "editor-text-strikethrough",
      underlineStrikethrough: "editor-text-underlineStrikethrough",
      code: "editor-text-code",
    },
    // Block styles
    paragraph: "editor-paragraph",
    heading: {
      h1: "editor-h1",
      h2: "editor-h2",
      h3: "editor-h3",
    },
    list: {
      ul: "editor-list-ul",
      ol: "editor-list-ol",
      li: "editor-list-li",
      nested: {
        listitem: "editor-nested-listitem",
      },
      listitemChecked: "editor-listItemChecked",
      listitemUnchecked: "editor-listItemUnchecked",
    },
    quote: "editor-quote",
    link: "editor-link",
    image: "editor-image",
    table: "editor-table",
    tableCell: "editor-tableCell",
    tableCellHeader: "editor-tableCellHeader",
    // Element styles
    alignLeft: "editor-align-left",
    alignCenter: "editor-align-center",
    alignRight: "editor-align-right",
    alignJustify: "editor-align-justify",
  };

  // Initial configuration for the Lexical editor
  const initialConfig = {
    namespace: "RichTextEditor",
    theme,
    onError: (error: Error) => {
      console.error("Lexical Editor Error:", error);
    },
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      LinkNode,
      AutoLinkNode,
      ImageNode,
      TableNode,
      TableCellNode,
      TableRowNode,
    ],
    editorState: initialEditorState,
  };

  // Add an image block to our local tracking
  const handleAddImage = (imageBlock: any) => {
    setLocalImageBlocks((prev) => [...prev, imageBlock]);
  };

  // Handle editor changes and convert to the format needed by the app
  const handleEditorChange = (editorState: EditorState) => {
    if (!onChange) return;

    editorState.read(() => {
      const jsonState = editorState.toJSON();
      const stateString = JSON.stringify(jsonState);

      // Get blocks from lexical state
      const lexicalBlocks = lexicalToEditorBlocks(stateString);

      // Combine with our local image blocks
      const finalBlocks = [...lexicalBlocks, ...localImageBlocks];

      // Call onChange with the final blocks
      onChange(finalBlocks);
    });
  };

  return (
    <div
      className={`rich-text-editor-container ${disabled ? "is-disabled" : ""} ${
        editorReady ? "ready" : ""
      }`}
      ref={editorRef}
      onClick={(e) => e.stopPropagation()}
    >
      <LexicalComposer initialConfig={initialConfig}>
        <div className="rich-text-editor">
          <LexicalToolbarPlugin
            disabled={disabled}
            onImageUpload={onImageUpload}
          />
          <div
            className="editor-container"
            onClick={(e) => e.stopPropagation()}
          >
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={
                <div className="editor-placeholder">{placeholder}</div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <ListPlugin />
            <LinkPlugin />
            <AutoLinkPlugin matchers={[URL_MATCHER]} />
            <LexicalLinkDialogPlugin />
            <LexicalImagePlugin
              onImageUpload={onImageUpload}
              onImageInserted={handleAddImage}
            />
            <LexicalEmojiPlugin />
            <HistoryPlugin />
            <OnChangePlugin onChange={handleEditorChange} />
          </div>
        </div>
      </LexicalComposer>
    </div>
  );
}
