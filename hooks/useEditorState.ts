import { useState, useEffect, useCallback, useRef } from 'react';
import { EditorBlock } from '@/types/blog-post-types';
import { useBlockAnimations } from './useFormAnimation';

// Helper to create a new empty block with a unique ID
const createEmptyBlock = (type: string = "paragraph"): EditorBlock => ({
  id: `block-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
  type,
  content: "",
  alignment: "left",
  meta: {},
});

/**
 * Custom hook for managing rich text editor state
 * Fixed backwards text input issue by preserving cursor position
 */
export function useEditorState(initialBlocks: EditorBlock[] = []) {
  // Block state
  const [blocks, setBlocks] = useState<EditorBlock[]>(() => {
    if (Array.isArray(initialBlocks) && initialBlocks.length > 0) {
      return initialBlocks;
    }
    return [createEmptyBlock()];
  });

  // Active block state
  const [activeBlockId, setActiveBlockId] = useState<string | null>(
    blocks[0]?.id || null
  );

  // Image upload state
  const [uploadingImages, setUploadingImages] = useState<Record<string, boolean>>({});

  // Selection state
  const [selectionActive, setSelectionActive] = useState(false);
  const [selectionRange, setSelectionRange] = useState<Range | null>(null);
  
  // Animation related hook
  const { registerBlockRef } = useBlockAnimations();

  // Refs
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectionToolbarRef = useRef<HTMLDivElement>(null);
  
  // Stored cursor position to fix backwards text bug
  const cursorPositionRef = useRef<{
    id: string;
    nodeIndex: number;
    offset: number;
    atEnd: boolean;
  } | null>(null);

  // Selection handling
  useEffect(() => {
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

    const positionSelectionToolbar = (range: Range) => {
      if (!selectionToolbarRef.current || !editorRef.current) return;

      const rect = range.getBoundingClientRect();
      const editorRect = editorRef.current.getBoundingClientRect();

      const toolbarWidth = selectionToolbarRef.current.offsetWidth;
      const toolbarHeight = selectionToolbarRef.current.offsetHeight;

      let left = rect.left + rect.width / 2 - toolbarWidth / 2 - editorRect.left;
      let top = rect.top - toolbarHeight - 10 - editorRect.top;

      // Keep within bounds
      if (left < 0) left = 0;
      if (left + toolbarWidth > editorRect.width) {
        left = editorRect.width - toolbarWidth;
      }

      if (top < 0) {
        top = rect.bottom + 10 - editorRect.top;
      }

      selectionToolbarRef.current.style.left = `${left}px`;
      selectionToolbarRef.current.style.top = `${top}px`;
    };

    document.addEventListener("selectionchange", checkSelection);
    document.addEventListener("mouseup", checkSelection);

    return () => {
      document.removeEventListener("selectionchange", checkSelection);
      document.removeEventListener("mouseup", checkSelection);
    };
  }, []);

  // Helper to save current cursor position
  const saveCursorPosition = (id: string) => {
    const selection = window.getSelection();
    const el = document.getElementById(id);
    
    if (!selection || !el || selection.rangeCount === 0) return;
    
    const range = selection.getRangeAt(0);
    const atEnd = range.endOffset === (el.firstChild?.textContent?.length || 0);
    
    // Find which child node contains the cursor
    let nodeIndex = -1;
    for (let i = 0; i < el.childNodes.length; i++) {
      if (el.childNodes[i].contains(range.endContainer)) {
        nodeIndex = i;
        break;
      }
    }
    
    cursorPositionRef.current = {
      id,
      nodeIndex,
      offset: range.endOffset,
      atEnd
    };
  };
  
  // Helper to restore cursor position
  const restoreCursorPosition = (id: string) => {
    if (!cursorPositionRef.current || cursorPositionRef.current.id !== id) return;
    
    const el = document.getElementById(id);
    if (!el) return;
    
    try {
      const selection = window.getSelection();
      if (!selection) return;
      
      const range = document.createRange();
      
      // If cursor was at the end, place it at the end again
      if (cursorPositionRef.current.atEnd) {
        // Place at the end of the content
        const lastNode = el.lastChild || el;
        const textLength = lastNode.textContent?.length || 0;
        range.setStart(lastNode, textLength);
        range.setEnd(lastNode, textLength);
      } else if (cursorPositionRef.current.nodeIndex >= 0 && 
                cursorPositionRef.current.nodeIndex < el.childNodes.length) {
        // Try to place cursor at the same node and offset
        const targetNode = el.childNodes[cursorPositionRef.current.nodeIndex];
        const offset = Math.min(
          cursorPositionRef.current.offset,
          targetNode.textContent?.length || 0
        );
        range.setStart(targetNode, offset);
        range.setEnd(targetNode, offset);
      } else {
        // Fallback to first node
        const firstNode = el.firstChild || el;
        range.setStart(firstNode, cursorPositionRef.current.offset);
        range.setEnd(firstNode, cursorPositionRef.current.offset);
      }
      
      selection.removeAllRanges();
      selection.addRange(range);
    } catch (error) {
      console.error("Error restoring cursor position:", error);
    }
  };

  // Block operations
  const handleBlockClick = useCallback((id: string) => {
    setActiveBlockId(id);
  }, []);

  // Fixed handleBlockChange to prevent backwards text input
  const handleBlockChange = useCallback((id: string, content: string) => {
    // Save cursor position before updating content
    saveCursorPosition(id);
    
    // Update block content
    setBlocks((prev) => 
      prev.map((block) => (block.id === id ? { ...block, content } : block))
    );
    
    // Schedule restoration of cursor position after React updates the DOM
    setTimeout(() => {
      restoreCursorPosition(id);
    }, 0);
  }, []);

  const addBlockAfter = useCallback((id: string, type: string = "paragraph") => {
    const newBlock = createEmptyBlock(type);

    setBlocks((prev) => {
      const index = prev.findIndex((block) => block.id === id);
      if (index === -1) return [...prev, newBlock];

      const updated = [...prev];
      updated.splice(index + 1, 0, newBlock);
      return updated;
    });

    // Focus new block after render
    setTimeout(() => {
      const newBlockElement = document.getElementById(newBlock.id);
      if (newBlockElement) {
        newBlockElement.focus();
        setActiveBlockId(newBlock.id);
      }
    }, 0);

    return newBlock.id;
  }, []);

  const removeBlock = useCallback((id: string) => {
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
  }, [blocks]);

  // Keyboard handling
  const handleBlockKeyDown = useCallback((
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
  }, [blocks, addBlockAfter]);

  // Block formatting
  const toggleBlockFormat = useCallback((format: string) => {
    if (!activeBlockId) return;

    setBlocks((prev) =>
      prev.map((block) =>
        block.id === activeBlockId ? { ...block, type: format } : block
      )
    );
  }, [activeBlockId]);

  const setAlignment = useCallback((alignment: "left" | "center" | "right") => {
    if (!activeBlockId) return;

    setBlocks((prev) =>
      prev.map((block) =>
        block.id === activeBlockId ? { ...block, alignment } : block
      )
    );
  }, [activeBlockId]);

  // Image handling
  const handleImageUpload = useCallback(async (onImageUpload: (file: File) => Promise<string>) => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();

    // We need to set up the onchange handler
    fileInputRef.current.onchange = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      
      if (!files || files.length === 0 || !activeBlockId) return;
      
      const file = files[0];

      // Create new image block after the active block
      const newBlockId = addBlockAfter(activeBlockId, "image");

      // Mark as uploading
      setUploadingImages((prev) => ({ ...prev, [newBlockId]: true }));

      try {
        const imageUrl = await onImageUpload(file);

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
  }, [activeBlockId, addBlockAfter, removeBlock]);

  // Selection formatting
  const formatSelectedText = useCallback((format: "bold" | "italic" | "link") => {
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
  }, [selectionRange, activeBlockId]);

  // Find first image in the content
  const findFirstImage = useCallback(() => {
    const imageBlock = blocks.find((block) => block.type === "image");
    return imageBlock?.content || null;
  }, [blocks]);

  return {
    blocks,
    setBlocks,
    activeBlockId,
    setActiveBlockId,
    uploadingImages,
    selectionActive,
    selectionRange,
    editorRef,
    fileInputRef,
    selectionToolbarRef,
    registerBlockRef,
    handleBlockClick,
    handleBlockChange,
    addBlockAfter,
    removeBlock,
    handleBlockKeyDown,
    toggleBlockFormat,
    setAlignment,
    handleImageUpload,
    formatSelectedText,
    findFirstImage
  };
}