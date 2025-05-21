"use client";

import React, { useEffect } from "react";
import useScrollSmooth from "@/hooks/useScrollSmooth";
import { gsap } from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

import { projects } from "@/data/projects";
import MasProyectosHeader from "@/components/MasProyectosPage/MasProyectosHeader/MasProyectosHeader";
import MasProyectosGrid from "@/components/MasProyectosPage/MasProyectosGrid/MasProyectosGrid";
import MasProyectosCTA from "@/components/MasProyectosPage/MasProyectosCTA/MasProyectosCTA";
import Footer from "@/components/layout/Footer/footer";

import {
  charAnimation,
  fadeAnimation,
  rollUpTextAnimation,
} from "@/utils/animations/text-anim";

import "./mas-proyectos-page.scss";
import { randomGridAnim } from "@/utils/animations/random-grid-anim";


const MasProyectosPage: React.FC = () => {
  useScrollSmooth();

  useEffect(() => {
    document.body.classList.add("smooth-scroll");
    return () => {
      document.body.classList.remove("smooth-scroll");
    };
  }, []);

  // Filter projects for Mas Proyectos page
  const masProyectos = projects.filter(
    (project) => project.display.masProyectosPage === true
  );

  useGSAP(() => {
    const timer = setTimeout(() => {
      fadeAnimation();
      charAnimation();
      rollUpTextAnimation();
      randomGridAnim();
    }, 300);

    return () => clearTimeout(timer);
  });

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <main className="mas-proyectos-page">
          <MasProyectosHeader />
          <MasProyectosGrid projects={masProyectos} />
          <MasProyectosCTA />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MasProyectosPage;
