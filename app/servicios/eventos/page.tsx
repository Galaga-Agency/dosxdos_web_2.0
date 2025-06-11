"use client";

import React, { useEffect, useRef } from "react";
import useScrollSmooth from "@/hooks/useScrollSmooth";
import { gsap } from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

import Breadcrumbs from "@/components/SEO/Breadcrumbs";
import Footer from "@/components/layout/Footer/footer";

import {
  charAnimation,
  rollUpTextAnimation,
} from "@/utils/animations/text-anim";
import { initCardMouseParallax } from "@/utils/animations/card-hover-anim";
import { imageParallax } from "@/utils/animations/image-parallax";
import { featuredImageAnimation } from "@/utils/animations/featured-image-anim";
import { highlightAnimation } from "@/utils/animations/highlight-anim";
import { accionSocialHeroAnim } from "@/utils/animations/accion-social-hero-anim";
import { servicePanel } from "@/utils/animations/panel-animation";

import "./eventos-page.scss";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { footerAnimation } from "@/utils/animations/footer-anim";
import { animateHeroSlider } from "@/utils/animations/homepage-hero";
import { initRollingTextAnimation } from "@/utils/animations/rolling-text-animation";
import EventosHeroSection from "@/components/EventosPage/EventosHeroSection/EventosHeroSection";
import EventosIntroSection from "@/components/EventosPage/EventosIntroSection/EventosIntroSection";

const EventosPage = () => {
  useScrollSmooth();

  const cleanupRef = useRef<(() => void) | null>(null);

  const breadcrumbItems = [
    { name: "Inicio", href: "/" },
    { name: "Servicios", href: "/servicios" },
    { name: "Eventos", href: "/servicios/eventos" },
  ];

  useEffect(() => {
    document.body.classList.add("smooth-scroll");

    return () => {
      document.body.classList.remove("smooth-scroll");

      // Execute cleanup if it exists
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, []);

  useGSAP(() => {
    const timer = setTimeout(() => {
      accionSocialHeroAnim();
      charAnimation();
      initCardMouseParallax();
      imageParallax();
      servicePanel();
      animateHeroSlider();
      initRollingTextAnimation();
      rollUpTextAnimation();
      featuredImageAnimation();
      highlightAnimation();
      footerAnimation();
    }, 100);

    return () => {
      clearTimeout(timer);

      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  });

  return (
    <PageWrapper>
      <div className="eventos-page">
        <div className="breadcrumbs">
          <div className="container">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </div>

        <div className="eventos-page__container">
          <EventosHeroSection />
          <EventosIntroSection/>
        </div>
      </div>
      <Footer />
    </PageWrapper>
  );
};

export default EventosPage;
