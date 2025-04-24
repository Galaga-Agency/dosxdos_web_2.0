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
export function cleanupAllAnimations(): void {
  // Kill all tracked ScrollTrigger instances
  scrollTriggerInstances.forEach((trigger) => {
    if (trigger) trigger.kill();
  });

  // Clear the array
  scrollTriggerInstances.length = 0;
}

// Types for animation references
interface HeroAnimationRefs {
  titleRef: React.RefObject<HTMLHeadingElement>;
  underlineRef: React.RefObject<HTMLDivElement>;
  heroImageContainerRef: React.RefObject<HTMLDivElement>;
  heroImageRef: React.RefObject<HTMLDivElement>;
  descriptionRef: React.RefObject<HTMLDivElement>;
  statsRef: React.RefObject<HTMLDivElement>;
  decorElements?: {
    container: React.RefObject<HTMLDivElement>;
    dots: React.RefObject<HTMLDivElement>;
    line: React.RefObject<HTMLDivElement>;
    circle: React.RefObject<HTMLDivElement>;
    grid: React.RefObject<HTMLDivElement>;
  };
  floatingImages: FloatingImage[];
}

interface FloatingImage {
  container: React.RefObject<HTMLDivElement>;
  inner: React.RefObject<HTMLDivElement>;
  offset: number;
  innerOffset: number;
}

// Hero section animations initialization
export function initHeroAnimations(refs: HeroAnimationRefs): void {
  if (typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  const {
    titleRef,
    underlineRef,
    heroImageContainerRef,
    heroImageRef,
    descriptionRef,
    statsRef,
    decorElements,
    floatingImages,
  } = refs;

  // Set up parallax for hero image
  setupParallax(heroImageContainerRef, heroImageRef);

  const timeline = gsap.timeline({
    defaults: { ease: "power3.out" },
    delay: 0.5,
  });

  if (titleRef.current) {
    timeline.fromTo(
      titleRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.7 },
      0
    );
  }

  if (underlineRef.current) {
    timeline.fromTo(
      underlineRef.current,
      { width: 0, opacity: 0 },
      { width: 120, opacity: 1, duration: 0.8 },
      0.5
    );
  }

  if (descriptionRef.current) {
    timeline.fromTo(
      descriptionRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1 },
      0.7
    );
  }

  if (statsRef.current) {
    const statItems = statsRef.current.querySelectorAll(".hero-section__stat");
    timeline.fromTo(
      statItems,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.8 },
      0.9
    );

    const statNumbers = statsRef.current.querySelectorAll(
      ".hero-section__stat-value"
    );
    statNumbers.forEach((element) => {
      const targetValue = parseInt(
        element.getAttribute("data-target") || "0",
        10
      );
      const counter = { val: targetValue };

      // Animation for counting up stats - no clearing of text content
      timeline.fromTo(
        counter,
        { val: 0 },
        {
          val: targetValue,
          duration: 1.8,
          ease: "power1.inOut",
          onUpdate: function () {
            element.textContent = Math.round(counter.val).toString();
          },
        },
        1.2
      );
    });
  }

  if (decorElements?.container.current) {
    const decorItems = [
      decorElements.dots.current,
      decorElements.line.current,
      decorElements.circle.current,
      decorElements.grid.current,
    ].filter(Boolean);

    timeline.fromTo(
      decorItems,
      { opacity: 0, scale: 0.8, y: 20 },
      {
        opacity: (i: number) => (i === 0 ? 0.3 : i === 3 ? 0.5 : 1),
        scale: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
      },
      1
    );
  }

  floatingImages.forEach(({ container }) => {
    if (container.current) {
      const corners = container.current.querySelectorAll(".corner");
      timeline.fromTo(
        corners,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, delay: 0.2 },
        1.5
      );
    }
  });

  setupFloatingImagesParallax(floatingImages);

  // Refresh ScrollTrigger to ensure all is registered properly
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 300);
}

function setupParallax(
  containerRef: React.RefObject<HTMLElement>,
  targetRef: React.RefObject<HTMLElement>
): void {
  if (!containerRef.current || !targetRef.current) return;

  gsap.set(targetRef.current, { y: 0 });

  setTimeout(() => {
    if (!containerRef.current || !targetRef.current) return;

    const instance = ScrollTrigger.create({
      id: "hero-parallax",
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1.2,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        gsap.to(targetRef.current, {
          y: `-${self.progress * 20}%`,
          ease: "none",
          overwrite: "auto",
        });
      },
    });

    // Track this ScrollTrigger instance for cleanup
    trackScrollTrigger(instance);
  }, 200);
}

function setupFloatingImagesParallax(floatingImages: FloatingImage[]): void {
  floatingImages.forEach((image, index) => {
    const { container, inner, offset, innerOffset } = image;

    if (container.current) {
      const containerInstance = ScrollTrigger.create({
        id: `floating-container-${index}`,
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.8,
        onUpdate: (self) => {
          gsap.to(container.current, {
            y: `${self.progress * offset}%`,
            ease: "none",
            overwrite: "auto",
          });
        },
      });

      // Track this ScrollTrigger instance for cleanup
      trackScrollTrigger(containerInstance);
    }

    if (inner.current && inner.current.parentElement) {
      const innerInstance = ScrollTrigger.create({
        id: `floating-inner-${index}`,
        trigger: inner.current.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          gsap.to(inner.current, {
            y: `${self.progress * innerOffset}%`,
            ease: "none",
            overwrite: "auto",
          });
        },
      });

      // Track this ScrollTrigger instance for cleanup
      trackScrollTrigger(innerInstance);
    }
  });
}

// Animate EquipoPage decorations
export function animateDecorations(elements: (HTMLElement | null)[]): void {
  if (!elements.length) return;

  // Filter out null elements
  const validElements = elements.filter(Boolean) as HTMLElement[];

  gsap.fromTo(
    validElements,
    {
      opacity: 0,
      scale: 0.8,
    },
    {
      opacity: 0.3,
      scale: 1,
      duration: 1.5,
      stagger: 0.2,
      ease: "power3.out",
    }
  );
}

// Animate social sidebar
export function animateSocialSidebar(sidebar: HTMLElement): void {
  if (!sidebar) return;

  gsap.fromTo(
    sidebar,
    {
      opacity: 0,
      x: -30,
    },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out",
    }
  );
}

interface StoryAnimationRefs {
  section: HTMLDivElement | null;
  title: HTMLHeadingElement | null;
  text: HTMLDivElement | null;
  services: HTMLDivElement | null;
  decor: HTMLDivElement | null;
  originStory: HTMLDivElement | null;
  originImage: HTMLDivElement | null;
}

export function animateStorySection(refs: StoryAnimationRefs): void {
  if (typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  const { section, title, text, services, decor, originStory, originImage } =
    refs;

  if (!section || !title || !text || !services || !originImage) return;

  // Floating decoration animations
  if (decor) {
    gsap.to(".story-section__decor", {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.3,
    });
  }

  // Main content animations triggered by scroll
  const tl = gsap.timeline();

  const mainTrigger = ScrollTrigger.create({
    trigger: section,
    start: "top 60%",
    toggleActions: "play none none none",
    markers: false,
    animation: tl,
  });

  // Track this ScrollTrigger instance for cleanup
  trackScrollTrigger(mainTrigger);

  // Prepare the highlight element
  const highlightEl = title.querySelector(".highlight");
  if (highlightEl) {
    gsap.set(highlightEl, {
      backgroundSize: "0% 100%",
    });
  }

  // Add a slight initial delay to the timeline
  tl.from(title, { opacity: 0, y: 50, duration: 0.6 }, "+=0.2")
    .from(
      title.querySelectorAll(".word"),
      {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.4,
      },
      "<0.2"
    )
    .to(
      highlightEl,
      {
        backgroundSize: "100% 100%",
        duration: 0.8,
        ease: "power2.inOut",
      },
      "<"
    )
    .from(text, { opacity: 0, y: 30, duration: 0.4 }, "<0.3")
    .from(
      services.querySelectorAll("li"),
      {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.3,
      },
      "<0.2"
    );

  // Animate origin story if it exists
  if (originStory) {
    const originStoryParagraphs = originStory.querySelectorAll("p");

    const originStoryTrigger = ScrollTrigger.create({
      trigger: originStory,
      start: "top 80%",
      toggleActions: "play none none none",
      onEnter: () => {
        gsap.fromTo(
          originStory,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.6 }
        );

        gsap.fromTo(
          originStoryParagraphs,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.2, duration: 0.5 }
        );
      },
    });

    // Track this ScrollTrigger instance for cleanup
    trackScrollTrigger(originStoryTrigger);
  }

  // Animate image with fixed parallax effect
  if (originImage) {
    const innerContainer = originImage.querySelector(
      ".story-section__image-frame-inner"
    );
    const imageElement = originImage.querySelector(".story-section__image");

    // Initial reveal animation for the image container
    const imageRevealTrigger = ScrollTrigger.create({
      trigger: originImage,
      start: "top 85%",
      toggleActions: "play none none none",
      onEnter: () => {
        gsap.fromTo(
          originImage,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 }
        );
      },
    });

    // Track this ScrollTrigger instance for cleanup
    trackScrollTrigger(imageRevealTrigger);

    // Fixed parallax for the inner container - more stable approach
    if (innerContainer && imageElement) {
      // Set initial scale to prevent edges from showing during animation
      gsap.set(imageElement, { scale: 1.1 });

      // Create smoother parallax with reduced movement
      const parallaxTrigger = ScrollTrigger.create({
        trigger: originImage,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5, // Smoother scrub for more natural parallax
        onUpdate: (self) => {
          // Apply a gentle parallax effect to the image
          gsap.to(imageElement, {
            y: self.progress * 25, // Limit movement to 25px to avoid excessive movement
            duration: 0.1,
            ease: "none",
            overwrite: "auto",
          });
        },
      });

      // Track this ScrollTrigger instance for cleanup
      trackScrollTrigger(parallaxTrigger);
    }

    // Add corner animations
    const corners = originImage.querySelectorAll(
      ".story-section__image-corner"
    );
    tl.fromTo(
      corners,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.2,
      },
      1.5
    );
  }
}

// Animation refs interface for Stats Section
export interface StatAnimationRefs {
  section: HTMLDivElement | null;
  title: HTMLHeadingElement | null;
  statsRefs: (HTMLDivElement | null)[];
}

// Stats section animation
export function animateStatsSection(refs: StatAnimationRefs): void {
  if (typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  const { section, title, statsRefs } = refs;

  if (!section) return;

  // Create a single timeline for all stats animations
  const tl = gsap.timeline();

  const statsTrigger = ScrollTrigger.create({
    trigger: section,
    start: "top 75%",
    end: "top 25%",
    toggleActions: "play none none none",
    once: true,
    animation: tl,
  });

  // Track this ScrollTrigger instance for cleanup
  trackScrollTrigger(statsTrigger);

  // Title animation
  if (title) {
    tl.fromTo(
      title,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }
    );
  }

  // Stats animations
  if (statsRefs.length) {
    statsRefs.forEach((statRef, index) => {
      if (!statRef) return;

      // Container animation
      tl.fromTo(
        statRef,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        index * 0.2
      );

      // Number counting
      const valueElement = statRef.querySelector(".stats-section__number");
      if (valueElement) {
        const targetValue = parseInt(
          valueElement.getAttribute("data-value") || "0",
          10
        );

        tl.to(
          { value: 0 },
          {
            value: targetValue,
            duration: 2,
            ease: "power2.out",
            onUpdate: function () {
              const num = Math.floor(this.targets()[0].value);
              valueElement.textContent =
                num + (valueElement.getAttribute("data-suffix") || "");
            },
          },
          index * 0.2
        );
      }

      // Separator line
      const separatorLine = statRef.querySelector(".stats-section__separator");
      if (separatorLine) {
        tl.fromTo(
          separatorLine,
          { width: "0%" },
          { width: "100%", duration: 1.2, ease: "power2.inOut" },
          index * 0.2
        );
      }
    });
  }
}

interface ClientsAnimationRefs {
  section: HTMLDivElement | null;
  title: HTMLHeadingElement | null;
  text: HTMLParagraphElement | null;
  logos: HTMLDivElement | null;
  cta: HTMLDivElement | null;
  decor: HTMLDivElement | null;
}

export function animateClientsSection(refs: ClientsAnimationRefs): void {
  if (typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  const { section, title, text, cta, decor } = refs;

  if (!section) return;

  // Use a single ScrollTrigger for the whole section
  const clientsTrigger = ScrollTrigger.create({
    trigger: section,
    start: "top 85%",
    end: "bottom 15%",
    toggleActions: "play none none reverse",
    onEnter: () => {
      // Title animation
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8 }
        );
      }

      // Text animation
      if (text) {
        gsap.fromTo(
          text,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.3 }
        );
      }

      // CTA animation
      if (cta) {
        gsap.fromTo(
          cta,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.5 }
        );
      }
    },
  });

  // Track this ScrollTrigger instance for cleanup
  trackScrollTrigger(clientsTrigger);

  // Separate decoration animation
  if (decor) {
    gsap.to(".clients-section__decor", {
      y: -10,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.3,
    });
  }
}

// CTASection animation refs interface
interface CTAAnimationRefs {
  section: HTMLDivElement | null;
  content: HTMLDivElement | null;
  title: HTMLHeadingElement | null;
  text: HTMLParagraphElement | null;
  decor: HTMLDivElement | null;
}

export function animateCTASection(refs: CTAAnimationRefs): void {
  if (typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  const { section, content, title, text, decor } = refs;

  if (!section || !content || !title || !text) return;

  // Floating decoration animations
  if (decor) {
    const decorElements = decor.querySelectorAll(".cta-section__decor");

    // Initial setup
    gsap.set(decorElements, {
      opacity: 0,
      y: 20,
    });

    // Animate in decorative elements
    const decorTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none none",
      onEnter: () => {
        gsap.to(decorElements, {
          opacity: (i) => (i === 0 || i === 4 ? 0.3 : 1),
          y: 0,
          duration: 1.2,
          stagger: 0.15,
        });

        // Add subtle floating animation
        gsap.to(".cta-section__decor", {
          y: (i) => (i % 2 === 0 ? -8 : -12),
          duration: (i) => 2 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.3,
          delay: 1,
        });
      },
    });

    // Track this ScrollTrigger instance for cleanup
    trackScrollTrigger(decorTrigger);
  }

  // Main content animations triggered by scroll
  const tl = gsap.timeline();

  const mainTrigger = ScrollTrigger.create({
    trigger: section,
    start: "top 85%",
    toggleActions: "play none none none",
    animation: tl,
  });

  // Track this ScrollTrigger instance for cleanup
  trackScrollTrigger(mainTrigger);

  // Prepare the highlight element
  const highlightEl = title.querySelector(".highlight");
  if (highlightEl) {
    gsap.set(highlightEl, {
      backgroundSize: "0% 100%",
    });
  }

  // Main animation sequence
  tl.fromTo(
    content,
    {
      y: 50,
      opacity: 0,
      scale: 0.95,
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
    }
  )
    .fromTo(
      title.querySelectorAll(".word"),
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
      },
      "-=0.4"
    )
    .to(
      highlightEl,
      {
        backgroundSize: "100% 100%",
        duration: 0.7,
        delay: 0.5,
        ease: "power2.inOut",
      },
      "-=0.2"
    )
    .fromTo(
      text,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
      },
      "-=0.7"
    );
}
