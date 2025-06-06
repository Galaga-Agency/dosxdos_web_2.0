"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
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

import "./fabricacion-impresion-page.scss";
import FabricacionImpresionHeroSection from "@/components/FabricacionImpresionPage/FabricacionImpresionHeroSection/FabricacionImpresionHeroSection";
import { animateHeroSlider } from "@/utils/animations/homepage-hero";
import { initRollingTextAnimation } from "@/utils/animations/rolling-text-animation";
import FabricacionAboutSection from "@/components/FabricacionImpresionPage/FabricacionAboutSection/FabricacionAboutSection";
import FabricacionServicesSection from "@/components/FabricacionImpresionPage/FabricacionServicesSection/FabricacionServicesSection";
import FabricacionFloatingImagesSection from "@/components/FabricacionImpresionPage/FabricacionFloatingImagesSection/FabricacionFloatingImagesSection";
import FabricacionProcessSection from "@/components/FabricacionImpresionPage/FabricacionProcessSection/FabricacionProcessSection";
import FabricacionGridSection from "@/components/FabricacionImpresionPage/FabricacionGridSection/FabricacionGridSection";

const FabricacionImpresionPage = () => {
  useScrollSmooth();

  const cleanupRef = useRef<(() => void) | null>(null);
  const [heroReady, setHeroReady] = useState(false);

  const breadcrumbItems = [
    { name: "Inicio", href: "/" },
    { name: "Servicios", href: "/servicios" },
    { name: "Logística", href: "/servicios/fabricacion-impresion" },
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
      animateHeroSlider();
      initRollingTextAnimation();
      rollUpTextAnimation();
      featuredImageAnimation();
      highlightAnimation();
    }, 100);

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
        <div className="logistica-page">
          <div className="breadcrumbs">
            <div className="container">
              <Breadcrumbs items={breadcrumbItems} />
            </div>
          </div>

          <div className="logistica-page__container">
            <FabricacionImpresionHeroSection />
            <FabricacionAboutSection />
            <FabricacionServicesSection />
            <FabricacionFloatingImagesSection />
            <FabricacionProcessSection />
            <FabricacionGridSection />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default FabricacionImpresionPage;
