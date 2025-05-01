"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { refreshScrollTrigger } from "./scrolltrigger-config";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Define animation elements interface
interface SectionAnimationElements {
  section?: HTMLElement | null;
  heroArea?: HTMLElement | null;
  bgContainer?: HTMLElement | null;
  titleRef1?: HTMLElement | null;
  titleRef2?: HTMLElement | null;
  descriptionRef?: HTMLElement | null;
  ctaRef?: HTMLElement | null;
  decorElements?: {
    container: HTMLElement | null;
    dots: HTMLElement | null;
    line: HTMLElement | null;
    circle: HTMLElement | null;
    grid: HTMLElement | null;
  };
  title?: HTMLElement | null;
  text?: HTMLElement | null;
  tabs?: HTMLElement | null;
  content?: HTMLElement | null;
  cards?: HTMLElement | null;
  experiences?: HTMLElement | null;
}

// ==========================================================================
// Hero Section Animations
// ==========================================================================

export function initAccionSocialHeroAnimations(elements: SectionAnimationElements): void {
  if (typeof window === "undefined") return;

  console.log("Animating Accion Social Hero");

  // Make sure we have the essential elements
  if (
    !elements.heroArea ||
    !elements.bgContainer ||
    !elements.titleRef1 ||
    !elements.titleRef2 ||
    !elements.descriptionRef
  ) {
    console.warn("Missing essential hero animation elements");
    return;
  }

  // Create a master timeline to synchronize all animations
  const masterTimeline = gsap.timeline({
    defaults: {
      duration: 1.7,
      ease: "power2.out",
    }
  });

  // Background container animation
  gsap.set(elements.bgContainer, { scale: 1.3 });
  masterTimeline.to(elements.bgContainer, { scale: 0.9 }, 0);

  // Title animations
  gsap.set(elements.titleRef1, { x: 300, opacity: 0 });
  masterTimeline.to(elements.titleRef1, { x: 0, opacity: 1 }, 0);

  gsap.set(elements.titleRef2, { x: -300, opacity: 0 });
  masterTimeline.to(elements.titleRef2, { x: 0, opacity: 1 }, 0);

  gsap.set(elements.descriptionRef, { x: -500, opacity: 0 });
  masterTimeline.to(elements.descriptionRef, { x: 0, opacity: 1 }, 0);

  // Animate CTA if it exists
  if (elements.ctaRef) {
    gsap.set(elements.ctaRef, { y: 30, opacity: 0 });
    masterTimeline.to(elements.ctaRef, { y: 0, opacity: 1 }, 0);
  }

  // Animate decorative elements if they exist
  if (elements.decorElements?.container) {
    const decorElements = [
      elements.decorElements.dots,
      elements.decorElements.line,
      elements.decorElements.circle,
      elements.decorElements.grid,
    ].filter(Boolean);

    if (decorElements.length > 0) {
      gsap.set(decorElements, { opacity: 0, scale: 0 });
      masterTimeline.to(
        decorElements,
        {
          opacity: 1,
          scale: 1,
          stagger: 0.1,
        },
        0
      );
    }
  }

  // Play the animation
  masterTimeline.play();
}

// ==========================================================================
// Values Section Animations
// ==========================================================================

export function animateValuesSection(elements: SectionAnimationElements): void {
  if (typeof window === "undefined") return;

  console.log("Animating Values Section");

  // Make sure we have the essential elements
  if (
    !elements.section ||
    !elements.title ||
    !elements.text ||
    !elements.tabs ||
    !elements.content
  ) {
    console.warn("Missing essential elements for values section animation");
    return;
  }

  // Create a master timeline for the section
  const masterTimeline = gsap.timeline({
    defaults: {
      duration: 0.8,
      ease: "power2.out",
    }
  });

  // Animate title words
  const titleWords = elements.title.querySelectorAll(".word");
  if (titleWords.length > 0) {
    gsap.set(titleWords, { y: 30, opacity: 0 });
    masterTimeline.to(
      titleWords,
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "power3.out",
      },
      0
    );
  }

  // Highlight animation
  const highlight = elements.title.querySelector(".highlight");
  if (highlight) {
    gsap.set(highlight, { backgroundSize: "0% 100%" });
    masterTimeline.to(
      highlight,
      {
        backgroundSize: "100% 100%",
        duration: 0.6,
      },
      0.4
    );
  }

  // Text animation
  gsap.set(elements.text, { opacity: 0, y: 20 });
  masterTimeline.to(
    elements.text,
    {
      opacity: 1,
      y: 0,
    },
    0.2
  );

  // Tabs animation
  const tabs = elements.tabs.querySelectorAll(".values-section__tab");
  if (tabs.length > 0) {
    gsap.set(tabs, { opacity: 0, y: 15 });
    masterTimeline.to(
      tabs,
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
      },
      0.4
    );
  }

  // Content animation - animate header and values
  gsap.set(elements.content, { opacity: 0 });
  masterTimeline.to(
    elements.content,
    {
      opacity: 1,
    },
    0.6
  );

  // Animate value items with stagger
  const valueItems = elements.content.querySelectorAll(
    ".values-section__value-item"
  );
  if (valueItems.length > 0) {
    gsap.set(valueItems, { y: 30, opacity: 0 });
    masterTimeline.to(
      valueItems,
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
      },
      0.8
    );
  }

  // Animate social responsibility section if it exists
  const socialSection = elements.section.querySelector(
    ".values-section__social-responsibility"
  );
  if (socialSection) {
    gsap.set(socialSection, { opacity: 0, y: 30 });
    masterTimeline.to(
      socialSection,
      {
        opacity: 1,
        y: 0,
        duration: 1,
      },
      1
    );
  }

  // Create ScrollTrigger
  ScrollTrigger.create({
    trigger: elements.section,
    start: "top 80%",
    once: true,
    animation: masterTimeline
  });

  // Force refresh ScrollTrigger
  setTimeout(() => {
    refreshScrollTrigger();
  }, 100);
}

// Separate function to handle tab content transitions without causing scrolling
export function animateTabContentChange(
  contentElement: HTMLElement | null
): void {
  if (!contentElement || typeof window === "undefined") return;

  console.log("Animating Tab Content Change");

  // Create new timeline for tab content transition
  const tl = gsap.timeline({
    defaults: {
      ease: "power2.out",
      duration: 0.4,
    }
  });

  // Simple fade transition to avoid jarring changes
  tl.fromTo(contentElement, { opacity: 0.7 }, { opacity: 1 });

  // Find and animate value items with stagger
  const valueItems = contentElement.querySelectorAll(
    ".values-section__value-item"
  );
  if (valueItems.length > 0) {
    gsap.set(valueItems, { y: 15, opacity: 0 });
    tl.to(
      valueItems,
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.5,
      },
      0.1
    );
  }
}

// ==========================================================================
// Sustainability Images Section Animations
// ==========================================================================

export function animateSustainabilityImagesSection(elements: SectionAnimationElements): void {
  if (typeof window === "undefined") return;

  console.log("Animating Sustainability Images Section");

  // Make sure we have the essential elements
  if (!elements.section || !elements.cards) {
    console.warn("Missing essential elements for sustainability images animation");
    return;
  }

  // Create timeline
  const tl = gsap.timeline({
    defaults: {
      duration: 0.8,
      ease: "power2.out",
    }
  });

  // Set initial states
  if (elements.title) {
    gsap.set(elements.title, { opacity: 0, y: 30 });
    tl.to(elements.title, { opacity: 1, y: 0 });
  }

  const cards = elements.cards.querySelectorAll(".hover-card");
  if (cards.length > 0) {
    gsap.set(cards, { opacity: 0, y: 50 });
    tl.to(
      cards,
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
      },
      "-=0.4"
    );
  }

  // Create ScrollTrigger
  ScrollTrigger.create({
    trigger: elements.section,
    start: "top 80%",
    once: true,
    animation: tl
  });

  // Force refresh ScrollTrigger
  setTimeout(() => {
    refreshScrollTrigger();
  }, 100);
}

// ==========================================================================
// Experiencia Section Animations
// ==========================================================================

export function animateExperienciaSection(elements: SectionAnimationElements): void {
  if (typeof window === "undefined") return;

  console.log("Animating Experiencia Section");

  // Make sure we have the essential elements
  if (!elements.section || !elements.title || !elements.experiences) {
    console.warn("Missing essential elements for experiencia section animation");
    return;
  }

  // Create timeline
  const tl = gsap.timeline({
    defaults: {
      duration: 0.8,
      ease: "power2.out",
    }
  });

  // Set initial states
  const titleWords = elements.title.querySelectorAll(".word");
  if (titleWords.length > 0) {
    gsap.set(titleWords, { opacity: 0, y: 30 });
    tl.to(titleWords, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
    });
  }

  const experienceItems = elements.experiences.querySelectorAll(".experiencia-section__item");
  if (experienceItems.length > 0) {
    gsap.set(experienceItems, { opacity: 0, y: 50 });
    tl.to(
      experienceItems,
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
      },
      "-=0.4"
    );
  }

  // Create ScrollTrigger
  ScrollTrigger.create({
    trigger: elements.section,
    start: "top 80%",
    once: true,
    animation: tl
  });

  // Force refresh ScrollTrigger
  setTimeout(() => {
    refreshScrollTrigger();
  }, 100);
}

// ==========================================================================
// CTA Section Animations
// ==========================================================================

export function animateAccionSocialCTASection(elements: SectionAnimationElements): void {
  if (typeof window === "undefined") return;

  console.log("Animating CTA Section");

  const { section, content, title, text } = elements;

  if (!section || !title || !text || !content) {
    console.warn("Missing essential elements for CTA section animation");
    return;
  }

  // Create timeline
  const tl = gsap.timeline({
    defaults: {
      duration: 0.8,
      ease: "power2.out",
    }
  });

  // Get elements to animate
  const titleWords = title.querySelectorAll(".word");
  const highlight = title.querySelector(".highlight");

  // Set initial states if elements exist
  if (titleWords.length > 0) {
    gsap.set(titleWords, { opacity: 0, y: 20 });
  }

  if (highlight) {
    gsap.set(highlight, { backgroundSize: "0% 100%" });
  }

  gsap.set(text, { opacity: 0, y: 30 });
  gsap.set(content, { opacity: 0.8, y: 40 });

  // Animate title words
  if (titleWords.length > 0) {
    tl.to(titleWords, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
    });
  }

  // Animate highlight if it exists
  if (highlight) {
    tl.to(
      highlight,
      {
        backgroundSize: "100% 100%",
      },
      "-=0.4"
    );
  }

  // Animate text
  tl.to(
    text,
    {
      opacity: 1,
      y: 0,
    },
    "-=0.6"
  );

  // Animate content wrapper
  tl.to(
    content,
    {
      opacity: 1,
      y: 0,
    },
    "-=0.7"
  );

  // Animate decorative elements if they exist
  if (elements.decorElements?.container) {
    gsap.set(elements.decorElements.container, { opacity: 0, scale: 0.95 });
    tl.to(
      elements.decorElements.container,
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
      },
      "-=0.5"
    );
  }

  // Create ScrollTrigger
  ScrollTrigger.create({
    trigger: section,
    start: "top 80%",
    once: true,
    animation: tl
  });

  // Force refresh ScrollTrigger
  setTimeout(() => {
    refreshScrollTrigger();
  }, 100);
}

// ==========================================================================
// CLEANUP FUNCTION
// ==========================================================================

export function cleanupAccionSocialAnimations(): void {
  if (typeof window === "undefined") return;

  console.log("⚠️ Cleaning up all accion social page animations");
  
  // Kill all ScrollTriggers
  ScrollTrigger.getAll().forEach(trigger => {
    trigger.kill();
  });
  
  // Clear match media queries
  ScrollTrigger.clearMatchMedia();
  
  // Refresh ScrollTrigger
  refreshScrollTrigger();
}