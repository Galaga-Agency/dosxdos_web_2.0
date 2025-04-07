"use client";

import React from "react";
import {
  Bold,
  Italic,
  Quote,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Link as LinkIcon,
  Minus,
} from "lucide-react";
import { EditorBlock } from "@/types/blog-post-types";

interface EditorToolbarProps {
  activeBlockId: string | null;
  blocks: EditorBlock[];
  onToggleBlockFormat: (format: string) => void;
  onSetAlignment: (alignment: "left" | "center" | "right") => void;
  onInsertImage: () => void;
  onInsertSeparator: () => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  activeBlockId,
  blocks,
  onToggleBlockFormat,
  onSetAlignment,
  onInsertImage,
  onInsertSeparator,
}) => {
  // Get the active block
  const activeBlock = activeBlockId 
    ? blocks.find(block => block.id === activeBlockId) 
    : null;

  // Check if block type is active
  const isTypeActive = (type: string): boolean => {
    return activeBlock?.type === type;
  };

  // Check if alignment is active
  const isAlignmentActive = (alignment: "left" | "center" | "right"): boolean => {
    return activeBlock?.alignment === alignment;
  };

  return (
    <div className="rich-text-editor__toolbar">
      {/* Text formats */}
      <div className="rich-text-editor__toolbar-group">
        <button
          type="button"
          onClick={() => onToggleBlockFormat("paragraph")}
          className={`rich-text-editor__toolbar-btn ${isTypeActive("paragraph") ? "is-active" : ""}`}
          title="Texto normal"
        >
          <span className="rich-text-editor__toolbar-text">P</span>
        </button>
        <button
          type="button"
          onClick={() => onToggleBlockFormat("heading_1")}
          className={`rich-text-editor__toolbar-btn ${isTypeActive("heading_1") ? "is-active" : ""}`}
          title="Título 1"
        >
          <Heading1 size={18} />
        </button>
        <button
          type="button"
          onClick={() => onToggleBlockFormat("heading_2")}
          className={`rich-text-editor__toolbar-btn ${isTypeActive("heading_2") ? "is-active" : ""}`}
          title="Título 2"
        >
          <Heading2 size={18} />
        </button>
      </div>

      {/* Alignment */}
      <div className="rich-text-editor__toolbar-group">
        <button
          type="button"
          onClick={() => onSetAlignment("left")}
          className={`rich-text-editor__toolbar-btn ${isAlignmentActive("left") ? "is-active" : ""}`}
          title="Alinear a la izquierda"
        >
          <AlignLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => onSetAlignment("center")}
          className={`rich-text-editor__toolbar-btn ${isAlignmentActive("center") ? "is-active" : ""}`}
          title="Centrar"
        >
          <AlignCenter size={16} />
        </button>
        <button
          type="button"
          onClick={() => onSetAlignment("right")}
          className={`rich-text-editor__toolbar-btn ${isAlignmentActive("right") ? "is-active" : ""}`}
          title="Alinear a la derecha"
        >
          <AlignRight size={16} />
        </button>
      </div>

      {/* List formats */}
      <div className="rich-text-editor__toolbar-group">
        <button
          type="button"
          onClick={() => onToggleBlockFormat("list_item")}
          className={`rich-text-editor__toolbar-btn ${isTypeActive("list_item") ? "is-active" : ""}`}
          title="Lista de viñetas"
        >
          <List size={16} />
        </button>
        <button
          type="button"
          onClick={() => onToggleBlockFormat("ordered_list_item")}
          className={`rich-text-editor__toolbar-btn ${isTypeActive("ordered_list_item") ? "is-active" : ""}`}
          title="Lista numerada"
        >
          <ListOrdered size={16} />
        </button>
        <button
          type="button"
          onClick={() => onToggleBlockFormat("quote")}
          className={`rich-text-editor__toolbar-btn ${isTypeActive("quote") ? "is-active" : ""}`}
          title="Cita"
        >
          <Quote size={16} />
        </button>
      </div>

      {/* Special elements */}
      <div className="rich-text-editor__toolbar-group">
        <button
          type="button"
          onClick={onInsertImage}
          className="rich-text-editor__toolbar-btn"
          title="Insertar imagen"
        >
          <ImageIcon size={16} />
        </button>
        <button
          type="button"
          onClick={onInsertSeparator}
          className="rich-text-editor__toolbar-btn"
          title="Insertar separador"
        >
          <Minus size={16} />
        </button>
      </div>
    </div>
  );
};

export default EditorToolbar;