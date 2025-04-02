"use client";

import { gsap } from "gsap";

interface MouseMoveAnimation {
  element: HTMLElement;
  highlightSelector: string;
  sensitivity?: number;
  highlightOpacity?: number;
  animationDuration?: number;
  resetDuration?: number;
}

/**
 * Sets up a mouse move animation with tilt effect and highlight
 * @param options Configuration options for the animation
 * @returns Cleanup function to remove event listeners
 */
export const setupMouseMoveAnimation = ({
  element,
  highlightSelector,
  sensitivity = 25,
  highlightOpacity = 0.1,
  animationDuration = 0.5,
  resetDuration = 0.6,
}: MouseMoveAnimation): (() => void) => {
  if (!element) return () => {};

  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = (y - centerY) / sensitivity;
    const tiltY = (centerX - x) / sensitivity;

    gsap.to(element, {
      rotationX: tiltX,
      rotationY: tiltY,
      transformPerspective: 1000,
      duration: animationDuration,
      ease: "power2.out",
    });

    const highlight = element.querySelector(highlightSelector);
    if (highlight) {
      gsap.to(highlight, {
        x: x,
        y: y,
        opacity: highlightOpacity,
        duration: animationDuration,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      rotationX: 0,
      rotationY: 0,
      duration: resetDuration,
      ease: "power2.out",
    });

    const highlight = element.querySelector(highlightSelector);
    if (highlight) {
      gsap.to(highlight, {
        opacity: 0,
        duration: resetDuration,
        ease: "power2.out",
      });
    }
  };

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);

  // Return cleanup function
  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
};
