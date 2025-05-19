"use client";

import React, { useEffect, ReactNode, useState, useRef } from "react";
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
  const initCount = useRef(0);
  const smootherRef = useRef<any>(null);

  console.log("[SmoothScrollWrapper] Component rendering, initCount:", initCount.current);

  // Observa los cambios en el DOM para detectar cuando se abre un modal
  useEffect(() => {
    if (typeof window === "undefined") return;
    console.log("[SmoothScrollWrapper] Modal detection effect running");

    // Función para verificar si hay un modal abierto
    const checkForModals = () => {
      const modalElements = document.querySelectorAll(".modal");
      const isAnyModalOpen = Array.from(modalElements).some(
        (modal) => window.getComputedStyle(modal).display !== "none"
      );
      console.log("[SmoothScrollWrapper] Modal check - isAnyModalOpen:", isAnyModalOpen);
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
      console.log("[SmoothScrollWrapper] Cleaning up modal observer");
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Track initialization count
    initCount.current++;
    console.log("[SmoothScrollWrapper] Main effect running - initCount:", initCount.current);

    // Reset scroll position
    window.scrollTo(0, 0);

    // Initialize ScrollTrigger ONCE
    console.log("[SmoothScrollWrapper] Initializing ScrollTrigger");
    initScrollTriggerConfig();

    let smoother: any = null;

    const initScrollSmoother = async () => {
      console.log("[SmoothScrollWrapper] Starting ScrollSmoother initialization");
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

        console.log("[SmoothScrollWrapper] GSAP modules imported, registering plugins");
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

        // Create ScrollSmoother after a delay to ensure DOM is ready
        console.log("[SmoothScrollWrapper] Setting up delayed ScrollSmoother creation");
        setTimeout(() => {
          // Check if smoother already exists and destroy it first
          if ((window as any).__smoother__) {
            console.log("[SmoothScrollWrapper] Existing smoother found, killing it");
            try {
              if (typeof (window as any).__smoother__.kill === 'function') {
                (window as any).__smoother__.kill();
              }
            } catch (e) {
              console.error("[SmoothScrollWrapper] Error killing smoother:", e);
            }
            (window as any).__smoother__ = null;
          }

          // Create new smoother with fixed configuration
          try {
            console.log("[SmoothScrollWrapper] Creating new ScrollSmoother");
            smoother = ScrollSmoother.create({
              wrapper: "#smooth-wrapper",
              content: "#smooth-content",
              smooth: 1, // Reduced value for better performance
              effects: true,
              ignoreMobileResize: true,
              normalizeScroll: false
            });

            // Store references - safely
            (window as any).__smoother__ = smoother;
            smootherRef.current = smoother;
            
            console.log("[SmoothScrollWrapper] Successfully created ScrollSmoother");

            // Initialize loading manager
            LoadingManager.smootherInitialized();
            
            // Add a CSS class to handle panel sections
            document.body.classList.add('smooth-scroll-enabled');

            // Log ScrollTrigger instances
            const triggers = ScrollTrigger.getAll();
            console.log("[SmoothScrollWrapper] Active ScrollTriggers:", triggers.length);
            
            // Important: Refresh ScrollTrigger to coordinate with ScrollSmoother
            console.log("[SmoothScrollWrapper] Refreshing ScrollTrigger");
            refreshScrollTrigger();

            // Add another refresh after a delay
            setTimeout(() => {
              console.log("[SmoothScrollWrapper] Delayed refresh running");
              try {
                if (smoother && typeof smoother.refresh === 'function') {
                  smoother.refresh();
                }
              } catch (e) {
                console.error("[SmoothScrollWrapper] Error refreshing smoother:", e);
              }
              ScrollTrigger.refresh();
              
              // Log after refresh
              const triggersAfter = ScrollTrigger.getAll();
              console.log("[SmoothScrollWrapper] Active ScrollTriggers after refresh:", triggersAfter.length);
            }, 500);
          } catch (error) {
            console.error("[SmoothScrollWrapper] Error creating ScrollSmoother:", error);
            // No fallback - just notify
          }
        }, 300);
      } catch (error) {
        console.error("[SmoothScrollWrapper] Error initializing ScrollSmoother:", error);
      }
    };

    initScrollSmoother();

    // Add scroll event listener to log scroll events but without trying to use paused()
    const handleScroll = () => {
      const panelArea = document.querySelector('.project-panel-area');
      if (!panelArea) return;
      
      const rect = panelArea.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isInView) {
        // Just add the class for CSS to handle
        document.body.classList.add('panel-section-active');
        console.log("[SmoothScrollWrapper] Panel area is in viewport", {
          top: rect.top,
          bottom: rect.bottom,
          windowHeight: window.innerHeight,
          smootherActive: !!(window as any).__smoother__
        });
      } else {
        // Remove the class when not in view
        document.body.classList.remove('panel-section-active');
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Add resize handler to recalculate heights but don't try to use .refresh()
    const handleResize = () => {
      console.log("[SmoothScrollWrapper] Resize event, refreshing");
      // Just refresh ScrollTrigger
      refreshScrollTrigger();
    };

    window.addEventListener("resize", handleResize);

    // Clean up on unmount
    return () => {
      console.log("[SmoothScrollWrapper] Cleaning up main effect");
      cleanupScrollTriggers();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);

      if ((window as any).__smoother__) {
        console.log("[SmoothScrollWrapper] Killing smoother on cleanup");
        try {
          if (typeof (window as any).__smoother__.kill === 'function') {
            (window as any).__smoother__.kill();
          }
        } catch (e) {
          console.error("[SmoothScrollWrapper] Error killing smoother:", e);
        }
        (window as any).__smoother__ = null;
      }
      
      // Remove classes
      document.body.classList.remove('smooth-scroll-enabled');
      document.body.classList.remove('panel-section-active');
    };
  }, []);

  // Modal handling - don't use paused() method
  useEffect(() => {
    console.log("[SmoothScrollWrapper] Modal state changed:", isModalOpen);
    
    // Just add/remove class for CSS to handle
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isModalOpen]);

  // Log when component unmounts
  useEffect(() => {
    return () => {
      console.log("[SmoothScrollWrapper] Component unmounting");
    };
  }, []);

  console.log("[SmoothScrollWrapper] Rendering component");
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}