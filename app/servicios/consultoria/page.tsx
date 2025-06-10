"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import useScrollSmooth from "@/hooks/useScrollSmooth";
import { gsap } from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

import Breadcrumbs from "@/components/SEO/Breadcrumbs";

import ConsultoriaHeroSection from "@/components/ConsultoriaPage/ConsultoriaHeroSection/ConsultoriaHeroSection";
import Footer from "@/components/layout/Footer/footer";

import {
  charAnimation,
  rollUpTextAnimation,
} from "@/utils/animations/text-anim";
import { initCardMouseParallax } from "@/utils/animations/card-hover-anim";
import { imageParallax } from "@/utils/animations/image-parallax";
import { initStatsCounter } from "@/utils/animations/stats-counter";
import { featuredImageAnimation } from "@/utils/animations/featured-image-anim";
import { highlightAnimation } from "@/utils/animations/highlight-anim";

import "./consultoria-page.scss";
import ConsultoriaMethodlogySection from "@/components/ConsultoriaPage/ConsultoriaMethodlogySection/ConsultoriaMethodlogySection";
import MarqueeSection from "@/components/ConsultoriaPage/MarqueeSection/MarqueeSection";
import ConsultoriaAboutSection from "@/components/ConsultoriaPage/ConsultoriaAboutSection/ConsultoriaAboutSection";
import ConsultoriaCTASection from "@/components/ConsultoriaPage/ConsultoriaCTASection/ConsultoriaCTASection";
import { cursorBubbleAnimation } from "@/utils/animations/cursor-bubble-anim";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { footerAnimation } from "@/utils/animations/footer-anim";

const ConsultoriaPage = () => {
  useScrollSmooth();
  const cleanupRef = useRef<(() => void) | null>(null);
  const [heroImagesLoaded, setHeroImagesLoaded] = useState(false);

  const breadcrumbItems = [
    { name: "Inicio", href: "/" },
    { name: "Servicios", href: "/servicios" },
    { name: "Consultoría", href: "/servicios/consultoria" },
  ];

  useEffect(() => {
    document.body.classList.add("smooth-scroll");

    return () => {
      document.body.classList.remove("smooth-scroll");

      // Execute bubble cleanup if it exists
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
      charAnimation();
      initCardMouseParallax();
      imageParallax();
      initStatsCounter();
      rollUpTextAnimation();
      featuredImageAnimation();
      highlightAnimation();
      footerAnimation();

      cleanupRef.current = cursorBubbleAnimation();
    }, 100);

    return () => {
      clearTimeout(timer);

      // Execute bubble cleanup
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [heroImagesLoaded]);

  return (
    <PageWrapper>
      <div className="consultoria-page">
        <div className="breadcrumbs">
          <div className="container">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </div>

        <div className="consultoria-page__container">
          <ConsultoriaHeroSection onImagesLoad={handleHeroImagesLoad} />
          <ConsultoriaMethodlogySection />
          <MarqueeSection />
          <ConsultoriaAboutSection />
          <ConsultoriaCTASection />
        </div>
      </div>
      <Footer />
    </PageWrapper>
  );
};

export default ConsultoriaPage;
