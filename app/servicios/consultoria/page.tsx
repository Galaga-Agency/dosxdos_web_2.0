"use client";

import React, { useEffect } from "react";
import useScrollSmooth from "@/hooks/useScrollSmooth";
import { gsap } from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

import Breadcrumbs from "@/components/SEO/Breadcrumbs";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import ConsultoriaHeroSection from "@/components/ConsultoriaPage/ConsultoriaHeroSection/ConsultoriaHeroSection";
import Footer from "@/components/layout/Footer/footer";

import {
  charAnimation,
  fadeAnimation,
  rollUpTextAnimation,
} from "@/utils/animations/text-anim";
import { initCardMouseParallax } from "@/utils/animations/card-hover-anim";
import { imageParallax } from "@/utils/animations/image-parallax";
import { initStatsCounter } from "@/utils/animations/stats-counter";
import { featuredImageAnimation } from "@/utils/animations/featured-image-anim";
import { highlightAnimation } from "@/utils/animations/highlight-anim";

import "./consultoria-page.scss";

const ConsultoriaPage = () => {
  useScrollSmooth();

  // Define breadcrumbs for this page / for SEO
  const breadcrumbItems = [
    { name: "Inicio", href: "/" },
    { name: "Servicios", href: "/servicios" },
    { name: "Consultoría", href: "/servicios/consultoria" },
  ];

  useEffect(() => {
    document.body.classList.add("smooth-scroll");

    return () => {
      document.body.classList.remove("smooth-scroll");
    };
  }, []);

  useGSAP(() => {
    const timer = setTimeout(() => {
      fadeAnimation();
      charAnimation();
      initCardMouseParallax();
      imageParallax();
      initStatsCounter();
      rollUpTextAnimation();
      featuredImageAnimation();
      highlightAnimation();
    }, 300);

    return () => clearTimeout(timer);
  });

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="consultoria-page">
          {/* Add breadcrumbs at the top */}
          <div className="consultoria-page__breadcrumbs">
            <div className="container">
              <Breadcrumbs items={breadcrumbItems} />
            </div>
          </div>

          <div className="consultoria-page__container">
            <ConsultoriaHeroSection />
            <div className="consultoria-page__mobile-social-section">
              <div className="consultoria-page__mobile-social-header">
                <h3 className="consultoria-page__mobile-social-title">
                  Síguenos
                </h3>
                <div className="consultoria-page__mobile-social-divider"></div>
              </div>
              <SocialIcons orientation="horizontal" color="primary" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ConsultoriaPage;
