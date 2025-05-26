"use client";

import React, { useEffect, useRef } from "react";
import useScrollSmooth from "@/hooks/useScrollSmooth";
import { gsap } from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

import { projects } from "@/data/projects";
import PortfolioHeader from "@/components/Portfolio2Page/PortfolioHeader/PortfolioHeader";
import PortfolioBentoGrid from "@/components/Portfolio2Page/PortfolioBentoGrid/PortfolioBentoGrid";
import PortfolioCTA from "@/components/Portfolio2Page/PortfolioCTA/PortfolioCTA";
import Footer from "@/components/layout/Footer/footer";

import {
  charAnimation,
  fadeAnimation,
  rollUpTextAnimation,
} from "@/utils/animations/text-anim";
import { revealForTouchDevices } from "@/utils/animations/touch-device-reveal";

import "./portfolio-page.scss";
import { cursorBubbleAnimation } from "@/utils/animations/cursor-bubble-anim";

const PortfolioPage: React.FC = () => {
  useScrollSmooth();
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    document.body.classList.add("smooth-scroll");

    // Cleanup function
    return () => {
      document.body.classList.remove("smooth-scroll");

      // Execute bubble cleanup if it exists
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, []);

  const featuredProjects = projects.filter(
    (project) => project.display.portfolioPage === true
  );

  useGSAP(() => {
    const timer = setTimeout(() => {
      fadeAnimation();
      charAnimation();
      rollUpTextAnimation();
      revealForTouchDevices();

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
  });

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <main className="portfolio-page">
          <PortfolioHeader />
          <PortfolioBentoGrid projects={featuredProjects} />
          <PortfolioCTA />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default PortfolioPage;
