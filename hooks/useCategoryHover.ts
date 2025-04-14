import { useEffect, useRef } from "react";
import gsap from "gsap";

interface UseCategoryHoverOptions {
  blobSelector?: string;
  nameSelector?: string;
  primaryColor?: string;
  textColor?: string;
}

/**
 * Custom hook to handle category item hover animations
 */
export const useCategoryHover = (
  containerRef: React.RefObject<HTMLElement>,
  isActive: boolean,
  options: UseCategoryHoverOptions = {}
) => {
  const {
    blobSelector = ".category-blob",
    nameSelector = ".category-name",
    primaryColor = "#e63322",
    textColor = "#281528",
  } = options;

  // Store animations to clean up
  const animations = useRef<gsap.core.Timeline[]>([]);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const items = container.querySelectorAll(".category-item");

    // Clear previous animations
    animations.current.forEach((anim) => anim.kill());
    animations.current = [];

    items.forEach((item) => {
      const blob = item.querySelector(blobSelector) as HTMLElement;
      const name = item.querySelector(nameSelector) as HTMLElement;

      if (!blob || !name) return;

      // Create hover timeline for each item
      const tl = gsap.timeline({ paused: true });

      // Blob animation
      tl.to(
        blob,
        {
          scale: 1,
          opacity: 0.9,
          duration: 0.5,
          ease: "power2.out",
        },
        0
      );

      // Text color animation
      tl.to(
        name,
        {
          color: "#ffffff",
          duration: 0.3,
          ease: "power1.out",
        },
        0
      );

      // Background sliding animation
      tl.to(
        name.querySelector(":after") || name,
        {
          height: "100%",
          duration: 0.6,
          ease: "power2.out",
        },
        0
      );

      // Float animation for blob
      tl.to(
        blob,
        {
          y: -10,
          duration: 1.5,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        },
        0.2
      );

      // Store the timeline for cleanup
      animations.current.push(tl);

      // Add event listeners
      item.addEventListener("mouseenter", () => tl.play());
      item.addEventListener("mouseleave", () => tl.reverse());
    });

    // Cleanup function
    return () => {
      animations.current.forEach((anim) => anim.kill());
      animations.current = [];
    };
  }, [
    isActive,
    containerRef,
    blobSelector,
    nameSelector,
    primaryColor,
    textColor,
  ]);
};

export default useCategoryHover;
