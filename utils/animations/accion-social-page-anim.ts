import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Store all ScrollTrigger instances for cleanup
const scrollTriggerInstances: ScrollTrigger[] = [];

// Helper to safely add ScrollTrigger instances to our cleanup array
const trackScrollTrigger = (instance: ScrollTrigger): ScrollTrigger => {
  scrollTriggerInstances.push(instance);
  return instance;
};

// Function to clean up all ScrollTrigger instances
export function cleanupAccionSocialAnimations(): void {
  // Kill all tracked ScrollTrigger instances
  scrollTriggerInstances.forEach((trigger) => {
    if (trigger) trigger.kill();
  });

  // Clear the array
  scrollTriggerInstances.length = 0;
}

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

// Initialize all hero animations
export function initAccionSocialHeroAnimations(refs: HeroAnimationRefs): void {
  if (typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

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
  const masterTimeline = gsap.timeline();

  // Background container animation
  gsap.set(refs.bgContainer, { scale: 1.3 });
  masterTimeline.to(
    refs.bgContainer,
    {
      scale: 0.9,
      duration: 1.7,
      ease: "power2.out",
    },
    0
  );

  // Title animations
  gsap.set(refs.titleRef1, { x: 300, opacity: 0 });
  masterTimeline.to(
    refs.titleRef1,
    {
      x: 0,
      opacity: 1,
      duration: 1.7,
      ease: "power2.out",
    },
    0
  );

  gsap.set(refs.titleRef2, { x: -300, opacity: 0 });
  masterTimeline.to(
    refs.titleRef2,
    {
      x: 0,
      opacity: 1,
      duration: 1.7,
      ease: "power2.out",
    },
    0
  );

  gsap.set(refs.descriptionRef, { x: -500, opacity: 0 });
  masterTimeline.to(
    refs.descriptionRef,
    {
      x: 0,
      opacity: 1,
      duration: 1.7,
      ease: "power2.out",
    },
    0
  );

  // Animate CTA if it exists
  if (refs.ctaRef) {
    gsap.set(refs.ctaRef, { y: 30, opacity: 0 });
    masterTimeline.to(
      refs.ctaRef,
      {
        y: 0,
        opacity: 1,
        duration: 1.7,
        ease: "power2.out",
      },
      0
    );
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
          duration: 1.7,
          ease: "power2.out",
          stagger: 0.1,
        },
        0
      );
    }
  }
}

interface ValuesSectionRefs {
  section: HTMLElement | null;
  title: HTMLElement | null;
  text: HTMLElement | null;
  values: HTMLElement | null;
  decor?: HTMLElement | null;
}

export function animateValuesSection(refs: ValuesSectionRefs): void {
  if (typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  // Make sure we have the essential elements
  if (!refs.section || !refs.title || !refs.text || !refs.values) {
    console.warn("Missing essential elements for values section animation");
    return;
  }

  // Create a master timeline to synchronize all animations
  const masterTimeline = gsap.timeline();

  // Animate title words
  const titleWords = refs.title.querySelectorAll(".word");
  if (titleWords.length > 0) {
    gsap.set(titleWords, { y: 50, opacity: 0 });
    masterTimeline.to(
      titleWords,
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
      },
      0
    );
  }

  // Highlight animation
  const highlight = refs.title.querySelector(".highlight");
  if (highlight) {
    masterTimeline.to(
      highlight,
      {
        backgroundSize: "100% 100%",
        duration: 1,
        ease: "power2.out",
      },
      0.6
    );
  }

  // Text animation
  gsap.set(refs.text, { opacity: 0, x: -30 });
  masterTimeline.to(
    refs.text,
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out",
    },
    0.3
  );

  // Animate values columns with stagger
  const valueColumns = refs.values.querySelectorAll(
    ".values-section__value-column"
  );
  if (valueColumns.length > 0) {
    gsap.set(valueColumns, { y: 50, opacity: 0 });
    masterTimeline.to(
      valueColumns,
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      },
      0.5
    );

    // Animate value items within each column
    valueColumns.forEach((column, index) => {
      const valueItems = column.querySelectorAll(".values-section__value-item");
      if (valueItems.length > 0) {
        gsap.set(valueItems, { opacity: 0, y: 10 });
        masterTimeline.to(
          valueItems,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power1.out",
          },
          0.8 + index * 0.2
        );
      }
    });
  }

  // Animate decorative elements
  if (refs.decor) {
    const decorElements = refs.decor.querySelectorAll(".values-section__decor");
    if (decorElements.length > 0) {
      gsap.set(decorElements, { opacity: 0, scale: 0.5 });
      masterTimeline.to(
        decorElements,
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power2.out",
        },
        0.3
      );
    }
  }

  // Create scroll-based animations and track for cleanup
  trackScrollTrigger(
    ScrollTrigger.create({
      trigger: refs.section,
      start: "top center",
      animation: masterTimeline,
      once: true,
    })
  );
}

interface SustainabilityImagesRefs {
  section: HTMLElement | null;
  title: HTMLElement | null;
  cards: HTMLElement | null;
}

export function animateSustainabilityImagesSection(
  refs: SustainabilityImagesRefs
): void {
  if (typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  // Make sure we have the essential elements
  if (!refs.section || !refs.title || !refs.cards) {
    console.warn(
      "Missing essential elements for sustainability images animation"
    );
    return;
  }

  // Create timeline
  const tl = gsap.timeline();

  // Set initial states
  gsap.set(refs.title, { opacity: 0, y: 30 });

  const cards = refs.cards.querySelectorAll(".hover-card");
  if (cards.length > 0) {
    gsap.set(cards, { opacity: 0, y: 50 });
  }

  // Animate title
  tl.to(refs.title, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  // Animate cards
  if (cards.length > 0) {
    tl.to(
      cards,
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.4"
    );
  }

  // Create ScrollTrigger and track for cleanup
  trackScrollTrigger(
    ScrollTrigger.create({
      trigger: refs.section,
      start: "top 80%",
      end: "bottom 20%",
      animation: tl,
      toggleActions: "play none none none",
    })
  );
}

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

  gsap.registerPlugin(ScrollTrigger);

  const { section, content, title, text, decor } = elements;

  if (!section || !title || !text || !content) {
    console.warn("Missing essential elements for CTA section animation");
    return;
  }

  // Create timeline
  const tl = gsap.timeline();

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
      ease: "power2.out",
      duration: 0.8,
    });
  }

  // Animate highlight if it exists
  if (highlight) {
    tl.to(
      highlight,
      {
        backgroundSize: "100% 100%",
        duration: 0.8,
        ease: "power2.out",
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
      duration: 0.8,
      ease: "power2.out",
    },
    "-=0.6"
  );

  // Animate content wrapper
  tl.to(
    content,
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
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
        ease: "power2.out",
      },
      "-=0.5"
    );
  }

  // Create ScrollTrigger and track for cleanup
  trackScrollTrigger(
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      end: "bottom 20%",
      animation: tl,
      toggleActions: "play none none none",
    })
  );
}

interface ExperienciaSectionRefs {
  section: HTMLElement | null;
  title: HTMLElement | null;
  experiences: HTMLElement | null;
}

export function animateExperienciaSection(refs: ExperienciaSectionRefs): void {
  if (typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  // Make sure we have the essential elements
  if (!refs.section || !refs.title || !refs.experiences) {
    console.warn("Missing essential elements for experiencia section animation");
    return;
  }

  // Create timeline
  const tl = gsap.timeline();

  // Set initial states
  const titleWords = refs.title.querySelectorAll(".word");
  if (titleWords.length > 0) {
    gsap.set(titleWords, { opacity: 0, y: 30 });
  }
  
  const experienceItems = refs.experiences.querySelectorAll('.experiencia-section__item');
  if (experienceItems.length > 0) {
    gsap.set(experienceItems, { opacity: 0, y: 50 });
  }

  // Animate title words
  if (titleWords.length > 0) {
    tl.to(titleWords, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out"
    });
  }

  // Animate experience items
  if (experienceItems.length > 0) {
    tl.to(experienceItems, {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4");
  }

  // Create ScrollTrigger and track for cleanup
  trackScrollTrigger(ScrollTrigger.create({
    trigger: refs.section,
    start: "top 80%",
    end: "bottom 20%",
    animation: tl,
    toggleActions: "play none none none"
  }));
}
