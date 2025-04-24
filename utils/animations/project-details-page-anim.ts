import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { charAnimation } from "@/utils/animations/title-anim";

// Store all ScrollTrigger instances for cleanup
const scrollTriggerInstances: ScrollTrigger[] = [];

// Interface for animation references
interface HeroAnimationRefs {
  heroSection: HTMLElement | null;
  heroImage: HTMLElement | null;
  heroTitle: HTMLElement | null;
  heroSubtitle: HTMLElement | null;
  heroDescription: HTMLElement | null;
  heroMeta: HTMLElement | null;
  [key: string]: HTMLElement | null;
}

/**
 * Initialize hero section animations for project details page
 */
export function initHeroAnimations(refs: HeroAnimationRefs) {
  if (typeof window === "undefined") return;

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // Setup hero parallax
  if (refs.heroSection && refs.heroImage) {
    setupHeroParallax(refs.heroSection, refs.heroImage);
  }

  // Character animation for title
  if (refs.heroTitle) {
    charAnimation(refs.heroTitle);
  }

  // Create a timeline for hero content animations
  const heroTimeline = gsap.timeline({
    defaults: { ease: "power3.out" },
    delay: 0.3,
  });

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
    ScrollTrigger.refresh();
  }, 300);
}

/**
 * Sets up parallax effect for hero section
 */
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

/**
 * Track ScrollTrigger instances for cleanup
 */
function trackScrollTrigger(instance: ScrollTrigger): ScrollTrigger {
  scrollTriggerInstances.push(instance);
  return instance;
}

/**
 * Clean up all ScrollTrigger instances
 */
export function cleanupProjectDetailsAnimations(): void {
  // Kill all tracked ScrollTrigger instances
  scrollTriggerInstances.forEach((trigger) => {
    if (trigger) trigger.kill();
  });

  // Clear the array
  scrollTriggerInstances.length = 0;

  // Clear any other GSAP animations
  if (typeof window !== "undefined") {
    gsap.killTweensOf(".portfolio-hero__title");
    gsap.killTweensOf(".portfolio-hero__subtitle");
    gsap.killTweensOf(".portfolio-hero__description");
    gsap.killTweensOf(".portfolio-hero__meta");
    gsap.killTweensOf(".char");
  }
}
