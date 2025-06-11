import { DecoratorNode, LexicalNode, NodeKey } from "lexical";
import { JSX } from "react";
import DualImage from "@/components/RichTextEditor/DualImage/DualImage";

export interface DualImagePayload {
  leftImage: {
    src: string;
    altText: string;
    caption?: string;
  };
  rightImage: {
    src: string;
    altText: string;
    caption?: string;
  };
  alignment?: "left" | "center" | "right";
  key?: NodeKey;
}

export type SerializedDualImageNode = {
  leftImage: {
    src: string;
    altText: string;
    caption?: string;
  };
  rightImage: {
    src: string;
    altText: string;
    caption?: string;
  };
  alignment: "left" | "center" | "right";
  type: "dual-image";
  version: 1;
};

export class DualImageNode extends DecoratorNode<JSX.Element> {
  __leftImage: {
    src: string;
    altText: string;
    caption?: string;
  };
  __rightImage: {
    src: string;
    altText: string;
    caption?: string;
  };
  __alignment: "left" | "center" | "right";

  static getType(): string {
    return "dual-image";
  }

  static clone(node: DualImageNode): DualImageNode {
    return new DualImageNode(
      node.__leftImage,
      node.__rightImage,
      node.__alignment,
      node.__key
    );
  }

  constructor(
    leftImage: {
      src: string;
      altText: string;
      caption?: string;
    },
    rightImage: {
      src: string;
      altText: string;
      caption?: string;
    },
    alignment: "left" | "center" | "right" = "center",
    key?: NodeKey
  ) {
    super(key);
    this.__leftImage = leftImage;
    this.__rightImage = rightImage;
    this.__alignment = alignment;
  }

  exportJSON(): SerializedDualImageNode {
    return {
      leftImage: this.__leftImage,
      rightImage: this.__rightImage,
      alignment: this.__alignment,
      type: "dual-image",
      version: 1,
    };
  }

  static importJSON(serializedNode: SerializedDualImageNode): DualImageNode {
    const { leftImage, rightImage, alignment } = serializedNode;
    const node = $createDualImageNode(leftImage, rightImage, alignment);
    return node;
  }

  decorate(): JSX.Element {
    return (
      <DualImage
        leftImage={this.__leftImage}
        rightImage={this.__rightImage}
        alignment={this.__alignment}
        nodeKey={this.getKey()}
      />
    );
  }

  createDOM(): HTMLElement {
    const div = document.createElement("div");
    div.className = "dual-image-container";
    return div;
  }

  updateDOM(): false {
    return false;
  }

  isInline(): false {
    return false;
  }

  isKeyboardSelectable(): boolean {
    return true;
  }
}

export function $createDualImageNode(
  leftImage: {
    src: string;
    altText: string;
    caption?: string;
  },
  rightImage: {
    src: string;
    altText: string;
    caption?: string;
  },
  alignment: "left" | "center" | "right" = "center"
): DualImageNode {
  return new DualImageNode(leftImage, rightImage, alignment);
}

export function $isDualImageNode(
  node: LexicalNode | null | undefined
): node is DualImageNode {
  return node instanceof DualImageNode;
}
