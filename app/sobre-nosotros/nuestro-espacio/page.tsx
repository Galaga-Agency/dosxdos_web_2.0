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

// import NuestroEspacioHeroSection from "@/components/NuestroEspacioPage/NuestroEspacioHeroSection/NuestroEspacioHeroSection";
// import NuestroEspacioGallerySection from "@/components/NuestroEspacioPage/NuestroEspacioGallerySection/NuestroEspacioGallerySection";
// import NuestroEspacioFacilitiesSection from "@/components/NuestroEspacioPage/NuestroEspacioFacilitiesSection/NuestroEspacioFacilitiesSection";
// import NuestroEspacioLocationSection from "@/components/NuestroEspacioPage/NuestroEspacioLocationSection/NuestroEspacioLocationSection";

import "./nuestro-espacio-page.scss";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

const NuestroEspacioPage = () => {
  useScrollSmooth();

  const cleanupRef = useRef<(() => void) | null>(null);

  const breadcrumbItems = [
    { name: "Inicio", href: "/" },
    { name: "Sobre Nosotros", href: "/sobre-nosotros" },
    { name: "Nuestro Espacio", href: "/sobre-nosotros/nuestro-espacio" },
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
    <PageWrapper>
      <div className="nuestro-espacio-page">
        <div className="breadcrumbs">
          <div className="container">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </div>

        <div className="nuestro-espacio-page__container">
          {/* <NuestroEspacioHeroSection />
            <NuestroEspacioGallerySection />
            <NuestroEspacioFacilitiesSection />
            <NuestroEspacioLocationSection /> */}

          {/* Temporary content placeholder */}
          <div
            style={{
              minHeight: "60vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1>Nuestro Espacio - Coming Soon</h1>
          </div>
        </div>
      </div>
      <Footer />
    </PageWrapper>
  );
};

export default NuestroEspacioPage;
