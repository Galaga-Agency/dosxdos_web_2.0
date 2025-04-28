import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "@/plugins";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

// Store all ScrollTrigger instances for cleanup
const scrollTriggerInstances: any[] = [];

// Helper to safely add ScrollTrigger instances to our cleanup array
const trackScrollTrigger = (instance: globalThis.ScrollTrigger) => {
  scrollTriggerInstances.push(instance);
  return instance;
};

// Function to clean up all animations when navigating away
export function cleanupNotFoundAnimations() {
  // Kill all tracked ScrollTrigger instances
  scrollTriggerInstances.forEach((trigger) => {
    if (trigger) trigger.kill();
  });

  // Clear the array
  scrollTriggerInstances.length = 0;
}

// Animation interface for 404 page elements
export interface NotFoundAnimElements {
  container?: HTMLElement;
  title?: HTMLHeadingElement;
  subtitle?: HTMLParagraphElement;
  number?: HTMLDivElement;
  image?: HTMLDivElement;
  cta?: HTMLDivElement;
}

// Character animation helper for the title
export const charAnimation = (element: HTMLElement) => {
  if (!element) return;

  try {
    // Split text into characters
    const splitText = new SplitText(element, { type: "chars, words" });
    const chars = splitText.chars;

    if (!chars || chars.length === 0) {
      // Fallback if splitting fails
      return gsap.fromTo(
        element,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 }
      );
    }

    // Create timeline for characters
    const tl = gsap.timeline();

    // Animate each character
    tl.fromTo(
      chars,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.02,
        ease: "power3.out",
      }
    );

    // Animate the highlight underline if present
    const highlight = element.querySelector(".highlight");
    if (highlight) {
      tl.fromTo(
        highlight.querySelector("::after") || highlight,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );
    }

    return tl;
  } catch (error) {
    console.error("Error in charAnimation:", error);

    // Fallback animation if SplitText fails
    return gsap.fromTo(
      element,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7 }
    );
  }
};

// Mobile detection helper
const isMobile = () => {
  if (typeof window !== "undefined") {
    return window.innerWidth < 768;
  }
  return false;
};

// Initialize all 404 page animations
export const initNotFoundAnimations = ({
  container,
  title,
  subtitle,
  number,
  image,
  cta,
}: NotFoundAnimElements) => {
  // Clean up any existing animations first
  cleanupNotFoundAnimations();

  // Check if we're on mobile
  const mobile = isMobile();

  // Create master timeline
  const masterTl = gsap.timeline({
    defaults: { ease: "power3.out" },
  });

  // Number animation
  if (number) {
    masterTl.fromTo(
      number,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      0.2
    );
  }

  // Title animation using charAnimation
  if (title) {
    masterTl.add(() => {
      charAnimation(title);
    }, 0.4);
  }

  // Subtitle animation
  if (subtitle) {
    masterTl.fromTo(
      subtitle,
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
      },
      0.7
    );
  }

  // CTA buttons animation - Handle each button separately
  if (cta) {
    // Target buttons specifically by class to avoid issues
    const backButton = document.querySelector(".not-found__back-button");
    const homeButton = document.querySelector(".not-found__home-button");

    if (backButton) {
      masterTl.fromTo(
        backButton,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        0.9
      );
    }

    if (homeButton) {
      masterTl.fromTo(
        homeButton,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        1.0
      );
    }
  }

  // Image animation
  if (image) {
    masterTl.fromTo(
      image,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      0.3
    );

    // Logo animation
    const logo = document.querySelector(".not-found__logo");
    if (logo) {
      masterTl.fromTo(
        logo,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
        },
        0.5
      );

      // Logo image animation
      const logoImage = document.querySelector(".not-found__logo-image");
      if (logoImage) {
        masterTl.fromTo(
          logoImage,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "back.out(1.5)",
          },
          0.6
        );
      }
    }

    // Corner animations
    const corners = document.querySelectorAll(".not-found__image-corner");
    if (corners && corners.length > 0) {
      masterTl.fromTo(
        corners,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.08,
        },
        0.7
      );
    }
  }

  // Background lines animation
  if (container) {
    const bgLines = document.querySelectorAll(".not-found__bg-line");
    if (bgLines && bgLines.length > 0) {
      masterTl.fromTo(
        bgLines,
        { opacity: 0, scaleX: 0 },
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.8,
          stagger: 0.3,
          ease: "power2.out",
        },
        0.6
      );
    }
  }

  // Add hover effects after animations
  if (container) {
    const imageFrame = document.querySelector(".not-found__image-frame");
    if (imageFrame) {
      // Subtle pulse animation for the frame
      masterTl.add(() => {
        gsap.to(imageFrame, {
          boxShadow: "0 10px 30px rgba(230, 51, 34, 0.1)",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }, 1.2);
    }
  }

  // Subtle floating animation for background lines
  if (container) {
    const bgLine1 = document.querySelector(".not-found__bg-line.line-1");
    const bgLine2 = document.querySelector(".not-found__bg-line.line-2");

    if (bgLine1) {
      gsap.to(bgLine1, {
        x: mobile ? 5 : 10,
        y: mobile ? -3 : -5,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });
    }

    if (bgLine2) {
      gsap.to(bgLine2, {
        x: mobile ? -5 : -10,
        y: mobile ? 3 : 5,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5,
      });
    }
  }

  return masterTl;
};
