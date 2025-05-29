"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

import { useDataStore } from "@/store/useDataStore";
import PortfolioHeader from "@/components/Portfolio2Page/PortfolioHeader/PortfolioHeader";
import PortfolioCTA from "@/components/Portfolio2Page/PortfolioCTA/PortfolioCTA";
import Footer from "@/components/layout/Footer/footer";
import Loading from "@/components/ui/Loading/Loading";

import {
  charAnimation,
  fadeAnimation,
  rollUpTextAnimation,
} from "@/utils/animations/text-anim";
import { revealForTouchDevices } from "@/utils/animations/touch-device-reveal";
import { cursorBubbleAnimation } from "@/utils/animations/cursor-bubble-anim";
import MasProyectosGrid from "@/components/Portfolio2Page/MasProyectosGrid/MasProyectosGrid";
import { randomGridAnim } from "@/utils/animations/random-grid-anim";
import { highlightAnimation } from "@/utils/animations/highlight-anim";

import "./portfolio-page.scss";

const PortfolioPage: React.FC = () => {
  const cleanupRef = useRef<(() => void) | null>(null);
  const smootherRef = useRef<any>(null);

  // Get data from store
  const projects = useDataStore((state) => state.projects);
  const projectsLoaded = useDataStore((state) => state.projectsLoaded);
  const projectsError = useDataStore((state) => state.projectsError);
  const fetchProjects = useDataStore((state) => state.fetchProjects);

  // If data isn't loaded yet, try to fetch it (fallback)
  useEffect(() => {
    if (!projectsLoaded && !projectsError) {
      fetchProjects();
    }
  }, [projectsLoaded, projectsError, fetchProjects]);

  // Initialize ScrollSmoother
  const initializeScrollSmoother = () => {
    // Kill existing smoother if it exists
    if (smootherRef.current) {
      smootherRef.current.kill();
      smootherRef.current = null;
    }

    // Create new smoother
    smootherRef.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.1,
    });

    // Store reference globally for other components
    (window as any).__smoother__ = smootherRef.current;
  };

  useEffect(() => {
    document.body.classList.add("smooth-scroll");

    // Initialize ScrollSmoother
    initializeScrollSmoother();

    // Cleanup function
    return () => {
      document.body.classList.remove("smooth-scroll");

      // Kill ScrollSmoother
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }

      // Clear global reference
      if ((window as any).__smoother__) {
        (window as any).__smoother__ = null;
      }

      // Execute bubble cleanup if it exists
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, []);

  // Reinitialize ScrollSmoother after projects are available
  useEffect(() => {
    if (projectsLoaded && projects.length > 0) {
      // Wait a bit for DOM to be fully rendered
      const reinitTimer = setTimeout(() => {
        // Reinitialize ScrollSmoother to detect new elements
        initializeScrollSmoother();

        // Refresh ScrollTrigger to recalculate positions
        ScrollTrigger.refresh();
      }, 100);

      return () => clearTimeout(reinitTimer);
    }
  }, [projectsLoaded, projects.length]);

  useGSAP(() => {
    if (projectsLoaded && projects.length > 0) {
      const timer = setTimeout(() => {
        fadeAnimation();
        charAnimation();
        rollUpTextAnimation();
        revealForTouchDevices();
        randomGridAnim();
        highlightAnimation(1.2);

        // Store the cleanup function
        cleanupRef.current = cursorBubbleAnimation();
      }, 300);

      return () => {
        clearTimeout(timer);

        // Execute bubble cleanup
        if (cleanupRef.current) {
          cleanupRef.current();
          cleanupRef.current = null;
        }
      };
    }
  }, [projectsLoaded, projects.length]);

  // Show loading only if we haven't loaded yet AND there's no cached data
  if (!projectsLoaded && projects.length === 0) {
    return (
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="portfolio-page">
            <Loading />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <main className="portfolio-page">
          <PortfolioHeader />
          <MasProyectosGrid projects={projects} />
          <PortfolioCTA />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default PortfolioPage;
