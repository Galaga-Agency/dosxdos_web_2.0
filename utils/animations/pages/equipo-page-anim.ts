"use client";

import { gsap } from "gsap";
import { SplitText } from "@/plugins";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { refreshScrollTrigger } from "../scrolltrigger-config";
import { isMobile } from "@/utils/device";

// Store all ScrollTrigger instances for cleanup
const scrollTriggerInstances: ScrollTrigger[] = [];

// Track ScrollTrigger instances for cleanup
function trackScrollTrigger(instance: ScrollTrigger): ScrollTrigger {
  scrollTriggerInstances.push(instance);
  return instance;
}

// Common fade animation setup - ENHANCED VERSION
function setupFadeAnimation(
  selector: string,
  initialProps: gsap.TweenVars,
  animProps: gsap.TweenVars,
  startPosition: string = "top center+=100"
) {
  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) return; // Fixed syntax error here

  gsap.set(selector, initialProps);
  const elementsArray = gsap.utils.toArray(selector);

  elementsArray.forEach((item: any) => {
    const tl = gsap.timeline({
      scrollTrigger: trackScrollTrigger(
        ScrollTrigger.create({
          trigger: item,
          start: startPosition,
          once: true,
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

  // Fade Bottom animations
  setupFadeAnimation(
    ".fade_bottom",
    { y: 40, opacity: 0, scale: 0.95 }, // Menor distancia pero añadimos escala
    { y: 0, opacity: 1, scale: 1, duration: 1.2, delay: 0.2 }, // Menor delay y duración
    "top center+=200" // Trigger más temprano
  );

  // Fade Top animations
  setupFadeAnimation(
    ".fade_top",
    { y: -40, opacity: 0, scale: 0.95 },
    { y: 0, opacity: 1, scale: 1, duration: 1.2 }
  );

  // Fade Left animations
  setupFadeAnimation(
    ".fade_left",
    { x: -40, opacity: 0, scale: 0.95 },
    { x: 0, opacity: 1, scale: 1, duration: 1.2 }
  );

  // Fade Right animations
  setupFadeAnimation(
    ".fade_right",
    { x: 40, opacity: 0, scale: 0.95 },
    { x: 0, opacity: 1, scale: 1, duration: 1.2 }
  );
}

// Title Animation Utility
export function charAnimation(current?: HTMLElement) {
  if (!current) return null;

  try {
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
  } catch (error) {
    console.error("Error in charAnimation:", error);

    // Fallback if SplitText fails
    gsap.set(current, { visibility: "visible", opacity: 1 });
    return gsap.timeline().from(current, { duration: 1, x: 30, opacity: 0 });
  }
}

// Enhanced description animation with SplitText
export function animateDescriptionWithSplitText(element: HTMLElement) {
  if (!element) return null;

  try {
    const splitDesc = new SplitText(element, { type: "lines" });
    gsap.set(element, { visibility: "visible", perspective: 400 });

    const descTl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        end: "bottom 60%",
        toggleActions: "play none none none",
      },
    });

    descTl.from(splitDesc.lines, {
      duration: 1,
      delay: 0.3,
      opacity: 0,
      rotationX: -80,
      force3D: true,
      transformOrigin: "top center -50",
      stagger: 0.1,
    });

    return descTl;
  } catch (error) {
    console.error("Error in animateDescriptionWithSplitText:", error);

    // Fallback if SplitText fails
    gsap.set(element, { visibility: "visible", opacity: 0, y: 20 });
    return gsap.to(element, { duration: 1, opacity: 1, y: 0 });
  }
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

  const tl = gsap.timeline();

  if (elements.section) {
    gsap.set(elements.section, {
      visibility: "visible",
      opacity: 1,
    });
  }

  // Set image visibility immediately
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
    const descriptionAnimation = animateDescriptionWithSplitText(
      elements.description
    );
  } else {
    // If no direct element reference, try to find it by class
    const descriptionEl = document.querySelector(".hero-section__description");
    if (descriptionEl) {
      animateDescriptionWithSplitText(descriptionEl as HTMLElement);
    }
  }

  const animationSequence = [
    { el: elements.label, props: { y: -30 }, index: 0.3 },
    { el: elements.title, props: { y: 0 }, index: 0.6, charAnim: true },
    { el: elements.underline, props: { width: 0 }, index: 1.0 },
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
    // Wait until everything is ready
    setTimeout(() => {
      const isMobileDevice = isMobile();

      // Apply parallax directly to the element
      if (!isMobileDevice && elements.image) {
        elements.image.setAttribute("data-speed", "0.9");
      } else if (elements.image) {
        elements.image.setAttribute("data-speed", "1");
      }

      // Refresh all scroll
      if ((window as any).__smoother__) {
        (window as any).__smoother__.refresh();
      }
      refreshScrollTrigger();
    }, 500); // Longer delay to make sure everything's ready
  }

  // Force refresh ScrollTrigger
  setTimeout(() => {
    refreshScrollTrigger();
  }, 100);

  return tl;
}

// Parallax for floating images with mobile device handling
function setupFloatingImagesParallax(floatingImages: any[]): void {
  try {
    // Check if device is mobile using your isMobile utility
    const isMobileDevice = isMobile();

    floatingImages.forEach(
      ({ container, inner, offset, innerOffset }, index) => {
        if (container && container.current) {
          // Only apply parallax to container on non-mobile devices
          if (!isMobileDevice) {
            // Calculate speed - SPECIAL CASE FOR IMAGE 3
            let containerSpeed;
            
            if (index === 2) { // Image 3 specifically
              // Slow down image 3 by setting speed closer to 1
              containerSpeed = 0.95; // Just slightly slower than normal
            } else {
              // Original calculation for other images
              containerSpeed = offset < 0 ? 1 + Math.abs(offset) / 100 : 1 - offset / 100;
            }

            // Keep values in reasonable range
            containerSpeed = Math.max(0.5, Math.min(1.5, containerSpeed));

            // Apply data-speed attribute
            container.current.setAttribute(
              "data-speed",
              containerSpeed.toString()
            );
          } else {
            // Force container to move at normal speed (no parallax) on mobile
            container.current.setAttribute("data-speed", "1");
          }
        }

        if (inner && inner.current) {
          // Apply parallax to inner element regardless of device
          // SPECIAL CASE FOR IMAGE 3 INNER
          let innerSpeed;
          
          if (index === 2) { // Image 3 inner specifically 
            // Slow down image 3 inner
            innerSpeed = 0.9; // Slower than normal
          } else {
            // Original calculation for other inners
            innerSpeed = innerOffset < 0
              ? 1 + Math.abs(innerOffset) / 200
              : 1 - innerOffset / 200;
          }

          // Keep values in reasonable range
          innerSpeed = Math.max(0.7, Math.min(1.3, innerSpeed));

          // Apply data-speed attribute
          inner.current.setAttribute("data-speed", innerSpeed.toString());
        }
      }
    );

    // Force refresh to ensure ScrollSmoother picks up the new attributes
    setTimeout(() => {
      if ((window as any).__smoother__) {
        (window as any).__smoother__.refresh();
      }
      refreshScrollTrigger();
    }, 100);
  } catch (error) {
    console.error("Error setting up floating images parallax:", error);
  }
}

// Also update the hero parallax function similarly
function setupHeroParallax(container: HTMLElement, target: HTMLElement) {
  if (!container || !target) return;

  try {
    // Check if device is mobile
    const isMobileDevice = isMobile();

    // Only apply parallax effect if not on mobile
    if (!isMobileDevice) {
      target.setAttribute("data-speed", "0.9");
    } else {
      // Set speed to 1 (no parallax) on mobile
      target.setAttribute("data-speed", "1");
    }

    // Force refresh ScrollTrigger
    setTimeout(() => {
      if ((window as any).__smoother__) {
        (window as any).__smoother__.refresh();
      }
      refreshScrollTrigger();
    }, 100);
  } catch (error) {
    console.error("Error setting up hero parallax:", error);
  }
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
    refreshScrollTrigger();
  }, 100);

  return tl;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// STATS SECTION ANIMATION ////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

export function animateStatsSection(elements: SectionAnimationElements) {
  if (typeof window === "undefined" || !elements.section) return;

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
    refreshScrollTrigger();
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
    refreshScrollTrigger();
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
  ScrollTrigger.getAll().forEach((trigger: any) => {
    trigger.kill();
  });

  // Clear match media queries
  ScrollTrigger.clearMatchMedia();

  // Refresh ScrollTrigger
  refreshScrollTrigger();
}

// Add type declaration for window.__smoother__
declare global {
  interface Window {
    __smoother__: any;
    cursorAnimationFrame?: number;
  }
}
