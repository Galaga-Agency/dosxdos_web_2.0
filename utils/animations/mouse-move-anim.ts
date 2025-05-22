import { gsap } from "gsap";

/**
 * Sets up mouse move animations for all location cards with default settings
 * @returns Cleanup function to remove all event listeners
 */
export const setupMouseMoveAnimation = (): (() => void) => {
  const elements = document.querySelectorAll(".location-card");
  const cleanupFunctions: (() => void)[] = [];

  elements.forEach((element) => {
    if (!(element instanceof HTMLElement)) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const tiltX = (y - centerY) / 20;
      const tiltY = (centerX - x) / 20;

      gsap.to(element, {
        rotationX: tiltX,
        rotationY: tiltY,
        transformPerspective: 1000,
        duration: 0.5,
        ease: "power2.out",
      });

      const highlight = element.querySelector(".location-card__highlight");
      if (highlight) {
        gsap.to(highlight, {
          x: x,
          y: y,
          opacity: 0.15,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      const highlight = element.querySelector(".location-card__highlight");
      if (highlight) {
        gsap.to(highlight, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    cleanupFunctions.push(() => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    });
  });

  return () => {
    cleanupFunctions.forEach((cleanup) => cleanup());
  };
};
