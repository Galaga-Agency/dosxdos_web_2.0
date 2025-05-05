"use client";

import React, { useEffect } from "react";
import ServiciosHero from "@/components/ServiciosPage/ServiciosHero/ServiciosHero";
import ServiciosList from "@/components/ServiciosPage/AboutServices/AboutServices";
import ServiciosRecentProjects from "@/components/ServiciosPage/ServiciosRecentProjects/ServiciosRecentProjects";
import "./servicios-page.scss";
import { cleanupServiciosAnimations } from "@/utils/animations/pages/servicios-page-anim";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import ServicesGrid from "@/components/ServiciosPage/ServicesGrid/ServicesGrid";
import VisionSection from "@/components/ServiciosPage/VisionSection/VisionSection";

const ServiciosPage: React.FC = () => {
  // Cleanup animations when component unmounts
  useEffect(() => {
    return () => {
      cleanupServiciosAnimations();
    };
  }, []);
  
  return (
    <SmoothScrollWrapper showBackToTop={false}>
      <main className="servicios-page">
        <ServiciosHero />
        <ServiciosRecentProjects />
        <ServiciosList />
        <ServicesGrid />
        <VisionSection />
      </main>
    </SmoothScrollWrapper>
  );
};

export default ServiciosPage;