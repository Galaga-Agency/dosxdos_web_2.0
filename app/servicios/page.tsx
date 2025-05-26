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

import { charAnimation, fadeAnimation } from "@/utils/animations/text-anim";
import { imageRevealAnimation } from "@/utils/animations/image-reveal-anim";
import { projectHoverAnim } from "@/utils/animations/projects-hover-anim";
import { cursorBubbleAnimation } from "@/utils/animations/cursor-bubble-anim";
import { animateServiciosHero } from "@/utils/animations/servicios-hero";
import { revealForTouchDevices } from "@/utils/animations/touch-device-reveal";

import "./servicios-page.scss";
import { highlightAnimation } from "@/utils/animations/highlight-anim";

const ServiciosPage: React.FC = () => {
  useScrollSmooth();

  useEffect(() => {
    document.body.classList.add("smooth-scroll");
    return () => {
      document.body.classList.remove("smooth-scroll");
    };
  }, []);

  useGSAP(() => {
    const timer = setTimeout(() => {
      fadeAnimation();
      charAnimation();
      imageRevealAnimation();
      cursorBubbleAnimation();
      animateServiciosHero();
      projectHoverAnim();
      revealForTouchDevices();
      highlightAnimation(1.5);
    }, 300);

    return () => clearTimeout(timer);
  });

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <main className="servicios-page">
          <ServiciosHero />
          <ServiciosRecentProjects />
          <ServiciosList />
          <ServicesGrid />
          <VisionSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ServiciosPage;
