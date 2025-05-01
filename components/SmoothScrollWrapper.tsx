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
          
          // Create new smoother
          smoother = ScrollSmoother.create({
            smooth: 2,
            effects: true,
            normalizeScroll: true,
          });
          
          (window as any).__smoother__ = smoother;
          console.log("Created new ScrollSmoother");
          
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
    
    // Clean up on unmount
    return () => {
      cleanupScrollTriggers();
      
      if ((window as any).__smoother__) {
        (window as any).__smoother__.kill();
        (window as any).__smoother__ = null;
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