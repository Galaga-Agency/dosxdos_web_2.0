import React from "react";
import { NodeKey } from "lexical";
import "./DualImage.scss";

interface DualImageProps {
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
  nodeKey: NodeKey;
}

export default function DualImage({
  leftImage,
  rightImage,
  alignment,
  nodeKey,
}: DualImageProps) {
  return (
    <div className={`dual-image-wrapper align-${alignment}`}>
      <div className="dual-image-content">
        <div className="image-item left-image">
          <img src={leftImage.src} alt={leftImage.altText} />
          {leftImage.caption && (
            <div className="image-caption">{leftImage.caption}</div>
          )}
        </div>
        <div className="image-item right-image">
          <img src={rightImage.src} alt={rightImage.altText} />
          {rightImage.caption && (
            <div className="image-caption">{rightImage.caption}</div>
          )}
        </div>
      </div>
    </div>
  );
}
