"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "./RichTextEditor.scss"; // Import SCSS here to ensure it's loaded

// Custom loading component that resembles the final editor
const EditorLoadingPlaceholder = () => (
  <div
    className="rich-text-editor-container"
    style={{
      opacity: 1,
      visibility: "visible",
    }}
  >
    <div className="rich-text-editor">
      <div
        className="toolbar"
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: "0.5rem",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          backgroundColor: "rgba(0, 0, 0, 0.03)",
          borderTopLeftRadius: "0.5rem",
          borderTopRightRadius: "0.5rem",
        }}
      >
        {/* Simulate toolbar buttons */}
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              style={{
                width: "2rem",
                height: "2rem",
                margin: "0.125rem",
                backgroundColor: "rgba(0, 0, 0, 0.08)",
                borderRadius: "0.25rem",
              }}
            />
          ))}
      </div>
      <div
        style={{
          padding: "1rem",
          minHeight: "250px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "rgba(0, 0, 0, 0.5)",
          fontWeight: "500",
        }}
      >
        <div>
          <div
            style={{
              width: "40px",
              height: "40px",
              margin: "0 auto 10px",
              borderRadius: "50%",
              border: "3px solid rgba(0, 0, 0, 0.1)",
              borderTopColor: "#3182ce",
              animation: "spin 1s linear infinite",
            }}
          />
          Loading editor...
        </div>
      </div>
    </div>
    <style jsx>{`
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);

// Import the editor with SSR disabled
const RichTextEditor = dynamic(() => import("./RichTextEditor"), {
  ssr: false,
  loading: () => <EditorLoadingPlaceholder />,
});

export default function RichTextEditorWrapper(props: any) {
  const [mounted, setMounted] = useState(false);
  const [cssLoaded, setCssLoaded] = useState(false);

  useEffect(() => {
    // Mark component as mounted
    setMounted(true);

    // Check if the CSS is loaded by looking for a specific class
    const checkCssLoaded = () => {
      const testEl = document.createElement("div");
      testEl.className = "rich-text-editor-container";
      document.body.appendChild(testEl);

      // Get the computed styles
      const styles = window.getComputedStyle(testEl);
      const hasBorder =
        styles.border !== "0px none rgb(0, 0, 0)" && styles.border !== "";

      document.body.removeChild(testEl);
      return hasBorder;
    };

    // Check immediately
    if (checkCssLoaded()) {
      setCssLoaded(true);
    } else {
      // If not loaded yet, check again after a delay
      const timer = setTimeout(() => {
        setCssLoaded(checkCssLoaded());
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  // Don't render anything until mounted and CSS is loaded or timeout
  if (!mounted) return <EditorLoadingPlaceholder />;

  return <RichTextEditor {...props} />;
}
