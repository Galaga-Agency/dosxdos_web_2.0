"use client";

import React, { useEffect } from "react";
import useScrollSmooth from "@/hooks/useScrollSmooth";
import { gsap } from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

import SocialIcons from "@/components/SocialIcons/SocialIcons";
import HeroSection from "@/components/EquipoPage/HeroSection/HeroSection";
import StorySection from "@/components/EquipoPage/StorySection/StorySection";
import TeamSection from "@/components/EquipoPage/TeamSection/TeamSection";
import StatsSection from "@/components/EquipoPage/StatsSection/StatsSection";
import ClientsSection from "@/components/EquipoPage/ClientsSection/ClientsSection";
import CTASection from "@/components/EquipoPage/CTASection/CTASection";
import Footer from "@/components/layout/Footer/footer";
import { useState } from "react";
import { charAnimation, fadeAnimation, titleAnimation } from "@/utils/animations/title-anim";
import { initCardMouseParallax } from "@/utils/animations/components/card-hover-anim";
import { imageParallax } from "@/utils/animations/image-parallax";
import { initStatsCounter } from "@/utils/animations/stats-counter";

import "./equipo-page.scss"; // Import Equatable CSS for smooth scrolling

const EquipoPage = () => {
  const [key] = useState(() => Date.now());

  // Setup smooth scrolling
  useScrollSmooth();

  useEffect(() => {
    document.body.classList.add("smooth-scroll");

    return () => {
      document.body.classList.remove("smooth-scroll");
    };
  }, []);

  // Initialize ALL animations at page level
  useGSAP(() => {
    const timer = setTimeout(() => {
      // Initialize all the animations
      fadeAnimation();
      charAnimation();
      initCardMouseParallax();
      imageParallax();
      initStatsCounter();
      titleAnimation();
    }, 300);

    return () => clearTimeout(timer);
  });

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="equipo-page" key={key}>
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
