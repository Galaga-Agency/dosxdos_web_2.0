"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "@/plugins";
import { refreshScrollTrigger } from "../scrolltrigger-config";
import { isMobile } from "@/utils/device";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

// Store all ScrollTrigger instances for cleanup
const scrollTriggerInstances: ScrollTrigger[] = [];

// Interface for animation references
export interface HeroAnimationRefs {
  heroSection: HTMLElement | null;
  heroImage: HTMLElement | null;
  heroTitle: HTMLElement | null;
  heroSubtitle: HTMLElement | null;
  heroDescription: HTMLElement | null;
  heroMeta: HTMLElement | null;
  [key: string]: HTMLElement | null;
}

// Interface for objective section animations
export interface ObjectiveSectionRefs {
  section: HTMLElement | null;
  label: HTMLElement | null;
  title: HTMLElement | null;
  text: HTMLElement | null;
  gallery: HTMLElement | null;
  [key: string]: HTMLElement | null;
}

// Interface for process section animations
export interface ProcessSectionRefs {
  section: HTMLElement | null;
  label: HTMLElement | null;
  title: HTMLElement | null;
  text: HTMLElement | null;
  fullImage: HTMLElement | null;
  imageLeft: HTMLElement | null;
  imageRight: HTMLElement | null;
  steps: HTMLElement | null;
  [key: string]: HTMLElement | null;
}

// Interface for CTA section animations
export interface CTASectionRefs {
  section: HTMLElement | null;
  title: HTMLElement | null;
  text: HTMLElement | null;
  cta: HTMLElement | null;
  [key: string]: HTMLElement | null;
}

// Track ScrollTrigger instances for cleanup
function trackScrollTrigger(instance: ScrollTrigger): ScrollTrigger {
  scrollTriggerInstances.push(instance);
  return instance;
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

function animateTextWithSplitText(element: any) {
  if (!element) return null;

  // Verificar si es metadatos (tienen una estructura específica)
  const isMetaSection = element.classList.contains(
    "portfolio-hero__meta-wrapper"
  );

  try {
    if (isMetaSection) {
      // Para meta, animar cada elemento meta individual directamente
      const metaItems = element.querySelectorAll(".portfolio-hero__meta");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        metaItems,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      return tl;
    } else {
      // Para la descripción u otros elementos de texto
      const paragraphs = element.querySelectorAll("p");

      if (paragraphs.length > 0) {
        gsap.set(paragraphs, { opacity: 0, y: 20 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });

        tl.to(paragraphs, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        });

        return tl;
      } else {
        // Si no hay párrafos, animar el elemento completo
        gsap.set(element, { opacity: 0, y: 20 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });

        tl.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        });

        return tl;
      }
    }
  } catch (error) {
    console.error("Error en animateTextWithSplitText:", error);

    // Animación alternativa más simple
    if (isMetaSection) {
      const metaItems = element.querySelectorAll(".portfolio-hero__meta");
      return gsap.fromTo(
        metaItems,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    } else {
      return gsap.fromTo(
        element,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }
}

export function initFadeAnimations(): void {
  if (typeof window === "undefined") return;

  // Fade Bottom animations - más acentuadas
  setupFadeAnimation(
    ".fade_bottom",
    { y: 70, opacity: 0, scale: 0.95 }, // Menor distancia pero añadimos escala
    { y: 0, opacity: 1, scale: 1, duration: 1.2, delay: 0.2 }, // Menor delay y duración
    "top center+=200" // Trigger más temprano
  );

  // Fade Top animations - más acentuadas
  setupFadeAnimation(
    ".fade_top",
    { y: -70, opacity: 0, scale: 0.95 },
    { y: 0, opacity: 1, scale: 1, duration: 1.2 }
  );

  // Fade Left animations - más acentuadas
  setupFadeAnimation(
    ".fade_left",
    { x: -70, opacity: 0, scale: 0.95 },
    { x: 0, opacity: 1, scale: 1, duration: 1.2 }
  );

  // Fade Right animations - más acentuadas
  setupFadeAnimation(
    ".fade_right",
    { x: 70, opacity: 0, scale: 0.95 },
    { x: 0, opacity: 1, scale: 1, duration: 1.2 }
  );
}

// Character animation using SplitText
export function animateChars(current: HTMLElement | null = null) {
  if (typeof window === "undefined") return;

  console.log("Animating Characters");

  // Register GSAP plugins
  gsap.registerPlugin(SplitText);

  // If a specific element is passed, only animate that
  if (current) {
    const splitTextLine = current;

    gsap.set(splitTextLine, {
      visibility: "hidden",
      perspective: 300,
    });

    const itemSplitted = new SplitText(splitTextLine, {
      type: "chars, words",
    });

    gsap.set(splitTextLine, { visibility: "visible" });

    const tl = gsap.timeline();
    tl.from(itemSplitted.chars, {
      duration: 1,
      x: 100,
      autoAlpha: 0,
      stagger: 0.05,
    });

    return;
  }

  // Original behavior for multiple elements
  let char_come = gsap.utils.toArray(".char-animation");
  char_come.forEach((splitTextLine: any) => {
    gsap.set(splitTextLine, {
      visibility: "hidden",
      perspective: 300,
    });

    const itemSplitted = new SplitText(splitTextLine, {
      type: "chars, words",
    });

    gsap.set(splitTextLine, { visibility: "visible" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: splitTextLine,
        start: "top 90%",
        end: "bottom 60%",
        scrub: false,
        markers: false,
        toggleActions: "play none none none",
      },
    });

    tl.from(itemSplitted.chars, {
      duration: 1,
      x: 100,
      autoAlpha: 0,
      stagger: 0.05,
    });
  });
}

// Versión corregida de la función initHeroAnimations
export function initHeroAnimations(refs: HeroAnimationRefs) {
  if (typeof window === "undefined") return;

  console.log("Inicializando animaciones de Hero");

  // Registrar plugins de GSAP
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Configurar parallax para el hero
  if (refs.heroSection && refs.heroImage) {
    setupHeroParallax(refs.heroSection, refs.heroImage);
  }

  // Crear timeline para animaciones del contenido del hero
  const heroTimeline = gsap.timeline({
    defaults: { ease: "power3.out" },
    delay: 0.5, // Reducir el delay para que las animaciones se vean antes
  });

  // Animación del título con SplitText si tiene la clase char-animation
  if (refs.heroTitle && refs.heroTitle.classList.contains("char-animation")) {
    animateChars(refs.heroTitle);
  } else if (refs.heroTitle) {
    // Animación alternativa si no tiene la clase char-animation
    heroTimeline.fromTo(
      refs.heroTitle,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      0
    );
  }

  // Animación del subtítulo
  if (refs.heroSubtitle) {
    heroTimeline.fromTo(
      refs.heroSubtitle,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      0.2
    );
  }
  

  // IMPORTANTE: Añadir un pequeño retraso antes de las animaciones de descripción y meta
  heroTimeline.add(() => {
    console.log("Iniciando animaciones de descripción y meta");
  }, 0.3);

  // Animación de la descripción - ahora con comprobación de consola más explícita
  if (refs.heroDescription) {
    console.log("Animando descripción");
    // Establecer opacity: 0 manualmente para asegurar estado inicial correcto
    gsap.set(refs.heroDescription, { opacity: 0 });

    // Usar setTimeout para dar tiempo a que el DOM esté listo
    setTimeout(() => {
      try {
        animateTextWithSplitText(refs.heroDescription);
      } catch (error) {
        console.error("Error animando descripción:", error);
        // Fallback simple
        gsap.to(refs.heroDescription, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
        });
      }
    }, 100);
  }

  // Para los metadatos:
  if (refs.heroMeta) {
    console.log("Animando metadatos");
    // Establecer opacity: 0 manualmente para asegurar estado inicial correcto
    const metaItems = refs.heroMeta.querySelectorAll(".portfolio-hero__meta");
    gsap.set(metaItems, { opacity: 0 });

    // Usar setTimeout para dar tiempo a que el DOM esté listo
    setTimeout(() => {
      try {
        animateTextWithSplitText(refs.heroMeta);
      } catch (error) {
        console.error("Error animando metadatos:", error);
        // Fallback simple para cada item de meta
        gsap.to(metaItems, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          delay: 0.6,
        });
      }
    }, 100);
  }

  // Refrescar ScrollTrigger para asegurar que todo está registrado correctamente
  setTimeout(() => {
    refreshScrollTrigger();
    console.log("ScrollTrigger refrescado");
  }, 300);
}

// Sets up parallax effect for hero section
function setupHeroParallax(
  sectionEl: HTMLElement,
  targetEl: HTMLElement
): void {
  // Set initial position
  gsap.set(targetEl, { y: 0 });

  // Create ScrollTrigger for parallax effect
  const instance = ScrollTrigger.create({
    trigger: sectionEl,
    start: "top top",
    end: "bottom top",
    scrub: 1.5,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      gsap.to(targetEl, {
        y: `-${self.progress * 20}%`,
        ease: "none",
        overwrite: "auto",
      });
    },
  });

  // Track this ScrollTrigger instance for cleanup
  trackScrollTrigger(instance);
}

// Animate the objective section elements
export function animateObjectiveSection(refs: ObjectiveSectionRefs) {
  if (typeof window === "undefined") return;

  console.log("Animating Objective Section");

  // Register GSAP plugins if not already registered
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Use initFadeAnimations for standard fade animations
  initFadeAnimations();

  // Force refresh ScrollTrigger
  setTimeout(() => {
    refreshScrollTrigger();
  }, 100);
}

// Initialize moving image slider for project galleries
export function movingImageSlider() {
  if (typeof window === "undefined") return;

  console.log("Initializing Moving Image Slider");

  // Register GSAP plugins if not already registered
  gsap.registerPlugin(ScrollTrigger);

  let mediaQuery = gsap.matchMedia();

  // Only apply horizontal scrolling animation on tablets and above
  mediaQuery.add("(min-width: 768px)", () => {
    const wrappers = document.querySelectorAll(".wrapper-gallery");

    wrappers.forEach((wrapper, index) => {
      const el = wrapper as HTMLElement;
      if (!el) return;

      const distance = el.scrollWidth - el.offsetWidth;
      if (distance <= 0) return;

      const isTop = index % 2 === 0;

      gsap.fromTo(
        el,
        { x: isTop ? 0 : -distance },
        {
          x: isTop ? -distance : 0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        }
      );

      // Track this ScrollTrigger instance for cleanup
      trackScrollTrigger(
        ScrollTrigger.getAll()[ScrollTrigger.getAll().length - 1]
      );
    });
  });
}

// Animate gallery items with reveal effect
export function imageRevealAnimation() {
  if (typeof window === "undefined") return;

  // Register GSAP plugins if not already registered
  gsap.registerPlugin(ScrollTrigger);

  const items = document.querySelectorAll(
    ".project-objective-section__gallery-item"
  );

  if (!items.length) return;

  // Create a staggered animation for all gallery items
  gsap.fromTo(
    items,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: items[0].closest(".project-objective-section__gallery"),
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    }
  );

  // Track this ScrollTrigger instance for cleanup
  if (ScrollTrigger.getAll().length > 0) {
    trackScrollTrigger(
      ScrollTrigger.getAll()[ScrollTrigger.getAll().length - 1]
    );
  }
}

// Initialize process section animations with floating effect for dual images
export function initProcessSectionAnimations(refs: ProcessSectionRefs) {
  if (typeof window === "undefined") return;

  // Register GSAP plugins if not already registered
  gsap.registerPlugin(ScrollTrigger);

  // Use the fade animations
  initFadeAnimations();

  // Title animation with SplitText if it has char-animation class
  if (refs.title && refs.title.classList.contains("char-animation")) {
    animateChars(refs.title);
  }

  // Full width image animation
  if (refs.fullImage) {
    // Set initial opacity to 0
    gsap.set(refs.fullImage, { opacity: 0 });

    // Add a reveal animation
    gsap.to(refs.fullImage, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: refs.fullImage,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });

    // Container parallax
    const instance1 = ScrollTrigger.create({
      trigger: refs.fullImage,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        gsap.to(refs.fullImage, {
          y: `-${self.progress * 10}%`,
          ease: "none",
          overwrite: "auto",
        });
      },
    });
    trackScrollTrigger(instance1);

    // Image parallax
    const img = refs.fullImage.querySelector("img");
    if (img) {
      const instance2 = ScrollTrigger.create({
        trigger: refs.fullImage,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.to(img, {
            y: `-${self.progress * 15}%`,
            ease: "none",
            overwrite: "auto",
          });
        },
      });
      trackScrollTrigger(instance2);
    }
  }

  // Left floating image
  if (refs.imageLeft) {
    // Set initial opacity to 0
    gsap.set(refs.imageLeft, { opacity: 0 });

    // Add floating reveal animation
    gsap.to(refs.imageLeft, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: refs.fullImage || refs.imageLeft,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Add subtle continuous floating animation
    gsap.to(refs.imageLeft, {
      y: "-=10",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 1,
    });

    // Container parallax
    const instance3 = ScrollTrigger.create({
      trigger: refs.imageLeft,
      start: "top bottom",
      end: "bottom top",
      scrub: 3,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        gsap.to(refs.imageLeft, {
          y: `-${self.progress * (isMobile() ? 0 : 75)}%`,
          ease: "none",
          overwrite: "auto",
        });
      },
    });
    trackScrollTrigger(instance3);
  }

  if (refs.imageRight) {
    // Set initial opacity to 0
    gsap.set(refs.imageRight, { opacity: 0 });

    // Add floating reveal animation with slight delay
    gsap.to(refs.imageRight, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power3.out",
      delay: 0.2,
      scrollTrigger: {
        trigger: refs.fullImage || refs.imageRight,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Add subtle continuous floating animation (slightly out of sync with the left image)
    gsap.to(refs.imageRight, {
      y: "-=10",
      duration: 2.3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 1.3,
    });

    // Container parallax
    const instance5 = ScrollTrigger.create({
      trigger: refs.imageRight,
      start: "top bottom",
      end: "bottom top",
      scrub: 3,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        gsap.to(refs.imageRight, {
          y: `-${self.progress * (isMobile() ? 0 : 40)}%`,
          ease: "none",
          overwrite: "auto",
        });
      },
    });
    trackScrollTrigger(instance5);
  }
}

// Animate the CTA section elements
export function animateCTASection(refs: CTASectionRefs) {
  if (typeof window === "undefined") return;

  console.log("Animating CTA Section");

  // Use the fade animations
  initFadeAnimations();
}

// Clean up function for project details animations
export function cleanupProjectDetailsAnimations(): void {
  if (typeof window === "undefined") return;

  console.log("⚠️ Cleaning up all project details page animations");

  // Kill all ScrollTriggers
  ScrollTrigger.getAll().forEach((trigger) => {
    trigger.kill();
  });

  // Clear match media queries
  ScrollTrigger.clearMatchMedia();

  // Refresh ScrollTrigger
  refreshScrollTrigger();
}
