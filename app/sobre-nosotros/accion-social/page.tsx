"use client";

import React, { useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";
import useScrollSmooth from "@/hooks/useScrollSmooth";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

import Breadcrumbs from "@/components/SEO/Breadcrumbs";
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
import { servicePanel } from "@/utils/animations/panel-animation";
import { accionSocialHeroAnim } from "@/utils/animations/accion-social-hero-anim";
import { featuredImageAnimation } from "@/utils/animations/featured-image-anim";
import { highlightAnimation } from "@/utils/animations/highlight-anim";

import "./accion-social-page.scss";

const AccionSocialPage = () => {
  useScrollSmooth();
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  // Define breadcrumbs for this page / for SEO
  const breadcrumbItems = [
    { name: "Inicio", href: "/" },
    { name: "Sobre Nosotros", href: "/sobre-nosotros" },
    { name: "Acción Social", href: "/sobre-nosotros/accion-social" },
  ];

  useEffect(() => {
    document.body.classList.add("smooth-scroll");
    return () => {
      document.body.classList.remove("smooth-scroll");
    };
  }, []);

  // Callback for when hero image loads
  const handleHeroImageLoad = useCallback(() => {
    setHeroImageLoaded(true);
  }, []);

  // Run animations only after hero image has loaded
  useGSAP(() => {
    if (!heroImageLoaded) return;

    const timer = setTimeout(() => {
      accionSocialHeroAnim();
      fadeAnimation();
      charAnimation();
      initCardMouseParallax();
      servicePanel();
      featuredImageAnimation();
      highlightAnimation();
    }, 100); // Reduced delay since image is already loaded

    return () => clearTimeout(timer);
  }, [heroImageLoaded]); // Dependency on heroImageLoaded

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="accion-social-page">
          <div className="breadcrumbs">
            <Breadcrumbs items={breadcrumbItems} />
          </div>

          <div className="accion-social-page__container">
            <HeroSection onImageLoad={handleHeroImageLoad} />
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
