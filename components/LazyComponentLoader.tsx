// components/LazyComponentLoader.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

interface LazyComponentLoaderProps {
  children: React.ReactNode;
  className?: string;
  placeholderHeight?: string;
  threshold?: number;
  rootMargin?: string;
  onVisible?: () => void; // New callback for when component becomes visible
}

const LazyComponentLoader: React.FC<LazyComponentLoaderProps> = ({
  children,
  className = "",
  placeholderHeight = "400px",
  threshold = 0.1,
  rootMargin = "100px 0px",
  onVisible,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !shouldRender) {
          setShouldRender(true);
          observer.disconnect();

          // Call onVisible callback after a short delay to ensure component is mounted
          if (onVisible) {
            setTimeout(onVisible, 100);
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [shouldRender, threshold, rootMargin, onVisible]);

  return (
    <div ref={containerRef} className={className}>
      {shouldRender ? (
        children
      ) : (
        <div
          style={{
            height: placeholderHeight,
            width: "100%",
            background: "rgba(0, 0, 0, 0.05)",
          }}
        />
      )}
    </div>
  );
};

export default LazyComponentLoader;
