"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { refreshScrollTrigger } from "../scrolltrigger-config";
import { isTouchDevice } from "@/utils/device";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Portfolio page animation refs interface
interface PortfolioPageAnimationRefs {
  section?: HTMLElement | null;
  title?: HTMLElement | null;
  projects?: HTMLElement | null;
  infoSection?: HTMLElement | null;
  ctaButton?: HTMLElement | null;
  bgWrapper?: HTMLElement | null;
}

// Main animation function
export function initPortfolioPageAnimations(
  refs: PortfolioPageAnimationRefs
): void {
  if (typeof window === "undefined") return;

  console.log("Animating Portfolio Page");

  const { section, title, projects, infoSection, ctaButton, bgWrapper } = refs;

  // Make sure we have the minimum required elements
  if (!section || !projects) {
    console.warn("Missing essential elements for portfolio page animation");
    return;
  }

  // Projects list animation
  const projectItems = projects.querySelectorAll(
    ".portfolio-page__project-item"
  );

  // Prepare project items before animation
  gsap.set(projectItems, {
    opacity: 0,
    x: 100,
    scale: 0.98,
  });

  const projectTl = gsap.timeline({
    defaults: {
      ease: "expo.out",
      duration: 0.8,
    },
  });

  // Convert NodeList to Array for more predictable staggering
  const projectArray = Array.from(projectItems);

  projectTl.to(projectArray, {
    opacity: 1,
    x: 0,
    scale: 1,
    stagger: {
      amount: 1.5,
      from: "start",
    },
    delay: title ? 1.8 : 1.5,
    ease: "power3.out",
  });

  // CTA button animation if it exists
  if (ctaButton) {
    gsap.set(ctaButton, { opacity: 0, y: 50 });

    projectTl.to(
      ctaButton,
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.8" // Overlap with previous animation
    );
  }

  // Background image animation if it exists
  if (bgWrapper) {
    const activeBg = bgWrapper.querySelector(".active");
    if (activeBg) {
      gsap.fromTo(
        activeBg,
        { scale: 1.2, opacity: 0.7 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" }
      );
    }
  }

  // Force refresh ScrollTrigger
  setTimeout(() => {
    refreshScrollTrigger();
  }, 100);
}

export function initBentoRevealForTouchDevices(gridEl: HTMLElement | null): void {
  if (!gridEl || !isTouchDevice()) return;

  const items = gridEl.querySelectorAll(".portfolio-bento__item");

  items.forEach((item) => {
    const hoverInfo = item.querySelector(".portfolio-bento__hover-info");
    const label = item.querySelector(".portfolio-bento__label");
    const title = item.querySelector(".portfolio-bento__title");

    if (!hoverInfo || !label || !title) return;

    gsap.set([hoverInfo, label, title], {
      opacity: 0,
      y: 30,
    });

    ScrollTrigger.create({
      trigger: item,
      start: "center center",
      toggleActions: "play none none reverse",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();
        tl.to(hoverInfo, { opacity: 1, duration: 0.3, ease: "power2.out" });
        tl.to(label, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        }, "-=0.2");
        tl.to(title, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        }, "-=0.25");
      },
    });
  });

  refreshScrollTrigger();
}

// Animate project hover background change
export function animateProjectHover(
  activeElement: HTMLElement | null,
  newElement: HTMLElement | null
): void {
  if (!activeElement || !newElement) return;

  // Fade out current active background
  gsap.to(activeElement, {
    opacity: 0,
    scale: 1.1,
    duration: 0.7,
  });

  // Fade in new background
  gsap.fromTo(
    newElement,
    { opacity: 0, scale: 1.1 },
    { opacity: 1, scale: 1, duration: 0.7 }
  );
}

// Clean up animations
export function cleanupPortfolioAnimations(): void {
  if (typeof window === "undefined") return;

  console.log("⚠️ Cleaning up all portfolio page animations");

  // Kill all ScrollTriggers
  ScrollTrigger.getAll().forEach((trigger) => {
    trigger.kill();
  });

  // Clear match media queries
  ScrollTrigger.clearMatchMedia();

  // Kill any text fill animations
  gsap.killTweensOf(".text-outline");

  // Refresh ScrollTrigger
  refreshScrollTrigger();
}
