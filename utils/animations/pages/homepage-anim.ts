"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "@/plugins";
import { refreshScrollTrigger } from "../scrolltrigger-config";
import { isTouchDevice } from "@/utils/device";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

// Store all ScrollTrigger instances for cleanup
let scrollTriggerInstances: ScrollTrigger[] = [];

// Track ScrollTrigger instances for cleanup
function trackScrollTrigger(instance: ScrollTrigger): ScrollTrigger {
  scrollTriggerInstances.push(instance);
  return instance;
}

interface SectionAnimationElements {
  section?: HTMLElement | null;
  label?: HTMLElement | null;
  title?: HTMLElement | null;
  text?: HTMLElement | null;
  subtitle?: HTMLElement | null;
  cta?: HTMLElement | null;
  image?: HTMLElement | null;
  grid?: HTMLElement | null;
  container?: HTMLElement | null;
  carousel?: HTMLElement | null;
  header?: HTMLElement | null;
  marquee?: HTMLElement | null;
}

// Common fade animation setup
function setupFadeAnimation(
  selector: string,
  initialProps: gsap.TweenVars,
  animProps: gsap.TweenVars,
  startPosition: string = "top center+=100"
) {
  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) return;

  gsap.set(selector, initialProps);
  const elementsArray = gsap.utils.toArray(selector);

  elementsArray.forEach((item: any) => {
    const tl = gsap.timeline({
      scrollTrigger: trackScrollTrigger(
        ScrollTrigger.create({
          trigger: item,
          start: startPosition,
          once: true, // Add once:true to prevent retriggering
        })
      ),
    });

    tl.to(item, { ...animProps, ease: "power2.out" });
  });
}

export function initFadeAnimations(): void {
  if (typeof window === "undefined") return;

  // Fade Bottom animations
  setupFadeAnimation(
    ".fade_bottom",
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.5 },
    "top center+=400"
  );

  // Fade Top animations
  setupFadeAnimation(
    ".fade_top",
    { y: -100, opacity: 0 },
    { y: 0, opacity: 1, duration: 2.5 }
  );

  // Fade Left animations
  setupFadeAnimation(
    ".fade_left",
    { x: -100, opacity: 0 },
    { x: 0, opacity: 1, duration: 2.5 }
  );

  // Fade Right animations
  setupFadeAnimation(
    ".fade_right",
    { x: 100, opacity: 0 },
    { x: 0, opacity: 1, duration: 2.5 }
  );
}

// Ultra-smooth parallax effect
export function initImageParallax(
  containerElement: HTMLDivElement,
  innerElement: HTMLDivElement
): void {
  if (typeof window === "undefined" || !containerElement || !innerElement)
    return;

  console.log("Initializing ultra-smooth parallax");

  // Prepare inner element with scale to prevent white edges
  gsap.set(innerElement, {
    scale: 1.25, // Increased scale for larger movement
    transformOrigin: "center center",
  });

  // Create a proxy object to track scroll progress
  const proxy = { progress: 0 };

  // Main ScrollTrigger to track scroll position
  const scrollTrigger = trackScrollTrigger(
    ScrollTrigger.create({
      trigger: containerElement,
      start: "top bottom",
      end: "bottom top",
      scrub: 3, // Much higher scrub value for ultra-smooth movement
      onUpdate: (self) => {
        // Update proxy value
        gsap.to(proxy, {
          progress: self.progress,
          duration: 0.6, // Longer duration for smoother updating
          overwrite: "auto",
          ease: "sine.out", // Very subtle easing
          onUpdate: () => {
            // Apply smooth movement to container
            gsap.set(containerElement, {
              y: proxy.progress * (isTouchDevice() ? 0 : -150),
            });

            // Apply stronger movement to inner element
            gsap.set(innerElement, {
              y: proxy.progress * -110,
            });
          },
        });
      },
    })
  );

  // Force refresh for immediate effect
  setTimeout(() => {
    if ((window as any).__smoother__) {
      (window as any).__smoother__.refresh();
    }
    ScrollTrigger.refresh();
  }, 100);
}

// Title Animation Utility
export function charAnimation(current?: HTMLElement) {
  if (!current) return null;

  gsap.set(current, {
    visibility: "hidden",
    perspective: 300,
  });

  const itemSplitted = new SplitText(current, {
    type: "chars, words",
  });

  gsap.set(current, {
    visibility: "visible",
    opacity: 1,
  });

  const tl = gsap.timeline();
  tl.from(itemSplitted.chars, {
    duration: 1,
    x: 100,
    autoAlpha: 0,
    stagger: 0.05,
  });

  return tl;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Hero Slider Animation ////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const animateHeroSlider = ({
  section,
  title,
  cta,
}: SectionAnimationElements) => {
  if (typeof window === "undefined" || !section) return null;

  console.log("Animating Hero Slider");

  const tl = gsap.timeline();

  // Prepare section
  gsap.set(section, {
    visibility: "visible",
    opacity: 1,
  });

  // Animate title element
  if (title) {
    gsap.set(title, {
      opacity: 0,
      y: -30,
    });

    tl.to(
      title,
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: "power2.out",
      },
      0.5
    );
  }

  // Animate CTA element
  if (cta) {
    gsap.set(cta, {
      opacity: 0,
      y: 30,
    });

    tl.to(
      cta,
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
      },
      0.7
    );
  }

  // Play animation immediately for hero section
  tl.play();

  return tl;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Logo Marquee Animation ////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const animateLogoMarquee = ({
  section,
  header,
  marquee,
}: SectionAnimationElements) => {
  if (typeof window === "undefined" || !section) return null;

  console.log("Animating Logo Marquee");

  const tl = gsap.timeline();

  // Prepare section
  gsap.set(section, {
    visibility: "visible",
    opacity: 1,
  });

  // Animate header if exists
  if (header) {
    gsap.set(header, {
      opacity: 0,
      y: 20,
    });

    tl.to(
      header,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      0.3
    );
  }

  // Animate marquee wrapper
  if (marquee) {
    gsap.set(marquee, {
      opacity: 0,
      scale: 0.95,
    });

    tl.to(
      marquee,
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
      },
      0.5
    );
  }

  // Create ScrollTrigger
  const trigger = trackScrollTrigger(
    ScrollTrigger.create({
      trigger: section,
      animation: tl,
      start: "top 85%",
      once: true,
    })
  );

  return tl;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// About us Section Animation ////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const animateAboutUsSection = ({
  section,
  label,
  title,
  text,
  cta,
  image,
}: SectionAnimationElements) => {
  if (typeof window === "undefined" || !section) return null;

  console.log("Animating About Us Section");

  const tl = gsap.timeline();

  // Use direct animations instead of general initFadeAnimations()
  // to avoid conflicts
  if (label) {
    gsap.set(label, { opacity: 0, y: 20 });
    tl.to(label, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 0.2);
  }

  if (title) {
    gsap.set(title, { opacity: 0, y: 30 });
    tl.to(title, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 0.4);
  }

  if (text) {
    gsap.set(text, { opacity: 0, y: 30 });
    tl.to(text, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 0.6);
  }

  if (cta) {
    gsap.set(cta, { opacity: 0, y: 30 });
    tl.to(cta, { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.4)" }, 0.8);
  }

  if (image) {
    gsap.set(image, { opacity: 0, x: 50 });
    tl.to(image, { opacity: 1, x: 0, duration: 1.2, ease: "power2.out" }, 0.4);
  }

  // Create ScrollTrigger
  const trigger = trackScrollTrigger(
    ScrollTrigger.create({
      trigger: section,
      animation: tl,
      start: "top 80%",
      once: true,
    })
  );

  return tl;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Service Section Animation ////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const animateServicesSection = ({
  section,
  title,
  subtitle,
  grid,
}: SectionAnimationElements) => {
  if (typeof window === "undefined" || !section) return null;

  console.log("Animating Services Section");

  const tl = gsap.timeline();

  // Prepare section
  gsap.set(section, {
    visibility: "visible",
    opacity: 1,
  });

  // Animate elements with consistent pattern
  const animationSequence = [
    { el: title, props: { y: 30 }, index: 0.3, charAnim: true },
    { el: subtitle, props: { y: 30 }, index: 0.6 },
    { el: grid, props: { y: 30 }, index: 0.9 },
  ];

  animationSequence.forEach(({ el, props, index, charAnim }) => {
    if (!el) return;

    // Initial state
    gsap.set(el, {
      opacity: 0,
      ...props,
    });

    // Char animation for title if specified
    if (charAnim && title) {
      tl.add(() => {
        charAnimation(title);
      }, index);
    }

    // Animate to visible state
    tl.to(
      el,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.4)",
      },
      index
    );
  });

  // Create ScrollTrigger
  const trigger = trackScrollTrigger(
    ScrollTrigger.create({
      trigger: section,
      animation: tl,
      start: "top 80%",
      once: true,
    })
  );

  return tl;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Blog Carousel Section Animation ////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const animateBlogCarouselSection = ({
  section,
  title,
  subtitle,
  carousel,
  cta,
}: SectionAnimationElements) => {
  if (typeof window === "undefined" || !section) return null;

  console.log("Animating Blog Carousel Section");

  const tl = gsap.timeline();

  // Prepare section for animation
  gsap.set(section, {
    visibility: "visible",
    opacity: 1,
  });

  // Find title rows if title is a container with rows
  const titleRows = title?.querySelectorAll?.(".title-row");

  // Create animation sequence based on component structure
  if (titleRows?.length) {
    // If title has row elements, animate each row individually
    gsap.set(titleRows, { opacity: 0, y: 30 });

    titleRows.forEach((row, index) => {
      tl.to(
        row,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        0.3 + index * 0.2
      );
    });
  } else if (title) {
    // Standard title animation if no rows
    gsap.set(title, { opacity: 0, y: 30 });
    tl.to(
      title,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      0.3
    );
  }

  // Subtitle animation
  if (subtitle) {
    gsap.set(subtitle, { opacity: 0, x: -30 });
    tl.to(
      subtitle,
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      0.5
    );
  }

  // Carousel content animation
  if (carousel) {
    gsap.set(carousel, { opacity: 0, y: 40 });
    tl.to(
      carousel,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      },
      0.7
    );
  }

  // CTA button animation
  if (cta) {
    gsap.set(cta, { opacity: 0, y: 20 });
    tl.to(
      cta,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.4)",
      },
      0.9
    );
  }

  // Create ScrollTrigger with a lower start point to ensure it triggers reliably
  const trigger = trackScrollTrigger(
    ScrollTrigger.create({
      trigger: section,
      animation: tl,
      start: "top 90%", // Lower start point to ensure it triggers
      once: true,
      markers: false, // Enable for debugging, remove for production
    })
  );

  return tl;
};

// Clean up homepage animations in a selective way
export function cleanupHomepageAnimations() {
  if (typeof window === "undefined") return;

  console.log(
    "Cleaning up homepage animations:",
    scrollTriggerInstances.length,
    "instances"
  );

  // Kill all ScrollTriggers
  scrollTriggerInstances.forEach((trigger) => {
    if (trigger && typeof trigger.kill === "function") {
      trigger.kill();
    }
  });

  // Clear the instances array
  scrollTriggerInstances = [];

  // Clear match media queries
  ScrollTrigger.clearMatchMedia();

  // Refresh ScrollTrigger
  refreshScrollTrigger();
}
