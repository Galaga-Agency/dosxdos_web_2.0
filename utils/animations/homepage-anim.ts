import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  trackScrollTrigger,
  createScrollAnimation,
  refreshScrollTrigger,
} from "@/utils/animations/scrolltrigger-config";
import { SplitText } from "@/plugins";

// Title Animation Utility
export function charAnimation(current?: HTMLElement) {
  if (!current) return;

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
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// About us Section Animation ////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const animateAboutUsSection = ({
  section,
  label,
  title,
  text,
  cta,
  image,
}: SectionAnimationElements) => {
  if (typeof window === "undefined" || !section) return null;

  const tl = gsap.timeline({ paused: true });

  // Prepare section
  gsap.set(section, {
    visibility: "visible",
    opacity: 1,
  });

  // Animate elements with consistent pattern
  const animationSequence = [
    { el: label, props: { x: -30 }, index: 0 },
    { el: title, props: { y: 0 }, index: 0.3, charAnim: true },
    { el: text, props: { y: 30 }, index: 1.5 },
    { el: image, props: { scale: 0.5 }, index: 1.0 },
    { el: cta, props: { y: 30 }, index: 1.9 },
  ];

  animationSequence.forEach(({ el, props, index, charAnim }) => {
    if (!el) return;

    // Initial state
    gsap.set(el, {
      opacity: 0,
      ...props,
    });

    // Char animation for title if specified
    if (charAnim && title) {
      tl.add(() => {
        charAnimation(title);
      }, index);
    }

    // Animate to visible state
    tl.to(
      el,
      {
        opacity: 1,
        ...(props.x !== undefined ? { x: 0 } : {}),
        ...(props.y !== undefined ? { y: 0 } : {}),
        ...(props.scale !== undefined ? { scale: 1 } : {}),
        duration: 0.8,
        ease: props.scale
          ? "power3.out"
          : props.y === 30
          ? "back.out(1.4)"
          : "power2.out",
      },
      index
    );
  });

  // Create ScrollTrigger using the utility function
  const trigger = createScrollAnimation(section, tl, {
    start: "top 80%",
    toggleActions: "play none none none",
    once: true,
    id: "about-us-section",
  });

  // Refresh ScrollTrigger after animation setup
  refreshScrollTrigger();

  return tl;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Service Section Animation ////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const animateServicesSection = ({
  section,
  title,
  subtitle,
  grid,
}: SectionAnimationElements) => {
  if (typeof window === "undefined" || !section) return null;

  const tl = gsap.timeline({ paused: true });

  // Prepare section
  gsap.set(section, {
    visibility: "visible",
    opacity: 1,
  });

  // Animate elements with consistent pattern
  const animationSequence = [
    { el: title, props: { y: 30 }, index: 0.3, charAnim: true },
    { el: subtitle, props: { y: 30 }, index: 0.6 },
    { el: grid, props: { y: 30 }, index: 0.9 },
  ];

  animationSequence.forEach(({ el, props, index, charAnim }) => {
    if (!el) return;

    // Initial state
    gsap.set(el, {
      opacity: 0,
      ...props,
    });

    // Char animation for title if specified
    if (charAnim && title) {
      tl.add(() => {
        charAnimation(title);
      }, index);
    }

    // Animate to visible state
    tl.to(
      el,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.4)",
      },
      index
    );
  });

  // Create ScrollTrigger using the utility function
  const trigger = createScrollAnimation(section, tl, {
    start: "top 80%",
    toggleActions: "play none none none",
    once: true,
    id: "services-section",
  });

  // Refresh ScrollTrigger after animation setup
  refreshScrollTrigger();

  return tl;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Blog Carousel Section Animation ////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const animateBlogCarouselSection = ({
  section,
  title,
  subtitle,
  carousel,
  cta,
}: SectionAnimationElements) => {
  if (typeof window === "undefined" || !section) return null;

  const tl = gsap.timeline({ paused: true });

  // Prepare section
  gsap.set(section, {
    visibility: "visible",
    opacity: 1,
  });

  // Animate elements with consistent pattern
  const animationSequence = [
    { el: title, props: { x: -20 }, index: 0.3, charAnim: true },
    { el: subtitle, props: { x: -15 }, index: 0.5 },
    { el: carousel, props: { y: 30 }, index: 0.7 },
    { el: cta, props: { y: 20 }, index: 0.9 },
  ];

  // Decorative line animation
  const decorLine = section.querySelector(".section-header__decorative-line");
  if (decorLine) {
    gsap.set(decorLine, { scaleY: 0, transformOrigin: "top" });
    tl.to(
      decorLine,
      {
        scaleY: 1,
        duration: 0.8,
        ease: "power3.inOut",
      },
      0
    );
  }

  animationSequence.forEach(({ el, props, index, charAnim }) => {
    if (!el) return;

    // Initial state
    gsap.set(el, {
      opacity: 0,
      ...props,
    });

    // Char animation for title if specified
    if (charAnim && title) {
      tl.add(() => {
        charAnimation(title);
      }, index);
    }

    // Animate to visible state
    tl.to(
      el,
      {
        opacity: 1,
        ...(props.x !== undefined ? { x: 0 } : {}),
        ...(props.y !== undefined ? { y: 0 } : {}),
        duration: 0.8,
        ease: props.y === 20 || props.y === 30 ? "back.out(1.4)" : "power3.out",
      },
      index
    );
  });

  // Create ScrollTrigger using the utility function
  createScrollAnimation(section, tl, {
    start: "top 85%",
    toggleActions: "play none none none",
    once: true,
    id: "blog-carousel-section",
  });

  // Refresh ScrollTrigger after animation setup
  refreshScrollTrigger();

  return tl;
};

// Global Cleanup Function
export function cleanupHomepageAnimations() {
  // Kill specific timelines
  gsap.killTweensOf([
    ".aboutus-section__title .highlight",
    ".blog-carousel-section .carousel-track",
  ]);
}
