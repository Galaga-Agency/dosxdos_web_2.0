"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "@/plugins";
import { refreshScrollTrigger } from "../scrolltrigger-config";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Store all ScrollTrigger instances for cleanup
const scrollTriggerInstances: ScrollTrigger[] = [];

// Interface for animation references
export interface HeroAnimationRefs {
  heroSection: HTMLElement | null;
  heroImage: HTMLElement | null;
  heroTitle: HTMLElement | null;
  heroSubtitle: HTMLElement | null;
  heroDescription: HTMLElement | null;
  heroMeta: HTMLElement | null;
  [key: string]: HTMLElement | null;
}

// Interface for objective section animations
export interface ObjectiveSectionRefs {
  section: HTMLElement | null;
  label: HTMLElement | null;
  title: HTMLElement | null;
  text: HTMLElement | null;
  gallery: HTMLElement | null;
  [key: string]: HTMLElement | null;
}

// Interface for process section animations
export interface ProcessSectionRefs {
  section: HTMLElement | null;
  label: HTMLElement | null;
  title: HTMLElement | null;
  text: HTMLElement | null;
  fullImage: HTMLElement | null;
  imageLeft: HTMLElement | null;
  imageRight: HTMLElement | null;
  steps: HTMLElement | null;
  [key: string]: HTMLElement | null;
}

// Interface for CTA section animations
export interface CTASectionRefs {
  section: HTMLElement | null;
  title: HTMLElement | null;
  text: HTMLElement | null;
  cta: HTMLElement | null;
  [key: string]: HTMLElement | null;
}

// Track ScrollTrigger instances for cleanup
function trackScrollTrigger(instance: ScrollTrigger): ScrollTrigger {
  scrollTriggerInstances.push(instance);
  return instance;
}

// Character animation using SplitText
export function animateChars(current: HTMLElement | null = null) {
  if (typeof window === "undefined") return;

  console.log("Animating Characters");

  // Register GSAP plugins
  gsap.registerPlugin(SplitText);

  // If a specific element is passed, only animate that
  if (current) {
    const splitTextLine = current;

    gsap.set(splitTextLine, {
      visibility: "hidden",
      perspective: 300,
    });

    const itemSplitted = new SplitText(splitTextLine, {
      type: "chars, words",
    });

    gsap.set(splitTextLine, { visibility: "visible" });

    const tl = gsap.timeline();
    tl.from(itemSplitted.chars, {
      duration: 1,
      x: 100,
      autoAlpha: 0,
      stagger: 0.05,
    });

    return;
  }

  // Original behavior for multiple elements
  let char_come = gsap.utils.toArray(".char-animation");
  char_come.forEach((splitTextLine: any) => {
    gsap.set(splitTextLine, {
      visibility: "hidden",
      perspective: 300,
    });

    const itemSplitted = new SplitText(splitTextLine, {
      type: "chars, words",
    });

    gsap.set(splitTextLine, { visibility: "visible" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: splitTextLine,
        start: "top 90%",
        end: "bottom 60%",
        scrub: false,
        markers: false,
        toggleActions: "play none none none",
      },
    });

    tl.from(itemSplitted.chars, {
      duration: 1,
      x: 100,
      autoAlpha: 0,
      stagger: 0.05,
    });
  });
}

// Initialize hero section animations for project details page
export function initHeroAnimations(refs: HeroAnimationRefs) {
  if (typeof window === "undefined") return;

  console.log("Initializing Hero Animations");

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Setup hero parallax
  if (refs.heroSection && refs.heroImage) {
    setupHeroParallax(refs.heroSection, refs.heroImage);
  }

  // Create a timeline for hero content animations
  const heroTimeline = gsap.timeline({
    defaults: { ease: "power3.out" },
    delay: 1.5,
  });

  // Title animation with SplitText if it has class char-animation
  if (refs.heroTitle && refs.heroTitle.classList.contains("char-animation")) {
    animateChars(refs.heroTitle);
  }

  // Subtitle animation
  if (refs.heroSubtitle) {
    heroTimeline.fromTo(
      refs.heroSubtitle,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      0.2
    );
  }

  // Description animation
  if (refs.heroDescription) {
    heroTimeline.fromTo(
      refs.heroDescription,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      0.4
    );
  }

  // Meta items animation
  if (refs.heroMeta) {
    const metaItems = refs.heroMeta.querySelectorAll(".portfolio-hero__meta");
    heroTimeline.fromTo(
      metaItems,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
      },
      0.6
    );
  }

  // Refresh ScrollTrigger to ensure all is registered correctly
  setTimeout(() => {
    refreshScrollTrigger();
  }, 300);
}

// Sets up parallax effect for hero section
function setupHeroParallax(
  sectionEl: HTMLElement,
  targetEl: HTMLElement
): void {
  // Set initial position
  gsap.set(targetEl, { y: 0 });

  // Create ScrollTrigger for parallax effect
  const instance = ScrollTrigger.create({
    trigger: sectionEl,
    start: "top top",
    end: "bottom top",
    scrub: 1.5,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      gsap.to(targetEl, {
        y: `-${self.progress * 20}%`,
        ease: "none",
        overwrite: "auto",
      });
    },
  });

  // Track this ScrollTrigger instance for cleanup
  trackScrollTrigger(instance);
}

// Animate the objective section elements
export function animateObjectiveSection(refs: ObjectiveSectionRefs) {
  if (typeof window === "undefined") return;

  console.log("Animating Objective Section");

  // Register GSAP plugins if not already registered
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Label animation
  if (refs.label) {
    gsap.fromTo(
      refs.label,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
    );
  }

  // Title animation - using SplitText for char animation
  if (refs.title) {
    // Add the char-animation class before animating
    refs.title.classList.add("char-animation");

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      animateChars(refs.title);

      // Animate highlight separately
      const highlight = refs.title
        ? refs.title.querySelector(".highlight")
        : null;
      if (highlight) {
        gsap.fromTo(
          highlight,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            delay: 0.8,
          }
        );
      }
    }, 100);
  }

  // Text animation
  if (refs.text) {
    gsap.fromTo(
      refs.text,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.5,
      }
    );
  }

  // Force refresh ScrollTrigger
  setTimeout(() => {
    refreshScrollTrigger();
  }, 100);
}

// Initialize moving image slider for project galleries
export function movingImageSlider() {
  if (typeof window === "undefined") return;

  console.log("Initializing Moving Image Slider");

  // Register GSAP plugins if not already registered
  gsap.registerPlugin(ScrollTrigger);

  let mediaQuery = gsap.matchMedia();

  // Only apply horizontal scrolling animation on tablets and above
  mediaQuery.add("(min-width: 768px)", () => {
    const wrappers = document.querySelectorAll(".wrapper-gallery");

    wrappers.forEach((wrapper, index) => {
      const el = wrapper as HTMLElement;
      if (!el) return;

      const distance = el.scrollWidth - el.offsetWidth;
      if (distance <= 0) return;

      const isTop = index % 2 === 0;

      gsap.fromTo(
        el,
        { x: isTop ? 0 : -distance },
        {
          x: isTop ? -distance : 0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        }
      );

      // Track this ScrollTrigger instance for cleanup
      trackScrollTrigger(
        ScrollTrigger.getAll()[ScrollTrigger.getAll().length - 1]
      );
    });
  });
}

// Animate gallery items with reveal effect
export function imageRevealAnimation() {
  if (typeof window === "undefined") return;

  console.log("Running Image Reveal Animation");

  // Register GSAP plugins if not already registered
  gsap.registerPlugin(ScrollTrigger);

  const items = document.querySelectorAll(
    ".project-objective-section__gallery-item"
  );

  if (!items.length) return;

  const instance = gsap.fromTo(
    items,
    {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: items[0].closest(".project-objective-section__gallery"),
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // Track this ScrollTrigger instance for cleanup
  if (ScrollTrigger.getAll().length > 0) {
    trackScrollTrigger(
      ScrollTrigger.getAll()[ScrollTrigger.getAll().length - 1]
    );
  }
}

// Initialize process section animations with floating effect for dual images
export function initProcessSectionAnimations(refs: ProcessSectionRefs) {
  if (typeof window === "undefined") return;

  console.log("Initializing Process Section Animations");

  // Register GSAP plugins if not already registered
  gsap.registerPlugin(ScrollTrigger);

  // Title animation with SplitText if it has char-animation class
  if (refs.title && refs.title.classList.contains("char-animation")) {
    animateChars(refs.title);
  }

  // Label animation
  if (refs.label) {
    gsap.fromTo(
      refs.label,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power3.out",
      }
    );
  }

  // Text animation
  if (refs.text) {
    gsap.fromTo(
      refs.text,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.5,
      }
    );
  }

  // Full width image animation
  if (refs.fullImage) {
    // First make sure the image is visible
    gsap.set(refs.fullImage, { opacity: 1 });

    // Add a reveal animation
    gsap.fromTo(
      refs.fullImage,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: refs.fullImage,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );

    // Container parallax
    const instance1 = ScrollTrigger.create({
      trigger: refs.fullImage,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        gsap.to(refs.fullImage, {
          y: `-${self.progress * 10}%`,
          ease: "none",
          overwrite: "auto",
        });
      },
    });
    trackScrollTrigger(instance1);

    // Image parallax
    const img = refs.fullImage.querySelector("img");
    if (img) {
      const instance2 = ScrollTrigger.create({
        trigger: refs.fullImage,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.to(img, {
            y: `-${self.progress * 15}%`,
            ease: "none",
            overwrite: "auto",
          });
        },
      });
      trackScrollTrigger(instance2);
    }
  }

  // Left floating image
  if (refs.imageLeft) {
    // Make sure the image is visible
    gsap.set(refs.imageLeft, { opacity: 1 });

    // Add floating reveal animation
    gsap.fromTo(
      refs.imageLeft,
      {
        opacity: 0,
        y: 100,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: refs.fullImage,
          start: "bottom 70%",
          toggleActions: "play none none none",
        },
      }
    );

    // Add subtle continuous floating animation
    gsap.to(refs.imageLeft, {
      y: "-=10",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 1,
    });

    // Container parallax
    const instance3 = ScrollTrigger.create({
      trigger: refs.imageLeft,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        gsap.to(refs.imageLeft, {
          y: `-${self.progress * 25}%`,
          ease: "none",
          overwrite: "auto",
        });
      },
    });
    trackScrollTrigger(instance3);

    // Image parallax
    const innerImg = refs.imageLeft.querySelector("img");
    if (innerImg) {
      const instance4 = ScrollTrigger.create({
        trigger: refs.imageLeft,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.to(innerImg, {
            y: `${self.progress * 15}%`,
            ease: "none",
            overwrite: "auto",
          });
        },
      });
      trackScrollTrigger(instance4);
    }
  }

  if (refs.imageRight) {
    // Make sure the image is visible
    gsap.set(refs.imageRight, { opacity: 1 });

    // Add floating reveal animation with slight delay
    gsap.fromTo(
      refs.imageRight,
      {
        opacity: 0,
        y: 100,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: refs.fullImage,
          start: "bottom 70%",
          toggleActions: "play none none none",
        },
      }
    );

    // Add subtle continuous floating animation (slightly out of sync with the left image)
    gsap.to(refs.imageRight, {
      y: "-=10",
      duration: 2.3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 1.3,
    });

    // Container parallax
    const instance5 = ScrollTrigger.create({
      trigger: refs.imageRight,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        gsap.to(refs.imageRight, {
          y: `-${self.progress * 20}%`,
          ease: "none",
          overwrite: "auto",
        });
      },
    });
    trackScrollTrigger(instance5);

    // Image parallax
    const innerImg = refs.imageRight.querySelector("img");
    if (innerImg) {
      const instance6 = ScrollTrigger.create({
        trigger: refs.imageRight,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.to(innerImg, {
            y: `-${self.progress * 15}%`,
            ease: "none",
            overwrite: "auto",
          });
        },
      });
      trackScrollTrigger(instance6);
    }
  }
}

// Setup parallax effect for images
function setupParallaxImage(imageEl: HTMLElement): void {
  // Find the actual image element inside
  const img = imageEl.querySelector("img");
  if (!img) return;

  // Set initial position
  gsap.set(img, { y: 0 });

  // Create ScrollTrigger for parallax effect
  const instance = ScrollTrigger.create({
    trigger: imageEl,
    start: "top bottom",
    end: "bottom top",
    scrub: 1.5,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      gsap.to(img, {
        y: `-${self.progress * 15}%`,
        ease: "none",
        overwrite: "auto",
      });
    },
  });

  // Track this ScrollTrigger instance for cleanup
  trackScrollTrigger(instance);
}

// Animate the CTA section elements
export function animateCTASection(refs: CTASectionRefs) {
  if (typeof window === "undefined") return;

  console.log("Animating CTA Section");

  // Register GSAP plugins if not already registered
  gsap.registerPlugin(ScrollTrigger);

  // Title animation
  if (refs.title) {
    const titleTrigger = ScrollTrigger.create({
      trigger: refs.section,
      start: "top 75%",
      toggleActions: "play none none reverse",
    });

    trackScrollTrigger(titleTrigger);

    gsap.fromTo(
      refs.title,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }
    );
  }

  // Text animation
  if (refs.text) {
    const textTrigger = ScrollTrigger.create({
      trigger: refs.section,
      start: "top 75%",
      toggleActions: "play none none reverse",
    });

    trackScrollTrigger(textTrigger);

    gsap.fromTo(
      refs.text,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      }
    );
  }

  // CTA animation
  if (refs.cta) {
    const ctaTrigger = ScrollTrigger.create({
      trigger: refs.section,
      start: "top 75%",
      toggleActions: "play none none reverse",
    });

    trackScrollTrigger(ctaTrigger);

    gsap.fromTo(
      refs.cta,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out",
      }
    );
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// CLEANUP FUNCTION ///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

export function cleanupProjectDetailsAnimations(): void {
  if (typeof window === "undefined") return;

  console.log("⚠️ Cleaning up all project details page animations");

  // Kill all ScrollTriggers
  ScrollTrigger.getAll().forEach((trigger) => {
    trigger.kill();
  });

  // Clear match media queries
  ScrollTrigger.clearMatchMedia();

  // Refresh ScrollTrigger
  refreshScrollTrigger();
}
