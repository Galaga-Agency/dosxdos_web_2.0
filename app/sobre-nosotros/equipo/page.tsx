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
import { cleanupEquipoAnimations } from "@/utils/animations/equipo-page-anim";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EquipoPage: React.FC = () => {
  const [mountKey, setMountKey] = useState(Date.now());

  useEffect(() => {


    // Cleanup on unmount
    return () => {
      cleanupEquipoAnimations();
    };
  }, []);

  return (
    <SmoothScrollWrapper>
      <div className="equipo-page" key={mountKey}>
        <div className="equipo-page__container">
          <div className="equipo-page__social-sidebar">
            <div className="equipo-page__social-wrapper">
              <span className="equipo-page__social-label">Síguenos</span>
              <SocialIcons orientation="vertical" color="white" />
            </div>
          </div>

          <HeroSection key={`hero-${mountKey}`} />
          <StorySection key={`story-${mountKey}`} />
          <TeamSection key={`team-${mountKey}`} />
          <StatsSection key={`stats-${mountKey}`} />
          <ClientsSection key={`clients-${mountKey}`} />
          <CTASection key={`cta-${mountKey}`} />

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
