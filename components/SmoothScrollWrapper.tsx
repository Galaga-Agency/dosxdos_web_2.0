"use client";

import React, { useEffect, ReactNode } from "react";
import LoadingManager from "@/utils/loading";
import Footer from "./layout/Footer/footer";
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
  useEffect(() => {
    if (typeof window === "undefined") return;

    window.scrollTo(0, 0);

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

        // Initialize ScrollTrigger config
        initScrollTriggerConfig();

        // Initialize ScrollSmoother with a short delay to ensure DOM is ready
        setTimeout(() => {
          smoother = ScrollSmoother.create({
            smooth: 2,
            effects: true,
            // Enable normalized scroll to help with tab visibility issues
            normalizeScroll: true,
          });

          (window as any).__smoother__ = smoother;

          LoadingManager.smootherInitialized();

          if (LoadingManager.isLoading) {
            smoother.paused(true);
          }

          // Important: Refresh ScrollTrigger to coordinate with ScrollSmoother
          refreshScrollTrigger();
        }, 200);
      } catch (error) {
        console.error("Error initializing ScrollSmoother:", error);
      }
    };

    initScrollSmoother();

    return () => {
      if (smoother) {
        smoother.kill();
        (window as any).__smoother__ = null;
      }

      // Clean up all ScrollTrigger instances
      cleanupScrollTriggers();
    };
  }, []);

  // Refresh ScrollTrigger when children change
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Use setTimeout to ensure DOM is updated before refreshing
      const timer = setTimeout(() => {
        refreshScrollTrigger();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [children]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {children}
        <Footer />
      </div>
    </div>
  );
}
