import React, { JSX } from 'react';
import { Trash2 } from 'lucide-react';
import {
  $createParagraphNode,
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  createCommand,
  DecoratorNode,
  LexicalCommand,
  LexicalNode,
  SerializedLexicalNode,
  Spread,
} from 'lexical';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $setBlocksType } from '@lexical/selection';

export interface ImagePayload {
  src: string;
  altText: string;
  caption?: string;
}

export type SerializedImageNode = Spread<
  {
    src: string;
    altText: string;
    caption?: string;
  },
  SerializedLexicalNode
>;

export const INSERT_IMAGE_COMMAND: LexicalCommand<ImagePayload> =
  createCommand('INSERT_IMAGE_COMMAND');

export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __altText: string;
  __caption?: string;

  static getType(): string {
    return 'image';
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(
      node.__src,
      node.__altText,
      node.__caption,
      node.__key,
    );
  }

  constructor(
    src: string,
    altText: string,
    caption?: string,
    key?: string,
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__caption = caption;
  }

  createDOM(): HTMLElement {
    const div = document.createElement('div');
    div.className = 'rich-text-editor__image-container';
    return div;
  }

  updateDOM(): false {
    return false;
  }

  setCaption(caption: string): void {
    const writable = this.getWritable();
    writable.__caption = caption;
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const node = $createImageNode({
      src: serializedNode.src,
      altText: serializedNode.altText,
      caption: serializedNode.caption,
    });
    return node;
  }

  exportJSON(): SerializedImageNode {
    return {
      src: this.__src,
      altText: this.__altText,
      caption: this.__caption,
      type: 'image',
      version: 1,
    };
  }

  decorate(): JSX.Element {
    if (this.__src === 'separator') {
      return <hr className="rich-text-editor__separator" />;
    }
    
    return <ImageComponent 
      src={this.__src}
      altText={this.__altText}
      caption={this.__caption}
      nodeKey={this.__key}
    />;
  }
}

function ImageComponent({
  src,
  altText,
  caption,
  nodeKey,
}: {
  src: string;
  altText: string;
  caption?: string;
  nodeKey: string;
}): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey);
  const [isResizing, setIsResizing] = React.useState<boolean>(false);
  const [captionText, setCaptionText] = React.useState(caption || '');
  
  const deleteImage = React.useCallback(() => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if (node) {
        node.remove();
      }
    });
  }, [editor, nodeKey]);
  
  const updateCaption = React.useCallback((e: React.ChangeEvent<HTMLDivElement>) => {
    const caption = e.target.textContent || '';
    setCaptionText(caption);
    
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if (node instanceof ImageNode) {
        node.setCaption(caption);
      }
    });
  }, [editor, nodeKey]);
  
  return (
    <figure className="rich-text-editor__image-container">
      <div className="rich-text-editor__image-wrapper">
        <img
          src={src}
          alt={altText}
          className="rich-text-editor__image"
          onClick={() => {
            setSelected(true);
          }}
        />
        {isSelected && (
          <button
            type="button"
            className="rich-text-editor__image-delete-btn"
            onClick={deleteImage}
            title="Eliminar imagen"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
      <figcaption
        contentEditable={true}
        suppressContentEditableWarning={true}
        className="rich-text-editor__image-caption"
        data-placeholder="Añadir descripción (opcional)"
        onInput={updateCaption}
      >
        {captionText}
      </figcaption>
    </figure>
  );
}

export function $createImageNode({
  src,
  altText,
  caption,
}: ImagePayload): ImageNode {
  return new ImageNode(src, altText, caption);
}

export function $isImageNode(node: LexicalNode): boolean {
  return node instanceof ImageNode;
}