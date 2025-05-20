"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";
import { refreshScrollTrigger } from "./scrolltrigger-config";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Hero animation for Acción Social page - exact match to original
export function initAccionSocialHero() {
  if (typeof window === "undefined") return;

  console.log("Initializing Accion Social Hero Animation");

  // Find all the elements we need to animate
  const heroArea = document.querySelector(".accion-social-hero");
  const bgContainer = document.querySelector(
    ".accion-social-hero__bg-container"
  );
  const titleRef1 = document.querySelector(".accion-social-hero__title.text-1");
  const titleRef2 = document.querySelector(".accion-social-hero__title.text-2");
  const labelRef = document.querySelector(".accion-social-hero__label");
  const descriptionRef = document.querySelector(
    ".accion-social-hero__description"
  );

  // Check if essential elements exist
  if (
    !heroArea ||
    !bgContainer ||
    !titleRef1 ||
    !titleRef2 ||
    !labelRef ||
    !descriptionRef
  ) {
    console.warn("Missing essential elements for hero animation");
    return;
  }

  // Create a master timeline to synchronize all animations
  const masterTimeline = gsap.timeline({
    defaults: {
      duration: 1.7,
      ease: "power2.out",
    },
  });

  // Background container animation - EXACTLY as original
  gsap.set(bgContainer, { scale: 1.3 });
  masterTimeline.to(bgContainer, { scale: 0.9 }, 0);

  // Title animations - EXACTLY as original
  gsap.set(titleRef1, { x: 300, opacity: 0 });
  masterTimeline.to(titleRef1, { x: 0, opacity: 1 }, 0);

  gsap.set(titleRef2, { x: -300, opacity: 0 });
  masterTimeline.to(titleRef2, { x: 0, opacity: 1 }, 0);

  // Label animation - EXACTLY as original
  gsap.set(labelRef, { x: -300, opacity: 0 });
  masterTimeline.to(labelRef, { x: 0, opacity: 1 }, 0);

  // Description animation - EXACTLY as original
  gsap.set(descriptionRef, { x: -500, opacity: 0 });
  masterTimeline.to(descriptionRef, { x: 0, opacity: 1 }, 0);

  // Check for a CTA element that might exist
  const ctaRef = document.querySelector(".accion-social-hero__cta");
  if (ctaRef) {
    gsap.set(ctaRef, { y: 30, opacity: 0 });
    masterTimeline.to(ctaRef, { y: 0, opacity: 1 }, 0);
  }

  // Play the animation
  masterTimeline.play();

  // Force refresh ScrollTrigger
  setTimeout(() => {
    refreshScrollTrigger();
  }, 100);
}

export default {
  initAccionSocialHero,
};
