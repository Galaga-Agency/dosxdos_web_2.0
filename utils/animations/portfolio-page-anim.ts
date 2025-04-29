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

  // Kill any text fill animations
  gsap.killTweensOf(".text-outline");
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

  if (!section || !projects) return;

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
      ease: "expo.out",
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
      amount: 1.5,
      from: "start",
    },
    delay: title ? 1.8 : 1.5,
    ease: "power3.out",
  });

  
  // CTA button animation if it exists
  if (ctaButton) {
    const ctaTl = gsap.timeline();

    ctaTl.fromTo(
      ctaButton,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6 }
    );
  }

}
