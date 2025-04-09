import {
  EditorConfig,
  ElementNode,
  LexicalNode,
  NodeKey,
  SerializedElementNode,
} from "lexical";

export type SerializedImageNode = SerializedElementNode & {
  src: string;
  altText: string;
  width?: number;
  height?: number;
  caption?: string;
  alignment?: "left" | "center" | "right";
};

export class ImageNode extends ElementNode {
  __src: string;
  __altText: string;
  __width?: number;
  __height?: number;
  __caption?: string;
  __alignment?: "left" | "center" | "right";

  static getType(): string {
    return "image";
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(
      node.__src,
      node.__altText,
      node.__width,
      node.__height,
      node.__caption,
      node.__alignment,
      node.__key
    );
  }

  constructor(
    src: string,
    altText: string = "",
    width?: number,
    height?: number,
    caption?: string,
    alignment: "left" | "center" | "right" = "center",
    key?: NodeKey
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__width = width;
    this.__height = height;
    this.__caption = caption;
    this.__alignment = alignment;
  }

  createDOM(config: EditorConfig): HTMLElement {
    // Create a container div to provide proper alignment and styling
    const container = document.createElement("div");
    container.className = `editor-image-container editor-image-${
      this.__alignment || "center"
    }`;

    // Create the actual image element
    const image = document.createElement("img");
    image.src = this.__src;
    image.alt = this.__altText;

    if (this.__width) image.style.width = `${this.__width}px`;
    if (this.__height) image.style.height = `${this.__height}px`;

    image.className = "editor-image";
    container.appendChild(image);

    // Add caption if available
    if (this.__caption) {
      const captionEl = document.createElement("figcaption");
      captionEl.textContent = this.__caption;
      captionEl.className = "editor-image-caption";
      container.appendChild(captionEl);
    }

    return container;
  }

  updateDOM(prevNode: ImageNode, dom: HTMLElement): boolean {
    const image = dom.querySelector("img");
    if (!image) return false;

    // Update src and alt if they've changed
    if (this.__src !== prevNode.__src) {
      image.src = this.__src;
    }
    if (this.__altText !== prevNode.__altText) {
      image.alt = this.__altText;
    }

    // Update width and height if they've changed
    if (this.__width !== prevNode.__width) {
      image.style.width = this.__width ? `${this.__width}px` : "";
    }
    if (this.__height !== prevNode.__height) {
      image.style.height = this.__height ? `${this.__height}px` : "";
    }

    // Update alignment if it's changed
    if (this.__alignment !== prevNode.__alignment) {
      dom.className = `editor-image-container editor-image-${
        this.__alignment || "center"
      }`;
    }

    // Update caption if it's changed
    const caption = dom.querySelector(".editor-image-caption");
    if (this.__caption !== prevNode.__caption) {
      if (this.__caption) {
        if (caption) {
          caption.textContent = this.__caption;
        } else {
          const newCaption = document.createElement("figcaption");
          newCaption.textContent = this.__caption;
          newCaption.className = "editor-image-caption";
          dom.appendChild(newCaption);
        }
      } else if (caption) {
        caption.remove();
      }
    }

    return false;
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    return new ImageNode(
      serializedNode.src,
      serializedNode.altText,
      serializedNode.width,
      serializedNode.height,
      serializedNode.caption,
      serializedNode.alignment
    );
  }

  exportJSON(): SerializedImageNode {
    return {
      ...super.exportJSON(),
      type: "image",
      src: this.__src,
      altText: this.__altText,
      width: this.__width,
      height: this.__height,
      caption: this.__caption,
      alignment: this.__alignment,
    };
  }

  getSrc(): string {
    return this.__src;
  }

  getAltText(): string {
    return this.__altText;
  }

  getWidth(): number | undefined {
    return this.__width;
  }

  getHeight(): number | undefined {
    return this.__height;
  }

  getCaption(): string | undefined {
    return this.__caption;
  }

  getAlignment(): "left" | "center" | "right" {
    return this.__alignment || "center";
  }

  setSrc(src: string): void {
    const writable = this.getWritable();
    writable.__src = src;
  }

  setAltText(altText: string): void {
    const writable = this.getWritable();
    writable.__altText = altText;
  }

  setWidth(width?: number): void {
    const writable = this.getWritable();
    writable.__width = width;
  }

  setHeight(height?: number): void {
    const writable = this.getWritable();
    writable.__height = height;
  }

  setCaption(caption?: string): void {
    const writable = this.getWritable();
    writable.__caption = caption;
  }

  setAlignment(alignment: "left" | "center" | "right"): void {
    const writable = this.getWritable();
    writable.__alignment = alignment;
  }

  // We want images to be treated as block elements for better formatting
  isInline(): boolean {
    return false;
  }
}

export function $createImageNode(
  src: string,
  altText: string = "",
  width?: number,
  height?: number,
  caption?: string,
  alignment?: "left" | "center" | "right"
): ImageNode {
  return new ImageNode(src, altText, width, height, caption, alignment);
}

export function $isImageNode(
  node: LexicalNode | null | undefined
): node is ImageNode {
  return node instanceof ImageNode;
}
