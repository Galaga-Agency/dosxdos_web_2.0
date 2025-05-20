"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";
import useScrollSmooth from "@/hooks/useScrollSmooth";

// Register GSAP plugins
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

// Internal imports
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import HeroSection from "@/components/AccionSocialPage/HeroSection/HeroSection";
import ValuesSection from "@/components/AccionSocialPage/ValuesSection/ValuesSection";
import SustainabilityImagesSection from "@/components/AccionSocialPage/SustainabilityImagesSection/SustainabilityImagesSection";
import ExperienciaSection from "@/components/AccionSocialPage/ExperienciaSection/ExperienciaSection";
import CollaborationsSection from "@/components/AccionSocialPage/CollaborationsSection/CollaborationsSection";
import AccionSocialCTASection from "@/components/AccionSocialPage/AccionSocialCTASection/AccionSocialCTASection";
import Footer from "@/components/layout/Footer/footer";
import { useState } from "react";
import "./accion-social-page.scss";

// Animation imports
import { fadeAnimation, charAnimation } from "@/utils/animations/title-anim";
import { imageParallax } from "@/utils/animations/image-parallax";
import { initCardMouseParallax } from "@/utils/animations/components/card-hover-anim";
import { panelTwoAnimation } from "@/utils/animations/components/panel-animation";
import { initAccionSocialHero } from "@/utils/animations/accion-social-hero-anim";

const AccionSocialPage = () => {
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
      console.log("Initializing all animations for Accion Social page");

      // Initialize hero animation first for immediate effect
      initAccionSocialHero();

      // Initialize all the other animations
      fadeAnimation();
      charAnimation();
      imageParallax();
      initCardMouseParallax();
      panelTwoAnimation();

    }, 300);

    return () => clearTimeout(timer);
  });

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="accion-social-page" key={key}>
          <div className="accion-social-page__container">
            <HeroSection />
            <ValuesSection />
            <SustainabilityImagesSection />
            <ExperienciaSection />
            <CollaborationsSection />
            <AccionSocialCTASection />

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
      </div>
    </div>
  );
};

export default AccionSocialPage;
