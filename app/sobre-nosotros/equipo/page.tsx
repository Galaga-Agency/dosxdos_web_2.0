"use client";

import React, { useEffect, useState } from "react";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import HeroSection from "@/components/EquipoPage/HeroSection/HeroSection";
import StorySection from "@/components/EquipoPage/StorySection/StorySection";
import TeamSection from "@/components/EquipoPage/TeamSection/TeamSection";
import StatsSection from "@/components/EquipoPage/StatsSection/StatsSection";
import ClientsSection from "@/components/EquipoPage/ClientsSection/ClientsSection";
import CTASection from "@/components/EquipoPage/CTASection/CTASection";
import "./equipo-page.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { cleanupEquipoAnimations } from "@/utils/animations/pages/equipo-page-anim";
import { initScrollTriggerConfig } from "@/utils/animations/scrolltrigger-config";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EquipoPage: React.FC = () => {
  // Force component remount on each page visit
  const [key] = useState(() => Date.now());

  // Initialize ScrollTrigger configuration once
  useEffect(() => {
    initScrollTriggerConfig();

    // Cleanup on unmount
    return () => {
      cleanupEquipoAnimations();
    };
  }, []);

  return (
    <SmoothScrollWrapper>
      <div className="equipo-page" key={key}>
        <div className="equipo-page__container">
          {/* <div className="equipo-page__social-sidebar">
            <div className="equipo-page__social-wrapper">
              <span className="equipo-page__social-label">Síguenos</span>
              <SocialIcons orientation="vertical" color="white" />
            </div>
          </div> */}

          <HeroSection key={`hero-${key}`} />
          <StorySection key={`story-${key}`} />
          <TeamSection key={`team-${key}`} />
          <StatsSection key={`stats-${key}`} />
          <ClientsSection key={`clients-${key}`} />
          <CTASection key={`cta-${key}`} />

          <div className="equipo-page__mobile-social-section">
            <div className="equipo-page__mobile-social-header">
              <h3 className="equipo-page__mobile-social-title">Síguenos</h3>
              <div className="equipo-page__mobile-social-divider"></div>
            </div>
            <SocialIcons orientation="horizontal" color="primary" />
          </div>
        </div>
      </div>
    </SmoothScrollWrapper>
  );
};

export default EquipoPage;
