"use client";

import React, { useEffect, ReactNode, useState } from "react";
import LoadingManager from "@/utils/loading";
import {
  initScrollTriggerConfig,
  cleanupScrollTriggers,
  refreshScrollTrigger,
} from "@/utils/animations/scrolltrigger-config";

interface SmoothScrollWrapperProps {
  children: ReactNode;
  showBackToTop?: boolean;
}

export default function SmoothScrollWrapper({
  children,
  showBackToTop = true,
}: SmoothScrollWrapperProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Observa los cambios en el DOM para detectar cuando se abre un modal
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Función para verificar si hay un modal abierto
    const checkForModals = () => {
      const modalElements = document.querySelectorAll(".modal");
      const isAnyModalOpen = Array.from(modalElements).some(
        (modal) => window.getComputedStyle(modal).display !== "none"
      );
      setIsModalOpen(isAnyModalOpen);
    };

    // Configurar el observador para detectar cambios en el DOM
    const observer = new MutationObserver(checkForModals);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    // Comprobación inicial
    checkForModals();

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Reset scroll position
    window.scrollTo(0, 0);

    // Initialize ScrollTrigger ONCE
    initScrollTriggerConfig();

    let smoother: any = null;

    const initScrollSmoother = async () => {
      try {
        const gsapModule = await import("gsap");
        const ScrollTriggerModule = await import("gsap/ScrollTrigger");
        const ScrollSmootherModule = await import(
          "@/plugins/gsap-scroll-smoother"
        );

        const gsap = gsapModule.default || gsapModule;
        const ScrollTrigger =
          ScrollTriggerModule.ScrollTrigger || ScrollTriggerModule.default;
        const ScrollSmoother = ScrollSmootherModule.default;

        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

        // Create ScrollSmoother after a delay to ensure DOM is ready
        setTimeout(() => {
          // Check if smoother already exists and destroy it first
          if ((window as any).__smoother__) {
            (window as any).__smoother__.kill();
            (window as any).__smoother__ = null;
          }

          // Create new smoother with fixed configuration
          try {
            smoother = ScrollSmoother.create({
              wrapper: "#smooth-wrapper",
              content: "#smooth-content",
              smooth: 2,
              effects: true,
              ignoreMobileResize: true,
              normalizeScroll: false, // Change to false to fix scrollFuncX error
              paused: false,
            });

            (window as any).__smoother__ = smoother;
            console.log("Created new ScrollSmoother");

            LoadingManager.smootherInitialized();

            if (LoadingManager.isLoading) {
              smoother.paused(true);
            }

            // Important: Refresh ScrollTrigger to coordinate with ScrollSmoother
            refreshScrollTrigger();

            // Add another refresh after a delay to ensure content height is calculated correctly
            setTimeout(() => {
              if (smoother) {
                smoother.refresh();
              }
              ScrollTrigger.refresh();
            }, 500);
          } catch (error) {
            console.error("Error creating ScrollSmoother:", error);
            // Fallback - try without normalizeScroll
            if (!smoother) {
              try {
                smoother = ScrollSmoother.create({
                  wrapper: "#smooth-wrapper",
                  content: "#smooth-content",
                  smooth: 2,
                  effects: true,
                  ignoreMobileResize: true,
                  normalizeScroll: false,
                  paused: false,
                });

                (window as any).__smoother__ = smoother;
                console.log("Created fallback ScrollSmoother");

                LoadingManager.smootherInitialized();
                refreshScrollTrigger();
              } catch (fallbackError) {
                console.error(
                  "Fallback ScrollSmoother also failed:",
                  fallbackError
                );
              }
            }
          }
        }, 200);
      } catch (error) {
        console.error("Error initializing ScrollSmoother:", error);
      }
    };

    initScrollSmoother();

    // Add resize handler to recalculate heights when necessary
    const handleResize = () => {
      if ((window as any).__smoother__) {
        (window as any).__smoother__.refresh();
      }
      refreshScrollTrigger();
    };

    window.addEventListener("resize", handleResize);

    // Clean up on unmount
    return () => {
      cleanupScrollTriggers();
      window.removeEventListener("resize", handleResize);

      if ((window as any).__smoother__) {
        (window as any).__smoother__.kill();
        (window as any).__smoother__ = null;
      }
    };
  }, []);

  // Pausar o reanudar el ScrollSmoother según si hay un modal abierto
  useEffect(() => {
    const smoother = (window as any).__smoother__;
    if (!smoother) return;

    if (isModalOpen) {
      smoother.paused(true);
    } else {
      smoother.paused(false);
    }
  }, [isModalOpen]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
