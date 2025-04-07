// components/RichTextEditor/SelectionToolbar.tsx
"use client";

import React from "react";
import { Bold, Italic, Link } from "lucide-react";

interface SelectionToolbarProps {
  selectionActive: boolean;
  toolbarRef: React.RefObject<HTMLDivElement>;
  onFormatSelectedText: (format: "bold" | "italic" | "link") => void;
}

const SelectionToolbar: React.FC<SelectionToolbarProps> = ({
  selectionActive,
  toolbarRef,
  onFormatSelectedText,
}) => {
  if (!selectionActive) return null;

  return (
    <div className="rich-text-editor__selection-toolbar" ref={toolbarRef}>
      <button
        type="button"
        onClick={() => onFormatSelectedText("bold")}
        className="rich-text-editor__toolbar-btn"
        title="Negrita"
      >
        <Bold size={16} />
      </button>
      <button
        type="button"
        onClick={() => onFormatSelectedText("italic")}
        className="rich-text-editor__toolbar-btn"
        title="Cursiva"
      >
        <Italic size={16} />
      </button>
      <button
        type="button"
        onClick={() => onFormatSelectedText("link")}
        className="rich-text-editor__toolbar-btn"
        title="Enlace"
      >
        <Link size={16} />
      </button>
    </div>
  );
};

export default SelectionToolbar;