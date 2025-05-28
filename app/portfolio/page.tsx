"use client";

import React, { useEffect, useRef, useState } from "react";
import useScrollSmooth from "@/hooks/useScrollSmooth";
import { gsap } from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

import { Project } from "@/types/project-types";
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
  useScrollSmooth();
  const cleanupRef = useRef<(() => void) | null>(null);

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add("smooth-scroll");

    // Fetch projects from API
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/proyectos");
        const data = await res.json();

        // Filter projects that should be displayed on portfolio page
        const portfolioProjects = data.filter(
          (project: Project) => project.featured === true
        );

        setProjects(portfolioProjects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

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

  useGSAP(() => {
    if (!loading) {
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
  }, [loading]);

  if (loading) {
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
