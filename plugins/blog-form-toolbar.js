import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical';
import { $wrapNodes } from '@lexical/selection';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import { $createListItemNode, $createListNode } from '@lexical/list';
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';
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
  Minus 
} from 'lucide-react';

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [activeFormat, setActiveFormat] = React.useState({
    bold: false,
    italic: false,
    underline: false,
  });
  
  // Update format state based on selection
  React.useEffect(() => {
    const updateFormat = () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        setActiveFormat({
          bold: selection.hasFormat('bold'),
          italic: selection.hasFormat('italic'),
          underline: selection.hasFormat('underline'),
        });
      }
    };
    
    // Register to selection changes
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateFormat();
      });
    });
  }, [editor]);
  
  // Format text
  const formatText = (format) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };
  
  // Create heading
  const createHeading = (level) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $wrapNodes(selection, () => $createHeadingNode(level));
      }
    });
  };
  
  // Create quote
  const createQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $wrapNodes(selection, () => $createQuoteNode());
      }
    });
  };
  
  // Insert image
  const insertImage = () => {
    // This is handled by the ImagesPlugin
    // Just trigger a custom command to open file dialog
    editor.dispatchCommand('INSERT_IMAGE_COMMAND', undefined);
  };
  
  // Insert horizontal rule
  const insertSeparator = () => {
    editor.dispatchCommand('INSERT_SEPARATOR_COMMAND', undefined);
  };
  
  // Set alignment
  const setAlignment = (alignment) => {
    editor.dispatchCommand('FORMAT_ELEMENT_COMMAND', alignment);
  };

  return (
    <div className="rich-text-editor__toolbar">
      {/* Text formats */}
      <div className="rich-text-editor__toolbar-group">
        <button
          type="button"
          onClick={() => editor.dispatchCommand('CLEAR_EDITOR_COMMAND', undefined)}
          className="rich-text-editor__toolbar-btn"
          title="Texto normal"
        >
          <span className="rich-text-editor__toolbar-text">P</span>
        </button>
        <button
          type="button"
          onClick={() => createHeading('h1')}
          className="rich-text-editor__toolbar-btn"
          title="Título 1"
        >
          <Heading1 size={18} />
        </button>
        <button
          type="button"
          onClick={() => createHeading('h2')}
          className="rich-text-editor__toolbar-btn"
          title="Título 2"
        >
          <Heading2 size={18} />
        </button>
      </div>

      {/* Alignment */}
      <div className="rich-text-editor__toolbar-group">
        <button
          type="button"
          onClick={() => setAlignment('left')}
          className="rich-text-editor__toolbar-btn"
          title="Alinear a la izquierda"
        >
          <AlignLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => setAlignment('center')}
          className="rich-text-editor__toolbar-btn"
          title="Centrar"
        >
          <AlignCenter size={16} />
        </button>
        <button
          type="button"
          onClick={() => setAlignment('right')}
          className="rich-text-editor__toolbar-btn"
          title="Alinear a la derecha"
        >
          <AlignRight size={16} />
        </button>
      </div>

      {/* Text formatting */}
      <div className="rich-text-editor__toolbar-group">
        <button
          type="button"
          onClick={() => formatText('bold')}
          className={`rich-text-editor__toolbar-btn ${activeFormat.bold ? 'is-active' : ''}`}
          title="Negrita"
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => formatText('italic')}
          className={`rich-text-editor__toolbar-btn ${activeFormat.italic ? 'is-active' : ''}`}
          title="Cursiva"
        >
          <Italic size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.dispatchCommand('TOGGLE_LINK_COMMAND', undefined)}
          className="rich-text-editor__toolbar-btn"
          title="Enlace"
        >
          <LinkIcon size={16} />
        </button>
      </div>

      {/* List formats */}
      <div className="rich-text-editor__toolbar-group">
        <button
          type="button"
          onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
          className="rich-text-editor__toolbar-btn"
          title="Lista de viñetas"
        >
          <List size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
          className="rich-text-editor__toolbar-btn"
          title="Lista numerada"
        >
          <ListOrdered size={16} />
        </button>
        <button
          type="button"
          onClick={createQuote}
          className="rich-text-editor__toolbar-btn"
          title="Cita"
        >
          <Quote size={16} />
        </button>
      </div>

      {/* Special elements */}
      <div className="rich-text-editor__toolbar-group">
        <button
          type="button"
          onClick={insertImage}
          className="rich-text-editor__toolbar-btn"
          title="Insertar imagen"
        >
          <ImageIcon size={16} />
        </button>
        <button
          type="button"
          onClick={insertSeparator}
          className="rich-text-editor__toolbar-btn"
          title="Insertar separador"
        >
          <Minus size={16} />
        </button>
      </div>
    </div>
  );
}