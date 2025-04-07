"use client";

import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

// Nodes
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { CodeNode } from "@lexical/code";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { ImageNode } from "@/nodes/image";

// Plugins
import { ToolbarPlugin } from "@/plugins/blog/Toolbar";
import { ImagesPlugin } from "@/plugins/blog/Images";

// Types
import { EditorBlock } from "@/types/blog-post-types";
import { $convertFromLexicalState } from "@/utils/converter";

import "./RichTextEditor.scss";

// Theme configuration
const theme = {
  paragraph: "rich-text-editor__paragraph",
  heading: {
    h1: "rich-text-editor__heading-1",
    h2: "rich-text-editor__heading-2",
    h3: "rich-text-editor__heading-3",
  },
  list: {
    ul: "rich-text-editor__list-ul",
    ol: "rich-text-editor__list-ol",
    listitem: "rich-text-editor__list-item",
  },
  quote: "rich-text-editor__quote",
  image: "rich-text-editor__image",
  link: "rich-text-editor__link",
};

// URL matching regex for auto links
const URL_MATCHER = /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

// Auto link matchers
const MATCHERS = [
  (text: string) => {
    const match = URL_MATCHER.exec(text);
    if (match === null) {
      return null;
    }
    const fullMatch = match[0];
    return {
      index: match.index,
      length: fullMatch.length,
      text: fullMatch,
      url: fullMatch.startsWith('http') ? fullMatch : `https://${fullMatch}`,
      attributes: {
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    };
  },
];

interface RichTextEditorProps {
  value?: EditorBlock[];
  onChange?: (blocks: EditorBlock[]) => void;
  onImageUpload?: (file: File) => Promise<string>;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

// Create a simple ErrorBoundary component for RichTextPlugin
function SimpleErrorBoundary({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value = [],
  onChange,
  onImageUpload,
  className = "",
  placeholder = "Comienza a escribir aquí...",
  disabled = false,
}) => {
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
      ImageNode,
      LinkNode,
      AutoLinkNode,
    ],
    editable: !disabled,
  };

  // Handle editor content changes
  const handleEditorChange = (editorState: any) => {
    if (!onChange) return;

    try {
      editorState.read(() => {
        const blocks = $convertFromLexicalState();
        onChange(blocks);
      });
    } catch (error) {
      console.error("Error converting editor state:", error);
    }
  };

  return (
    <div 
      className={`rich-text-editor ${className} ${
        disabled ? "is-disabled" : ""
      }`}
    >
      <LexicalComposer initialConfig={initialConfig}>
        {/* Editor toolbar */}
        <ToolbarPlugin onImageUpload={onImageUpload} />

        {/* Main editor content */}
        <div className="rich-text-editor__content">
          <RichTextPlugin
            contentEditable={<ContentEditable className="rich-text-editor__editable" />}
            placeholder={<div className="rich-text-editor__placeholder">{placeholder}</div>}
            ErrorBoundary={SimpleErrorBoundary}
          />
        </div>

        {/* Plugins */}
        <ImagesPlugin onImageUpload={onImageUpload} />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <ListPlugin />
        <LinkPlugin />
        <AutoLinkPlugin matchers={MATCHERS} />
        <OnChangePlugin onChange={handleEditorChange} />
      </LexicalComposer>
    </div>
  );
};

export default RichTextEditor;