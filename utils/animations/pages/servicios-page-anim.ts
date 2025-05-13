"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "@/plugins";
import { refreshScrollTrigger } from "../scrolltrigger-config";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

// Store all ScrollTrigger instances for cleanup
const scrollTriggerInstances: ScrollTrigger[] = [];

// Track ScrollTrigger instances for cleanup
function trackScrollTrigger(instance: ScrollTrigger): ScrollTrigger {
  scrollTriggerInstances.push(instance);
  return instance;
}

// Interface for hero section animations
export interface ServiciosHeroRefs {
  section: HTMLElement | null;
  title: HTMLElement | null;
  subtitle: HTMLElement | null;
  button: HTMLElement | null;
  [key: string]: HTMLElement | null;
}

// Common fade animation setup - ENHANCED VERSION
function setupFadeAnimation(
  selector: string,
  initialProps: gsap.TweenVars,
  animProps: gsap.TweenVars,
  startPosition: string = "top center+=100"
) {
  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) return; // Fixed syntax error

  gsap.set(selector, initialProps);
  const elementsArray = gsap.utils.toArray(selector);

  elementsArray.forEach((item: any) => {
    const tl = gsap.timeline({
      scrollTrigger: trackScrollTrigger(
        ScrollTrigger.create({
          trigger: item,
          start: startPosition,
          once: true,
          // Añadimos markers para debug (quitar en producción)
          // markers: true,
        })
      ),
    });

    // Añadimos un efecto de escala para hacerlo más visible
    tl.to(item, {
      ...animProps,
      // Cambiamos el ease a algo más dramático
      ease: "back.out(1.7)",
      // Reducimos la duración para que sea más rápido e impactante
      duration: animProps.duration || 1.2,
    });
  });
}

// Enhanced subtitle animation with SplitText
function animateSubtitleWithSplitText(element: HTMLElement | null) {
  if (!element) return null;

  try {
    const splitDesc = new SplitText(element, { type: "lines" });
    gsap.set(element, { visibility: "visible", perspective: 400 });

    const descTl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        end: "bottom 60%",
        toggleActions: "play none none none",
      },
    });

    descTl.from(splitDesc.lines, {
      duration: 1,
      delay: 0.3,
      opacity: 0,
      rotationX: -80,
      force3D: true,
      transformOrigin: "top center -50",
      stagger: 0.1,
    });

    return descTl;
  } catch (error) {
    console.error("Error in animateSubtitleWithSplitText:", error);

    // Fallback if SplitText fails
    gsap.set(element, { visibility: "visible", opacity: 0, y: 20 });
    return gsap.to(element, { duration: 1, opacity: 1, y: 0 });
  }
}

export function initFadeAnimations(): void {
  if (typeof window === "undefined") return;

  // Fade Bottom animations
  setupFadeAnimation(
    ".fade_bottom",
    { y: 70, opacity: 0, scale: 0.95 }, // Menor distancia pero añadimos escala
    { y: 0, opacity: 1, scale: 1, duration: 1.2, delay: 0.2 }, // Menor delay y duración
    "top center+=200" // Trigger más temprano
  );

  // Fade Top animations
  setupFadeAnimation(
    ".fade_top",
    { y: -70, opacity: 0, scale: 0.95 },
    { y: 0, opacity: 1, scale: 1, duration: 1.2 }
  );

  // Fade Left animations
  setupFadeAnimation(
    ".fade_left",
    { x: -70, opacity: 0, scale: 0.95 },
    { x: 0, opacity: 1, scale: 1, duration: 1.2 }
  );

  // Fade Right animations
  setupFadeAnimation(
    ".fade_right",
    { x: 70, opacity: 0, scale: 0.95 },
    { x: 0, opacity: 1, scale: 1, duration: 1.2 }
  );
}

export function animateRecentProjects(): void {
  if (typeof window === "undefined") return;

  // Skip on desktop - only run on mobile
  if (window.innerWidth >= 768) return;

  console.log("Initializing mobile recent projects animations");

  // Simple approach - add classes to elements when they enter the viewport
  const projectItems = document.querySelectorAll(
    ".servicios-recent-projects__item"
  );

  if (projectItems.length === 0) {
    console.log("No project items found");
    return;
  }

  // Create an Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Get the elements we want to animate
        const item = entry.target;
        const infoElement = item.querySelector(
          ".servicios-recent-projects__hover-info"
        );
        const labelElement = item.querySelector(
          ".servicios-recent-projects__label"
        );
        const titleElement = item.querySelector(
          ".servicios-recent-projects__project-title"
        );

        if (!infoElement || !labelElement || !titleElement) return;

        if (entry.isIntersecting) {
          console.log("Item in view:", item);
          // When the item is in the viewport
          infoElement.classList.add("info-visible");
          labelElement.classList.add("label-visible");
          titleElement.classList.add("title-visible");
        } else {
          console.log("Item out of view:", item);
          // When the item is out of the viewport
          infoElement.classList.remove("info-visible");
          labelElement.classList.remove("label-visible");
          titleElement.classList.remove("title-visible");
        }
      });
    },
    {
      threshold: 0.5, // Trigger when 50% of the item is visible
      rootMargin: "0px",
    }
  );

  // Observe all project items
  projectItems.forEach((item) => {
    observer.observe(item);
    console.log("Observing item:", item);
  });
}

export function imageRevealAnimation() {
  if (typeof window === "undefined") return;

  const imgRevealElements = document.querySelectorAll(".img_reveal");
  if (imgRevealElements.length === 0) return;

  imgRevealElements.forEach((imgReveal) => {
    const image = imgReveal.querySelector("img");
    const overlay = imgReveal.querySelector(".img_reveal__overlay");
    const gridItem = imgReveal.closest(".services-grid__item");
    const content = gridItem?.querySelector(".services-grid__content");

    if (!image) return;

    // Initially hide overlay and content
    if (overlay) gsap.set(overlay, { autoAlpha: 0 });
    if (content) gsap.set(content, { autoAlpha: 0 });

    const tl = gsap.timeline({
      scrollTrigger: trackScrollTrigger(
        ScrollTrigger.create({
          trigger: imgReveal,
          start: "top 70%",
        })
      ),
    });

    // Keep your original animation
    tl.set(imgReveal, { autoAlpha: 1 })
      .from(imgReveal, {
        duration: 1.5,
        xPercent: -100,
        ease: "power2.out",
      })
      .from(image, {
        duration: 1.5,
        xPercent: 100,
        scale: 1.5,
        delay: -1.5,
        ease: "power2.out",
      });

    // After main animation completes, show overlay and content
    if (overlay) {
      tl.to(overlay, {
        autoAlpha: 1,
        duration: 0.3,
      });
    }

    if (content) {
      tl.to(
        content,
        {
          autoAlpha: 1,
          duration: 0.3,
        },
        "-=0.1"
      ); // Slightly overlap with overlay animation
    }
  });
}

export function animateServiciosHero(refs: ServiciosHeroRefs) {
  if (typeof window === "undefined" || !refs.title) return;

  console.log("Animating Servicios Hero");

  // Make elements visible
  const elements = [refs.title, refs.subtitle, refs.button].filter(Boolean);
  gsap.set(elements, { visibility: "visible" });

  // Title character animation
  try {
    const splitText = new SplitText(refs.title, { type: "chars, words" });
    gsap.from(splitText.chars, {
      duration: 1,
      x: 100,
      autoAlpha: 0,
      stagger: 0.05,
    });
  } catch (error) {
    console.error("Error in title animation:", error);
    gsap.fromTo(
      refs.title,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
    );
  }

  // Horizontal scroll animation for tablets and above - with improved debugging
  if (window.innerWidth >= 1025) {
    gsap.set(refs.title, { x: "30%" });

    // SECOND: Create the scroll animation timeline with more explicit configuration
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: refs.section,
        start: "top 30%",
        end: "bottom 20%",
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });

    // Add the scroll animation with easing
    tl.to(refs.title, {
      x: "-60%",
      ease: "power2.inOut",
      duration: 1,
    });

    // Track for cleanup
    if (tl.scrollTrigger) {
      trackScrollTrigger(tl.scrollTrigger);
    }
  }

  // UPDATED: Subtitle animation with SplitText
  if (refs.subtitle) {
    try {
      // Apply the 3D rotating line animation to the subtitle
      animateSubtitleWithSplitText(refs.subtitle);
    } catch (error) {
      console.error("Error in subtitle animation:", error);
      // Fallback to simple animation if SplitText fails
      gsap.fromTo(
        refs.subtitle,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1, ease: "power2.out" }
      );
    }
  }

  // Button animation
  if (refs.button) {
    gsap.fromTo(
      refs.button,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 1.3, ease: "power2.out" }
    );
  }
}

// Cursor bubble animation
export function initCursorBubbleAnimation() {
  if (typeof window === "undefined") return;

  // Create the viewDemo bubble
  const viewDemo = document.createElement("div");
  viewDemo.className = "view-demo";
  viewDemo.innerHTML = "<span>Ver<br>Más</span>";
  document.body.appendChild(viewDemo);

  // Variables for smooth following
  let mouseX = 0,
    mouseY = 0,
    bubbleX = 0,
    bubbleY = 0;

  // Handle mouse movement
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Animate bubble with requestAnimationFrame
  const animateBubble = () => {
    const speed = 0.15;
    bubbleX += (mouseX - bubbleX) * speed;
    bubbleY += (mouseY - bubbleY) * speed;

    viewDemo.style.left = `${bubbleX + 10}px`;
    viewDemo.style.top = `${bubbleY - 10}px`;

    window.cursorAnimationFrame = requestAnimationFrame(animateBubble);
  };
  window.cursorAnimationFrame = requestAnimationFrame(animateBubble);

  // Add hover events
  setTimeout(() => {
    [".services-grid__item", ".portfolio-item"].forEach((selector) => {
      document.querySelectorAll(selector).forEach((item) => {
        item.addEventListener("mouseenter", () =>
          viewDemo.classList.add("active")
        );
        item.addEventListener("mouseleave", () =>
          viewDemo.classList.remove("active")
        );
      });
    });
  }, 300);
}

// Initialize all animations for the servicios page
export function initServiciosAnimations(): void {
  if (typeof window === "undefined") return;
  initFadeAnimations();
  animateRecentProjects();
  refreshScrollTrigger();
}

// Clean up cursor bubble animation
export function cleanupCursorBubbleAnimation() {
  if (typeof window === "undefined") return;

  const viewDemo = document.querySelector(".view-demo");
  if (viewDemo && document.body.contains(viewDemo)) {
    document.body.removeChild(viewDemo);
  }

  if (window.cursorAnimationFrame) {
    cancelAnimationFrame(window.cursorAnimationFrame);
  }
}

// Cleanup function
export function cleanupServiciosAnimations(): void {
  if (typeof window === "undefined") return;

  // Kill all ScrollTriggers
  scrollTriggerInstances.forEach((trigger) => trigger.kill());
  scrollTriggerInstances.length = 0;

  // Clear match media
  ScrollTrigger.clearMatchMedia();

  refreshScrollTrigger();
}

// Add type declaration for window.cursorAnimationFrame
declare global {
  interface Window {
    cursorAnimationFrame?: number;
  }
}
