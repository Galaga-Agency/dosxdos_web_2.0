"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "@/plugins";
import { refreshScrollTrigger } from "../scrolltrigger-config";

// Define interface for animation elements
export interface ContactPageAnimElements {
  subtitle?: HTMLElement | null;
  title?: HTMLElement | null;
  content?: HTMLElement | null;
  leftSection?: HTMLElement | null;
  rightSection?: HTMLElement | null;
  officesSection?: HTMLElement | null;
  officesGrid?: HTMLElement | null;
  socialCta?: HTMLElement | null;
}

// Register GSAP plugins if in browser environment
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Character animation with SplitText
export const charAnimation = (current: HTMLElement | null = null) => {
  if (!current || typeof window === "undefined") return null;

  console.log("Animating Characters for:", current);

  gsap.set(current, {
    visibility: "visible", // Ensure it's visible for the split to work
    opacity: 0, // But hidden visually
    perspective: 300,
  });

  // Create new SplitText instance
  const itemSplitted = new SplitText(current, {
    type: "chars",
  });

  // Make sure the split characters are visible (but the container might still be hidden)
  gsap.set(itemSplitted.chars, { opacity: 1 });

  // Animate the characters in
  const tl = gsap.timeline();
  tl.to(current, { opacity: 1, duration: 0.1 }) // First make the container visible
    .from(itemSplitted.chars, {
      duration: 1,
      x: 100,
      opacity: 0,
      stagger: 0.05,
      ease: "power3.out",
    });

  return tl;
};

// Main animation function
export const animateContactPage = ({
  subtitle,
  title,
  content,
  leftSection,
  rightSection,
  officesSection,
  officesGrid,
  socialCta,
}: ContactPageAnimElements) => {
  if (typeof window === "undefined") return null;

  console.log("Animating Contact Page");

  // Create main timeline
  const mainTl = gsap.timeline({
    defaults: { ease: "power3.out" },
    delay: 0.3,
  });

  // Subtitle animation
  if (subtitle) {
    mainTl.fromTo(
      subtitle,
      {
        opacity: 0,
        x: -50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
      },
      0
    );
  }

  // Title animation - directly applied to the title element
  if (title) {
    mainTl.add(() => {
      charAnimation(title);
    }, 0.3);
  }

  // Left section animation
  if (leftSection) {
    mainTl.fromTo(
      leftSection,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      0.6
    );
  }

  // Right section animation
  if (rightSection) {
    mainTl.fromTo(
      rightSection,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      0.8
    );
  }

  // Offices section animation
  if (officesSection) {
    ScrollTrigger.create({
      trigger: officesSection,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          officesSection,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          }
        );
      },
    });
  }

  // Offices grid animation
  if (officesGrid) {
    ScrollTrigger.create({
      trigger: officesGrid,
      start: "top 85%",
      once: true,
      onEnter: () => {
        const cards = officesGrid.querySelectorAll(".location-card");
        if (cards.length) {
          gsap.fromTo(
            cards,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.2,
              ease: "power2.out",
            }
          );
        }
      },
    });
  }

  // Social CTA section animation
  if (socialCta) {
    ScrollTrigger.create({
      trigger: socialCta,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          socialCta,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          }
        );
      },
    });
  }

  return mainTl;
};

// Initialize all contact page animations
export const initContactPageAnimations = (refs: ContactPageAnimElements) => {
  if (typeof window === "undefined") return;

  console.log("Initializing Contact Page Animations with refs:", refs);

  // Set initial states for animations
  if (refs.subtitle) {
    gsap.set(refs.subtitle, { opacity: 0, x: -50 });
  }

  // Title is already set to opacity: 0 in CSS

  if (refs.leftSection) {
    gsap.set(refs.leftSection, { opacity: 0, y: 50 });
  }

  if (refs.rightSection) {
    gsap.set(refs.rightSection, { opacity: 0, y: 50 });
  }

  if (refs.officesSection) {
    gsap.set(refs.officesSection, { opacity: 0, y: 50 });
  }

  if (refs.socialCta) {
    gsap.set(refs.socialCta, { opacity: 0, y: 50 });
  }

  // Run the main animations
  const timeline = animateContactPage(refs);

  // Refresh ScrollTrigger to ensure all is registered properly
  setTimeout(() => {
    refreshScrollTrigger();
  }, 300);
};

// Function to clean up all animations when navigating away
export function cleanupContactPageAnimations() {
  if (typeof window === "undefined") return;

  // Kill all ScrollTriggers
  ScrollTrigger.getAll().forEach((trigger) => {
    trigger.kill();
  });

  // Kill all active GSAP animations
  gsap.killTweensOf(".contact-page, .contact-page *");

  // Clear match media queries
  ScrollTrigger.clearMatchMedia();

  // Refresh ScrollTrigger
  refreshScrollTrigger();
}
