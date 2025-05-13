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

  // Animación adicional para los tipos de cookies (opcional)
  const cookieTypes = document.querySelectorAll(".cookies-page__cookie-type");

  if (cookieTypes.length > 0) {
    gsap.fromTo(
      cookieTypes,
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cookieTypes[0],
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
      }
    );
  }
}

// Función de limpieza para eliminar animaciones cuando se desmonta el componente
export function cleanupCookiesAnimations(): void {
  if (typeof window === "undefined") return;

  // Kill all ScrollTriggers
  ScrollTrigger.getAll().forEach((trigger: any) => {
    trigger.kill();
  });

  // Kill all active GSAP animations
  gsap.killTweensOf(".cookies-page, .cookies-page *");

  // Clear match media queries
  ScrollTrigger.clearMatchMedia();

  // Refresh ScrollTrigger
  refreshScrollTrigger();
}
