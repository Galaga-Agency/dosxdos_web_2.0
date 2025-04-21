import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

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

  if (typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  // Set up parallax for hero image
  setupParallax(heroImageContainerRef, heroImageRef);

  const timeline = gsap.timeline({
    defaults: { ease: "power3.out" },
    delay: 0.5
  });

  if (titleRef.current) {
    timeline.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2 },
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
    const statItems = statsRef.current.querySelectorAll('.hero-section__stat');
    timeline.fromTo(
      statItems,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.8 },
      0.9
    );

    const statNumbers = statsRef.current.querySelectorAll('.hero-section__stat-value');
    statNumbers.forEach((element) => {
      const targetValue = parseInt(element.getAttribute('data-target') || "0", 10);
      const counter = { val: targetValue };
      
      // Animation for counting up stats - no clearing of text content
      timeline.fromTo(
        counter,
        { val: 0 },
        {
          val: targetValue,
          duration: 1.8,
          ease: "power1.inOut",
          onUpdate: function() {
            element.textContent = Math.round(counter.val).toString();
          }
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
      decorElements.grid.current
    ].filter(Boolean);

    timeline.fromTo(
      decorItems,
      { opacity: 0, scale: 0.8, y: 20 },
      {
        opacity: (i: number) => (i === 0 ? 0.3 : i === 3 ? 0.5 : 1),
        scale: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15
      },
      1
    );
  }

  floatingImages.forEach(({ container }) => {
    if (container.current) {
      const corners = container.current.querySelectorAll('.corner');
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

    gsap.to(targetRef.current, {
      y: "-20%",
      ease: "none",
      scrollTrigger: {
        id: "hero-parallax",
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });
  }, 200);

  ScrollTrigger.refresh();
}

function setupFloatingImagesParallax(floatingImages: FloatingImage[]): void {
  floatingImages.forEach((image, index) => {
    const { container, inner, offset, innerOffset } = image;

    if (container.current) {
      gsap.fromTo(
        container.current,
        { y: "0%" },
        {
          y: `${offset}%`,
          ease: "none",
          scrollTrigger: {
            id: `floating-container-${index}`,
            trigger: container.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.8,
          },
        }
      );
    }

    if (inner.current && inner.current.parentElement) {
      gsap.fromTo(
        inner.current,
        { y: "0%" },
        {
          y: `${innerOffset}%`,
          ease: "none",
          scrollTrigger: {
            id: `floating-inner-${index}`,
            trigger: inner.current.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    }
  });

  ScrollTrigger.refresh();
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
      scale: 0.8 
    },
    { 
      opacity: 0.3, 
      scale: 1, 
      duration: 1.5, 
      stagger: 0.2,
      ease: "power3.out" 
    }
  );

  ScrollTrigger.refresh();
}

// Animate social sidebar
export function animateSocialSidebar(sidebar: HTMLElement): void {
  if (!sidebar) return;
  
  gsap.fromTo(
    sidebar,
    { 
      opacity: 0, 
      x: -30 
    },
    { 
      opacity: 1, 
      x: 0, 
      duration: 1, 
      ease: "power2.out" 
    }
  );

  ScrollTrigger.refresh();
}

interface StoryAnimationRefs {
  section: HTMLDivElement | null;
  title: HTMLHeadingElement | null;
  text: HTMLDivElement | null;
  services: HTMLDivElement | null;
  decor: HTMLDivElement | null;
}

export function animateStorySection(refs: StoryAnimationRefs): void {
  if (typeof window === "undefined") return;
  
  gsap.registerPlugin(ScrollTrigger);
  
  const { section, title, text, services, decor } = refs;
  
  if (!section || !title || !text || !services) return;
  
  // Floating decoration animations
  if (decor) {
    gsap.to(".story-section__decor", {
      y: -10,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.3,
    });
  }
  
  // Main content animations triggered by scroll
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 90%",
      toggleActions: "play none none none",
      markers: false
    }
  });

  // Prepare the highlight element by ensuring it starts with 0% width
  const highlightEl = title.querySelector(".highlight");
  if (highlightEl) {
    gsap.set(highlightEl, { 
      backgroundSize: "0% 100%"
    });
  }

  tl.from(title, { opacity: 0, y: 50, duration: 0.8 })
    .from(title.querySelectorAll(".word"), { 
      opacity: 0, 
      y: 20, 
      stagger: 0.1,
      duration: 0.6
    }, "-=0.4")
    // Add highlight animation for "identidad propia"
    .to(highlightEl, {
      backgroundSize: "100% 100%",
      duration: 1,
      ease: "power2.inOut"
    }, "-=0.2") // Slightly delayed from the word animation
    .from(text, { opacity: 0, y: 30, duration: 0.8 }, "-=0.5")
    .from(services.querySelectorAll("li"), {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6
    }, "-=0.5");

    ScrollTrigger.refresh();
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

  // Cleanup existing animations
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());

  // Title animation
  if (title) {
    gsap.fromTo(
      title,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: title,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  }

  // Stats animations
  if (section && statsRefs.length) {
    statsRefs.forEach((statRef, index) => {
      if (!statRef) return;

      // 1. Animate the stat container
      gsap.fromTo(
        statRef,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      // 2. Animate the number counting
      const valueElement = statRef.querySelector(".stats-section__number");
      if (valueElement) {
        const targetValue = parseInt(valueElement.getAttribute('data-value') || "0", 10);
        const startValue = 0;
        const obj = { value: startValue };

        gsap.to(obj, {
          value: targetValue,
          duration: 2,
          delay: 0.3 + index * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none"
          },
          onUpdate: () => {
            valueElement.textContent = Math.floor(obj.value).toString() + (valueElement.getAttribute('data-suffix') || '');
          }
        });
      }

      // 3. Animate the separator line
      const separatorLine = statRef.querySelector(".stats-section__separator");
      if (separatorLine) {
        gsap.fromTo(
          separatorLine,
          { width: "0%" },
          {
            width: "100%",
            duration: 1.2,
            delay: 0.5 + index * 0.2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    });
  }

  ScrollTrigger.refresh();
}

// Cleanup function to kill all ScrollTrigger instances
export function cleanupStatsAnimations(): void {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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
    const decorElements = decor.querySelectorAll('.cta-section__decor');
    
    // Initial setup
    gsap.set(decorElements, {
      opacity: 0,
      y: 20
    });
    
    // Animate in decorative elements
    gsap.to(decorElements, {
      opacity: (i) => i === 0 || i === 4 ? 0.3 : 1,
      y: 0,
      duration: 1.2,
      stagger: 0.15,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
    
    // Add subtle floating animation
    gsap.to(".cta-section__decor", {
      y: (i) => i % 2 === 0 ? -8 : -12,
      duration: (i) => 2 + i * 0.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.3,
      delay: 1
    });
  }
  
  // Main content animations triggered by scroll
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 85%",
      toggleActions: "play none none none"
    }
  });

  // Prepare the highlight element
  const highlightEl = title.querySelector(".highlight");
  if (highlightEl) {
    gsap.set(highlightEl, { 
      backgroundSize: "0% 100%"
    });
  }

  // Main animation sequence
  tl.fromTo(content, 
    { 
      y: 50, 
      opacity: 0,
      scale: 0.95
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power2.out"
    }
  )
  .fromTo(title.querySelectorAll(".word"), 
    { 
      opacity: 0, 
      y: 20
    },
    { 
      opacity: 1, 
      y: 0, 
      stagger: 0.1,
      duration: 0.6
    }, 
    "-=0.4"
  )
  .to(highlightEl, {
    backgroundSize: "100% 100%",
    duration: 0.7,
    delay: 0.5,
    ease: "power2.inOut"
  }, "-=0.2")
  .fromTo(text, 
    { 
      opacity: 0, 
      y: 20
    },
    {
      opacity: 1, 
      y: 0, 
      duration: 0.7
    }, 
    "-=0.7"
  );

  // Ensure ScrollTrigger is refreshed
  ScrollTrigger.refresh();
}