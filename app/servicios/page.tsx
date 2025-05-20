"use client";

import React, { useEffect, useState } from "react";
import ServiciosHero from "@/components/ServiciosPage/ServiciosHero/ServiciosHero";
import ServiciosList from "@/components/ServiciosPage/AboutServices/AboutServices";
import ServiciosRecentProjects from "@/components/ServiciosPage/ServiciosRecentProjects/ServiciosRecentProjects";
import ServicesGrid from "@/components/ServiciosPage/ServicesGrid/ServicesGrid";
import VisionSection from "@/components/ServiciosPage/VisionSection/VisionSection";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";
import { cleanupServiciosAnimations } from "@/utils/animations/pages/servicios-page-anim";
import { initScrollTriggerConfig } from "@/utils/animations/scrolltrigger-config";
import "./servicios-page.scss";
import Footer from "@/components/layout/Footer/footer";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ServiciosPage: React.FC = () => {
  // Force component remount on each page visit
  const [key] = useState(() => Date.now());

  useEffect(() => {
    // Initialize ScrollTrigger configuration once
    initScrollTriggerConfig();

    // Cleanup animations when component unmounts
    return () => {
      cleanupServiciosAnimations();
    };
  }, []);

  return (
    <SmoothScrollWrapper showBackToTop={false}>
      <main className="servicios-page" key={key}>
        <ServiciosHero key={`hero-${key}`} />
        <ServiciosRecentProjects key={`projects-${key}`} />
        <ServiciosList key={`list-${key}`} />
        <ServicesGrid key={`grid-${key}`} />
        <VisionSection key={`vision-${key}`} />
      </main>
      <Footer />
    </SmoothScrollWrapper>
  );
};

export default ServiciosPage;
