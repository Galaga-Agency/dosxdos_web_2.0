import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Store all ScrollTrigger instances for cleanup
const scrollTriggerInstances: ScrollTrigger[] = [];

// Tracking mechanism for animated elements
const animatedElements = new Set<Element>();

// Helper to safely add ScrollTrigger instances to our cleanup array
export const trackScrollTrigger = (instance: ScrollTrigger): ScrollTrigger => {
  scrollTriggerInstances.push(instance);
  return instance;
};

export function initScrollTriggerConfig() {
  if (typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
  });

  // Prevent scroll-linked animations during rapid scrolling
  ScrollTrigger.normalizeScroll({
    allowNestedScroll: true,
    lockAxis: false,
    type: "touch,wheel,pointer",
  });
}

export function cleanupScrollTriggers() {
  // Kill all tracked ScrollTrigger instances
  scrollTriggerInstances.forEach((trigger) => {
    if (trigger) trigger.kill();
  });

  // Clear the array
  scrollTriggerInstances.length = 0;

  // Clear animated elements tracking
  animatedElements.clear();

  // Kill all ScrollTriggers and refresh
  ScrollTrigger.getAll().forEach((st) => st.kill());
  ScrollTrigger.clearMatchMedia();
  ScrollTrigger.refresh();
}

// Refresh ScrollTrigger when layout changes
export function refreshScrollTrigger() {
  if (typeof window === "undefined") return;

  // Use setTimeout to ensure it runs after DOM updates
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
}

// Function to create a ScrollTrigger with an animation timeline
export function createScrollAnimation(
  trigger: Element | string,
  animation: gsap.core.Timeline,
  options: {
    start?: string;
    end?: string;
    toggleActions?: string;
    markers?: boolean;
    id?: string;
    once?: boolean;
  } = {}
) {
  const {
    start = "top 80%",
    end = "bottom 20%",
    toggleActions = "play none none none",
    markers = false,
    id,
    once = true, // Default to single trigger
  } = options;

  // Convert trigger to an element if it's a string
  const triggerElement =
    typeof trigger === "string" ? document.querySelector(trigger) : trigger;

  // Check if this element has already been animated
  if (triggerElement && animatedElements.has(triggerElement)) {
    return null;
  }

  // Prepare ScrollTrigger configuration
  const scrollTriggerConfig: Parameters<typeof ScrollTrigger.create>[0] = {
    trigger,
    start,
    end,
    animation,
    toggleActions: once ? "play none none none" : toggleActions,
    markers,
    id,
  };

  // Conditionally add onComplete if once is true
  if (once && triggerElement) {
    (scrollTriggerConfig as any).onComplete = () => {
      animatedElements.add(triggerElement);
    };
  }

  // Create and track ScrollTrigger
  const st = trackScrollTrigger(ScrollTrigger.create(scrollTriggerConfig));

  return st;
}

// Helper to check if an element has been animated
export function hasBeenAnimated(element: Element): boolean {
  return animatedElements.has(element);
}

// Optional: Manually mark an element as animated
export function markAsAnimated(element: Element) {
  animatedElements.add(element);
}
