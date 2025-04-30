"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  createScrollAnimation,
  refreshScrollTrigger,
  trackScrollTrigger,
} from "@/utils/animations/scrolltrigger-config";
import { SplitText } from "@/plugins";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

///////////////////////////////////////////////////////////////////////////////////////////////////////
// HERO SECTION ANIMATION /////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

interface FloatingImage {
  container: React.RefObject<HTMLDivElement>;
  inner: React.RefObject<HTMLDivElement>;
  offset: number;
  innerOffset: number;
}

export function animateHeroSection({
  section,
  title,
  underline,
  description,
  stats,
  decor,
  image,
  floatingImages = [],
}: {
  section?: HTMLElement | null;
  title?: HTMLElement | null;
  underline?: HTMLElement | null;
  description?: HTMLElement | null;
  stats?: HTMLElement | null;
  decor?: HTMLElement | null;
  image?: HTMLElement | null;
  floatingImages?: FloatingImage[];
}) {
  if (typeof window === "undefined" || !section) return null;

  // Create a unique ID for this animation
  const animationId = `equipo-hero-section-${Date.now()}`;

  // First, kill any existing ScrollTriggers for this section
  ScrollTrigger.getAll().forEach((trigger) => {
    if (
      trigger.vars.id &&
      typeof trigger.vars.id === "string" &&
      trigger.vars.id.includes("equipo-hero-section")
    ) {
      trigger.kill();
    }
  });

  const tl = gsap.timeline({ paused: true });

  // Prepare section
  gsap.set(section, {
    visibility: "visible",
    opacity: 1,
  });

  const elements = [
    { el: title, props: { y: 0 }, index: 1.5, charAnim: true },
    { el: underline, props: { width: 0 }, index: 1.7 },
    { el: description, props: { y: 20 }, index: 1.7 },
    { el: stats, props: { y: 20 }, index: 0.9 },
    { el: decor, props: { scale: 0.8 }, index: 1.2 },
    { el: image, props: { scale: 1.05 }, index: 0 },
  ];

  elements.forEach(({ el, props, index, charAnim }) => {
    if (!el) return;
    gsap.set(el, { opacity: 0, ...props });

    if (title) {
      tl.add(() => {
        charAnimation(title);
      }, index);
    }

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
    trigger: section,
    animation: tl,
    start: "top 85%",
    toggleActions: "play none none none",
    once: true,
    id: animationId,
  });

  setupFloatingImagesParallax(floatingImages);
  setupHeroParallax(section, image as any);

  // Force refresh ScrollTrigger
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);

  return tl;
}

// Ultra silky parallax using ONLY ScrollSmoother's built-in parallax
function setupHeroParallax(
  container: HTMLElement | null,
  target: HTMLElement | null
) {
  if (!container || !target) return;

  // Remove any existing data-speed attributes
  target.removeAttribute("data-speed");

  // Kill any existing ScrollTriggers for this parallax
  ScrollTrigger.getAll().forEach((trigger) => {
    if (
      trigger.vars.id &&
      typeof trigger.vars.id === "string" &&
      trigger.vars.id.includes("equipo-hero-parallax")
    ) {
      trigger.kill();
    }
  });

  // Use pure ScrollSmoother parallax
  // Values between 0 and 1 create a parallax effect (slower than scroll)
  // For smoother effect, use a value closer to 1 (e.g., 0.8-0.95)
  target.setAttribute("data-speed", "0.9");

  // Force refresh ScrollTrigger to ensure ScrollSmoother picks up the new attribute
  setTimeout(() => {
    if (window.__smoother__) {
      window.__smoother__.refresh();
    }
    ScrollTrigger.refresh();
  }, 100);
}

// Ultra silky floating images parallax using ONLY ScrollSmoother
function setupFloatingImagesParallax(floatingImages: FloatingImage[]): void {
  floatingImages.forEach((img, index) => {
    const { container, inner, offset, innerOffset } = img;

    if (container.current) {
      // Kill existing ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars.id &&
          typeof trigger.vars.id === "string" &&
          trigger.vars.id.includes(`floating-container-${index}`)
        ) {
          trigger.kill();
        }
      });

      // Remove existing data attributes
      container.current.removeAttribute("data-speed");

      // Calculate smoother speed value
      // For upward movement (negative offset), use value > 1
      // For downward movement (positive offset), use value < 1
      // Adjust these calculations based on desired effect
      let containerSpeed;
      if (offset < 0) {
        // Map negative offsets to values > 1 (faster than scroll)
        // The more negative the offset, the higher the speed value
        containerSpeed = 1 + Math.abs(offset) / 100;
      } else {
        // Map positive offsets to values < 1 (slower than scroll)
        // The more positive the offset, the lower the speed value
        containerSpeed = 1 - offset / 100;
      }

      // Keep values in reasonable range
      containerSpeed = Math.max(0.5, Math.min(1.5, containerSpeed));

      // Apply data-speed attribute
      container.current.setAttribute("data-speed", containerSpeed.toString());
    }

    if (inner.current) {
      // Kill existing ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars.id &&
          typeof trigger.vars.id === "string" &&
          trigger.vars.id.includes(`floating-inner-${index}`)
        ) {
          trigger.kill();
        }
      });

      // Remove existing data attributes
      inner.current.removeAttribute("data-speed");

      // Calculate speed value for inner element
      // Similar logic but inversed for offsetting the container movement
      let innerSpeed;
      if (innerOffset < 0) {
        innerSpeed = 1 + Math.abs(innerOffset) / 200;
      } else {
        innerSpeed = 1 - innerOffset / 200;
      }

      // Keep values in reasonable range
      innerSpeed = Math.max(0.7, Math.min(1.3, innerSpeed));

      // Apply data-speed attribute
      inner.current.setAttribute("data-speed", innerSpeed.toString());
    }
  });

  // Force refresh to ensure ScrollSmoother picks up the new attributes
  setTimeout(() => {
    if (window.__smoother__) {
      window.__smoother__.refresh();
    }
    ScrollTrigger.refresh();
  }, 100);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// STORY SECTION ANIMATION ////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

export interface StoryAnimationRefs {
  section: HTMLElement | null;
  label?: HTMLElement | null;
  title: HTMLElement | null;
  text: HTMLElement | null;
  services: HTMLElement | null;
  decor?: HTMLElement | null;
  originStory: HTMLElement | null;
  originImage: HTMLElement | null;
}

export function animateStorySection(refs: StoryAnimationRefs): void {
  if (typeof window === "undefined") return;

  const tl = gsap.timeline({ paused: true });

  const { section, title, text, services, decor, originStory, originImage } =
    refs;

  if (!section || !title || !text || !services || !originImage) return;

  // Create unique IDs for these animations
  const mainId = `story-main-${Date.now()}`;
  const originId = `story-origin-${Date.now()}`;
  const revealId = `story-reveal-${Date.now()}`;
  const parallaxId = `story-parallax-${Date.now()}`;

  // First, kill any existing ScrollTriggers for this section
  ScrollTrigger.getAll().forEach((trigger) => {
    if (
      trigger.vars.id &&
      typeof trigger.vars.id === "string" &&
      (trigger.vars.id.includes("story-main") ||
        trigger.vars.id.includes("story-origin") ||
        trigger.vars.id.includes("story-reveal") ||
        trigger.vars.id.includes("story-parallax"))
    ) {
      trigger.kill();
    }
  });

  gsap.set(section, {
    visibility: "visible",
    opacity: 1,
  });

  // Floating decoration animations
  if (decor) {
    gsap.to(decor.querySelectorAll(".story-section__decor"), {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.3,
    });
  }

  const mainTrigger = ScrollTrigger.create({
    trigger: section,
    start: "top 60%",
    toggleActions: "play none none none",
    markers: false,
    animation: tl,
    id: mainId,
  });

  trackScrollTrigger(mainTrigger);

  const highlightEl = title.querySelector(".highlight");
  if (highlightEl) {
    gsap.set(highlightEl, { backgroundSize: "0% 100%" });
  }

  tl.from(title, { opacity: 0, y: 50, duration: 0.6 }, "+=0.2")
    .from(
      title.querySelectorAll(".word"),
      { opacity: 0, y: 20, stagger: 0.05, duration: 0.4 },
      "<0.2"
    )
    .to(
      highlightEl,
      { backgroundSize: "100% 100%", duration: 0.8, ease: "power2.inOut" },
      "<"
    )
    .from(text, { opacity: 0, y: 30, duration: 0.4 }, "<0.3")
    .from(
      services.querySelectorAll("li"),
      { opacity: 0, y: 20, stagger: 0.05, duration: 0.3 },
      "<0.2"
    );

  if (originStory) {
    const paragraphs = originStory.querySelectorAll("p");
    const originTrigger = ScrollTrigger.create({
      trigger: originStory,
      start: "top 80%",
      toggleActions: "play none none none",
      id: originId,
      onEnter: () => {
        gsap.fromTo(
          originStory,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.6 }
        );
        gsap.fromTo(
          paragraphs,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.2, duration: 0.5 }
        );
      },
    });
    trackScrollTrigger(originTrigger);
  }

  if (originImage) {
    const inner = originImage.querySelector(
      ".story-section__image-frame-inner"
    );
    const image = originImage.querySelector(".story-section__image");

    const revealTrigger = ScrollTrigger.create({
      trigger: originImage,
      start: "top 85%",
      toggleActions: "play none none none",
      id: revealId,
      onEnter: () => {
        gsap.fromTo(
          originImage,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 }
        );
      },
    });
    trackScrollTrigger(revealTrigger);

    if (inner && image) {
      gsap.set(image, { scale: 1.1 });
      const parallaxTrigger = ScrollTrigger.create({
        trigger: originImage,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
        id: parallaxId,
        onUpdate: (self) => {
          gsap.to(image, {
            y: self.progress * 25,
            duration: 0.1,
            ease: "none",
            overwrite: "auto",
          });
        },
      });
      trackScrollTrigger(parallaxTrigger);
    }

    const corners = originImage.querySelectorAll(
      ".story-section__image-corner"
    );
    tl.fromTo(
      corners,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, delay: 0.2 },
      1.5
    );
  }

  // Force refresh ScrollTrigger
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// TEAM SECTION ANIMATION ////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

export interface TeamAnimationRefs {
  section: HTMLElement | null;
  title: HTMLElement | null;
  subtitle: HTMLElement | null;
  grid: HTMLElement | null;
}

export function animateTeamSection({
  section,
  title,
  subtitle,
  grid,
}: TeamAnimationRefs) {
  if (typeof window === "undefined" || !section) return;

  // Create a unique ID for this animation
  const animationId = `equipo-team-section-${Date.now()}`;

  // First, kill any existing ScrollTriggers for this section
  ScrollTrigger.getAll().forEach((trigger) => {
    if (
      trigger.vars.id &&
      typeof trigger.vars.id === "string" &&
      trigger.vars.id.includes("equipo-team-section")
    ) {
      trigger.kill();
    }
  });

  const tl = gsap.timeline({ paused: true });

  gsap.set(section, { visibility: "visible", opacity: 1 });

  // if (title) {
  //   tl.add(() => {
  //     charAnimation(title);
  //   }, 0.2);
  // }

  // Animate subtitle
  if (subtitle) {
    tl.from(
      subtitle,
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
  if (grid) {
    const gridItems = grid.querySelectorAll(".hover-card");

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
    trigger: section,
    animation: tl,
    start: "top 80%",
    toggleActions: "play none none none",
    once: true,
    id: animationId,
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

interface StatsAnimationRefs {
  section?: HTMLElement | null;
  title?: HTMLElement | null;
  stats?: HTMLElement | null;
}

export function animateStatsSection({ section, stats }: StatsAnimationRefs) {
  if (typeof window === "undefined" || !section) return;

  // Create a unique ID for this animation
  const animationId = `equipo-stats-section-${Date.now()}`;

  // First, kill any existing ScrollTriggers for this section
  ScrollTrigger.getAll().forEach((trigger) => {
    if (
      trigger.vars.id &&
      typeof trigger.vars.id === "string" &&
      trigger.vars.id.includes("equipo-stats-section")
    ) {
      trigger.kill();
    }
  });

  const tl = gsap.timeline({ paused: true });

  gsap.set(section, { visibility: "visible", opacity: 1 });

  const sequence = [{ el: stats, props: { y: 30 }, index: 0.5 }];

  sequence.forEach(({ el, props, index }) => {
    if (!el) return;
    gsap.set(el, { opacity: 0, ...props });

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

  // Animate each stat number
  if (stats) {
    const statItems = stats.querySelectorAll(".stats-section__item");
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
    trigger: section,
    animation: tl,
    start: "top 80%",
    toggleActions: "play none none none",
    once: true,
    id: animationId,
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

export interface ClientsAnimationRefs {
  section: HTMLElement | null;
  title: HTMLElement | null;
  text: HTMLElement | null;
  logos: HTMLElement | null;
  cta: HTMLElement | null;
  decor: HTMLElement | null;
}

export function animateClientsSection({
  section,
  title,
  text,
  logos,
  cta,
  decor,
}: ClientsAnimationRefs) {
  if (typeof window === "undefined" || !section) return;

  // Create a unique ID for this animation
  const animationId = `equipo-clients-section-${Date.now()}`;

  // First, kill any existing ScrollTriggers for this section
  ScrollTrigger.getAll().forEach((trigger) => {
    if (
      trigger.vars.id &&
      typeof trigger.vars.id === "string" &&
      trigger.vars.id.includes("equipo-clients-section")
    ) {
      trigger.kill();
    }
  });

  const tl = gsap.timeline({ paused: true });

  gsap.set(section, { visibility: "visible", opacity: 1 });

  const sequence = [
    { el: title, props: { y: 30 }, index: 0.1, charAnim: true },
    { el: text, props: { y: 20 }, index: 0.4 },
    { el: logos, props: { y: 20 }, index: 0.6 },
    { el: cta, props: { y: 20 }, index: 0.9 },
  ];

  sequence.forEach(({ el, props, index, charAnim }) => {
    if (!el) return;
    gsap.set(el, { opacity: 0, ...props });

    // if (charAnim && title) {
    //   tl.add(() => {
    //     charAnimation(title);
    //   }, index);
    // }

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
    trigger: section,
    animation: tl,
    start: "top 85%",
    toggleActions: "play none none none",
    once: true,
    id: animationId,
  });

  // Floating decor loop
  if (decor) {
    gsap.to(decor, {
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

interface CTAAnimationRefs {
  section?: HTMLElement | null;
  content?: HTMLElement | null;
  title?: HTMLElement | null;
  text?: HTMLElement | null;
  decor?: HTMLElement | null;
}

export function animateCTASection({
  section,
  content,
  title,
  text,
  decor,
}: CTAAnimationRefs) {
  if (typeof window === "undefined" || !section) return;

  // Create a unique ID for this animation
  const animationId = `equipo-cta-section-${Date.now()}`;

  // First, kill any existing ScrollTriggers for this section
  ScrollTrigger.getAll().forEach((trigger) => {
    if (
      trigger.vars.id &&
      typeof trigger.vars.id === "string" &&
      trigger.vars.id.includes("equipo-cta-section")
    ) {
      trigger.kill();
    }
  });

  const tl = gsap.timeline({ paused: true });

  gsap.set(section, { visibility: "visible", opacity: 1 });

  const sequence = [
    { el: content, props: { y: 40, scale: 0.95 }, index: 0 },
    { el: title, props: { y: 30 }, index: 0.4, charAnim: true },
    { el: text, props: { y: 20 }, index: 0.7 },
  ];

  sequence.forEach(({ el, props, index, charAnim }) => {
    if (!el) return;
    gsap.set(el, { opacity: 0, ...props });

    if (charAnim && title) {
      tl.add(() => {
        charAnimation(title);
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
    trigger: section,
    animation: tl,
    start: "top 85%",
    toggleActions: "play none none none",
    once: true,
    id: animationId,
  });

  if (decor) {
    gsap.set(decor.querySelectorAll(".cta-section__decor"), {
      opacity: 0,
      y: 20,
    });

    gsap.to(decor.querySelectorAll(".cta-section__decor"), {
      opacity: (i) => (i === 0 || i === 4 ? 0.3 : 1),
      y: 0,
      duration: 1.2,
      stagger: 0.15,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        id: `equipo-cta-decor-${Date.now()}`,
      },
    });

    gsap.to(".cta-section__decor", {
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

// Update the cleanup function to include team section
export function cleanupEquipoAnimations() {
  if (typeof window === "undefined") return;

  // Get all ScrollTrigger instances
  const triggers = ScrollTrigger.getAll();

  // Kill only equipo page-related ScrollTriggers
  triggers.forEach((trigger) => {
    if (trigger.vars.id && typeof trigger.vars.id === "string") {
      const id = trigger.vars.id as string;
      if (
        id.includes("equipo-hero-section") ||
        id.includes("story-main") ||
        id.includes("story-origin") ||
        id.includes("story-reveal") ||
        id.includes("story-parallax") ||
        id.includes("equipo-stats-section") ||
        id.includes("equipo-clients-section") ||
        id.includes("equipo-cta-section") ||
        id.includes("equipo-team-section") ||
        id.includes("floating-container") ||
        id.includes("floating-inner") ||
        id.includes("equipo-hero-parallax")
      ) {
        trigger.kill();
      }
    }
  });

  // Refresh ScrollTrigger
  ScrollTrigger.refresh();
}
