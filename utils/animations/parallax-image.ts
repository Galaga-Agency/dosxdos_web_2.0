import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Creates a parallax effect for the given element
 * @param containerRef - Reference to the container element
 * @param targetRef - Reference to the element that will move
 * @param options - Configuration options for the parallax effect
 */
export const setupParallax = (
  containerRef: React.RefObject<HTMLElement>,
  targetRef: React.RefObject<HTMLElement>,
  options: {
    intensity?: number; // How intense the parallax effect should be (0-1)
    scrubAmount?: number; // How smooth the scrubbing should be (higher = smoother)
    start?: string; // ScrollTrigger start position
    end?: string; // ScrollTrigger end position
    delay?: number; // Delay before initializing (useful for ensuring DOM is ready)
    markers?: boolean; // Show ScrollTrigger markers (for debugging)
  } = {}
) => {
  // Default options
  const {
    intensity = 0.3,
    scrubAmount = 0.8,
    start = "top top",
    end = "bottom top",
    delay = 100,
    markers = false,
  } = options;

  // Setup function that creates the parallax effect
  const createParallaxEffect = () => {
    if (!containerRef.current || !targetRef.current) return;

    // Kill any existing ScrollTrigger instances for this container to prevent duplicates
    const existingInstances = ScrollTrigger.getAll().filter(
      (instance) => instance.vars.trigger === containerRef.current
    );
    existingInstances.forEach((instance) => instance.kill());

    // Create a new timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start,
        end,
        scrub: scrubAmount,
        markers,
        invalidateOnRefresh: true, // Important for handling resize events
      },
    });

    // Add the parallax animation - move target element as we scroll
    tl.fromTo(
      targetRef.current,
      {
        y: 0,
      },
      {
        y: () =>
          containerRef.current
            ? -containerRef.current.offsetHeight * intensity
            : 0,
        ease: "none",
      }
    );

    return () => {
      // Cleanup function that kills the ScrollTrigger
      if (containerRef.current) {
        ScrollTrigger.getAll().forEach((instance) => {
          if (instance.vars.trigger === containerRef.current) {
            instance.kill();
          }
        });
      }
    };
  };

  // Set up parallax after a short delay to ensure proper DOM rendering
  const timer = setTimeout(createParallaxEffect, delay);

  // Return cleanup function
  return () => {
    clearTimeout(timer);
    if (containerRef.current) {
      ScrollTrigger.getAll().forEach((instance) => {
        if (instance.vars.trigger === containerRef.current) {
          instance.kill();
        }
      });
    }
  };
};

/**
 * Hook for creating a parallax effect
 * @param containerRef - Reference to the container element
 * @param targetRef - Reference to the element that will move
 * @param options - Configuration options for the parallax effect
 */
export const useParallax = (
  containerRef: React.RefObject<HTMLElement>,
  targetRef: React.RefObject<HTMLElement>,
  options: Parameters<typeof setupParallax>[2] = {}
) => {
  // Set up parallax effect on mount and cleanup on unmount
  React.useEffect(() => {
    // Set up parallax effect
    const cleanup = setupParallax(containerRef, targetRef, options);

    // Set up window resize handler to recompute parallax
    const handleResize = () => {
      cleanup();
      setupParallax(containerRef, targetRef, options);
    };

    window.addEventListener("resize", handleResize);

    // Clean up function
    return () => {
      cleanup();
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef, targetRef, options]);
};
