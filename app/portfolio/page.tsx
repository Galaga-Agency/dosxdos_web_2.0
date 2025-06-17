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

const PortfolioPage: React.FC = () => {
  const cleanupRef = useRef<(() => void) | null>(null);

  const projects = useDataStore((state) => state.projects);

  // Ordenar proyectos por año, más recientes primero
  const sortedProjects = React.useMemo(() => {
    return [...projects].sort((a, b) => {
      const yearA = parseInt(a.year.toString());
      const yearB = parseInt(b.year.toString());
      return yearB - yearA; // Orden descendente (más reciente primero)
    });
  }, [projects]);

  useScrollSmooth();

  useGSAP(() => {
    const timer = setTimeout(() => {
      charAnimation();
      rollUpTextAnimation();
      revealForTouchDevices();
      randomGridAnim();
      highlightAnimation(1.2);

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
        <MasProyectosGrid projects={sortedProjects} />
        <PortfolioCTA />
      </main>
      <Footer />
    </PageWrapper>
  );
};

export default PortfolioPage;
