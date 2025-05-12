"use client";

import React, { useState, useEffect, useRef } from "react";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import { projects } from "@/data/projects";
import { initScrollTriggerConfig } from "@/utils/animations/scrolltrigger-config";
import "./portfolio-page-2.scss";
import {
  cleanupPortfolio2Animations,
  initPortfolioPage2Animations,
} from "@/utils/animations/pages/portfolio-page-2-anim";
import PortfolioHeader from "@/components/Portfolio2Page/PortfolioHeader/PortfolioHeader";
import PortfolioBentoGrid from "@/components/Portfolio2Page/PortfolioBentoGrid/PortfolioBentoGrid";
import PortfolioCTA from "@/components/Portfolio2Page/PortfolioCTA/PortfolioCTA";
import Footer from "@/components/layout/Footer/footer";

const Portfolio2Page: React.FC = () => {
  // Force component remount on each page visit
  const [key] = useState(() => Date.now());
  const [isLoaded, setIsLoaded] = useState(false);

  const sectionRef: any = useRef<HTMLDivElement>(null);
  const titleRef: any = useRef<HTMLHeadingElement>(null);
  const bentoGridRef: any = useRef<HTMLDivElement>(null);
  const ctaSectionRef: any = useRef<HTMLDivElement>(null);
  const ctaTextRef: any = useRef<HTMLHeadingElement>(null);
  const ctaButtonRef: any = useRef<HTMLDivElement>(null);

  const featuredProjects = projects.filter(
    (project) => project.display.portfolioPage === true
  );

  // Initialize ScrollTrigger configuration once
  useEffect(() => {
    initScrollTriggerConfig();

    // Initialize animations after a small delay
    const timer = setTimeout(() => {
      setIsLoaded(true);

      // Initialize page animations
      initPortfolioPage2Animations({
        section: sectionRef.current,
        title: titleRef.current,
        bentoGrid: bentoGridRef.current,
        ctaSection: ctaSectionRef.current,
        ctaText: ctaTextRef.current,
        ctaButton: ctaButtonRef.current,
      });
    }, 300);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      cleanupPortfolio2Animations();
    };
  }, []);

  return (
    <SmoothScrollWrapper>
      <div className="portfolio-page-2" ref={sectionRef} key={key}>
        <PortfolioHeader titleRef={titleRef} />
        <PortfolioBentoGrid
          projects={featuredProjects}
          bentoGridRef={bentoGridRef}
        />
        <PortfolioCTA
          ctaSectionRef={ctaSectionRef}
          ctaTextRef={ctaTextRef}
          ctaButtonRef={ctaButtonRef}
        />
      </div>
      <Footer />
    </SmoothScrollWrapper>
  );
};

export default Portfolio2Page;
