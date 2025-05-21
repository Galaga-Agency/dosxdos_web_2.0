"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";
import useScrollSmooth from "@/hooks/useScrollSmooth";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

import SocialIcons from "@/components/SocialIcons/SocialIcons";
import HeroSection from "@/components/AccionSocialPage/HeroSection/HeroSection";
import ValuesSection from "@/components/AccionSocialPage/ValuesSection/ValuesSection";
import SustainabilityImagesSection from "@/components/AccionSocialPage/SustainabilityImagesSection/SustainabilityImagesSection";
import ExperienciaSection from "@/components/AccionSocialPage/ExperienciaSection/ExperienciaSection";
import CollaborationsSection from "@/components/AccionSocialPage/CollaborationsSection/CollaborationsSection";
import AccionSocialCTASection from "@/components/AccionSocialPage/AccionSocialCTASection/AccionSocialCTASection";
import Footer from "@/components/layout/Footer/footer";

import { fadeAnimation, charAnimation } from "@/utils/animations/text-anim";
import { initCardMouseParallax } from "@/utils/animations/card-hover-anim";
import { panelTwoAnimation } from "@/utils/animations/panel-animation";
import { accionSocialHeroAnim } from "@/utils/animations/accion-social-hero-anim";
import { featuredImageAnimation } from "@/utils/animations/featured-image-anim";

import "./accion-social-page.scss";

const AccionSocialPage = () => {
  useScrollSmooth();

  useEffect(() => {
    document.body.classList.add("smooth-scroll");
    return () => {
      document.body.classList.remove("smooth-scroll");
    };
  }, []);

  useGSAP(() => {
    const timer = setTimeout(() => {
      accionSocialHeroAnim();
      fadeAnimation();
      charAnimation();
      initCardMouseParallax();
      panelTwoAnimation();
      featuredImageAnimation();
    }, 300);

    return () => clearTimeout(timer);
  });

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="accion-social-page">
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
