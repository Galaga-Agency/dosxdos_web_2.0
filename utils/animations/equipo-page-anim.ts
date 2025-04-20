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
    floatingImages
  } = refs;

  // Register ScrollTrigger plugin
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Set up parallax for hero image
  setupParallax(heroImageContainerRef, heroImageRef);

  // Animation timeline
  const timeline = gsap.timeline({ 
    defaults: { ease: "power3.out" },
    delay: 0.3
  });

  // Animate title
  if (titleRef.current) {
    timeline.fromTo(
      titleRef.current,
      { 
        opacity: 0,
        y: 30
      },
      { 
        opacity: 1,
        y: 0,
        duration: 1.2
      },
      0
    );
  }

  // Animate underline
  if (underlineRef.current) {
    timeline.fromTo(
      underlineRef.current,
      { 
        width: 0,
        opacity: 0
      },
      { 
        width: 120,
        opacity: 1,
        duration: 0.8
      },
      0.5
    );
  }

  // Animate description
  if (descriptionRef.current) {
    timeline.fromTo(
      descriptionRef.current,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 1
      },
      0.7
    );
  }

  // Animate stats
  if (statsRef.current) {
    // Animate stat items
    const statItems = statsRef.current.querySelectorAll('.hero-section__stat');
    timeline.fromTo(
      statItems,
      { 
        opacity: 0, 
        y: 30 
      },
      { 
        opacity: 1, 
        y: 0,
        stagger: 0.15,
        duration: 0.8 
      },
      0.9
    );
    
    // Animate numbers counting up
    const statNumbers = statsRef.current.querySelectorAll('.hero-section__stat-value');
    statNumbers.forEach((element) => {
      const targetNumber = parseInt(element.textContent || "0", 10);
      
      timeline.fromTo(
        element as HTMLElement,
        { textContent: "0" },
        {
          textContent: targetNumber.toString(),
          duration: 1.5,
          ease: "power1.out",
          onUpdate: function() {
            element.textContent = Math.round(Number(gsap.getProperty(element, "textContent"))).toString();
          }
        },
        1.2
      );
    });
  }

  // Animate decorative elements
  if (decorElements?.container.current) {
    const decorItems = [
      decorElements.dots.current,
      decorElements.line.current,
      decorElements.circle.current,
      decorElements.grid.current
    ].filter(Boolean);

    timeline.fromTo(
      decorItems,
      {
        opacity: 0,
        scale: 0.8,
        y: 20
      },
      {
        opacity: function(i) {
          // Different opacities based on the element
          return i === 0 ? 0.3 : 
                i === 3 ? 0.5 : 1;
        },
        scale: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15
      },
      1
    );
  }

  // Animate corners of floating image containers
  floatingImages.forEach(({ container }) => {
    if (container.current) {
      const corners = container.current.querySelectorAll('.corner');
      if (corners.length) {
        timeline.fromTo(
          corners,
          {
            opacity: 0,
            scale: 0
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.2
          },
          1.5
        );
      }
    }
  });

  // Set up nested parallax for floating images
  setupFloatingImagesParallax(floatingImages);
}

// Set up parallax for hero image
function setupParallax(
  containerRef: React.RefObject<HTMLElement>,
  targetRef: React.RefObject<HTMLElement>
): void {
  if (!containerRef.current || !targetRef.current) return;

  // Initial setup
  gsap.set(targetRef.current, { y: 0 });

  // Create the parallax effect with scroll
  setTimeout(() => {
    if (!containerRef.current || !targetRef.current) return;
    
    gsap.to(targetRef.current, {
      y: "-20%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });
  }, 500);
}

// Set up nested parallax for floating images
function setupFloatingImagesParallax(floatingImages: FloatingImage[]): void {
  if (typeof window === "undefined") return;
  
  gsap.registerPlugin(ScrollTrigger);

  floatingImages.forEach((image) => {
    const { container, inner, offset, innerOffset } = image;

    // Animate container
    if (container.current) {
      gsap.fromTo(
        container.current,
        { y: "0%" },
        {
          y: `${offset}%`,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.8,
            markers: false,
          },
        }
      );
    }

    // Animate inner image (faster/different speed)
    if (inner.current && inner.current.parentElement) {
      gsap.fromTo(
        inner.current,
        { y: "0%" },
        {
          y: `${innerOffset}%`,
          ease: "none",
          scrollTrigger: {
            trigger: inner.current.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2, // Faster scrub for smoother motion
            markers: false,
          },
        }
      );
    }
  });

  // Force refresh ScrollTrigger after images load
  setTimeout(() => {
    ScrollTrigger.refresh(true);
  }, 500);
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
}