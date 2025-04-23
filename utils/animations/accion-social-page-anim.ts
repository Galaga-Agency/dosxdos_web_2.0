import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface HeroAnimationRefs {
  heroArea: HTMLElement | null;
  bgContainer: HTMLElement | null;
  titleRef1: HTMLElement | null;
  titleRef2: HTMLElement | null;
  descriptionRef: HTMLElement | null;
  ctaRef: HTMLElement | null;
  decorElements: {
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
    return;
  }

  // Create a master timeline to synchronize all animations
  const masterTimeline = gsap.timeline();

  // Background container animation - using the same duration as title animations (1.7s)
  gsap.set(refs.bgContainer, { scale: 1.3 });
  masterTimeline.to(
    refs.bgContainer,
    {
      scale: 0.9,
      duration: 1.7, // Same as title animation
      ease: "power2.out",
    },
    0
  ); // Start at 0

  // Title animations - perfectly synchronized with background
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
  ); // Start at the same time as background

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
  ); // Start at the same time

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
  ); // Start at the same time

  // Animate CTA
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
    ); // Start at the same time
  }

  // Animate decorative elements
  if (refs.decorElements && refs.decorElements.container) {
    const decorElements = [
      refs.decorElements.dots,
      refs.decorElements.line,
      refs.decorElements.circle,
      refs.decorElements.grid,
    ].filter(Boolean);

    // Set initial state
    gsap.set(decorElements, { opacity: 0, scale: 0 });

    // Add to timeline
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
    ); // Start at the same time
  }
}

interface ValuesSectionRefs {
  section: HTMLElement | null;
  title: HTMLElement | null;
  text: HTMLElement | null;
  values: HTMLElement | null;
  decor: HTMLElement | null;
}

export function animateValuesSection(refs: ValuesSectionRefs): void {
  if (typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  // Make sure we have the essential elements
  if (!refs.section || !refs.title || !refs.text || !refs.values) {
    return;
  }

  // Create a master timeline to synchronize all animations
  const masterTimeline = gsap.timeline();

  // Animate title words
  const titleWords = refs.title.querySelectorAll(".word");
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
    0 // Start at the beginning
  );

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
      0.6 // Start slightly after words animation begins
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
    0.3 // Start after title animation begins
  );

  // Animate values columns with stagger
  if (refs.values) {
    const valueColumns = refs.values.querySelectorAll(
      ".values-section__value-column"
    );
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
      0.5 // Start after title animation begins
    );

    // Animate value items within each column for a cascading effect
    valueColumns.forEach((column) => {
      const valueItems = column.querySelectorAll(".values-section__value-item");
      gsap.set(valueItems, { opacity: 0, y: 10 });

      const columnIndex = Array.from(valueColumns).indexOf(column as Element);

      masterTimeline.to(
        valueItems,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power1.out",
        },
        0.8 + columnIndex * 0.2 // Stagger based on column index
      );
    });
  }

  // Animate decorative elements
  if (refs.decor) {
    const decorElements = refs.decor.querySelectorAll(".values-section__decor");
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
      0.3 // Start after title animation begins
    );
  }

  // Create scroll-based animations for elements
  ScrollTrigger.create({
    trigger: refs.section,
    start: "top center",
    animation: masterTimeline,
    once: true,
  });
}
