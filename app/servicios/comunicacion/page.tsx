"use client";

import React, { useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";
import useScrollSmooth from "@/hooks/useScrollSmooth";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

import Breadcrumbs from "@/components/SEO/Breadcrumbs";
import Footer from "@/components/layout/Footer/footer";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

import { charAnimation } from "@/utils/animations/text-anim";
import { imageParallax } from "@/utils/animations/image-parallax";
import { highlightAnimation } from "@/utils/animations/highlight-anim";
import { accionSocialHeroAnim } from "@/utils/animations/accion-social-hero-anim";

import ComunicacionHeroSection from "@/components/ComunicacionPage/ComunicacionHeroSection/ComunicacionHeroSection";

import "./comunicacion-page.scss";
import { featuredImageAnimation } from "@/utils/animations/featured-image-anim";
import ComunicacionProcessSection from "@/components/ComunicacionPage/ComunicacionProcessSection/ComunicacionProcessSection";
import ComunicacionServicesSection from "@/components/ComunicacionPage/ComunicacionServicesSection/ComunicacionServicesSection";
import ComunicacionDigitalizationSection from "@/components/ComunicacionPage/ComunicacionDigitalizationSection/ComunicacionDigitalizationSection";
import TextMarquee from "@/components/TextMarquee/TextMarquee";

const ComunicacionPage = () => {
  useScrollSmooth();
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  const breadcrumbItems = [
    { name: "Inicio", href: "/" },
    { name: "Servicios", href: "/servicios" },
    { name: "Comunicación", href: "/servicios/comunicacion" },
  ];

  useEffect(() => {
    document.body.classList.add("smooth-scroll");
    return () => {
      document.body.classList.remove("smooth-scroll");
    };
  }, []);

  const handleHeroImageLoad = useCallback(() => {
    setHeroImageLoaded(true);
  }, []);

  useGSAP(() => {
    if (!heroImageLoaded) return;

    const timer = setTimeout(() => {
      accionSocialHeroAnim();
      charAnimation();
      imageParallax();
      highlightAnimation();
      accionSocialHeroAnim();
      charAnimation();
      featuredImageAnimation();
    }, 100);

    return () => clearTimeout(timer);
  }, [heroImageLoaded]);

  return (
    <PageWrapper>
      <div className="comunicacion-page">
        <div className="breadcrumbs">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <main className="comunicacion-page__container">
          <ComunicacionHeroSection onImageLoad={handleHeroImageLoad} />
          <ComunicacionProcessSection />
          <ComunicacionServicesSection />
          <ComunicacionDigitalizationSection />
          <TextMarquee
            text="Innovar con sentido"
            speed={50}
          />
        </main>
      </div>
      <Footer />
    </PageWrapper>
  );
};

export default ComunicacionPage;
