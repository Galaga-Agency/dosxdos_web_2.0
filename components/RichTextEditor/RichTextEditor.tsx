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
import { useStickyInputFocus } from "@/hooks/useStickyInputFocus";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { PreventFocusStealingPlugin } from "@/plugins/blog/PreventFocusStealingPlugin";

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
  const [canRender, setCanRender] = useState(false);
  const [localImageBlocks, setLocalImageBlocks] = useState<any[]>([]);
  const editorRef = useRef<HTMLDivElement>(null);
  useStickyInputFocus("#tags");

  const URL_MATCHER = (() => {
    const regex =
      /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
    return (text: string) => {
      const match = regex.exec(text);
      if (!match) return null;
      const url = match[0];
      return {
        index: match.index,
        length: url.length,
        text: url,
        url: url.startsWith("www.") ? `https://${url}` : url,
      };
    };
  })();

  useEffect(() => {
    // Every 50ms, if something other than the tag input is stealing focus, stop it
    const interval = setInterval(() => {
      const active = document.activeElement;
      const tagInput = document.querySelector("#tags");

      if (
        tagInput &&
        active &&
        active !== tagInput &&
        !document.activeElement?.closest(".editor-container") &&
        document.activeElement?.classList.contains("editor-input")
      ) {
        console.warn("❌ Stealing focus back to #tags");
        (tagInput as HTMLElement).focus();
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

useEffect(() => {
  if (initialEditorState !== null) return;

  try {
    if (Array.isArray(value)) {
      const lexicalState = editorBlocksToLexical(value);
      setInitialEditorState(lexicalState);

      const images = value.filter((b) => b.type === "image");
      setLocalImageBlocks(images);
    } else if (typeof value === "string") {
      try {
        JSON.parse(value);
        setInitialEditorState(value);
      } catch {
        const fallback: any = [
          {
            id: "initial",
            type: "paragraph",
            content: value,
            alignment: "left",
            meta: {},
          },
        ];
        setInitialEditorState(editorBlocksToLexical(fallback));
      }
    } else {
      setInitialEditorState(editorBlocksToLexical([]));
    }

    setCanRender(true);
  } catch (err) {
    console.error("❌ Failed to parse editor value:", err);
    setInitialEditorState(editorBlocksToLexical([]));
    setCanRender(true);
  }
}, [initialEditorState, value]);


  // Lexical config
  const theme = {
    text: {
      bold: "editor-text-bold",
      italic: "editor-text-italic",
      underline: "editor-text-underline",
      strikethrough: "editor-text-strikethrough",
      underlineStrikethrough: "editor-text-underlineStrikethrough",
      code: "editor-text-code",
    },
    paragraph: "editor-paragraph",
    heading: { h1: "editor-h1", h2: "editor-h2", h3: "editor-h3" },
    list: {
      ul: "editor-list-ul",
      ol: "editor-list-ol",
      li: "editor-list-li",
      nested: { listitem: "editor-nested-listitem" },
      listitemChecked: "editor-listItemChecked",
      listitemUnchecked: "editor-listItemUnchecked",
    },
    quote: "editor-quote",
    link: "editor-link",
    image: "editor-image",
    table: "editor-table",
    tableCell: "editor-tableCell",
    tableCellHeader: "editor-tableCellHeader",
    alignLeft: "editor-align-left",
    alignCenter: "editor-align-center",
    alignRight: "editor-align-right",
    alignJustify: "editor-align-justify",
  };

  const initialConfig = {
    namespace: "RichTextEditor",
    theme,
    onError: (error: Error) => console.error("Lexical error:", error),
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

  const handleAddImage = (imageBlock: any) => {
    setLocalImageBlocks((prev) => [...prev, imageBlock]);
  };

  const handleEditorChange = (editorState: EditorState) => {
    if (!onChange) return;

    editorState.read(() => {
      const json = editorState.toJSON();
      const stateString = JSON.stringify(json);
      const blocks = lexicalToEditorBlocks(stateString);

      const updatedImages = localImageBlocks.filter((img) =>
        blocks.find((b) => b.type === "image" && b.content === img.content)
      );

      const finalBlocks = [...blocks, ...updatedImages];
      setLocalImageBlocks(updatedImages);
      onChange(finalBlocks);
    });
  };

  useEffect(() => {
    const editorEl = editorRef.current?.querySelector(
      ".editor-input"
    ) as HTMLElement | null;
    const tagInput = document.querySelector("#tags") as HTMLElement | null;

    if (!editorEl || !tagInput) return;

    let manuallyFocused = false;

    const handleEditorFocus = (e: FocusEvent) => {
      if (!manuallyFocused && document.activeElement !== editorEl) {
        console.warn("🛑 Editor tried to steal focus, preventing...");
        e.stopPropagation();
        e.preventDefault();
        tagInput.focus(); // put it back in the tag input
      }
    };

    const allowFocus = () => {
      manuallyFocused = true;
      setTimeout(() => {
        manuallyFocused = false;
      }, 1000); // allow editor focus for 1s after click
    };

    editorEl.addEventListener("focusin", handleEditorFocus, true);
    editorEl.addEventListener("mousedown", allowFocus);

    return () => {
      editorEl.removeEventListener("focusin", handleEditorFocus, true);
      editorEl.removeEventListener("mousedown", allowFocus);
    };
  }, []);

  return (
    <div
      className={`rich-text-editor-container ${disabled ? "is-disabled" : ""}`}
      ref={editorRef}
      onClick={(e) => e.stopPropagation()}
    >
      {canRender && initialEditorState && (
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
              <PreventFocusStealingPlugin />
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
      )}
    </div>
  );
}
