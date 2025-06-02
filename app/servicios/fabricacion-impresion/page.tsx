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

// import FabricacionImpresionHeroSection from "@/components/FabricacionImpresionPage/FabricacionImpresionHeroSection/FabricacionImpresionHeroSection";
// import FabricacionImpresionServicesSection from "@/components/FabricacionImpresionPage/FabricacionImpresionServicesSection/FabricacionImpresionServicesSection";
// import FabricacionImpresionProcessSection from "@/components/FabricacionImpresionPage/FabricacionImpresionProcessSection/FabricacionImpresionProcessSection";
// import FabricacionImpresionNetworkSection from "@/components/FabricacionImpresionPage/FabricacionImpresionNetworkSection/FabricacionImpresionNetworkSection";

import "./fabricacion-impresion-page.scss";

const FabricacionImpresionPage = () => {
  useScrollSmooth();

  const cleanupRef = useRef<(() => void) | null>(null);

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
        <div className="logistica-page">
          <div className="logistica-page__breadcrumbs">
            <div className="container">
              <Breadcrumbs items={breadcrumbItems} />
            </div>
          </div>

          <div className="logistica-page__container">
            {/* <FabricacionHeroSection />
            <FabricacionServicesSection />
            <FabricacionProcessSection />
            <FabricacionNetworkSection /> */}

            {/* Temporary content placeholder */}
            <div
              style={{
                minHeight: "60vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1>Fabricación - Coming Soon</h1>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default FabricacionImpresionPage;
