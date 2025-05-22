"use client";

import React, { useEffect } from "react";
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
  fadeAnimation,
  rollUpTextAnimation,
} from "@/utils/animations/text-anim";
import { initCardMouseParallax } from "@/utils/animations/card-hover-anim";
import { imageParallax } from "@/utils/animations/image-parallax";
import { initStatsCounter } from "@/utils/animations/stats-counter";
import { featuredImageAnimation } from "@/utils/animations/featured-image-anim";

import "./equipo-page.scss";

const EquipoPage = () => {
  useScrollSmooth();

  // Define breadcrumbs for this page / for SEO
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

  useGSAP(() => {
    const timer = setTimeout(() => {
      fadeAnimation();
      charAnimation();
      initCardMouseParallax();
      imageParallax();
      initStatsCounter();
      rollUpTextAnimation();
      featuredImageAnimation();
    }, 300);

    return () => clearTimeout(timer);
  });

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="equipo-page">
          {/* Add breadcrumbs at the top */}
          <div className="equipo-page__breadcrumbs">
            <div className="container">
              <Breadcrumbs items={breadcrumbItems} />
            </div>
          </div>

          <div className="equipo-page__container">
            <HeroSection />
            <StorySection />
            <TeamSection />
            <StatsSection />
            <ClientsSection />
            <CTASection />
            <div className="equipo-page__mobile-social-section">
              <div className="equipo-page__mobile-social-header">
                <h3 className="equipo-page__mobile-social-title">Síguenos</h3>
                <div className="equipo-page__mobile-social-divider"></div>
              </div>
              <SocialIcons orientation="horizontal" color="primary" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default EquipoPage;
