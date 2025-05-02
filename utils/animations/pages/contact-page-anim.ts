"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "@/plugins";
import { refreshScrollTrigger } from "../scrolltrigger-config";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Contact page animation interface
interface ContactPageAnimationElements {
  title?: HTMLElement | null;
  subtitle?: HTMLElement | null;
  leftSection?: HTMLElement | null;
  rightSection?: HTMLElement | null;
  officesSection?: HTMLElement | null;
  officesGrid?: HTMLElement | null;
  socialCta?: HTMLElement | null;
}

// Character animation with SplitText
export const charAnimation = (current: HTMLElement | null = null) => {
  if (!current || typeof window === "undefined") return null;

  console.log("Animating Characters");

  gsap.set(current, {
    visibility: "hidden",
    perspective: 300,
  });

  const itemSplitted = new SplitText(current, {
    type: "chars, words",
  });

  gsap.set(current, { visibility: "visible" });

  const tl = gsap.timeline();
  tl.from(itemSplitted.chars, {
    duration: 1,
    x: 100,
    autoAlpha: 0,
    stagger: 0.05,
  });

  return tl;
};

// Function to animate the subtitle
export const animateSubtitle = (element: HTMLElement | null) => {
  if (!element || typeof window === "undefined") return null;

  console.log("Animating Subtitle");

  return gsap.fromTo(
    element,
    {
      y: 20,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
    }
  );
};

// Function to animate the contact form and info sections
export const animateContactSections = (
  leftSection: HTMLElement | null,
  rightSection: HTMLElement | null
) => {
  if ((!leftSection && !rightSection) || typeof window === "undefined")
    return null;

  console.log("Animating Contact Sections");

  const tl = gsap.timeline();

  // Animate left section
  if (leftSection) {
    gsap.set(leftSection, { x: -50, opacity: 0 });
    tl.to(
      leftSection,
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
      },
      0.4
    );
  }

  // Animate right section
  if (rightSection) {
    gsap.set(rightSection, { x: 50, opacity: 0 });
    tl.to(
      rightSection,
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
      },
      0.6
    );
  }

  return tl;
};

// Function to animate location cards
export const animateLocationCards = (container: HTMLElement | null) => {
  if (!container || typeof window === "undefined") return null;

  console.log("Animating Location Cards");

  const cards = container.querySelectorAll(".location-card");
  if (cards.length === 0) return null;

  gsap.set(cards, { y: 50, opacity: 0 });

  return gsap.to(cards, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out",
  });
};

// Function to set up scroll triggers for office section
export const setupOfficesSectionAnimation = (section: HTMLElement | null) => {
  if (!section || typeof window === "undefined") return null;

  console.log("Animating Offices Section");

  const title = section.querySelector(".offices-title");
  if (!title) return null;

  gsap.set(title, { x: -50, opacity: 0 });

  // Create ScrollTrigger
  ScrollTrigger.create({
    trigger: section,
    start: "top 80%",
    once: true,
    onEnter: () => {
      gsap.to(title, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      });
    },
  });

  // Force refresh ScrollTrigger
  setTimeout(() => {
    refreshScrollTrigger();
  }, 100);
};

// Function to animate social CTA section
export const animateSocialCTA = (section: HTMLElement | null) => {
  if (!section || typeof window === "undefined") return null;

  console.log("Animating Social CTA");

  const heading = section.querySelector("h3");
  const icons = section.querySelector(".contact-page__desktop-social-icons");

  if (!heading && !icons) return null;

  if (heading) gsap.set(heading, { y: 30, opacity: 0 });
  if (icons) gsap.set(icons, { y: 30, opacity: 0 });

  // Create ScrollTrigger
  ScrollTrigger.create({
    trigger: section,
    start: "top 80%",
    once: true,
    onEnter: () => {
      if (heading) {
        gsap.to(heading, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      if (icons) {
        gsap.to(icons, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
        });
      }
    },
  });

  // Force refresh ScrollTrigger
  setTimeout(() => {
    refreshScrollTrigger();
  }, 100);
};

// Main animation function to initialize all animations
export const initContactPageAnimations = (
  elements: ContactPageAnimationElements
) => {
  if (typeof window === "undefined") return;

  console.log("Initializing Contact Page Animations");

  const {
    title,
    subtitle,
    leftSection,
    rightSection,
    officesSection,
    officesGrid,
    socialCta,
  } = elements;

  // Run animations in sequence
  if (title) charAnimation(title);
  if (subtitle) animateSubtitle(subtitle);
  if (leftSection !== undefined || rightSection !== undefined) {
    animateContactSections(leftSection ?? null, rightSection ?? null);
  }
  if (officesGrid) animateLocationCards(officesGrid);
  if (officesSection) setupOfficesSectionAnimation(officesSection);
  if (socialCta) animateSocialCTA(socialCta);

  // Force refresh ScrollTrigger
  setTimeout(() => {
    refreshScrollTrigger();
  }, 100);
};

// Clean up function
export function cleanupContactPageAnimations(): void {
  if (typeof window === "undefined") return;

  console.log("⚠️ Cleaning up all contact page animations");

  // Kill all ScrollTriggers
  ScrollTrigger.getAll().forEach((trigger) => {
    trigger.kill();
  });

  // Clear match media queries
  ScrollTrigger.clearMatchMedia();

  // Refresh ScrollTrigger
  refreshScrollTrigger();
}
