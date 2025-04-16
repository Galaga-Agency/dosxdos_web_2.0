"use client";

import React from "react";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import HeroSection from "@/components/AboutUsPage/HeroSection/HeroSection";
import StorySection from "@/components/AboutUsPage/StorySection/StorySection";
import TeamSection from "@/components/AboutUsPage/TeamSection/TeamSection";
import CTASection from "@/components/AboutUsPage/CTASection/CTASection";
import "./EquipoPage.scss";

const EquipoPage: React.FC = () => {
  return (
    <SmoothScrollWrapper>
      <div className="equipo-page">
        <div className="equipo-page__container">
          <div className="equipo-page__social-sidebar">
            <div className="equipo-page__social-wrapper">
              <span className="equipo-page__social-label">Síguenos</span>
              <SocialIcons orientation="vertical" color="primary" />
            </div>
          </div>

          <HeroSection />
          <StorySection />
          <TeamSection />
          <div className="equipo-page__mobile-social-section">
            <div className="equipo-page__mobile-social-header">
              <h3 className="equipo-page__mobile-social-title">Síguenos</h3>
              <div className="equipo-page__mobile-social-divider"></div>
            </div>
            <SocialIcons orientation="horizontal" color="primary" />
          </div>

          <CTASection />
        </div>
      </div>
    </SmoothScrollWrapper>
  );
};

export default EquipoPage;
