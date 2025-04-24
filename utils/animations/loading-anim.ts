import { gsap } from "gsap";

// Store animation timeline for cleanup
let loadingTimeline: gsap.core.Timeline | null = null;

/**
 * Initialize animations for loading component
 */
export function initLoadingAnimations() {
  // Animation for bounce effect
  const elements = document.querySelectorAll(".bounce-item");
  const tl = gsap.timeline({ repeat: -1 });

  elements.forEach((el, i) => {
    tl.to(
      el,
      {
        y: -12,
        duration: 0.4,
        ease: "sine.inOut",
      },
      i * 0.12
    ).to(
      el,
      {
        y: 0,
        duration: 0.4,
        ease: "sine.inOut",
      },
      i * 0.12 + 0.4
    );
  });

  // Animation for text reveal
  gsap.fromTo(
    ".loading__text span",
    {
      opacity: 0.5,
      scale: 0.95,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    }
  );

  // Animation for line-decor pulse
  gsap.fromTo(
    ".loading__line-decor",
    {
      width: "40px",
      opacity: 0.6,
    },
    {
      width: "60px",
      opacity: 1,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    }
  );

  // Store timeline for cleanup
  loadingTimeline = tl;
}

/**
 * Clean up all animations when component unmounts
 */
export function cleanupLoadingAnimations() {
  // Clear the timeline
  if (loadingTimeline) {
    loadingTimeline.kill();
    loadingTimeline = null;
  }

  // Kill any other animations
  gsap.killTweensOf(".loading__text span");
  gsap.killTweensOf(".loading__line-decor");
}
