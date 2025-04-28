"use client";

import React, { useEffect } from "react";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import HeroSection from "@/components/EquipoPage/HeroSection/HeroSection";
import StorySection from "@/components/EquipoPage/StorySection/StorySection";
import TeamSection from "@/components/EquipoPage/TeamSection/TeamSection";
import StatsSection from "@/components/EquipoPage/StatsSection/StatsSection";
import ClientsSection from "@/components/EquipoPage/ClientsSection/ClientsSection";
import CTASection from "@/components/EquipoPage/CTASection/CTASection";
import "./equipo-page.scss";
import {
  cleanupScrollTriggers,
  initScrollTriggerConfig,
} from "@/utils/animations/scrolltrigger-config";

const EquipoPage: React.FC = () => {
  useEffect(() => {
    initScrollTriggerConfig();

    return () => {
      cleanupScrollTriggers();
    };
  }, []);

  return (
    <SmoothScrollWrapper>
      <div className="equipo-page">
        <div className="equipo-page__container">
          <div className="equipo-page__social-sidebar">
            <div className="equipo-page__social-wrapper">
              <span className="equipo-page__social-label">Síguenos</span>
              <SocialIcons orientation="vertical" color="white" />
            </div>
          </div>

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
            <SocialIcons orientation="horizontal" color="white" />
          </div>
        </div>
      </div>
    </SmoothScrollWrapper>
  );
};

export default EquipoPage;
