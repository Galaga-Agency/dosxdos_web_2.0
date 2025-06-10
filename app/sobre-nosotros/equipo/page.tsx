"use client";

import React, { useEffect, useState, useCallback } from "react";
import useScrollSmooth from "@/hooks/useScrollSmooth";
import { gsap } from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

import Breadcrumbs from "@/components/SEO/Breadcrumbs";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import HeroSection from "@/components/EquipoPage/HeroSection/HeroSection";
import StorySection from "@/components/EquipoPage/StorySection/StorySection";
import TeamSection from "@/components/EquipoPage/TeamSection/TeamSection";
import StatsSection from "@/components/EquipoPage/StatsSection/StatsSection";
import ClientsSection from "@/components/EquipoPage/ClientsSection/ClientsSection";
import CTASection from "@/components/EquipoPage/CTASection/CTASection";
import Footer from "@/components/layout/Footer/footer";

import {
  charAnimation,
  rollUpTextAnimation,
} from "@/utils/animations/text-anim";
import { imageParallax } from "@/utils/animations/image-parallax";
import { initStatsCounter } from "@/utils/animations/stats-counter";
import { featuredImageAnimation } from "@/utils/animations/featured-image-anim";

import "./equipo-page.scss";
import { highlightAnimation } from "@/utils/animations/highlight-anim";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { footerAnimation } from "@/utils/animations/footer-anim";

const EquipoPage = () => {
  useScrollSmooth();
  const [heroImagesLoaded, setHeroImagesLoaded] = useState(false);

  const breadcrumbItems = [
    { name: "Inicio", href: "/" },
    { name: "Sobre Nosotros", href: "/sobre-nosotros" },
    { name: "Equipo", href: "/sobre-nosotros/equipo" },
  ];

  useEffect(() => {
    document.body.classList.add("smooth-scroll");

    return () => {
      document.body.classList.remove("smooth-scroll");
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
      imageParallax();
      initStatsCounter();
      rollUpTextAnimation();
      featuredImageAnimation();
      highlightAnimation();
      footerAnimation();
    }, 100);

    return () => clearTimeout(timer);
  }, [heroImagesLoaded]);

  return (
    <PageWrapper>
      <div className="equipo-page">
        <div className="breadcrumbs">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <main className="equipo-page__container">
          <HeroSection onImagesLoad={handleHeroImagesLoad} />
          <StorySection />
          <TeamSection />
          <StatsSection />
          <ClientsSection />
          <CTASection />
        </main>
      </div>
      <Footer />
    </PageWrapper>
  );
};

export default EquipoPage;
