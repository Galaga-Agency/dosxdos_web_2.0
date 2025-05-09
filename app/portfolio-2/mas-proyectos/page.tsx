"use client";

import React, { useState, useEffect, useRef } from "react";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import { projects } from "@/data/projects";
import { initScrollTriggerConfig } from "@/utils/animations/scrolltrigger-config";
import "./mas-proyectos-page.scss";
import MasProyectosHeader from "@/components/MasProyectosPage/MasProyectosHeader/MasProyectosHeader";
import MasProyectosGrid from "@/components/MasProyectosPage/MasProyectosGrid/MasProyectosGrid";
import {
  cleanupMasProyectosAnimations,
  initMasProyectosAnimations,
} from "@/utils/animations/pages/mas-proyectos-page";
import MasProyectosCTA from "@/components/MasProyectosPage/MasProyectosCTA/MasProyectosCTA";

const MasProyectosPage: React.FC = () => {
  // Force component remount on each page visit
  const [key] = useState(() => Date.now());
  const [isLoaded, setIsLoaded] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLDivElement>(null);
  const ctaTextRef = useRef<HTMLHeadingElement>(null);
  const ctaButtonRef = useRef<HTMLDivElement>(null);

  // Filter projects for Mas Proyectos page
  const masProyectos = projects.filter(
    (project) => project.display.masProyectosPage === true
  );

  // Initialize ScrollTrigger configuration once
  useEffect(() => {
    initScrollTriggerConfig();

    // Initialize animations after a small delay
    const timer = setTimeout(() => {
      setIsLoaded(true);

      // Initialize page animations
      initMasProyectosAnimations({
        section: sectionRef.current,
        title: titleRef.current,
        projectsGrid: projectsGridRef.current,
        ctaSection: ctaSectionRef.current,
        ctaText: ctaTextRef.current,
        ctaButton: ctaButtonRef.current,
      } as any);
    }, 300);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      cleanupMasProyectosAnimations();
    };
  }, []);

  return (
    <SmoothScrollWrapper>
      <div className="mas-proyectos-page" ref={sectionRef} key={key}>
        <MasProyectosHeader titleRef={titleRef as any} />
        <MasProyectosGrid
          projects={masProyectos}
          projectsGridRef={projectsGridRef as any}
        />
        <MasProyectosCTA
          ctaSectionRef={ctaSectionRef as any}
          ctaTextRef={ctaTextRef as any}
          ctaButtonRef={ctaButtonRef as any}
        />
      </div>
    </SmoothScrollWrapper>
  );
};

export default MasProyectosPage;
