import {
  DecoratorNode,
  EditorConfig,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  LexicalEditor
} from 'lexical';
import React from 'react';

export interface ImagePayload {
  src: string;
  altText: string;
  key?: NodeKey;
}

export interface SerializedImageNode extends SerializedLexicalNode {
  type: 'image';
  version: 1;
  src: string;
  altText: string;
}

// Simple component to render images
function ImageComponent({ src, altText }: { src: string; altText: string }) {
  return (
    <div className="rich-text-editor__image-container">
      <div className="rich-text-editor__image-wrapper">
        <img
          src={src}
          alt={altText}
          className="rich-text-editor__image"
        />
      </div>
    </div>
  );
}

export class ImageNode extends DecoratorNode<React.ReactElement> {
  __src: string;
  __altText: string;

  static getType(): string {
    return 'image';
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__altText, node.__key);
  }

  constructor(src: string, altText: string, key?: NodeKey) {
    super(key);
    this.__src = src;
    this.__altText = altText;
  }

  createDOM(config: EditorConfig): HTMLElement {
    const div = document.createElement('div');
    div.className = 'image-container';
    return div;
  }

  updateDOM(): boolean {
    return false;
  }

  getSrc(): string {
    return this.__src;
  }

  getAltText(): string {
    return this.__altText;
  }

  decorate(_editor: LexicalEditor): React.ReactElement {
    return <ImageComponent src={this.__src} altText={this.__altText} />;
  }

  exportJSON(): SerializedImageNode {
    return {
      type: 'image',
      version: 1,
      src: this.__src,
      altText: this.__altText,
    };
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    return new ImageNode(
      serializedNode.src,
      serializedNode.altText
    );
  }
}

export function $createImageNode({
  src,
  altText,
  key,
}: ImagePayload): ImageNode {
  return new ImageNode(src, altText, key);
}

export function $isImageNode(node: LexicalNode | null | undefined): node is ImageNode {
  return node instanceof ImageNode;
}