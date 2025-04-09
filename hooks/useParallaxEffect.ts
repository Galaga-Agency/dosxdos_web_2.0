"use client";

import { useEffect } from "react";
import gsap from "gsap";

interface ParallaxOptions {
  intensity?: number;
  elements?: string;
  mouseOnly?: boolean;
}

export const useParallaxEffect = ({
  intensity = 0.03,
  elements = ".parallax",
  mouseOnly = false,
}: ParallaxOptions = {}) => {
  useEffect(() => {
    // Select all parallax elements
    const parallaxElements = document.querySelectorAll(elements);
    if (!parallaxElements.length) return;

    // Variables to track mouse position
    let mouseX = 0;
    let mouseY = 0;

    // Event handler for mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to center of screen
      mouseX = e.clientX - window.innerWidth / 2;
      mouseY = e.clientY - window.innerHeight / 2;

      // Apply parallax effect immediately in mouse-only mode
      if (mouseOnly) {
        applyParallaxEffect();
      }
    };

    // Function to apply parallax based on mouse position
    const applyParallaxEffect = () => {
      parallaxElements.forEach((el: Element) => {
        const parallaxItem = el as HTMLElement;

        // Get custom intensity from data attribute or use default
        const elementIntensity =
          parseFloat(parallaxItem.dataset.parallaxIntensity || "") || intensity;

        // Determine parallax direction from data attribute
        const invertX = parallaxItem.dataset.parallaxInvertX === "true";
        const invertY = parallaxItem.dataset.parallaxInvertY === "true";

        // Calculate movement (invert if specified)
        const moveX = mouseX * elementIntensity * (invertX ? -1 : 1);
        const moveY = mouseY * elementIntensity * (invertY ? -1 : 1);

        // Apply transform with GSAP
        gsap.to(parallaxItem, {
          x: moveX,
          y: moveY,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    // Setup render loop if not mouse-only mode
    let animationFrame: number;
    if (!mouseOnly) {
      const renderLoop = () => {
        applyParallaxEffect();
        animationFrame = requestAnimationFrame(renderLoop);
      };
      renderLoop();
    }

    // Add mouse event listener
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (!mouseOnly && animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [intensity, elements, mouseOnly]);
};

// Usage example:
// Just add the 'parallax' class to any element you want to move
// Add data-parallax-intensity="0.05" to customize the movement amount
// Add data-parallax-invert-x="true" or data-parallax-invert-y="true" to invert direction
//
// In your component:
// useParallaxEffect(); // Uses default settings
// or
// useParallaxEffect({ intensity: 0.05, elements: '.my-custom-parallax' });
