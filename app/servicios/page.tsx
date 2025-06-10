"use client";

import React, { useEffect } from "react";
import useScrollSmooth from "@/hooks/useScrollSmooth";
import { gsap } from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

import ServiciosHero from "@/components/ServiciosPage/ServiciosHero/ServiciosHero";
import ServiciosList from "@/components/ServiciosPage/AboutServices/AboutServices";
import ServiciosRecentProjects from "@/components/ServiciosPage/ServiciosRecentProjects/ServiciosRecentProjects";
import ServicesGrid from "@/components/ServiciosPage/ServicesGrid/ServicesGrid";
import VisionSection from "@/components/ServiciosPage/VisionSection/VisionSection";
import Footer from "@/components/layout/Footer/footer";

import { charAnimation } from "@/utils/animations/text-anim";
import { imageRevealAnimation } from "@/utils/animations/image-reveal-anim";
import { projectHoverAnim } from "@/utils/animations/projects-hover-anim";
import { cursorBubbleAnimation } from "@/utils/animations/cursor-bubble-anim";
import { animateServiciosHero } from "@/utils/animations/servicios-hero";
import { revealForTouchDevices } from "@/utils/animations/touch-device-reveal";
import { highlightAnimation } from "@/utils/animations/highlight-anim";
import { randomStaggerAnimation } from "@/utils/animations/random-stagger-anim";

import { useDataStore } from "@/store/useDataStore";

import "./servicios-page.scss";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { footerAnimation } from "@/utils/animations/footer-anim";

const ServiciosPage: React.FC = () => {
  useScrollSmooth();

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

  useEffect(() => {
    document.body.classList.add("smooth-scroll");
    return () => {
      document.body.classList.remove("smooth-scroll");
    };
  }, []);

  useGSAP(() => {
    const timer = setTimeout(() => {
      charAnimation();
      imageRevealAnimation();
      cursorBubbleAnimation();
      animateServiciosHero();
      revealForTouchDevices();
      highlightAnimation();
      randomStaggerAnimation();
      footerAnimation();
    }, 100);

    return () => clearTimeout(timer);
  });

  return (
    <PageWrapper>
      <main className="servicios-page">
        <ServiciosHero />
        <ServiciosRecentProjects projects={projects} />
        <ServiciosList />
        <ServicesGrid />
        <VisionSection />
      </main>
      <Footer />
    </PageWrapper>
  );
};

export default ServiciosPage;
