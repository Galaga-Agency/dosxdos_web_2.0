"use client";

import React, { useEffect } from "react";
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
import { bentoRevealForTouchDevices } from "@/utils/animations/bento-grid-animation";

import "./portfolio-page.scss";

const PortfolioPage: React.FC = () => {
  useScrollSmooth();

  useEffect(() => {
    document.body.classList.add("smooth-scroll");
    return () => {
      document.body.classList.remove("smooth-scroll");
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
      bentoRevealForTouchDevices();
    }, 300);

    return () => clearTimeout(timer);
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
