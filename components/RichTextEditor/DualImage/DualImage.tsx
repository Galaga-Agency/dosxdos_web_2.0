import React from "react";
import { NodeKey } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getNodeByKey } from "lexical";
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
  const [editor] = useLexicalComposerContext();

  const handleDelete = () => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if (node) {
        node.remove();
      }
    });
  };

  return (
    <div
      className={`dual-image-wrapper align-${alignment}`}
      onMouseEnter={(e) => {
        const btn = e.currentTarget.querySelector(
          ".dual-image-delete-btn"
        ) as HTMLElement;
        if (btn) {
          btn.style.opacity = "1";
          btn.style.visibility = "visible";
        }
      }}
      onMouseLeave={(e) => {
        const btn = e.currentTarget.querySelector(
          ".dual-image-delete-btn"
        ) as HTMLElement;
        if (btn) {
          btn.style.opacity = "0";
          btn.style.visibility = "hidden";
        }
      }}
    >
      <div className="dual-image-content">
        <button
          className="dual-image-delete-btn"
          onClick={handleDelete}
          type="button"
          title="Eliminar imágenes"
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "rgba(255, 255, 255, 0.95)",
            border: "none",
            borderRadius: "50%",
            padding: "8px",
            cursor: "pointer",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            transition: "all 0.15s ease",
            zIndex: 999,
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            visibility: "hidden",
            fontSize: "14px",
            lineHeight: 1,
            color: "#e63322",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "white";
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.95)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>

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
