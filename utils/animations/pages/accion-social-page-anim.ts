"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { refreshScrollTrigger } from "../scrolltrigger-config";
import { isTouchDevice } from "@/utils/device";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Store all ScrollTrigger instances for cleanup
const scrollTriggerInstances: ScrollTrigger[] = [];

// Track ScrollTrigger instances for cleanup
function trackScrollTrigger(instance: ScrollTrigger): ScrollTrigger {
  scrollTriggerInstances.push(instance);
  return instance;
}

// Define animation elements interface
interface SectionAnimationElements {
  section?: HTMLElement | null;
  heroArea?: HTMLElement | null;
  bgContainer?: HTMLElement | null;
  titleRef1?: HTMLElement | null;
  titleRef2?: HTMLElement | null;
  labelRef?: HTMLElement | null;
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
  services?: HTMLElement | null;
}

// Common fade animation setup - ENHANCED VERSION
function setupFadeAnimation(
  selector: string,
  initialProps: gsap.TweenVars,
  animProps: gsap.TweenVars,
  startPosition: string = "top center+=100"
) {
  const elements = document.querySelectorAll(selector);
  if (elements.length === 0.0) return;

  gsap.set(selector, initialProps);
  const elementsArray = gsap.utils.toArray(selector);

  elementsArray.forEach((item: any) => {
    const tl = gsap.timeline({
      scrollTrigger: trackScrollTrigger(
        ScrollTrigger.create({
          trigger: item,
          start: startPosition,
          once: true,
          // Añadimos markers para debug (quitar en producción)
          // markers: true,
        })
      ),
    });

    // Añadimos un efecto de escala para hacerlo más visible
    tl.to(item, {
      ...animProps,
      // Cambiamos el ease a algo más dramático
      ease: "back.out(1.7)",
      // Reducimos la duración para que sea más rápido e impactante
      duration: animProps.duration || 1.2,
    });
  });
}

export function initFadeAnimations(): void {
  if (typeof window === "undefined") return;

  // Fade Bottom animations - más acentuadas
  setupFadeAnimation(
    ".fade_bottom",
    { y: 40, opacity: 0, scale: 0.95 }, // Menor distancia pero añadimos escala
    { y: 0, opacity: 1, scale: 1, duration: 1.2, delay: 0.2 }, // Menor delay y duración
    "top center+=200" // Trigger más temprano
  );

  // Fade Top animations - más acentuadas
  setupFadeAnimation(
    ".fade_top",
    { y: -40, opacity: 0, scale: 0.95 },
    { y: 0, opacity: 1, scale: 1, duration: 1.2 }
  );

  // Fade Left animations - más acentuadas
  setupFadeAnimation(
    ".fade_left",
    { x: -40, opacity: 0, scale: 0.95 },
    { x: 0, opacity: 1, scale: 1, duration: 1.2 }
  );

  // Fade Right animations - más acentuadas
  setupFadeAnimation(
    ".fade_right",
    { x: 40, opacity: 0, scale: 0.95 },
    { x: 0, opacity: 1, scale: 1, duration: 1.2 }
  );
}

// ==========================================================================
// Hero Section Animations
// ==========================================================================

export function initAccionSocialHeroAnimations(
  elements: SectionAnimationElements
): void {
  if (typeof window === "undefined") return;

  console.log("Animating Accion Social Hero");

  // Make sure we have the essential elements
  if (
    !elements.heroArea ||
    !elements.bgContainer ||
    !elements.titleRef1 ||
    !elements.labelRef ||
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
    },
  });

  // Background container animation
  gsap.set(elements.bgContainer, { scale: 1.3 });
  masterTimeline.to(elements.bgContainer, { scale: 0.9 }, 0);

  // Title animations
  gsap.set(elements.titleRef1, { x: 300, opacity: 0 });
  masterTimeline.to(elements.titleRef1, { x: 0, opacity: 1 }, 0);

  gsap.set(elements.titleRef2, { x: -300, opacity: 0 });
  masterTimeline.to(elements.titleRef2, { x: 0, opacity: 1 }, 0);

  gsap.set(elements.labelRef, { x: -300, opacity: 0 });
  masterTimeline.to(elements.labelRef, { x: 0, opacity: 1 }, 0);

  gsap.set(elements.descriptionRef, { x: -500, opacity: 0 });
  masterTimeline.to(elements.descriptionRef, { x: 0, opacity: 1 }, 0);

  // Animate CTA if it exists
  if (elements.ctaRef) {
    gsap.set(elements.ctaRef, { y: 30, opacity: 0 });
    masterTimeline.to(elements.ctaRef, { y: 0, opacity: 1 }, 0);
  }

  // Play the animation
  masterTimeline.play();
}

// ==========================================================================
// Sustainability Images Section Animations
// ==========================================================================

export function animateSustainabilityImagesSection(
  elements: SectionAnimationElements
): void {
  if (typeof window === "undefined") return;

  console.log("Animating Sustainability Images Section");

  // Make sure we have the essential elements
  if (!elements.section || !elements.cards) {
    console.warn(
      "Missing essential elements for sustainability images animation"
    );
    return;
  }

  // Create timeline
  const tl = gsap.timeline({
    defaults: {
      duration: 0.8,
      ease: "power2.out",
    },
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
    animation: tl,
  });

  // Force refresh ScrollTrigger
  setTimeout(() => {
    refreshScrollTrigger();
  }, 100);
}

// ==========================================================================
// Experiencia Section Animations
// ==========================================================================

export function animateExperienciaSection(
  elements: SectionAnimationElements
): void {
  if (typeof window === "undefined") return;

  console.log("Animating Experiencia Section");

  // Make sure we have the essential elements
  if (!elements.section || !elements.title || !elements.experiences) {
    console.warn(
      "Missing essential elements for experiencia section animation"
    );
    return;
  }

  // Create timeline
  const tl = gsap.timeline({
    defaults: {
      duration: 0.8,
      ease: "power2.out",
    },
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

  const experienceItems = elements.experiences.querySelectorAll(
    ".experiencia-section__item"
  );
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
    animation: tl,
  });

  // Force refresh ScrollTrigger
  setTimeout(() => {
    refreshScrollTrigger();
  }, 100);
}

// ==========================================================================
// Collaborations Section Animations
// ==========================================================================

export function animateCollaborationsSection(
  elements: SectionAnimationElements
): void {
  if (typeof window === "undefined") return;

  console.log("Animating Collaborations Section");

  // Initialize fade animations for elements with fade classes
  initFadeAnimations();

  // Force refresh ScrollTrigger
  setTimeout(() => {
    refreshScrollTrigger();
  }, 100);
}

// ==========================================================================
// CTA Section Animations
// ==========================================================================

export function animateAccionSocialCTASection(
  elements: SectionAnimationElements
): void {
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
    },
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
    animation: tl,
  });

  // Force refresh ScrollTrigger
  setTimeout(() => {
    refreshScrollTrigger();
  }, 100);
}

// ==========================================================================
// Image Parallax Animation
// ==========================================================================

export function initImageParallax(
  containerElement: HTMLDivElement,
  innerElement: HTMLDivElement
): void {
  if (typeof window === "undefined" || !containerElement || !innerElement)
    return;

  // Prepare inner element with scale to prevent white edges
  gsap.set(innerElement, {
    scale: 1.25, // Increased scale for larger movement
    transformOrigin: "center 10%",
  });

  // Create a proxy object to track scroll progress
  const proxy = { progress: 0 };

  // Main ScrollTrigger to track scroll position
  const scrollTrigger = ScrollTrigger.create({
    trigger: containerElement,
    start: "top bottom",
    end: "bottom top",
    scrub: 3, // Much higher scrub value for ultra-smooth movement
    onUpdate: (self: any) => {
      // Update proxy value
      gsap.to(proxy, {
        progress: self.progress,
        duration: 0.6, // Longer duration for smoother updating
        overwrite: "auto",
        ease: "sine.out", // Very subtle easing
        onUpdate: () => {
          // Apply smooth movement to container
          gsap.set(containerElement, {
            y: proxy.progress * (isTouchDevice() ? 0 : -130),
          });

          // Apply stronger movement to inner element
          gsap.set(innerElement, {
            y: proxy.progress * (isTouchDevice() ? -50 : -110),
          });
        },
      });
    },
  });

  // Force refresh for immediate effect
  setTimeout(() => {
    if ((window as any).__smoother__) {
      (window as any).__smoother__.refresh();
    }
    ScrollTrigger.refresh();
  }, 100);
}

// ==========================================================================
// CLEANUP FUNCTION
// ==========================================================================

export function cleanupAccionSocialAnimations(): void {
  if (typeof window === "undefined") return;

  console.log("⚠️ Cleaning up all accion social page animations");

  // Kill all ScrollTriggers
  ScrollTrigger.getAll().forEach((trigger: any) => {
    trigger.kill();
  });

  // Clear match media queries
  ScrollTrigger.clearMatchMedia();

  // Refresh ScrollTrigger
  refreshScrollTrigger();
}
