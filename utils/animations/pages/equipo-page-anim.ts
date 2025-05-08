"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "@/plugins";
import { refreshScrollTrigger } from "../scrolltrigger-config";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

// Store all ScrollTrigger instances for cleanup
const scrollTriggerInstances: ScrollTrigger[] = [];

// Track ScrollTrigger instances for cleanup
function trackScrollTrigger(instance: ScrollTrigger): ScrollTrigger {
  scrollTriggerInstances.push(instance);
  return instance;
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

// Define animation elements interface
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
  underline?: HTMLElement | null;
  description?: HTMLElement | null;
  stats?: HTMLElement | null;
  decor?: HTMLElement | null;
  logos?: HTMLElement | null;
  content?: HTMLElement | null;
  services?: HTMLElement | null;
  originStory?: HTMLElement | null;
  originImage?: HTMLElement | null;
  floatingImages?: any[];
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// HERO SECTION ANIMATION /////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

export function animateHeroSection(elements: SectionAnimationElements) {
  if (typeof window === "undefined" || !elements.section) return null;

  console.log("Animating Hero Section");

  const tl = gsap.timeline();

  if (elements.section) {
    gsap.set(elements.section, {
      visibility: "visible",
      opacity: 1,
    });
  }

  // Set image visibility without animating it
  if (elements.image) {
    gsap.set(elements.image, {
      visibility: "visible",
      opacity: 1,
    });
  }

  if (elements.label) {
    gsap.set(elements.label, {
      visibility: "visible",
      opacity: 1,
    });
  }

  if (elements.title) {
    gsap.set(elements.title, {
      visibility: "visible",
      opacity: 1,
    });
  }

  if (elements.description) {
    gsap.set(elements.description, {
      visibility: "visible",
      opacity: 1,
    });
  }

  const animationSequence = [
    { el: elements.label, props: { y: -30 }, index: 0.3 },
    { el: elements.title, props: { y: 0 }, index: 0.6, charAnim: true },
    { el: elements.underline, props: { width: 0 }, index: 1.0 },
    { el: elements.description, props: { y: 20 }, index: 1.2 },
    { el: elements.stats, props: { y: 20 }, index: 1.4 },
    { el: elements.decor, props: { scale: 0.8 }, index: 1.6 },
  ];

  animationSequence.forEach(({ el, props, index, charAnim }) => {
    if (!el) return;

    // Initial state
    gsap.set(el, {
      opacity: 0,
      ...props,
    });

    // Char animation for title if specified
    if (charAnim && elements.title) {
      tl.add(() => {
        if (elements.title) {
          charAnimation(elements.title);
        }
      }, index);
    }

    // Animate to visible state
    tl.to(
      el,
      {
        opacity: 1,
        ...(props.y !== undefined ? { y: 0 } : {}),
        ...(props.width !== undefined ? { width: "100%" } : {}),
        ...(props.scale !== undefined ? { scale: 1 } : {}),
        duration: 0.8,
        ease:
          props.y !== undefined
            ? "back.out(1.4)"
            : props.scale !== undefined
            ? "power3.out"
            : "power2.out",
      },
      index
    );
  });

  // Create ScrollTrigger
  ScrollTrigger.create({
    trigger: elements.section,
    animation: tl,
    start: "top 85%",
    once: true,
  });

  // Setup floating images parallax if available
  if (elements.floatingImages && elements.floatingImages.length) {
    setupFloatingImagesParallax(elements.floatingImages);
  }

  if (elements.section && elements.image) {
    setupHeroParallax(elements.section, elements.image);
  }

  // Force refresh ScrollTrigger
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);

  return tl;
}

// Parallax for hero section
function setupHeroParallax(container: HTMLElement, target: HTMLElement) {
  if (!container || !target) return;

  target.setAttribute("data-speed", "0.9");

  // Force refresh ScrollTrigger
  setTimeout(() => {
    if ((window as any).__smoother__) {
      (window as any).__smoother__.refresh();
    }
    ScrollTrigger.refresh();
  }, 100);
}

// Parallax for floating images
function setupFloatingImagesParallax(floatingImages: any[]): void {
  floatingImages.forEach(({ container, inner, offset, innerOffset }, index) => {
    if (container && container.current) {
      // Calculate smoother speed value
      let containerSpeed =
        offset < 0 ? 1 + Math.abs(offset) / 100 : 1 - offset / 100;

      // Keep values in reasonable range
      containerSpeed = Math.max(0.5, Math.min(1.5, containerSpeed));

      // Apply data-speed attribute
      container.current.setAttribute("data-speed", containerSpeed.toString());
    }

    if (inner && inner.current) {
      // Calculate speed value for inner element
      let innerSpeed =
        innerOffset < 0
          ? 1 + Math.abs(innerOffset) / 200
          : 1 - innerOffset / 200;

      // Keep values in reasonable range
      innerSpeed = Math.max(0.7, Math.min(1.3, innerSpeed));

      // Apply data-speed attribute
      inner.current.setAttribute("data-speed", innerSpeed.toString());
    }
  });

  // Force refresh to ensure ScrollSmoother picks up the new attributes
  setTimeout(() => {
    if ((window as any).__smoother__) {
      (window as any).__smoother__.refresh();
    }
    ScrollTrigger.refresh();
  }, 100);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// TEAM SECTION ANIMATION ////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

export function animateTeamSection(elements: SectionAnimationElements) {
  if (typeof window === "undefined" || !elements.section) return;

  console.log("Animating Team Section");

  const tl = gsap.timeline();

  // Set initial visibility
  gsap.set(elements.section, { visibility: "visible", opacity: 1 });

  // Animate title
  if (elements.title) {
    tl.from(
      elements.title,
      {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "back.out(1.4)",
      },
      0.2
    );
  }

  // Animate subtitle
  if (elements.subtitle) {
    tl.from(
      elements.subtitle,
      {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "back.out(1.4)",
      },
      0.4
    );
  }

  // Animate team grid
  if (elements.grid) {
    const gridItems = elements.grid.querySelectorAll(".hover-card");

    tl.from(
      gridItems,
      {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.4)",
      },
      0.6
    );
  }

  // Create ScrollTrigger
  ScrollTrigger.create({
    trigger: elements.section,
    animation: tl,
    start: "top 80%",
    once: true,
  });

  // Force refresh ScrollTrigger
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);

  return tl;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// STATS SECTION ANIMATION ////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

export function animateStatsSection(elements: SectionAnimationElements) {
  if (typeof window === "undefined" || !elements.section) return;

  console.log("Animating Stats Section");

  const tl = gsap.timeline();

  // Set initial visibility
  gsap.set(elements.section, { visibility: "visible", opacity: 1 });

  // Animate stats container
  if (elements.stats) {
    gsap.set(elements.stats, { opacity: 0, y: 30 });

    tl.to(
      elements.stats,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.4)",
      },
      0.5
    );

    // Animate each stat number
    const statItems = elements.stats.querySelectorAll(".stats-section__item");
    statItems.forEach((el, i) => {
      const valueEl = el.querySelector(".stats-section__number");
      const target = parseInt(valueEl?.getAttribute("data-value") || "0", 10);
      const suffix = valueEl?.getAttribute("data-suffix") || "";

      tl.to(
        { val: 0 },
        {
          val: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: function () {
            if (valueEl) {
              valueEl.textContent = Math.floor(this.targets()[0].val) + suffix;
            }
          },
        },
        0.8 + i * 0.2
      );

      const separator = el.querySelector(".stats-section__separator");
      if (separator) {
        tl.fromTo(
          separator,
          { width: "0%" },
          { width: "100%", duration: 1.2, ease: "power2.inOut" },
          0.8 + i * 0.2
        );
      }
    });
  }

  // Create ScrollTrigger
  ScrollTrigger.create({
    trigger: elements.section,
    animation: tl,
    start: "top 80%",
    once: true,
  });

  // Force refresh ScrollTrigger
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);

  return tl;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// CLIENTS SECTION ANIMATION //////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

export function animateClientsSection(elements: SectionAnimationElements) {
  if (typeof window === "undefined" || !elements.section) return;

  console.log("Animating Clients Section");

  const tl = gsap.timeline();

  // Set initial visibility
  gsap.set(elements.section, { visibility: "visible", opacity: 1 });

  const sequence = [
    { el: elements.title, props: { y: 30 }, index: 0.1 },
    { el: elements.text, props: { y: 20 }, index: 0.4 },
    { el: elements.logos, props: { y: 20 }, index: 0.6 },
    { el: elements.cta, props: { y: 20 }, index: 0.9 },
  ];

  sequence.forEach(({ el, props, index }) => {
    if (!el) return;
    gsap.set(el, { opacity: 0, ...props });

    tl.to(
      el,
      {
        opacity: 1,
        ...(props.y !== undefined ? { y: 0 } : {}),
        duration: 0.8,
        ease: "back.out(1.4)",
      },
      index
    );
  });

  // Create ScrollTrigger
  ScrollTrigger.create({
    trigger: elements.section,
    animation: tl,
    start: "top 85%",
    once: true,
  });

  // Floating decor loop animation
  if (elements.decor) {
    gsap.to(elements.decor, {
      y: -10,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }

  // Force refresh ScrollTrigger
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);

  return tl;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// CLEANUP FUNCTION ///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

export function cleanupEquipoAnimations() {
  if (typeof window === "undefined") return;

  console.log("⚠️ Cleaning up all equipo page animations");

  // Kill all ScrollTriggers
  ScrollTrigger.getAll().forEach((trigger) => {
    trigger.kill();
  });

  // Clear match media queries
  ScrollTrigger.clearMatchMedia();

  // Refresh ScrollTrigger
  refreshScrollTrigger();
}
