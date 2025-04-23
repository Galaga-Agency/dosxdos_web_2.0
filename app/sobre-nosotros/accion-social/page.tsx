"use client";

import React, { useEffect } from "react";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import "./AccionSocialPage.scss";
import {
  cleanupScrollTriggers,
  initScrollTriggerConfig,
} from "@/utils/animations/scrolltrigger-config";
import HeroSection from "@/components/AccionSocialPage/HeroSection/HeroSection";
import ValuesSection from "@/components/AccionSocialPage/ValuesSection/ValuesSection";
import CollaborationsSection from "@/components/AccionSocialPage/CollaborationsSection/CollaborationsSection";

const AccionSocialPage: React.FC = () => {
  useEffect(() => {
    initScrollTriggerConfig();

    return () => {
      cleanupScrollTriggers();
    };
  }, []);

  return (
    <>
      <div className="accion-social-page__social-sidebar">
        <div className="accion-social-page__social-wrapper">
          <span className="accion-social-page__social-label">Síguenos</span>
          <SocialIcons orientation="vertical" />
        </div>
      </div>

      <SmoothScrollWrapper>
        <div className="accion-social-page">
          <div className="accion-social-page__container">
            <HeroSection />
            <ValuesSection />
            <CollaborationsSection />

            <div className="accion-social-page__mobile-social-section">
              <div className="accion-social-page__mobile-social-header">
                <h3 className="accion-social-page__mobile-social-title">
                  Síguenos
                </h3>
                <div className="accion-social-page__mobile-social-divider"></div>
              </div>
              <SocialIcons orientation="horizontal" />
            </div>
          </div>
        </div>
      </SmoothScrollWrapper>
    </>
  );
};

export default AccionSocialPage;
