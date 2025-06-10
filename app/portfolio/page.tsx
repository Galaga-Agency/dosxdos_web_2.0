"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import useScrollSmooth from "@/hooks/useScrollSmooth";

import { useDataStore } from "@/store/useDataStore";
import PortfolioHeader from "@/components/Portfolio2Page/PortfolioHeader/PortfolioHeader";
import PortfolioCTA from "@/components/Portfolio2Page/PortfolioCTA/PortfolioCTA";
import Footer from "@/components/layout/Footer/footer";
import MasProyectosGrid from "@/components/Portfolio2Page/MasProyectosGrid/MasProyectosGrid";

import {
  charAnimation,
  rollUpTextAnimation,
} from "@/utils/animations/text-anim";
import { revealForTouchDevices } from "@/utils/animations/touch-device-reveal";
import { cursorBubbleAnimation } from "@/utils/animations/cursor-bubble-anim";
import { randomGridAnim } from "@/utils/animations/random-grid-anim";
import { highlightAnimation } from "@/utils/animations/highlight-anim";

import "./portfolio-page.scss";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { footerAnimation } from "@/utils/animations/footer-anim";

const PortfolioPage: React.FC = () => {
  const cleanupRef = useRef<(() => void) | null>(null);

  const projects = useDataStore((state) => state.projects);

  useScrollSmooth();

  useGSAP(() => {
    const timer = setTimeout(() => {
      charAnimation();
      rollUpTextAnimation();
      revealForTouchDevices();
      randomGridAnim();
      highlightAnimation(1.2);
      footerAnimation();

      // Store cleanup function
      cleanupRef.current = cursorBubbleAnimation();
    }, 300);

    return () => {
      clearTimeout(timer);
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, []);

  return (
    <PageWrapper>
      <main className="portfolio-page">
        <PortfolioHeader />
        <MasProyectosGrid projects={projects} />
        <PortfolioCTA />
      </main>
      <Footer />
    </PageWrapper>
  );
};

export default PortfolioPage;
