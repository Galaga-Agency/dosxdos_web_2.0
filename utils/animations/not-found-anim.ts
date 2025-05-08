"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "@/plugins";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Store all animations for cleanup
const activeAnimations: any[] = [];

// Function to clean up all animations when navigating away
export function cleanupNotFoundAnimations() {
  // Kill all active animations
  activeAnimations.forEach((animation) => {
    if (animation && animation.kill) {
      animation.kill();
    }
  });

  // Clear the array
  activeAnimations.length = 0;

  // Kill any remaining animations
  gsap.killTweensOf(".not-found, .not-found *");
}

// Animation interface for 404 page elements
export interface NotFoundAnimElements {
  container?: HTMLElement;
  title?: HTMLHeadingElement;
  subtitle?: HTMLHeadingElement;
  content?: HTMLDivElement;
  cta?: HTMLDivElement;
}

// Character animation with SplitText
export const charAnimation = (element: HTMLElement) => {
  if (!element || typeof window === "undefined") return null;

  try {
    // Split text into characters
    const splitText = new SplitText(element, { type: "chars" });
    const chars = splitText.chars;

    if (!chars || chars.length === 0) {
      // Fallback if splitting fails
      return gsap.fromTo(
        element,
        { opacity: 0, visibility: "visible" },
        { opacity: 1, visibility: "visible", duration: 0.7 }
      );
    }

    // Set element to visible first
    gsap.set(element, { visibility: "visible" });

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
        stagger: 0.03,
        ease: "power3.out",
      }
    );

    return tl;
  } catch (error) {
    console.error("Error in charAnimation:", error);

    // Fallback animation if SplitText fails
    return gsap.fromTo(
      element,
      { opacity: 0, visibility: "visible" },
      { opacity: 1, visibility: "visible", duration: 0.7 }
    );
  }
};

// Initialize all 404 page animations
export const initNotFoundAnimations = ({
  container,
  title,
  subtitle,
  content,
  cta,
}: NotFoundAnimElements) => {
  // Clean up any existing animations first
  cleanupNotFoundAnimations();

  // Create master timeline
  const masterTl = gsap.timeline({
    defaults: { ease: "power3.out" },
    onComplete: () => {
      // Add to active animations for later cleanup
      activeAnimations.push(masterTl);
    },
  });

  // Start by showing the container
  if (container) {
    masterTl.to(
      container,
      {
        opacity: 1,
        duration: 0.6,
      },
      0
    );
  }

  // Main content animation
  if (content) {
    masterTl.to(
      content,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
      },
      0.2
    );
  }

  // Title animation - using character splitting animation
  if (title) {
    masterTl.add(() => {
      charAnimation(title);
    }, 0.4);
  }

  // Subtitle animation
  if (subtitle) {
    masterTl.to(
      subtitle,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      0.6
    );
  }

  // CTA buttons animation
  if (cta) {
    masterTl.to(
      cta,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
      },
      0.8
    );
  }

  return masterTl;
};
