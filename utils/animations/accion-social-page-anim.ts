import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Store all ScrollTrigger instances for each section to allow independent cleanup
const scrollTriggers = {
  hero: [] as ScrollTrigger[],
  values: [] as ScrollTrigger[],
  sustainability: [] as ScrollTrigger[],
  cta: [] as ScrollTrigger[],
  experiencia: [] as ScrollTrigger[],
};

// Track active timelines that need to be killed on page navigation/cleanup
const activeTimelines = {
  values: null as gsap.core.Timeline | null,
};

// Helper to safely add ScrollTrigger instances to our cleanup arrays
const trackScrollTrigger = (
  instance: ScrollTrigger,
  section: keyof typeof scrollTriggers
): ScrollTrigger => {
  scrollTriggers[section].push(instance);
  return instance;
};

// Main cleanup function that cleans everything
export function cleanupAccionSocialAnimations(): void {
  // Clean up all section animations
  Object.keys(scrollTriggers).forEach((section) => {
    const sectionKey = section as keyof typeof scrollTriggers;
    scrollTriggers[sectionKey].forEach((trigger) => {
      if (trigger) trigger.kill();
    });
    scrollTriggers[sectionKey] = [];
  });

  // Kill any active timelines
  Object.keys(activeTimelines).forEach((timelineKey) => {
    const key = timelineKey as keyof typeof activeTimelines;
    if (activeTimelines[key]) {
      activeTimelines[key]?.kill();
      activeTimelines[key] = null;
    }
  });
}

// Specific section cleanup functions
export function cleanupHeroAnimations(): void {
  scrollTriggers.hero.forEach((trigger) => {
    if (trigger) trigger.kill();
  });
  scrollTriggers.hero = [];
}

export function cleanupValuesSectionAnimations(): void {
  // Kill active timeline
  if (activeTimelines.values) {
    activeTimelines.values.kill();
    activeTimelines.values = null;
  }

  // Kill scroll triggers
  scrollTriggers.values.forEach((trigger) => {
    if (trigger) trigger.kill();
  });
  scrollTriggers.values = [];
}

export function cleanupSustainabilityAnimations(): void {
  scrollTriggers.sustainability.forEach((trigger) => {
    if (trigger) trigger.kill();
  });
  scrollTriggers.sustainability = [];
}

export function cleanupCTAAnimations(): void {
  scrollTriggers.cta.forEach((trigger) => {
    if (trigger) trigger.kill();
  });
  scrollTriggers.cta = [];
}

export function cleanupExperienciaAnimations(): void {
  scrollTriggers.experiencia.forEach((trigger) => {
    if (trigger) trigger.kill();
  });
  scrollTriggers.experiencia = [];
}

// ==========================================================================
// Hero Section Animations
// ==========================================================================

interface HeroAnimationRefs {
  heroArea: HTMLElement | null;
  bgContainer: HTMLElement | null;
  titleRef1: HTMLElement | null;
  titleRef2: HTMLElement | null;
  descriptionRef: HTMLElement | null;
  ctaRef: HTMLElement | null;
  decorElements?: {
    container: HTMLElement | null;
    dots: HTMLElement | null;
    line: HTMLElement | null;
    circle: HTMLElement | null;
    grid: HTMLElement | null;
  };
}

export function initAccionSocialHeroAnimations(refs: HeroAnimationRefs): void {
  if (typeof window === "undefined") return;

  // Make sure we have the essential elements
  if (
    !refs.heroArea ||
    !refs.bgContainer ||
    !refs.titleRef1 ||
    !refs.titleRef2 ||
    !refs.descriptionRef
  ) {
    console.warn("Missing essential hero animation elements");
    return;
  }

  // Create a master timeline to synchronize all animations
  const masterTimeline = gsap.timeline({
    defaults: {
      duration: 1.7,
      ease: "power2.out",
    },
  });

  // Background container animation
  gsap.set(refs.bgContainer, { scale: 1.3 });
  masterTimeline.to(refs.bgContainer, { scale: 0.9 }, 0);

  // Title animations
  gsap.set(refs.titleRef1, { x: 300, opacity: 0 });
  masterTimeline.to(refs.titleRef1, { x: 0, opacity: 1 }, 0);

  gsap.set(refs.titleRef2, { x: -300, opacity: 0 });
  masterTimeline.to(refs.titleRef2, { x: 0, opacity: 1 }, 0);

  gsap.set(refs.descriptionRef, { x: -500, opacity: 0 });
  masterTimeline.to(refs.descriptionRef, { x: 0, opacity: 1 }, 0);

  // Animate CTA if it exists
  if (refs.ctaRef) {
    gsap.set(refs.ctaRef, { y: 30, opacity: 0 });
    masterTimeline.to(refs.ctaRef, { y: 0, opacity: 1 }, 0);
  }

  // Animate decorative elements if they exist
  if (refs.decorElements?.container) {
    const decorElements = [
      refs.decorElements.dots,
      refs.decorElements.line,
      refs.decorElements.circle,
      refs.decorElements.grid,
    ].filter(Boolean);

    if (decorElements.length > 0) {
      gsap.set(decorElements, { opacity: 0, scale: 0 });
      masterTimeline.to(
        decorElements,
        {
          opacity: 1,
          scale: 1,
          stagger: 0.1,
        },
        0
      );
    }
  }
}

// ==========================================================================
// Values Section Animations
// ==========================================================================

interface ValuesSectionRefs {
  section: HTMLElement | null;
  title: HTMLElement | null;
  text: HTMLElement | null;
  tabs: HTMLElement | null;
  content: HTMLElement | null;
}

export function animateValuesSection(refs: ValuesSectionRefs): void {
  if (typeof window === "undefined") return;

  // Make sure we have the essential elements
  if (
    !refs.section ||
    !refs.title ||
    !refs.text ||
    !refs.tabs ||
    !refs.content
  ) {
    console.warn("Missing essential elements for values section animation");
    return;
  }

  // First clean up any existing animations
  cleanupValuesSectionAnimations();

  // Create a master timeline for the section
  const masterTimeline = gsap.timeline({
    paused: true,
    defaults: {
      duration: 0.8,
      ease: "power2.out",
    },
  });

  // Animate title words
  const titleWords = refs.title.querySelectorAll(".word");
  if (titleWords.length > 0) {
    gsap.set(titleWords, { y: 30, opacity: 0 });
    masterTimeline.to(
      titleWords,
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "power3.out",
      },
      0
    );
  }

  // Highlight animation
  const highlight = refs.title.querySelector(".highlight");
  if (highlight) {
    const highlightBg = highlight.querySelector("::after");
    if (highlightBg) {
      gsap.set(highlightBg, { width: "0%" });
      masterTimeline.to(
        highlightBg,
        {
          width: "100%",
          duration: 0.6,
        },
        0.4
      );
    }
  }

  // Text animation
  gsap.set(refs.text, { opacity: 0, y: 20 });
  masterTimeline.to(
    refs.text,
    {
      opacity: 1,
      y: 0,
    },
    0.2
  );

  // Tabs animation
  const tabs = refs.tabs.querySelectorAll(".values-section__tab");
  if (tabs.length > 0) {
    gsap.set(tabs, { opacity: 0, y: 15 });
    masterTimeline.to(
      tabs,
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
      },
      0.4
    );
  }

  // Content animation - animate header and values
  gsap.set(refs.content, { opacity: 0 });
  masterTimeline.to(
    refs.content,
    {
      opacity: 1,
    },
    0.6
  );

  // Animate value items with stagger
  const valueItems = refs.content.querySelectorAll(
    ".values-section__value-item"
  );
  if (valueItems.length > 0) {
    gsap.set(valueItems, { y: 30, opacity: 0 });
    masterTimeline.to(
      valueItems,
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
      },
      0.8
    );
  }

  // Animate social responsibility section if it exists
  const socialSection = refs.section.querySelector(
    ".values-section__social-responsibility"
  );
  if (socialSection) {
    gsap.set(socialSection, { opacity: 0, y: 30 });
    masterTimeline.to(
      socialSection,
      {
        opacity: 1,
        y: 0,
        duration: 1,
      },
      1
    );
  }

  // Create scroll-based trigger with once:true to prevent re-triggering
  trackScrollTrigger(
    ScrollTrigger.create({
      trigger: refs.section,
      start: "top 80%",
      animation: masterTimeline,
      once: true, // Important - only run once, not on every scroll
      onEnter: () => masterTimeline.play(),
    }),
    "values"
  );
}

// Separate function to handle tab content transitions without causing scrolling
export function animateTabContentChange(
  contentElement: HTMLElement | null
): void {
  if (!contentElement || typeof window === "undefined") return;

  // Kill any active content transition
  if (activeTimelines.values) {
    activeTimelines.values.kill();
  }

  // Create new timeline for tab content transition
  const tl = gsap.timeline({
    defaults: {
      ease: "power2.out",
      duration: 0.4,
    },
  });

  // Simple fade transition to avoid jarring changes
  tl.fromTo(contentElement, { opacity: 0.7 }, { opacity: 1 });

  // Find and animate value items with stagger
  const valueItems = contentElement.querySelectorAll(
    ".values-section__value-item"
  );
  if (valueItems.length > 0) {
    gsap.set(valueItems, { y: 15, opacity: 0 });
    tl.to(
      valueItems,
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.5,
      },
      0.1
    );
  }

  // Store timeline reference to kill later if needed
  activeTimelines.values = tl;
}

// ==========================================================================
// Sustainability Images Section Animations
// ==========================================================================

interface SustainabilityImagesRefs {
  section: HTMLElement | null;
  title: HTMLElement | null;
  cards: HTMLElement | null;
}

export function animateSustainabilityImagesSection(
  refs: SustainabilityImagesRefs
): void {
  if (typeof window === "undefined") return;

  // Make sure we have the essential elements
  if (!refs.section || !refs.title || !refs.cards) {
    console.warn(
      "Missing essential elements for sustainability images animation"
    );
    return;
  }

  // Clean up any existing animations for this section
  cleanupSustainabilityAnimations();

  // Create timeline
  const tl = gsap.timeline({
    paused: true,
    defaults: {
      duration: 0.8,
      ease: "power2.out",
    },
  });

  // Set initial states
  gsap.set(refs.title, { opacity: 0, y: 30 });

  const cards = refs.cards.querySelectorAll(".hover-card");
  if (cards.length > 0) {
    gsap.set(cards, { opacity: 0, y: 50 });
  }

  // Animate title
  tl.to(refs.title, { opacity: 1, y: 0 });

  // Animate cards
  if (cards.length > 0) {
    tl.to(
      cards,
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
      },
      "-=0.4"
    );
  }

  // Create ScrollTrigger and track for cleanup
  trackScrollTrigger(
    ScrollTrigger.create({
      trigger: refs.section,
      start: "top 80%",
      animation: tl,
      toggleActions: "play none none none",
      once: true,
    }),
    "sustainability"
  );
}

// ==========================================================================
// CTA Section Animations
// ==========================================================================

interface CTASectionElements {
  section: HTMLElement | null;
  content: HTMLElement | null;
  title: HTMLElement | null;
  text: HTMLElement | null;
  decor?: HTMLElement | null;
}

export function animateAccionSocialCTASection(
  elements: CTASectionElements
): void {
  if (typeof window === "undefined") return;

  const { section, content, title, text, decor } = elements;

  if (!section || !title || !text || !content) {
    console.warn("Missing essential elements for CTA section animation");
    return;
  }

  // Clean up any existing animations
  cleanupCTAAnimations();

  // Create timeline
  const tl = gsap.timeline({
    paused: true,
    defaults: {
      duration: 0.8,
      ease: "power2.out",
    },
  });

  // Get elements to animate
  const titleWords = title.querySelectorAll(".word");
  const highlight = title.querySelector(".highlight");

  // Set initial states if elements exist
  if (titleWords.length > 0) {
    gsap.set(titleWords, { opacity: 0, y: 20 });
  }

  if (highlight) {
    gsap.set(highlight, { backgroundSize: "0% 100%" });
  }

  gsap.set(text, { opacity: 0, y: 30 });
  gsap.set(content, { opacity: 0.8, y: 40 });

  // Animate title words
  if (titleWords.length > 0) {
    tl.to(titleWords, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
    });
  }

  // Animate highlight if it exists
  if (highlight) {
    tl.to(
      highlight,
      {
        backgroundSize: "100% 100%",
      },
      "-=0.4"
    );
  }

  // Animate text
  tl.to(
    text,
    {
      opacity: 1,
      y: 0,
    },
    "-=0.6"
  );

  // Animate content wrapper
  tl.to(
    content,
    {
      opacity: 1,
      y: 0,
    },
    "-=0.7"
  );

  // Animate decorative elements if they exist
  if (decor) {
    gsap.set(decor, { opacity: 0, scale: 0.95 });
    tl.to(
      decor,
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
      },
      "-=0.5"
    );
  }

  // Create ScrollTrigger and track for cleanup
  trackScrollTrigger(
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      animation: tl,
      toggleActions: "play none none none",
      once: true,
    }),
    "cta"
  );
}

// ==========================================================================
// Experiencia Section Animations
// ==========================================================================

interface ExperienciaSectionRefs {
  section: HTMLElement | null;
  title: HTMLElement | null;
  experiences: HTMLElement | null;
}

export function animateExperienciaSection(refs: ExperienciaSectionRefs): void {
  if (typeof window === "undefined") return;

  // Make sure we have the essential elements
  if (!refs.section || !refs.title || !refs.experiences) {
    console.warn(
      "Missing essential elements for experiencia section animation"
    );
    return;
  }

  // Clean up existing animations
  cleanupExperienciaAnimations();

  // Create timeline
  const tl = gsap.timeline({
    paused: true,
    defaults: {
      duration: 0.8,
      ease: "power2.out",
    },
  });

  // Set initial states
  const titleWords = refs.title.querySelectorAll(".word");
  if (titleWords.length > 0) {
    gsap.set(titleWords, { opacity: 0, y: 30 });
  }

  const experienceItems = refs.experiences.querySelectorAll(
    ".experiencia-section__item"
  );
  if (experienceItems.length > 0) {
    gsap.set(experienceItems, { opacity: 0, y: 50 });
  }

  // Animate title words
  if (titleWords.length > 0) {
    tl.to(titleWords, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
    });
  }

  // Animate experience items
  if (experienceItems.length > 0) {
    tl.to(
      experienceItems,
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
      },
      "-=0.4"
    );
  }

  // Create ScrollTrigger and track for cleanup
  trackScrollTrigger(
    ScrollTrigger.create({
      trigger: refs.section,
      start: "top 80%",
      animation: tl,
      toggleActions: "play none none none",
      once: true,
    }),
    "experiencia"
  );
}

