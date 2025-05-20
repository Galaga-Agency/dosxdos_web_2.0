"use client";

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
}

// Función de limpieza para eliminar animaciones cuando se desmonta el componente
export function cleanupPrivacidadAnimations(): void {
  if (typeof window === "undefined") return;

  // Kill all ScrollTriggers
  ScrollTrigger.getAll().forEach((trigger) => {
    trigger.kill();
  });

  // Kill all active GSAP animations
  gsap.killTweensOf(".privacidad-page, .privacidad-page *");

  // Clear match media queries
  ScrollTrigger.clearMatchMedia();

  // Refresh ScrollTrigger
  refreshScrollTrigger();
}
