"use client";

import React from "react";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import "./accion-social-page.scss";
import { initScrollTriggerConfig } from "@/utils/animations/scrolltrigger-config";
import HeroSection from "@/components/AccionSocialPage/HeroSection/HeroSection";
import ValuesSection from "@/components/AccionSocialPage/ValuesSection/ValuesSection";
import SustainabilityImagesSection from "@/components/AccionSocialPage/SustainabilityImagesSection/SustainabilityImagesSection";
import ExperienciaSection from "@/components/AccionSocialPage/ExperienciaSection/ExperienciaSection";
import CollaborationsSection from "@/components/AccionSocialPage/CollaborationsSection/CollaborationsSection";
import AccionSocialCTASection from "@/components/AccionSocialPage/AccionSocialCTASection/AccionSocialCTASection";
import { cleanupAccionSocialAnimations } from "@/utils/animations/pages/accion-social-page-anim";
import Footer from "@/components/layout/Footer/footer";
import Loading from "@/components/ui/Loading/Loading";
import { useInitialLoading } from "@/hooks/useInitialLoading";
import { useEffect, useState } from "react";

const AccionSocialPage: React.FC = () => {
  // Force component remount on each page visit
  const [key] = useState(() => Date.now());

  // Use our custom hook to handle loading state
  const isLoading = useInitialLoading(1500);

  // Initialize ScrollTrigger configuration once
  useEffect(() => {
    // Skip if still in loading state
    if (isLoading) return;

    initScrollTriggerConfig();

    // Cleanup on unmount
    return () => {
      cleanupAccionSocialAnimations();
    };
  }, [isLoading]);

  // Show loading component only on initial direct page load
  if (isLoading) {
    return <Loading />;
  }

  return (
    <SmoothScrollWrapper>
      <div className="accion-social-page" key={key}>
        <div className="accion-social-page__container">
          <HeroSection key={`hero-${key}`} />
          <ValuesSection key={`values-${key}`} />
          <SustainabilityImagesSection key={`sustainability-${key}`} />
          <ExperienciaSection key={`experiencia-${key}`} />
          <CollaborationsSection key={`collaborations-${key}`} />
          <AccionSocialCTASection key={`cta-${key}`} />

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
      <Footer />
    </SmoothScrollWrapper>
  );
};

export default AccionSocialPage;
