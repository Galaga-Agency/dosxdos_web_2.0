"use client";

import React from "react";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import HeroSection from "@/components/AboutUsPage/HeroSection/HeroSection";
import StorySection from "@/components/AboutUsPage/StorySection/StorySection";
import PhilosophySection from "@/components/AboutUsPage/PhilosophySection/PhilosophySection";
import TeamSection from "@/components/AboutUsPage/TeamSection/TeamSection";
import ResponsibilitySection from "@/components/AboutUsPage/ResponsibilitySection/ResponsibilitySection";
import LocationSection from "@/components/AboutUsPage/LocationSection/LocationSection";
import CTASection from "@/components/AboutUsPage/CTASection/CTASection";
import MarqueeSection from "@/components/AboutUsPage/MarqueeSection/MarqueeSection";
import "./AboutUsPage.scss";

const AboutUsPage: React.FC = () => {
  return (
    <SmoothScrollWrapper>
      <div className="about-us-page">
        <div className="about-us-page__container">
          <div className="about-us-page__social-sidebar">
            <div className="about-us-page__social-wrapper">
              <span className="about-us-page__social-label">Síguenos</span>
              <SocialIcons orientation="vertical" color="primary" />
            </div>
          </div>

          <HeroSection />
          <StorySection />
          <PhilosophySection />
          <TeamSection />
          <ResponsibilitySection />
          <LocationSection />
          <MarqueeSection />

          <div className="about-us-page__mobile-social-section">
            <div className="about-us-page__mobile-social-header">
              <h3 className="about-us-page__mobile-social-title">Síguenos</h3>
              <div className="about-us-page__mobile-social-divider"></div>
            </div>
            <SocialIcons orientation="horizontal" color="primary" />
          </div>

          <CTASection />
        </div>
      </div>
    </SmoothScrollWrapper>
  );
};

export default AboutUsPage;