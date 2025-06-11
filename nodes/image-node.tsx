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
    // Create a wrapper div for the entire image component
    const wrapper = document.createElement("div");
    wrapper.className = `editor-image-wrapper editor-image-${
      this.__alignment || "center"
    }`;
    wrapper.style.cssText = `
      position: relative;
      margin: 24px 0;
      width: 100%;
    `;

    // Create the image container
    const container = document.createElement("div");
    container.className = "editor-image-container";
    container.style.cssText = `
      position: relative;
      display: inline-block;
      width: 100%;
    `;

    // Create the actual image element
    const image = document.createElement("img");
    image.src = this.__src;
    image.alt = this.__altText;
    image.className = "editor-image";
    image.style.cssText = `
      width: 100%;
      height: auto;
      display: block;
      border-radius: 8px;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    `;

    if (this.__width) image.style.width = `${this.__width}px`;
    if (this.__height) image.style.height = `${this.__height}px`;

    container.appendChild(image);

    // Create delete button with better styling
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "image-delete-btn";
    deleteBtn.title = "Eliminar imagen";
    deleteBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      </svg>
    `;

    // Apply extensive inline styles to make sure it works
    const applyDeleteButtonStyles = (opacity = "0") => {
      deleteBtn.style.cssText = `
        position: absolute !important;
        top: 8px !important;
        right: 8px !important;
        background: rgba(255, 255, 255, 0.95) !important;
        border: none !important;
        border-radius: 50% !important;
        padding: 8px !important;
        cursor: pointer !important;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
        transition: all 0.15s ease !important;
        z-index: 999 !important;
        width: 32px !important;
        height: 32px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        opacity: ${opacity} !important;
        visibility: ${opacity === "0" ? "hidden" : "visible"} !important;
        font-size: 14px !important;
        line-height: 1 !important;
        color: #e63322 !important;
      `;
    };

    // Initialize with hidden state
    applyDeleteButtonStyles("0");

    // Add hover functionality
    let hoverTimeout: any;

    wrapper.addEventListener("mouseenter", () => {
      clearTimeout(hoverTimeout);
      applyDeleteButtonStyles("1");
    });

    wrapper.addEventListener("mouseleave", () => {
      hoverTimeout = setTimeout(() => {
        applyDeleteButtonStyles("0");
      }, 100);
    });

    deleteBtn.addEventListener("mouseenter", () => {
      clearTimeout(hoverTimeout);
      deleteBtn.style.background = "white !important";
      deleteBtn.style.transform = "scale(1.1) !important";
    });

    deleteBtn.addEventListener("mouseleave", () => {
      deleteBtn.style.background = "rgba(255, 255, 255, 0.95) !important";
      deleteBtn.style.transform = "scale(1) !important";
    });

    // Add click handler for delete
    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Find the editor instance
      let element: any = wrapper;
      while (element && element.parentElement) {
        element = element.parentElement;
        if ((element as any).__lexicalEditor) {
          const editor = (element as any).__lexicalEditor;
          editor.update(() => {
            const currentNode = this;
            if (currentNode && typeof currentNode.remove === "function") {
              currentNode.remove();
            }
          });
          break;
        }
      }
    });

    container.appendChild(deleteBtn);
    wrapper.appendChild(container);

    // Add caption if available
    if (this.__caption) {
      const captionEl = document.createElement("figcaption");
      captionEl.textContent = this.__caption;
      captionEl.className = "editor-image-caption";
      captionEl.style.cssText = `
        margin-top: 8px !important;
        font-size: 0.875rem !important;
        color: rgba(0, 0, 0, 0.6) !important;
        font-style: italic !important;
        text-align: center !important;
        line-height: 1.4 !important;
      `;
      wrapper.appendChild(captionEl);
    }

    return wrapper;
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
