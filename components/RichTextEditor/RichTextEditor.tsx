"use client";

import React, { useState, useRef, useEffect } from "react";
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
  Trash2,
} from "lucide-react";
import gsap from "gsap";
import "./RichTextEditor.scss";

// Types
enum BlockType {
  PARAGRAPH = "paragraph",
  HEADING_1 = "heading_1",
  HEADING_2 = "heading_2",
  IMAGE = "image",
  QUOTE = "quote",
  LIST_ITEM = "list_item",
  ORDERED_LIST_ITEM = "ordered_list_item",
  SEPARATOR = "separator",
}

type Alignment = "left" | "center" | "right";

interface BlockMeta {
  alt?: string;
  caption?: string;
  file?: File;
  [key: string]: any;
}

interface EditorBlock {
  id: string;
  type: BlockType;
  content: string;
  alignment: Alignment;
  meta: BlockMeta;
}

interface RichTextEditorProps {
  value?: EditorBlock[];
  onChange?: (blocks: EditorBlock[]) => void;
  onImageUpload?: (file: File) => Promise<string>;
  className?: string;
  placeholder?: string;
}

// Helper functions
const createEmptyBlock = (type: BlockType = BlockType.PARAGRAPH): EditorBlock => ({
  id: `block-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
  type,
  content: "",
  alignment: "left",
  meta: {},
});

// Exported utility functions for handling rich text content
export const processEditorContent = (blocks: EditorBlock[]): string => {
  if (!blocks.length) return "";
  
  const serializedContent = blocks.map(block => {
    switch (block.type) {
      case BlockType.HEADING_1:
        return `<h1 style="text-align:${block.alignment || 'left'}">${block.content}</h1>`;
        
      case BlockType.HEADING_2:
        return `<h2 style="text-align:${block.alignment || 'left'}">${block.content}</h2>`;
        
      case BlockType.QUOTE:
        return `<blockquote>${block.content}</blockquote>`;
        
      case BlockType.LIST_ITEM:
        return `<ul><li>${block.content}</li></ul>`;
        
      case BlockType.ORDERED_LIST_ITEM:
        return `<ol><li>${block.content}</li></ol>`;
        
      case BlockType.IMAGE:
        return `<figure>
          <img src="${block.content}" alt="${block.meta?.alt || 'Imagen del blog'}" />
          ${block.meta?.caption ? `<figcaption>${block.meta.caption}</figcaption>` : ''}
        </figure>`;
        
      case BlockType.SEPARATOR:
        return '<hr />';
        
      default: // paragraph
        return `<p style="text-align:${block.alignment || 'left'}">${block.content}</p>`;
    }
  }).join('\n\n');
  
  return serializedContent;
};

export const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 225;
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readTime} min`;
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  onImageUpload,
  className = "",
  placeholder = "Comienza a escribir aquí...",
}) => {
  // State
  const [blocks, setBlocks] = useState<EditorBlock[]>(() => {
    if (value && Array.isArray(value) && value.length > 0) {
      return value;
    }
    return [createEmptyBlock()];
  });

  const [activeBlockId, setActiveBlockId] = useState<string | null>(
    blocks[0]?.id || null
  );
  const [uploadingImages, setUploadingImages] = useState<
    Record<string, boolean>
  >({});
  const [selectionActive, setSelectionActive] = useState(false);
  const [selectionRange, setSelectionRange] = useState<Range | null>(null);

  // Refs
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectionToolbarRef = useRef<HTMLDivElement>(null);

  // Animation references
  const blocksRefs = useRef<Record<string, HTMLElement | null>>({});

  // Register block ref
  const registerBlockRef = (id: string, ref: HTMLElement | null) => {
    blocksRefs.current[id] = ref;
  };

  // Animate new blocks
  useEffect(() => {
    Object.entries(blocksRefs.current).forEach(([id, ref]) => {
      if (ref && !ref.dataset.animated) {
        gsap.fromTo(
          ref,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
        );
        ref.dataset.animated = "true";
      }
    });
  }, [blocks]);

  // Update parent when blocks change
  useEffect(() => {
    if (onChange) {
      onChange(blocks);
    }
  }, [blocks, onChange]);

  // Selection logic
  useEffect(() => {
    // Function to handle selection changes
    const checkSelection = () => {
      const selection = window.getSelection();

      if (
        selection &&
        selection.rangeCount > 0 &&
        selection.toString().trim().length > 0
      ) {
        const range = selection.getRangeAt(0);
        setSelectionRange(range);
        setSelectionActive(true);

        // Position the selection toolbar
        positionSelectionToolbar(range);
      } else {
        setSelectionActive(false);
      }
    };

    // Function to position the toolbar
    const positionSelectionToolbar = (range: Range) => {
      if (!selectionToolbarRef.current || !editorRef.current) return;

      const rect = range.getBoundingClientRect();
      const editorRect = editorRef.current.getBoundingClientRect();

      const toolbarWidth = selectionToolbarRef.current.offsetWidth;
      const toolbarHeight = selectionToolbarRef.current.offsetHeight;

      // Position it above the selection
      let left =
        rect.left + rect.width / 2 - toolbarWidth / 2 - editorRect.left;
      let top = rect.top - toolbarHeight - 10 - editorRect.top;

      // Keep it within bounds
      if (left < 0) left = 0;
      if (left + toolbarWidth > editorRect.width) {
        left = editorRect.width - toolbarWidth;
      }

      if (top < 0) {
        // Position below if above doesn't fit
        top = rect.bottom + 10 - editorRect.top;
      }

      selectionToolbarRef.current.style.left = `${left}px`;
      selectionToolbarRef.current.style.top = `${top}px`;
    };

    // Set up event listeners
    document.addEventListener("selectionchange", checkSelection);
    document.addEventListener("mouseup", checkSelection);

    return () => {
      document.removeEventListener("selectionchange", checkSelection);
      document.removeEventListener("mouseup", checkSelection);
    };
  }, []);

  // Block operations
  const handleBlockClick = (id: string) => {
    setActiveBlockId(id);
  };

  const handleBlockChange = (id: string, content: string) => {
    setBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, content } : block))
    );
  };

  const addBlockAfter = (id: string, type: BlockType = BlockType.PARAGRAPH) => {
    const newBlock = createEmptyBlock(type);

    setBlocks((prev) => {
      const index = prev.findIndex((block) => block.id === id);
      if (index === -1) return [...prev, newBlock];

      const updated = [...prev];
      updated.splice(index + 1, 0, newBlock);
      return updated;
    });

    // Focus new block
    setTimeout(() => {
      const newBlockElement = document.getElementById(newBlock.id);
      if (newBlockElement) {
        newBlockElement.focus();
        setActiveBlockId(newBlock.id);
      }
    }, 0);

    return newBlock.id;
  };

  const removeBlock = (id: string) => {
    if (blocks.length <= 1) {
      // Don't remove the last block, just clear it
      setBlocks([createEmptyBlock()]);
      return;
    }

    const blockIndex = blocks.findIndex((block) => block.id === id);

    setBlocks((prev) => {
      const newBlocks = prev.filter((block) => block.id !== id);
      return newBlocks;
    });

    // Focus the previous block or the next one if this was the first
    setTimeout(() => {
      const focusIndex = blockIndex > 0 ? blockIndex - 1 : 0;
      const blockToFocus = document.getElementById(blocks[focusIndex]?.id);
      if (blockToFocus) {
        blockToFocus.focus();
        setActiveBlockId(blocks[focusIndex]?.id);
      }
    }, 0);
  };

  // Keydown handlers
  const handleBlockKeyDown = (
    e: React.KeyboardEvent<HTMLElement>,
    id: string,
    index: number
  ) => {
    // Enter creates new block
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addBlockAfter(id);
    }

    // Backspace on empty block deletes it
    if (
      e.key === "Backspace" &&
      e.currentTarget.textContent === "" &&
      blocks.length > 1
    ) {
      e.preventDefault();

      const prevBlockId = index > 0 ? blocks[index - 1].id : null;

      setBlocks((prev) => {
        const updatedBlocks = prev.filter((block) => block.id !== id);
        return updatedBlocks;
      });

      // Focus previous block
      if (prevBlockId) {
        setTimeout(() => {
          const prevBlock = document.getElementById(prevBlockId);
          if (prevBlock) {
            prevBlock.focus();
            setActiveBlockId(prevBlockId);

            // Place cursor at the end
            const range = document.createRange();
            range.selectNodeContents(prevBlock);
            range.collapse(false);
            const selection = window.getSelection();
            if (selection) {
              selection.removeAllRanges();
              selection.addRange(range);
            }
          }
        }, 0);
      }
    }
  };

  // Block formatting
  const toggleBlockFormat = (format: BlockType) => {
    if (!activeBlockId) return;

    setBlocks((prev) =>
      prev.map((block) =>
        block.id === activeBlockId ? { ...block, type: format } : block
      )
    );
  };

  const setAlignment = (alignment: Alignment) => {
    if (!activeBlockId) return;

    setBlocks((prev) =>
      prev.map((block) =>
        block.id === activeBlockId ? { ...block, alignment } : block
      )
    );
  };

  // Image handling
  const handleImageUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !activeBlockId) return;

    const file = files[0];

    // Create new image block after current active block
    const newBlockId = addBlockAfter(activeBlockId, BlockType.IMAGE);

    // Mark as uploading
    setUploadingImages((prev) => ({ ...prev, [newBlockId]: true }));

    try {
      let imageUrl: string;

      if (onImageUpload) {
        // Use provided upload function
        imageUrl = await onImageUpload(file);
      } else {
        // Fallback to local URL
        imageUrl = URL.createObjectURL(file);
      }

      // Update block with image URL
      setBlocks((prev) =>
        prev.map((block) =>
          block.id === newBlockId
            ? {
                ...block,
                content: imageUrl,
                meta: {
                  alt: file.name || "Imagen",
                  file: file,
                },
              }
            : block
        )
      );
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error al subir la imagen. Por favor, inténtalo de nuevo.");
      removeBlock(newBlockId);
    } finally {
      // Clear upload state
      setUploadingImages((prev) => {
        const newState = { ...prev };
        delete newState[newBlockId];
        return newState;
      });

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Selection formatting
  const formatSelectedText = (format: "bold" | "italic" | "link") => {
    if (!selectionRange || !activeBlockId) return;

    const tag = format === "bold" ? "strong" : format === "italic" ? "em" : "a";
    const selection = window.getSelection();
    if (!selection) return;

    const selectedText = selection.toString();

    // Create element
    const formattedEl = document.createElement(tag);
    formattedEl.textContent = selectedText;

    // Add href for links
    if (tag === "a") {
      const url = prompt("Introduce la URL del enlace:");
      if (!url) return;
      formattedEl.setAttribute("href", url);
      formattedEl.setAttribute("target", "_blank");
      formattedEl.setAttribute("rel", "noopener noreferrer");
    }

    // Replace text with formatted element
    selectionRange.deleteContents();
    selectionRange.insertNode(formattedEl);

    // Update block content
    setBlocks((prev) => {
      return prev.map((block) => {
        if (block.id === activeBlockId) {
          const blockEl = document.getElementById(block.id);
          if (!blockEl) return block;
          return { ...block, content: blockEl.innerHTML };
        }
        return block;
      });
    });

    // Clear selection state
    setSelectionActive(false);
  };

  // Render blocks
  const renderBlock = (block: EditorBlock, index: number) => {
    const isActive = block.id === activeBlockId;
    const isUploading = uploadingImages[block.id] || false;

    // Common props
    const commonProps = {
      id: block.id,
      key: block.id,
      className: `rich-text-editor__block ${isActive ? "is-active" : ""}`,
      contentEditable: true,
      suppressContentEditableWarning: true,
      onClick: () => handleBlockClick(block.id),
      onKeyDown: (e: React.KeyboardEvent<HTMLElement>) =>
        handleBlockKeyDown(e, block.id, index),
      onInput: (e: React.FormEvent<HTMLElement>) => {
        if (e.currentTarget) {
          handleBlockChange(block.id, e.currentTarget.innerHTML);
        }
      },
      onBlur: () => {
        const el = document.getElementById(block.id);
        if (el) {
          handleBlockChange(block.id, el.innerHTML);
        }
      },
      onFocus: () => setActiveBlockId(block.id),
      ref: (ref: HTMLElement | null) => registerBlockRef(block.id, ref),
      "data-alignment": block.alignment || "left",
      dangerouslySetInnerHTML: { __html: block.content },
    };

    // Render based on type
    switch (block.type) {
      case BlockType.HEADING_1:
        return (
          <div key={block.id} className="rich-text-editor__block-wrapper">
            <h1
              {...commonProps}
              className={`${commonProps.className} rich-text-editor__heading-1`}
            />
            {isActive && (
              <button
                type="button"
                className="rich-text-editor__block-delete"
                onClick={() => removeBlock(block.id)}
                title="Eliminar bloque"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        );

      case BlockType.HEADING_2:
        return (
          <div key={block.id} className="rich-text-editor__block-wrapper">
            <h2
              {...commonProps}
              className={`${commonProps.className} rich-text-editor__heading-2`}
            />
            {isActive && (
              <button
                type="button"
                className="rich-text-editor__block-delete"
                onClick={() => removeBlock(block.id)}
                title="Eliminar bloque"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        );

      case BlockType.QUOTE:
        return (
          <div key={block.id} className="rich-text-editor__block-wrapper">
            <div className="rich-text-editor__quote-container">
              <div className="rich-text-editor__quote-icon rich-text-editor__quote-icon--left">
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
              </div>
              <blockquote
                {...commonProps}
                className={`${commonProps.className} rich-text-editor__quote`}
              />
              <div className="rich-text-editor__quote-icon rich-text-editor__quote-icon--right">
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 3c-3 0-7 1-7 8v8c0 1.25.757 2.017 2 2h4c1.25 0 2-.75 2-1.972V13c0-1.25-.75-2-2-2h-.75c0-2.25-.25-4 2.75-4V4c0-1 0-1-1-1z" />
                  <path d="M9 3c-3 0-7 1-7 8v8c0 1.25.756 2.017 2 2h4c1.25 0 2-.75 2-1.972V13c0-1.25-.75-2-2-2h-.75c0-2.25-.25-4 2.75-4V4c0-1 0-1-1-1z" />
                </svg>
              </div>
            </div>
            {isActive && (
              <button
                type="button"
                className="rich-text-editor__block-delete"
                onClick={() => removeBlock(block.id)}
                title="Eliminar bloque"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        );

      case BlockType.LIST_ITEM:
        return (
          <div key={block.id} className="rich-text-editor__block-wrapper">
            <div className="rich-text-editor__list">
              <ul>
                <li
                  {...commonProps}
                  className={`${commonProps.className} rich-text-editor__list-item`}
                />
              </ul>
            </div>
            {isActive && (
              <button
                type="button"
                className="rich-text-editor__block-delete"
                onClick={() => removeBlock(block.id)}
                title="Eliminar bloque"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        );

      case BlockType.ORDERED_LIST_ITEM:
        return (
          <div key={block.id} className="rich-text-editor__block-wrapper">
            <div className="rich-text-editor__list">
              <ol>
                <li
                  {...commonProps}
                  className={`${commonProps.className} rich-text-editor__list-item`}
                />
              </ol>
            </div>
            {isActive && (
              <button
                type="button"
                className="rich-text-editor__block-delete"
                onClick={() => removeBlock(block.id)}
                title="Eliminar bloque"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        );

      case BlockType.IMAGE:
        return (
          <figure key={block.id} className="rich-text-editor__image-container">
            {isUploading ? (
              <div className="rich-text-editor__image-uploading">
                <div className="rich-text-editor__image-uploading-spinner"></div>
                <p>Subiendo imagen...</p>
              </div>
            ) : block.content ? (
              <div className="rich-text-editor__image-wrapper">
                <img
                  src={block.content}
                  alt={block.meta?.alt || "Imagen del blog"}
                  className="rich-text-editor__image"
                  onClick={() => handleBlockClick(block.id)}
                />
                <button
                  type="button"
                  className="rich-text-editor__image-delete-btn"
                  onClick={() => removeBlock(block.id)}
                  title="Eliminar imagen"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : null}
            <figcaption
              contentEditable={true}
              suppressContentEditableWarning={true}
              className="rich-text-editor__image-caption"
              data-placeholder="Añadir descripción (opcional)"
              onInput={(e: React.FormEvent<HTMLElement>) => {
                if (e.currentTarget) {
                  setBlocks((prev) =>
                    prev.map((b) =>
                      b.id === block.id
                        ? {
                            ...b,
                            meta: {
                              ...b.meta,
                              caption: e.currentTarget.textContent || "",
                            },
                          }
                        : b
                    )
                  );
                }
              }}
              onClick={() => handleBlockClick(block.id)}
            >
              {block.meta?.caption || ""}
            </figcaption>
          </figure>
        );

      case BlockType.SEPARATOR:
        return (
          <div key={block.id} className="rich-text-editor__block-wrapper">
            <hr className="rich-text-editor__separator" />
            {isActive && (
              <button
                type="button"
                className="rich-text-editor__block-delete"
                onClick={() => removeBlock(block.id)}
                title="Eliminar bloque"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        );

      default: // paragraph
        return (
          <div key={block.id} className="rich-text-editor__block-wrapper">
            <p
              {...commonProps}
              className={`${commonProps.className} rich-text-editor__paragraph`}
            />
            {isActive && (
              <button
                type="button"
                className="rich-text-editor__block-delete"
                onClick={() => removeBlock(block.id)}
                title="Eliminar bloque"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        );
    }
  };

  return (
    <div className={`rich-text-editor ${className}`} ref={editorRef}>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* Selection toolbar */}
      {selectionActive && (
        <div
          className="rich-text-editor__selection-toolbar"
          ref={selectionToolbarRef}
        >
          <button
            type="button"
            onClick={() => formatSelectedText("bold")}
            className="rich-text-editor__toolbar-btn"
            title="Negrita"
          >
            <Bold size={16} />
          </button>
          <button
            type="button"
            onClick={() => formatSelectedText("italic")}
            className="rich-text-editor__toolbar-btn"
            title="Cursiva"
          >
            <Italic size={16} />
          </button>
          <button
            type="button"
            onClick={() => formatSelectedText("link")}
            className="rich-text-editor__toolbar-btn"
            title="Enlace"
          >
            <LinkIcon size={16} />
          </button>
        </div>
      )}

      {/* Main toolbar */}
      <div className="rich-text-editor__toolbar">
        <div className="rich-text-editor__toolbar-group">
          <button
            type="button"
            onClick={() => toggleBlockFormat(BlockType.PARAGRAPH)}
            className={`rich-text-editor__toolbar-btn ${
              activeBlockId &&
              blocks.find((b) => b.id === activeBlockId)?.type ===
                BlockType.PARAGRAPH
                ? "is-active"
                : ""
            }`}
            title="Texto normal"
          >
            <span className="rich-text-editor__toolbar-text">P</span>
          </button>
          <button
            type="button"
            onClick={() => toggleBlockFormat(BlockType.HEADING_1)}
            className={`rich-text-editor__toolbar-btn ${
              activeBlockId &&
              blocks.find((b) => b.id === activeBlockId)?.type ===
                BlockType.HEADING_1
                ? "is-active"
                : ""
            }`}
            title="Título 1"
          >
            <Heading1 size={18} />
          </button>
          <button
            type="button"
            onClick={() => toggleBlockFormat(BlockType.HEADING_2)}
            className={`rich-text-editor__toolbar-btn ${
              activeBlockId &&
              blocks.find((b) => b.id === activeBlockId)?.type ===
                BlockType.HEADING_2
                ? "is-active"
                : ""
            }`}
            title="Título 2"
          >
            <Heading2 size={18} />
          </button>
        </div>

        <div className="rich-text-editor__toolbar-group">
          <button
            type="button"
            onClick={() => setAlignment("left")}
            className={`rich-text-editor__toolbar-btn ${
              activeBlockId &&
              blocks.find((b) => b.id === activeBlockId)?.alignment === "left"
                ? "is-active"
                : ""
            }`}
            title="Alinear a la izquierda"
          >
            <AlignLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => setAlignment("center")}
            className={`rich-text-editor__toolbar-btn ${
              activeBlockId &&
              blocks.find((b) => b.id === activeBlockId)?.alignment === "center"
                ? "is-active"
                : ""
            }`}
            title="Centrar"
          >
            <AlignCenter size={16} />
          </button>
          <button
            type="button"
            onClick={() => setAlignment("right")}
            className={`rich-text-editor__toolbar-btn ${
              activeBlockId &&
              blocks.find((b) => b.id === activeBlockId)?.alignment === "right"
                ? "is-active"
                : ""
            }`}
            title="Alinear a la derecha"
          >
            <AlignRight size={16} />
          </button>
        </div>

        <div className="rich-text-editor__toolbar-group">
          <button
            type="button"
            onClick={() => toggleBlockFormat(BlockType.LIST_ITEM)}
            className={`rich-text-editor__toolbar-btn ${
              activeBlockId &&
              blocks.find((b) => b.id === activeBlockId)?.type ===
                BlockType.LIST_ITEM
                ? "is-active"
                : ""
            }`}
            title="Lista de viñetas"
          >
            <List size={16} />
          </button>
          <button
            type="button"
            onClick={() => toggleBlockFormat(BlockType.ORDERED_LIST_ITEM)}
            className={`rich-text-editor__toolbar-btn ${
              activeBlockId &&
              blocks.find((b) => b.id === activeBlockId)?.type ===
                BlockType.ORDERED_LIST_ITEM
                ? "is-active"
                : ""
            }`}
            title="Lista numerada"
          >
            <ListOrdered size={16} />
          </button>
          <button
            type="button"
            onClick={() => toggleBlockFormat(BlockType.QUOTE)}
            className={`rich-text-editor__toolbar-btn ${
              activeBlockId &&
              blocks.find((b) => b.id === activeBlockId)?.type ===
                BlockType.QUOTE
                ? "is-active"
                : ""
            }`}
            title="Cita"
          >
            <Quote size={16} />
          </button>
        </div>

        <div className="rich-text-editor__toolbar-group">
          <button
            type="button"
            onClick={handleImageUploadClick}
            className="rich-text-editor__toolbar-btn"
            title="Insertar imagen"
          >
            <ImageIcon size={16} />
          </button>
          <button
            type="button"
            onClick={() =>
              activeBlockId && addBlockAfter(activeBlockId, BlockType.SEPARATOR)
            }
            className="rich-text-editor__toolbar-btn"
            title="Insertar separador"
          >
            <Minus size={16} />
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="rich-text-editor__content">
        {blocks.map(renderBlock)}

        {/* Add empty paragraph if needed */}
        {blocks.length === 0 && (
          <p
            className="rich-text-editor__placeholder"
            onClick={() => {
              const newBlock = createEmptyBlock();
              setBlocks([newBlock]);
              setActiveBlockId(newBlock.id);
            }}
          >
            {placeholder}
          </p>
        )}
      </div>

      {/* Footer with character count */}
      <div className="rich-text-editor__footer">
        <div className="rich-text-editor__char-count">
          {
            blocks.filter(
              (b) =>
                b.type !== BlockType.IMAGE && b.type !== BlockType.SEPARATOR
            ).length
          }{" "}
          bloques |{blocks.filter((b) => b.type === BlockType.IMAGE).length}{" "}
          imágenes
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;