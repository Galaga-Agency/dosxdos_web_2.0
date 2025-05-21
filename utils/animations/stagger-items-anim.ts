"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";

// Register GSAP plugins if in browser environment
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Animates items with a staggered effect
 * @param selector - CSS selector for the items to animate
 * @param options - Animation options
 */
export function staggerItemsAnimation(
  selector: string = ".stagger-item",
  options: {
    container?: string | Element;
    duration?: number;
    stagger?: number;
    delay?: number;
    fromY?: number;
    fromX?: number;
    fromOpacity?: number;
    ease?: string;
    once?: boolean;
    onComplete?: () => void;
  } = {}
) {
  if (typeof window === "undefined") return;

  // Default options
  const {
    container = document,
    duration = 0.6,
    stagger = 0.1,
    delay = 0,
    fromY = 30,
    fromX = 0,
    fromOpacity = 0,
    ease = "power3.out",
    once = true,
    onComplete = () => {},
  } = options;

  // Find container element
  const containerElement =
    typeof container === "string"
      ? document.querySelector(container)
      : container;

  if (!containerElement) {
    console.warn(`Container not found for stagger animation`);
    return;
  }

  // Find items to animate
  const items = gsap.utils.toArray(containerElement.querySelectorAll(selector));

  if (items.length === 0) {
    console.warn(`No items found for selector: ${selector}`);
    onComplete();
    return;
  }

  // Set initial state
  gsap.set(items, {
    opacity: fromOpacity,
    y: fromY,
    x: fromX,
  });

  // Create the animation
  gsap.to(items, {
    opacity: 1,
    y: 0,
    x: 0,
    duration: duration,
    stagger: stagger,
    delay: delay,
    ease: ease,
    onComplete: onComplete,
  });
}

/**
 * Animates items with a scroll-triggered staggered effect
 * @param selector - CSS selector for the items to animate
 * @param options - Animation options
 */
export function scrollStaggerItemsAnimation(
  selector: string = ".stagger-item",
  options: {
    container?: string | Element;
    duration?: number;
    stagger?: number;
    fromY?: number;
    fromX?: number;
    fromOpacity?: number;
    ease?: string;
    once?: boolean;
    start?: string;
    end?: string;
    onComplete?: () => void;
  } = {}
) {
  if (typeof window === "undefined") return;

  // Default options
  const {
    container = document,
    duration = 0.6,
    stagger = 0.1,
    fromY = 30,
    fromX = 0,
    fromOpacity = 0,
    ease = "power3.out",
    once = true,
    start = "top 85%",
    end = "bottom 15%",
    onComplete = () => {},
  } = options;

  // Find container element
  const containerElement =
    typeof container === "string"
      ? document.querySelector(container)
      : container;

  if (!containerElement) {
    console.warn(`Container not found for scroll stagger animation`);
    return;
  }

  // Find items to animate
  const items = gsap.utils.toArray(containerElement.querySelectorAll(selector));

  if (items.length === 0) {
    console.warn(`No items found for selector: ${selector}`);
    onComplete();
    return;
  }

  // Set initial state
  gsap.set(items, {
    opacity: fromOpacity,
    y: fromY,
    x: fromX,
  });

  // Create the ScrollTrigger animation
  ScrollTrigger.create({
    trigger: containerElement,
    start: start,
    once: once,
    onEnter: () => {
      gsap.to(items, {
        opacity: 1,
        y: 0,
        x: 0,
        duration: duration,
        stagger: stagger,
        ease: ease,
        onComplete: onComplete,
      });
    },
  });
}

/**
 * Utility function specifically for paginated items
 * This should be called whenever the page changes
 */
export function animatePaginatedItems(
  itemSelector: string = ".stagger-item",
  options: {
    container?: string | Element;
    duration?: number;
    stagger?: number;
    delay?: number;
    fromY?: number;
    ease?: string;
    onComplete?: () => void;
  } = {}
) {
  // Simply wrap staggerItemsAnimation with default settings optimized for pagination
  staggerItemsAnimation(itemSelector, {
    duration: options.duration || 0.5,
    stagger: options.stagger || 0.08,
    delay: options.delay || 0.1,
    fromY: options.fromY || 20,
    ease: options.ease || "power2.out",
    once: true,
    ...options,
  });
}
