"use client";

import React, { useEffect, ReactNode } from "react";
import LoadingManager from "@/utils/loading";
import Footer from "./layout/Footer/Footer";

interface SmoothScrollWrapperProps {
  children: ReactNode;
  showBackToTop?: boolean;
}

export default function SmoothScrollWrapper({
  children,
  showBackToTop = true,
}: SmoothScrollWrapperProps) {
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Import dependencies
    const initScrollSmoother = async () => {
      try {
        // Import modules individually to avoid destructuring issues
        const gsapModule = await import("gsap");
        const ScrollTriggerModule = await import("gsap/ScrollTrigger");
        const ScrollSmootherModule = await import(
          "@/plugins/gsap-scroll-smoother"
        );

        // Access the default exports correctly
        const gsap = gsapModule.default || gsapModule;
        const ScrollTrigger =
          ScrollTriggerModule.ScrollTrigger || ScrollTriggerModule.default;
        const ScrollSmoother = ScrollSmootherModule.default;

        // Register plugins
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

        // Make sure the DOM is ready
        requestAnimationFrame(() => {
          // Create ScrollSmoother
          const smoother = ScrollSmoother.create({
            smooth: 2,
            effects: true,
          });

          // Make it globally available
          (window as any).__smoother__ = smoother;

          // Notify LoadingManager that ScrollSmoother is ready
          LoadingManager.smootherInitialized();

          // If we're currently loading, pause immediately
          if (LoadingManager.isLoading) {
            smoother.paused(true);
          }
        });
      } catch (error) {
        console.error("Error initializing ScrollSmoother:", error);
      }
    };

    initScrollSmoother();
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {children}
        {/* <WhatsAppButton phoneNumber="34928712222" /> */}
        <Footer />
      </div>
    </div>
  );
}
