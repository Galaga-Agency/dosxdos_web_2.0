import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "@/plugins";

// Store all ScrollTrigger instances for cleanup
const scrollTriggerInstances: ScrollTrigger[] = [];

// Helper to safely add ScrollTrigger instances to our cleanup array
const trackScrollTrigger = (instance: ScrollTrigger): ScrollTrigger => {
  scrollTriggerInstances.push(instance);
  return instance;
};

// Function to clean up all ScrollTrigger instances
export function cleanupAllAnimations(): void {
  // Kill all tracked ScrollTrigger instances
  scrollTriggerInstances.forEach((trigger) => {
    if (trigger) trigger.kill();
  });

  // Clear the array
  scrollTriggerInstances.length = 0;
}

// Portfolio page animation refs interface
interface PortfolioPageAnimationRefs {
  section: HTMLDivElement | null;
  title?: HTMLHeadingElement | null;
  projects: HTMLDivElement | null;
  infoSection: HTMLDivElement | null;
  ctaButton: HTMLDivElement | null;
}

// Main animation function
export function initPortfolioPageAnimations(
  refs: PortfolioPageAnimationRefs
): void {
  if (typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  const { section, title, projects, infoSection, ctaButton } = refs;

  if (!section || !projects || !infoSection || !ctaButton) return;

  // Cleanup previous animations
  cleanupAllAnimations();

  // Projects list animation
  const projectItems = projects.querySelectorAll(
    ".portfolio-page__project-item"
  );

  // Prepare project items before animation
  gsap.set(projectItems, {
    opacity: 0,
    x: 100,
    scale: 0.98,
  });

  const projectTl = gsap.timeline({
    defaults: {
      ease: "expo.out", // Extremely smooth ease-out
      duration: 0.8,
    },
  });

  // Convert NodeList to Array for more predictable staggering
  const projectArray = Array.from(projectItems);

  projectTl.to(projectArray, {
    opacity: 1,
    x: 0,
    scale: 1,
    stagger: {
      amount: 1.5, // Spread the total stagger time over the items
      from: "start", // Start staggering from the first item
    },
    delay: title ? 1.8 : 1.5, // Adjust delay if title is animated
    ease: "power3.out",
  });

  // Title char animation
  if (title) {
    gsap.set(title, {
      visibility: "hidden",
      perspective: 300,
    });

    const itemSplitted = new SplitText(title, {
      type: "chars, words",
    });

    gsap.set(title, { visibility: "visible" });

    const tl = gsap.timeline();

    tl.from(itemSplitted.chars, {
      duration: 1,
      x: 100,
      autoAlpha: 0,
      stagger: 0.05,
      delay: 1.5, // Match page transition timing
    });
  }

  // Info section animation
  const infoParagraphs = infoSection.querySelectorAll("p");

  // Modify ScrollTrigger to trigger earlier
  const infoTrigger = ScrollTrigger.create({
    trigger: infoSection,
    start: "top 80%", // Trigger much earlier
    onEnter: () => {
      gsap.fromTo(
        infoSection,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8 }
      );

      gsap.fromTo(
        infoParagraphs,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
        }
      );
    },
    once: true, // Ensure it only triggers once
  });

  // CTA button animation
  const ctaTl = gsap.timeline();

  ctaTl.fromTo(
    ctaButton,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 0.6 }
  );

  // Track ScrollTrigger instances for cleanup
  trackScrollTrigger(infoTrigger);
}
