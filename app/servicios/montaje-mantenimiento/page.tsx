"use client";

import React, { useEffect, useRef } from "react";
import useScrollSmooth from "@/hooks/useScrollSmooth";
import { gsap } from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

import Breadcrumbs from "@/components/SEO/Breadcrumbs";
import Footer from "@/components/layout/Footer/footer";

import {
  charAnimation,
  fadeAnimation,
  rollUpTextAnimation,
} from "@/utils/animations/text-anim";
import { initCardMouseParallax } from "@/utils/animations/card-hover-anim";
import { imageParallax } from "@/utils/animations/image-parallax";
import { initStatsCounter } from "@/utils/animations/stats-counter";
import { featuredImageAnimation } from "@/utils/animations/featured-image-anim";
import { highlightAnimation } from "@/utils/animations/highlight-anim";
import { accionSocialHeroAnim } from "@/utils/animations/accion-social-hero-anim";
import { servicePanel } from "@/utils/animations/panel-animation";

// import MontajeMantenimientoHeroSection from "@/components/MontajeMantenimientoPage/MontajeMantenimientoHeroSection/MontajeMantenimientoHeroSection";
// import MontajeMantenimientoServicesSection from "@/components/MontajeMantenimientoPage/MontajeMantenimientoServicesSection/MontajeMantenimientoServicesSection";
// import MontajeMantenimientoProcessSection from "@/components/MontajeMantenimientoPage/MontajeMantenimientoProcessSection/MontajeMantenimientoProcessSection";
// import MontajeMantenimientoTeamSection from "@/components/MontajeMantenimientoPage/MontajeMantenimientoTeamSection/MontajeMantenimientoTeamSection";

import "./montaje-mantenimiento-page.scss";

const MontajeMantenimientoPage = () => {
  useScrollSmooth();

  const cleanupRef = useRef<(() => void) | null>(null);

  const breadcrumbItems = [
    { name: "Inicio", href: "/" },
    { name: "Servicios", href: "/servicios" },
    { name: "Instalación", href: "/servicios/montaje-mantenimiento" },
  ];

  useEffect(() => {
    document.body.classList.add("smooth-scroll");

    return () => {
      document.body.classList.remove("smooth-scroll");

      // Execute cleanup if it exists
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, []);

  useGSAP(() => {
    const timer = setTimeout(() => {
      accionSocialHeroAnim();
      fadeAnimation();
      charAnimation();
      initCardMouseParallax();
      imageParallax();
      initStatsCounter();
      servicePanel();
      rollUpTextAnimation();
      featuredImageAnimation();
      highlightAnimation();
    }, 300);

    return () => {
      clearTimeout(timer);

      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  });

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="instalacion-page">
          <div className="breadcrumbs">
            <div className="container">
              <Breadcrumbs items={breadcrumbItems} />
            </div>
          </div>

          <div className="instalacion-page__container">
            {/* <InstalacionHeroSection />
            <InstalacionServicesSection />
            <InstalacionProcessSection />
            <InstalacionTeamSection /> */}

            {/* Temporary content placeholder */}
            <div
              style={{
                minHeight: "60vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1>Instalación - Coming Soon</h1>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MontajeMantenimientoPage;
