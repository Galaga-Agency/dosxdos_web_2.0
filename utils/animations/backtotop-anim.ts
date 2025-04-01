import gsap from "gsap";

/**
 * Creates and returns a GSAP timeline for the back-to-top button animations
 * @param el The HTML element to animate
 * @returns GSAP Timeline instance
 */
export function createBackToTopTimeline(el: HTMLElement) {
  // Set initial state
  gsap.set(el, { autoAlpha: 0, y: 50 });

  // Create animation timeline
  const timeline = gsap.timeline({ paused: true });
  timeline.to(el, {
    autoAlpha: 1,
    y: 0,
    duration: 0.4,
    ease: "power2.out",
  });

  return timeline;
}

/**
 * Handles scrolling to the top of the page
 * Compatible with both GSAP ScrollSmoother and native browser scrolling
 */
export function scrollToTop() {
  const smoother = (window as any).__smoother__;
  if (smoother && smoother.scrollTo) {
    smoother.scrollTo(0, { duration: 1.2 });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

/**
 * Gets the current scroll position, compatible with GSAP ScrollSmoother
 * @returns Current scroll position in pixels
 */
export function getScrollPosition(): number {
  return (window as any).__smoother__?.scrollTop() ?? window.scrollY;
}
