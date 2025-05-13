import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";
import { refreshScrollTrigger } from "../scrolltrigger-config";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Animación del título principal
export function animateTitle(titleElement: HTMLElement): void {
  if (typeof window === "undefined") return;

  gsap.fromTo(
    titleElement,
    {
      y: 30,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      delay: 0.3,
    }
  );

  // Animaciones adicionales para elementos específicos
  animateContent();
}

// Animación de los contenidos cuando sean visibles en el scroll
function animateContent(): void {
  if (typeof window === "undefined") return;

  // Animación para las secciones
  const sections = document.querySelectorAll(".transparencia-page__section");

  sections.forEach((section, index) => {
    gsap.fromTo(
      section,
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
      }
    );
  });

  // Animación para los botones
  const buttons = document.querySelectorAll(".primary-button");

  buttons.forEach((button) => {
    gsap.fromTo(
      button,
      {
        scale: 0.95,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: button,
          start: "top bottom-=50",
          toggleActions: "play none none none",
        },
      }
    );
  });

  // Animación para la tabla
  const table = document.querySelector(".transparencia-page__table-wrapper");

  if (table) {
    gsap.fromTo(
      table,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: table,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
      }
    );
  }

  // Animación para las imágenes
  const images = document.querySelectorAll(
    ".transparencia-page__logo, .transparencia-page__admin-image img"
  );

  images.forEach((image) => {
    gsap.fromTo(
      image,
      {
        opacity: 0,
        scale: 0.9,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: image,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
      }
    );
  });
}

// Función de limpieza para eliminar animaciones cuando se desmonta el componente
export function cleanupTransparenciaAnimations(): void {
  if (typeof window === "undefined") return;

  // Kill all ScrollTriggers
  ScrollTrigger.getAll().forEach((trigger: { kill: () => void; }) => {
    trigger.kill();
  });

  // Kill all active GSAP animations
  gsap.killTweensOf(".transparencia-page, .transparencia-page *");

  // Clear match media queries
  ScrollTrigger.clearMatchMedia();

  // Refresh ScrollTrigger
  refreshScrollTrigger();
}
