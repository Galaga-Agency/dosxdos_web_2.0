"use client";

import { gsap } from "gsap";
import { charAnimation } from "./text-anim";

// Initialize all 404 page animations
export const initNotFoundAnimations = () => {
  // Create master timeline
  const masterTl = gsap.timeline({
    defaults: { ease: "power3.out" },
  });

  // Get elements
  const container = document.querySelector(".not-found");
  const content = document.querySelector(".not-found__content");
  const subtitle = document.querySelector(".not-found__subtitle");
  const text = document.querySelector(".not-found__text");
  const cta = document.querySelector(".not-found__cta");

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
    masterTl.fromTo(
      content,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
      },
      0.2
    );
  }

  // Title animation - using character splitting animation
  masterTl.add(() => {
    charAnimation();
  }, 0.4);

  // Subtitle animation
  if (subtitle) {
    masterTl.fromTo(
      subtitle,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      0.6
    );
  }

  // Text animation
  if (text) {
    masterTl.fromTo(
      text,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
      },
      0.7
    );
  }

  // CTA buttons animation
  if (cta) {
    masterTl.fromTo(
      cta,
      { opacity: 0, y: 20 },
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
