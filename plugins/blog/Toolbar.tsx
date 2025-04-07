import React, { useCallback, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  ElementFormatType,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import {
  $createHeadingNode,
  $isHeadingNode,
  HeadingTagType,
} from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  $isListNode,
  ListNode,
} from "@lexical/list";
import { $isQuoteNode, $createQuoteNode } from "@lexical/rich-text";
import { $createImageNode } from "@/nodes/image";
import { INSERT_IMAGE_COMMAND } from "./Images";
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaLink, FaImage, FaListUl, FaListOl, FaQuoteLeft, FaAlignLeft, FaAlignCenter, FaAlignRight } from "react-icons/fa";

export function ToolbarPlugin({ onImageUpload }: { onImageUpload?: (file: File) => Promise<string> } = {}) {
  const [editor] = useLexicalComposerContext();
  const [activeStyles, setActiveStyles] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    highlight: false,
    headingLevel: null as number | null,
    isLink: false,
    isList: false,
    isOrderedList: false,
    isQuote: false,
    alignment: null as ElementFormatType | null,
  });

  // Track a stable reference to the active styles object
  const activeStylesRef = React.useRef(activeStyles);
  activeStylesRef.current = activeStyles;

  // Update toolbar state based on selection
  const updateToolbar = useCallback(() => {
    const selection = editor.getEditorState().read(() => $getSelection());
    
    if (!$isRangeSelection(selection)) {
      return;
    }

    editor.getEditorState().read(() => {
      // Check text format
      const bold = selection.hasFormat('bold');
      const italic = selection.hasFormat('italic');
      const underline = selection.hasFormat('underline');
      const strikethrough = selection.hasFormat('strikethrough');
      const highlight = selection.hasFormat('highlight');
      
      // Block level formatting
      let headingLevel = null;
      let isLink = false;
      let isList = false;
      let isOrderedList = false;
      let isQuote = false;
      let alignment = null;
      
      const anchorNode = selection.anchor.getNode();
      let element = anchorNode;
      
      // Traverse up to check for container formats
      while (element) {
        if ($isHeadingNode(element)) {
          const tag = element.getTag();
          headingLevel = parseInt(tag.slice(1));
          break;
        }
        if ($isLinkNode(element)) {
          isLink = true;
          break;
        }
        if ($isListNode(element)) {
          isList = true;
          isOrderedList = element.getListType() === 'number';
          break;
        }
        if ($isQuoteNode(element)) {
          isQuote = true;
          break;
        }
        
        // Move up the tree
        const parent = element.getParent();
        if (!parent) {
          break;
        }
        element = parent;
      }
      
      // Check for alignment
      const format = anchorNode.getFormat() || (anchorNode.getParent() && anchorNode.getParent()?.getFormat());
      if (format) {
        alignment = format as any;
      }
      
      // Only update if something changed - avoid re-renders
      if (
        activeStylesRef.current.bold !== bold ||
        activeStylesRef.current.italic !== italic ||
        activeStylesRef.current.underline !== underline ||
        activeStylesRef.current.strikethrough !== strikethrough ||
        activeStylesRef.current.highlight !== highlight ||
        activeStylesRef.current.headingLevel !== headingLevel ||
        activeStylesRef.current.isLink !== isLink ||
        activeStylesRef.current.isList !== isList ||
        activeStylesRef.current.isOrderedList !== isOrderedList ||
        activeStylesRef.current.isQuote !== isQuote ||
        activeStylesRef.current.alignment !== alignment
      ) {
        setActiveStyles({
          bold,
          italic,
          underline,
          strikethrough,
          highlight,
          headingLevel,
          isLink,
          isList,
          isOrderedList,
          isQuote,
          alignment,
        });
      }
    });
  }, [editor]);
  
  // Register for selection changes
  useEffect(() => {
    // Initial update
    updateToolbar();
    
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        updateToolbar();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, updateToolbar]);
  
  // Text formatting functions
  const formatText = useCallback(
    (format: string) => {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, format as any);
    },
    [editor]
  );
  
  // Heading functions
  const formatHeading = useCallback(
    (level: number) => {
      editor.update(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;

        const headingTag = `h${level}` as HeadingTagType;
        $setBlocksType(selection, () => {
          if (activeStyles.headingLevel === level) {
            return $createParagraphNode();
          }
          return $createHeadingNode(headingTag);
        });
      });
    },
    [editor, activeStyles.headingLevel]
  );

  // Paragraph function
  const formatParagraph = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;
      $setBlocksType(selection, () => $createParagraphNode());
    });
  }, [editor]);

  // Link functions
  const insertLink = useCallback(() => {
    if (activeStyles.isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    } else {
      const url = window.prompt('Enter URL', 'https://');
      if (url) {
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
      }
    }
  }, [editor, activeStyles.isLink]);

  // List functions
  const formatBulletList = useCallback(() => {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  }, [editor]);

  const formatNumberedList = useCallback(() => {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
  }, [editor]);

  // Quote function
  const formatQuote = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;
      
      if (activeStyles.isQuote) {
        $setBlocksType(selection, () => $createParagraphNode());
      } else {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
  }, [editor, activeStyles.isQuote]);

  // Alignment functions
  const formatAlignment = useCallback((alignment: ElementFormatType) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment);
  }, [editor]);

  // Image insert
  const insertImage = useCallback(() => {
    if (!onImageUpload) {
      alert('Image upload function not provided');
      return;
    }

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        try {
          const url = await onImageUpload(file);
          
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              const imageNode = $createImageNode({
                src: url,
                altText: file.name || 'Blog image'
              });
              selection.insertNodes([imageNode]);
            }
          });
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('Failed to upload image. Please try again.');
        }
      }
      
      document.body.removeChild(input);
    };
    
    document.body.appendChild(input);
    input.click();
  }, [editor, onImageUpload]);

  // Check for specific formatting bugs in this console.log
  useEffect(() => {
    console.log("Active Styles:", activeStyles);
  }, [activeStyles]);

  return (
    <div className="rich-text-editor__toolbar">
      {/* Text block type */}
      <div className="rich-text-editor__toolbar-group">
        <button
          type="button"
          className={`rich-text-editor__toolbar-btn ${!activeStyles.headingLevel ? 'is-active' : ''}`}
          onClick={formatParagraph}
          title="Paragraph"
        >
          <span className="rich-text-editor__toolbar-text">P</span>
        </button>
        <button
          type="button"
          className={`rich-text-editor__toolbar-btn ${activeStyles.headingLevel === 1 ? 'is-active' : ''}`}
          onClick={() => formatHeading(1)}
          title="Heading 1"
        >
          <span className="rich-text-editor__toolbar-text">H1</span>
        </button>
        <button
          type="button"
          className={`rich-text-editor__toolbar-btn ${activeStyles.headingLevel === 2 ? 'is-active' : ''}`}
          onClick={() => formatHeading(2)}
          title="Heading 2"
        >
          <span className="rich-text-editor__toolbar-text">H2</span>
        </button>
        <button
          type="button"
          className={`rich-text-editor__toolbar-btn ${activeStyles.headingLevel === 3 ? 'is-active' : ''}`}
          onClick={() => formatHeading(3)}
          title="Heading 3"
        >
          <span className="rich-text-editor__toolbar-text">H3</span>
        </button>
      </div>
      
      {/* Text formatting */}
      <div className="rich-text-editor__toolbar-group">
        <button
          type="button"
          className={`rich-text-editor__toolbar-btn ${activeStyles.bold ? 'is-active' : ''}`}
          onClick={() => formatText('bold')}
          title="Bold"
        >
          <FaBold />
        </button>
        <button
          type="button"
          className={`rich-text-editor__toolbar-btn ${activeStyles.italic ? 'is-active' : ''}`}
          onClick={() => formatText('italic')}
          title="Italic"
        >
          <FaItalic />
        </button>
        <button
          type="button"
          className={`rich-text-editor__toolbar-btn ${activeStyles.underline ? 'is-active' : ''}`}
          onClick={() => formatText('underline')}
          title="Underline"
        >
          <FaUnderline />
        </button>
        <button
          type="button"
          className={`rich-text-editor__toolbar-btn ${activeStyles.strikethrough ? 'is-active' : ''}`}
          onClick={() => formatText('strikethrough')}
          title="Strikethrough"
        >
          <FaStrikethrough />
        </button>
      </div>
      
      {/* Lists and quotes */}
      <div className="rich-text-editor__toolbar-group">
        <button
          type="button"
          className={`rich-text-editor__toolbar-btn ${activeStyles.isList && !activeStyles.isOrderedList ? 'is-active' : ''}`}
          onClick={formatBulletList}
          title="Bullet List"
        >
          <FaListUl />
        </button>
        <button
          type="button"
          className={`rich-text-editor__toolbar-btn ${activeStyles.isOrderedList ? 'is-active' : ''}`}
          onClick={formatNumberedList}
          title="Numbered List"
        >
          <FaListOl />
        </button>
        <button
          type="button"
          className={`rich-text-editor__toolbar-btn ${activeStyles.isQuote ? 'is-active' : ''}`}
          onClick={formatQuote}
          title="Quote"
        >
          <FaQuoteLeft />
        </button>
      </div>
      
      {/* Alignment */}
      <div className="rich-text-editor__toolbar-group">
        <button
          type="button"
          className={`rich-text-editor__toolbar-btn ${!activeStyles.alignment || activeStyles.alignment === 'left' ? 'is-active' : ''}`}
          onClick={() => formatAlignment('left')}
          title="Align Left"
        >
          <FaAlignLeft />
        </button>
        <button
          type="button"
          className={`rich-text-editor__toolbar-btn ${activeStyles.alignment === 'center' ? 'is-active' : ''}`}
          onClick={() => formatAlignment('center')}
          title="Align Center"
        >
          <FaAlignCenter />
        </button>
        <button
          type="button"
          className={`rich-text-editor__toolbar-btn ${activeStyles.alignment === 'right' ? 'is-active' : ''}`}
          onClick={() => formatAlignment('right')}
          title="Align Right"
        >
          <FaAlignRight />
        </button>
      </div>
      
      {/* Links and images */}
      <div className="rich-text-editor__toolbar-group">
        <button
          type="button"
          className={`rich-text-editor__toolbar-btn ${activeStyles.isLink ? 'is-active' : ''}`}
          onClick={insertLink}
          title="Link"
        >
          <FaLink />
        </button>
        <button
          type="button"
          className="rich-text-editor__toolbar-btn"
          onClick={insertImage}
          title="Image"
        >
          <FaImage />
        </button>
      </div>
    </div>
  );
}