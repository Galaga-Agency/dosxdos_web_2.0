"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "@/plugins";
import { refreshScrollTrigger } from "../scrolltrigger-config";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Title Animation Utility
export function charAnimation(current?: HTMLElement) {
  if (!current) return null;

  gsap.set(current, {
    visibility: "hidden",
    perspective: 300,
  });

  const itemSplitted = new SplitText(current, {
    type: "chars, words",
  });

  gsap.set(current, {
    visibility: "visible",
    opacity: 1,
  });

  const tl = gsap.timeline();
  tl.from(itemSplitted.chars, {
    duration: 1,
    x: 100,
    autoAlpha: 0,
    stagger: 0.05,
  });

  return tl;
}

// Define animation elements interface
interface SectionAnimationElements {
  section?: HTMLElement | null;
  label?: HTMLElement | null;
  title?: HTMLElement | null;
  text?: HTMLElement | null;
  subtitle?: HTMLElement | null;
  cta?: HTMLElement | null;
  image?: HTMLElement | null;
  grid?: HTMLElement | null;
  container?: HTMLElement | null;
  carousel?: HTMLElement | null;
  header?: HTMLElement | null;
  marquee?: HTMLElement | null;
  underline?: HTMLElement | null;
  description?: HTMLElement | null;
  stats?: HTMLElement | null;
  decor?: HTMLElement | null;
  logos?: HTMLElement | null;
  content?: HTMLElement | null;
  services?: HTMLElement | null;
  originStory?: HTMLElement | null;
  originImage?: HTMLElement | null;
  floatingImages?: any[];
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// HERO SECTION ANIMATION /////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

export function animateHeroSection(elements: SectionAnimationElements) {
  if (typeof window === "undefined" || !elements.section) return null;

  console.log("Animating Hero Section");

  const tl = gsap.timeline();

  // Prepare section
  gsap.set(elements.section, {
    visibility: "visible",
    opacity: 1,
  });

  const animationSequence = [
    { el: elements.label, props: { y: -30 }, index: 0.3 },
    { el: elements.title, props: { y: 0 }, index: 0.6, charAnim: true },
    { el: elements.underline, props: { width: 0 }, index: 1.0 },
    { el: elements.description, props: { y: 20 }, index: 1.2 },
    { el: elements.stats, props: { y: 20 }, index: 1.4 },
    { el: elements.decor, props: { scale: 0.8 }, index: 1.6 },
    { el: elements.image, props: { scale: 1.05 }, index: 0 },
  ];

  animationSequence.forEach(({ el, props, index, charAnim }) => {
    if (!el) return;

    // Initial state
    gsap.set(el, {
      opacity: 0,
      ...props,
    });

    // Char animation for title if specified
    if (charAnim && elements.title) {
      tl.add(() => {
        if (elements.title) {
          charAnimation(elements.title);
        }
      }, index);
    }

    // Animate to visible state
    tl.to(
      el,
      {
        opacity: 1,
        ...(props.y !== undefined ? { y: 0 } : {}),
        ...(props.width !== undefined ? { width: "100%" } : {}),
        ...(props.scale !== undefined ? { scale: 1 } : {}),
        duration: 0.8,
        ease:
          props.y !== undefined
            ? "back.out(1.4)"
            : props.scale !== undefined
            ? "power3.out"
            : "power2.out",
      },
      index
    );
  });

  // Create ScrollTrigger
  ScrollTrigger.create({
    trigger: elements.section,
    animation: tl,
    start: "top 85%",
    once: true,
  });

  // Setup floating images parallax if available
  if (elements.floatingImages && elements.floatingImages.length) {
    setupFloatingImagesParallax(elements.floatingImages);
  }

  if (elements.section && elements.image) {
    setupHeroParallax(elements.section, elements.image);
  }

  // Force refresh ScrollTrigger
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);

  return tl;
}

// Parallax for hero section
function setupHeroParallax(
  container: HTMLElement,
  target: HTMLElement
) {
  if (!container || !target) return;
  
  target.setAttribute("data-speed", "0.9");
  
  // Force refresh ScrollTrigger
  setTimeout(() => {
    if ((window as any).__smoother__) {
      (window as any).__smoother__.refresh();
    }
    ScrollTrigger.refresh();
  }, 100);
}

// Parallax for floating images
function setupFloatingImagesParallax(floatingImages: any[]): void {
  floatingImages.forEach(({ container, inner, offset, innerOffset }, index) => {
    if (container && container.current) {
      // Calculate smoother speed value
      let containerSpeed = offset < 0
        ? 1 + Math.abs(offset) / 100
        : 1 - offset / 100;
      
      // Keep values in reasonable range
      containerSpeed = Math.max(0.5, Math.min(1.5, containerSpeed));
      
      // Apply data-speed attribute
      container.current.setAttribute("data-speed", containerSpeed.toString());
    }

    if (inner && inner.current) {
      // Calculate speed value for inner element
      let innerSpeed = innerOffset < 0
        ? 1 + Math.abs(innerOffset) / 200
        : 1 - innerOffset / 200;
      
      // Keep values in reasonable range
      innerSpeed = Math.max(0.7, Math.min(1.3, innerSpeed));
      
      // Apply data-speed attribute
      inner.current.setAttribute("data-speed", innerSpeed.toString());
    }
  });

  // Force refresh to ensure ScrollSmoother picks up the new attributes
  setTimeout(() => {
    if ((window as any).__smoother__) {
      (window as any).__smoother__.refresh();
    }
    ScrollTrigger.refresh();
  }, 100);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// STORY SECTION ANIMATION ////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

export function animateStorySection(elements: any): void {
  if (typeof window === "undefined" || !elements.section) return;

  console.log("Animating Story Section");

  const tl = gsap.timeline();

  // Set initial visibility
  gsap.set(elements.section, { visibility: "visible", opacity: 1 });
  
  // Main section animation
  if (elements.title) {
    tl.from(elements.title, { opacity: 0, y: 50, duration: 0.6 }, "+=0.2");
    
    const words = elements.title.querySelectorAll(".word");
    if (words.length > 0) {
      tl.from(
        words,
        { opacity: 0, y: 20, stagger: 0.05, duration: 0.4 },
        "<0.2"
      );
    }
    
    const highlight = elements.title.querySelector(".highlight");
    if (highlight) {
      gsap.set(highlight, { backgroundSize: "0% 100%" });
      tl.to(
        highlight,
        { backgroundSize: "100% 100%", duration: 0.8, ease: "power2.inOut" },
        "<"
      );
    }
  }
  
  if (elements.text) {
    tl.from(elements.text, { opacity: 0, y: 30, duration: 0.4 }, "<0.3");
  }
  
  if (elements.services) {
    const items = elements.services.querySelectorAll("li");
    if (items.length > 0) {
      tl.from(
        items,
        { opacity: 0, y: 20, stagger: 0.05, duration: 0.3 },
        "<0.2"
      );
    }
  }

  // Create ScrollTrigger for main animation
  ScrollTrigger.create({
    trigger: elements.section,
    animation: tl,
    start: "top 80%",
    once: true,
  });

  // Origin story animation if it exists
  if (elements.originStory) {
    const originTl = gsap.timeline();
    const paragraphs = elements.originStory.querySelectorAll("p");
    
    gsap.set(elements.originStory, { opacity: 0, y: 50 });
    
    ScrollTrigger.create({
      trigger: elements.originStory,
      start: "top 80%",
      once: true,
      onEnter: () => {
        originTl.to(elements.originStory, { opacity: 1, y: 0, duration: 0.6 })
          .to(paragraphs, { opacity: 1, y: 0, stagger: 0.2, duration: 0.5 }, "<0.2");
      }
    });
  }

  // Image animation if it exists
  if (elements.originImage) {
    const imageTl = gsap.timeline();
    const inner = elements.originImage.querySelector(".story-section__image-frame-inner");
    const image = elements.originImage.querySelector(".story-section__image");
    const corners = elements.originImage.querySelectorAll(".story-section__image-corner");
    
    gsap.set(elements.originImage, { opacity: 0, y: 40 });
    
    ScrollTrigger.create({
      trigger: elements.originImage,
      start: "top 85%",
      once: true,
      onEnter: () => {
        imageTl.to(elements.originImage, { opacity: 1, y: 0, duration: 0.8 });
        
        if (corners.length > 0) {
          imageTl.fromTo(
            corners,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 },
            "<0.3"
          );
        }
      }
    });
    
    // Parallax effect for image
    if (inner && image) {
      gsap.set(image, { scale: 1.1 });
      
      ScrollTrigger.create({
        trigger: elements.originImage,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
        onUpdate: (self) => {
          gsap.to(image, {
            y: self.progress * 25,
            duration: 0.1,
            ease: "none",
            overwrite: "auto",
          });
        }
      });
    }
  }

  // Force refresh ScrollTrigger
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// TEAM SECTION ANIMATION ////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

export function animateTeamSection(elements: SectionAnimationElements) {
  if (typeof window === "undefined" || !elements.section) return;

  console.log("Animating Team Section");

  const tl = gsap.timeline();

  // Set initial visibility
  gsap.set(elements.section, { visibility: "visible", opacity: 1 });

  // Animate title
  if (elements.title) {
    tl.from(
      elements.title,
      {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "back.out(1.4)",
      },
      0.2
    );
  }

  // Animate subtitle
  if (elements.subtitle) {
    tl.from(
      elements.subtitle,
      {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "back.out(1.4)",
      },
      0.4
    );
  }

  // Animate team grid
  if (elements.grid) {
    const gridItems = elements.grid.querySelectorAll(".hover-card");

    tl.from(
      gridItems,
      {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.4)",
      },
      0.6
    );
  }

  // Create ScrollTrigger
  ScrollTrigger.create({
    trigger: elements.section,
    animation: tl,
    start: "top 80%",
    once: true,
  });

  // Force refresh ScrollTrigger
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);

  return tl;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// STATS SECTION ANIMATION ////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

export function animateStatsSection(elements: SectionAnimationElements) {
  if (typeof window === "undefined" || !elements.section) return;

  console.log("Animating Stats Section");

  const tl = gsap.timeline();

  // Set initial visibility
  gsap.set(elements.section, { visibility: "visible", opacity: 1 });

  // Animate stats container
  if (elements.stats) {
    gsap.set(elements.stats, { opacity: 0, y: 30 });
    
    tl.to(
      elements.stats,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.4)",
      },
      0.5
    );
    
    // Animate each stat number
    const statItems = elements.stats.querySelectorAll(".stats-section__item");
    statItems.forEach((el, i) => {
      const valueEl = el.querySelector(".stats-section__number");
      const target = parseInt(valueEl?.getAttribute("data-value") || "0", 10);
      const suffix = valueEl?.getAttribute("data-suffix") || "";

      tl.to(
        { val: 0 },
        {
          val: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: function () {
            if (valueEl) {
              valueEl.textContent = Math.floor(this.targets()[0].val) + suffix;
            }
          },
        },
        0.8 + i * 0.2
      );

      const separator = el.querySelector(".stats-section__separator");
      if (separator) {
        tl.fromTo(
          separator,
          { width: "0%" },
          { width: "100%", duration: 1.2, ease: "power2.inOut" },
          0.8 + i * 0.2
        );
      }
    });
  }

  // Create ScrollTrigger
  ScrollTrigger.create({
    trigger: elements.section,
    animation: tl,
    start: "top 80%",
    once: true,
  });

  // Force refresh ScrollTrigger
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);

  return tl;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// CLIENTS SECTION ANIMATION //////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

export function animateClientsSection(elements: SectionAnimationElements) {
  if (typeof window === "undefined" || !elements.section) return;

  console.log("Animating Clients Section");

  const tl = gsap.timeline();

  // Set initial visibility
  gsap.set(elements.section, { visibility: "visible", opacity: 1 });

  const sequence = [
    { el: elements.title, props: { y: 30 }, index: 0.1 },
    { el: elements.text, props: { y: 20 }, index: 0.4 },
    { el: elements.logos, props: { y: 20 }, index: 0.6 },
    { el: elements.cta, props: { y: 20 }, index: 0.9 },
  ];

  sequence.forEach(({ el, props, index }) => {
    if (!el) return;
    gsap.set(el, { opacity: 0, ...props });

    tl.to(
      el,
      {
        opacity: 1,
        ...(props.y !== undefined ? { y: 0 } : {}),
        duration: 0.8,
        ease: "back.out(1.4)",
      },
      index
    );
  });

  // Create ScrollTrigger
  ScrollTrigger.create({
    trigger: elements.section,
    animation: tl,
    start: "top 85%",
    once: true,
  });

  // Floating decor loop animation
  if (elements.decor) {
    gsap.to(elements.decor, {
      y: -10,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }

  // Force refresh ScrollTrigger
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);

  return tl;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// CTA SECTION ANIMATION /////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

export function animateCTASection(elements: any) {
  if (typeof window === "undefined" || !elements.section) return;

  console.log("Animating CTA Section");

  const tl = gsap.timeline();

  // Set initial visibility
  gsap.set(elements.section, { visibility: "visible", opacity: 1 });

  const sequence = [
    { el: elements.content, props: { y: 40, scale: 0.95 }, index: 0 },
    { el: elements.title, props: { y: 30 }, index: 0.4, charAnim: true },
    { el: elements.text, props: { y: 20 }, index: 0.7 },
  ];

  sequence.forEach(({ el, props, index, charAnim }) => {
    if (!el) return;
    gsap.set(el, { opacity: 0, ...props });

    if (charAnim && elements.title) {
      tl.add(() => {
        charAnimation(elements.title);
      }, index);
    }

    tl.to(
      el,
      {
        opacity: 1,
        y: 0,
        scale: props.scale !== undefined ? 1 : undefined,
        duration: 0.8,
        ease: "back.out(1.4)",
      },
      index
    );
  });

  // Create ScrollTrigger
  ScrollTrigger.create({
    trigger: elements.section,
    animation: tl,
    start: "top 85%",
    once: true,
  });

  // Decorative elements animation
  if (elements.decor) {
    const decorItems = elements.decor.querySelectorAll(".cta-section__decor");
    
    gsap.set(decorItems, {
      opacity: 0,
      y: 20,
    });

    gsap.to(decorItems, {
      opacity: (i) => (i === 0 || i === 4 ? 0.3 : 1),
      y: 0,
      duration: 1.2,
      stagger: 0.15,
      scrollTrigger: {
        trigger: elements.section,
        start: "top 80%",
      },
    });

    gsap.to(decorItems, {
      y: (i) => (i % 2 === 0 ? -8 : -12),
      duration: (i) => 2 + i * 0.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.3,
      delay: 1,
    });
  }

  // Force refresh ScrollTrigger
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);

  return tl;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// CLEANUP FUNCTION ///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

export function cleanupEquipoAnimations() {
  if (typeof window === "undefined") return;

  console.log("⚠️ Cleaning up all equipo page animations");
  
  // Kill all ScrollTriggers
  ScrollTrigger.getAll().forEach(trigger => {
    trigger.kill();
  });
  
  // Clear match media queries
  ScrollTrigger.clearMatchMedia();
  
  // Refresh ScrollTrigger
  refreshScrollTrigger();
}