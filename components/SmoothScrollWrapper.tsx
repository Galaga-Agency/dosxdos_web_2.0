"use client";

import React, { useEffect, ReactNode } from "react";
import LoadingManager from "@/utils/loading";
import Footer from "@/components/layout/Footer/footer";

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

        requestAnimationFrame(() => {
          smoother = ScrollSmoother.create({
            smooth: 2,
            effects: true,
          });

          (window as any).__smoother__ = smoother;

          LoadingManager.smootherInitialized();

          if (LoadingManager.isLoading) {
            smoother.paused(true);
          }
        });
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
      // Kill any lingering ScrollTriggers too
      if (typeof window !== "undefined" && (window as any).gsap) {
        import("gsap/ScrollTrigger").then((module) => {
          const ScrollTrigger = module.ScrollTrigger;
          if (ScrollTrigger) {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
          }
        });
      }
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {children}
        <Footer />
      </div>
    </div>
  );
}
