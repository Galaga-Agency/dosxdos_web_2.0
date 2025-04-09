"use client";

import { useEffect } from "react";

interface ScrollRevealOptions {
  selector?: string;
  threshold?: number;
  rootMargin?: string;
  visibleClass?: string;
}

export const useScrollReveal = ({
  selector = ".reveal-on-scroll",
  threshold = 0.15,
  rootMargin = "0px 0px -100px 0px",
  visibleClass = "visible",
}: ScrollRevealOptions = {}) => {
  useEffect(() => {
    // Check if IntersectionObserver is available
    if (typeof IntersectionObserver === "undefined") {
      console.warn("IntersectionObserver not supported in this browser");
      return;
    }

    // Create the observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add the visible class when element enters viewport
            entry.target.classList.add(visibleClass);

            // Once it's visible, we don't need to observe it anymore
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    // Find all elements to observe
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    // Cleanup function to disconnect observer
    return () => {
      observer.disconnect();
    };
  }, [selector, threshold, rootMargin, visibleClass]);
};

// Usage example:
// 1. Add the 'reveal-on-scroll' class to elements you want to animate in
// 2. For different entrance animations, use modifiers:
//    - 'reveal-on-scroll--left' (enters from left)
//    - 'reveal-on-scroll--right' (enters from right)
//    - 'reveal-on-scroll--stagger' (staggers entrance of child elements)
//
// In your component:
// useScrollReveal(); // Uses default settings
// or
// useScrollReveal({ threshold: 0.25, selector: '.my-custom-reveal' });
