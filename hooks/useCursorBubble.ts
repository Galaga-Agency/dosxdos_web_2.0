// hooks/useCursorBubble.ts
"use client";

import { useEffect, useRef } from "react";
import useDeviceDetect from "./useDeviceDetect";

interface CursorBubbleOptions {
  text?: string;
  backgroundColor?: string;
  activeBackgroundColor?: string; // For the active state
  textColor?: string;
  size?: number;
  enableOnMobile?: boolean;
}

/**
 * Custom hook to add a cursor bubble effect to elements
 * @param elementRefs Array of React refs to elements that should trigger the bubble
 * @param options Configuration options for the bubble
 */
const useCursorBubble = (
  elementRefs: (React.RefObject<HTMLElement> | null)[],
  options: CursorBubbleOptions = {}
) => {
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const { isMobile } = useDeviceDetect();

  const {
    text = "Ver más",
    backgroundColor = "#281528", // Default to black from your colors
    activeBackgroundColor = "#e8edec", // Default to secondary color from your palette
    textColor = "#281528", // Text color for the bubble
    size = 100,
    enableOnMobile = false,
  } = options;

  useEffect(() => {
    // Skip on server-side rendering or mobile (unless enabled)
    if (typeof window === "undefined" || (isMobile && !enableOnMobile)) return;

    // Create cursor bubble
    const bubble = document.createElement("div");
    bubble.className = "cursor-bubble";
    bubble.innerHTML = `<span>${text}</span>`;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    document.body.appendChild(bubble);
    bubbleRef.current = bubble;

    let mouseX = 0;
    let mouseY = 0;
    let bubbleX = 0;
    let bubbleY = 0;

    // Mouse move handler
    const mouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Animation loop
    const animate = () => {
      const speed = 0.2;
      bubbleX += (mouseX - bubbleX) * speed;
      bubbleY += (mouseY - bubbleY) * speed;

      if (bubble) {
        bubble.style.left = bubbleX + "px";
        bubble.style.top = bubbleY + "px";
      }

      requestAnimationFrame(animate);
    };

    // Hover handlers
    const handleMouseEnter = () => {
      bubble.classList.add("active");
    };

    const handleMouseLeave = () => {
      bubble.classList.remove("active");
    };

    // Add hover handlers to all provided element refs
    const addHoverHandlers = () => {
      elementRefs.forEach((ref) => {
        const element = ref?.current;
        if (element) {
          element.addEventListener("mouseenter", handleMouseEnter);
          element.addEventListener("mouseleave", handleMouseLeave);
        }
      });
    };

    // Initialize
    document.addEventListener("mousemove", mouseMove);
    animate();
    setTimeout(addHoverHandlers, 500); // Delay to ensure DOM is ready

    // Add CSS for the bubble if it doesn't exist
    if (!document.getElementById("cursor-bubble-styles")) {
      const styleEl = document.createElement("style");
      styleEl.id = "cursor-bubble-styles";
      styleEl.textContent = `
        .cursor-bubble {
          position: fixed;
          width: ${size}px;
          height: ${size}px;
          border-radius: 9999px;
          background-color: #281528;
          color: ${textColor};
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none;
          z-index: 500;
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
          transition-duration: 300ms;
          transition-property: transform, opacity;
        }
        .cursor-bubble.active {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
          background-color: ${activeBackgroundColor};
        }
        .cursor-bubble span {
          font-size: 1rem;
          font-weight: 500;
          text-align: center;
        }
      `;
      document.head.appendChild(styleEl);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", mouseMove);

      // Remove event listeners
      elementRefs.forEach((ref) => {
        const element = ref?.current;
        if (element) {
          element.removeEventListener("mouseenter", handleMouseEnter);
          element.removeEventListener("mouseleave", handleMouseLeave);
        }
      });

      // Remove bubble element
      if (bubble && document.body.contains(bubble)) {
        document.body.removeChild(bubble);
      }

      // Remove styles
      const styleEl = document.getElementById("cursor-bubble-styles");
      if (styleEl) {
        styleEl.remove();
      }
    };
  }, [
    elementRefs,
    isMobile,
    text,
    backgroundColor,
    activeBackgroundColor,
    textColor,
    size,
    enableOnMobile,
  ]);

  return bubbleRef;
};

export default useCursorBubble;
