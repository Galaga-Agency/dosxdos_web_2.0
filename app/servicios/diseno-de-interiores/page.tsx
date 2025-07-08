"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import useScrollSmooth from "@/hooks/useScrollSmooth";
import { gsap } from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

import Breadcrumbs from "@/components/SEO/Breadcrumbs";
import Footer from "@/components/layout/Footer/footer";

import { imageParallax } from "@/utils/animations/image-parallax";
import { featuredImageAnimation } from "@/utils/animations/featured-image-anim";
import { highlightAnimation } from "@/utils/animations/highlight-anim";
import { accionSocialHeroAnim } from "@/utils/animations/accion-social-hero-anim";
import { servicePanel } from "@/utils/animations/panel-animation";

import DisenoInterioresHeroSection from "@/components/DisenoInterioresPage/DisenoInterioresHeroSection/DisenoInterioresHeroSection";
import DisenoInterioresProcessSection from "@/components/DisenoInterioresPage/DisenoInterioresProcessSection/DisenoInterioresProcessSection";
import DisenoInterioresLinesSection from "@/components/DisenoInterioresPage/DisenoInterioresLinesSection/DisenoInterioresLinesSection";
import DisenoInterioresPhilosophySection from "@/components/DisenoInterioresPage/DisenoInterioresPhilosophySection/DisenoInterioresPhilosophySection";
import DisenoInterioresMethodologySection from "@/components/DisenoInterioresPage/DisenoInterioresMethodologySection/DisenoInterioresMethodologySection";

import "./diseno-interiores-page.scss";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

const DisenoInterioresPage = () => {
  useScrollSmooth();
  const cleanupRef = useRef<(() => void) | null>(null);
  const [heroImagesLoaded, setHeroImagesLoaded] = useState(false);

  const breadcrumbItems = [
    { name: "Inicio", href: "/" },
    { name: "Servicios", href: "/servicios" },
    { name: "Diseño de Interiores", href: "/servicios/diseno-de-interiores" },
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

  // Callback for when hero images load
  const handleHeroImagesLoad = useCallback(() => {
    setHeroImagesLoaded(true);
  }, []);

  // Run animations only after hero images have loaded
  useGSAP(() => {
    if (!heroImagesLoaded) return;

    const timer = setTimeout(() => {
      accionSocialHeroAnim();
      imageParallax();
      servicePanel();
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
  }, [heroImagesLoaded]);

  return (
    <PageWrapper>
      <div className="diseno-interiores-page">
        <div className="breadcrumbs">
          <div className="container">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </div>

        <div className="diseno-interiores-page__container">
          <DisenoInterioresHeroSection onImageLoad={handleHeroImagesLoad} />
          <DisenoInterioresProcessSection />
          <DisenoInterioresMethodologySection />
          <DisenoInterioresLinesSection />
          <DisenoInterioresPhilosophySection />
        </div>
      </div>
      <Footer />
    </PageWrapper>
  );
};

export default DisenoInterioresPage;
