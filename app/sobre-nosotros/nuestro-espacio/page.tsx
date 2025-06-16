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
import { highlightAnimation } from "@/utils/animations/highlight-anim";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import "./nuestro-espacio-page.scss";
import NuestroEspacioHeaderSection from "@/components/NuestroEspacioPage/NuestroEspacioHeaderSection/NuestroEspacioHeaderSection";
import NuestroEspacioImageSection from "@/components/NuestroEspacioPage/NuestroEspacioImageSection/NuestroEspacioImageSection";
import NuestroEspacioDetailsSection from "@/components/NuestroEspacioPage/NuestroEspacioDetailsSection/NuestroEspacioDetailsSection";
import TextMarquee from "@/components/TextMarquee/TextMarquee";

const NuestroEspacioPage = () => {
  useScrollSmooth();

  const cleanupRef = useRef<(() => void) | null>(null);

  const breadcrumbItems = [
    { name: "Inicio", href: "/" },
    { name: "Sobre Nosotros", href: "/sobre-nosotros" },
    { name: "Nuestro Espacio", href: "/sobre-nosotros/nuestro-espacio" },
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
      charAnimation();
      rollUpTextAnimation();
      highlightAnimation();
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
      <div className="nuestro-espacio-page">
        <div className="breadcrumbs">
          <div className="container">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </div>

        <div className="nuestro-espacio-page__container">
          <NuestroEspacioHeaderSection />
          <NuestroEspacioImageSection />
          <NuestroEspacioDetailsSection />
          <TextMarquee
            text="Nuestro punto de partida"
            speed={50}
            className="projects-marquee"
          />
        </div>
      </div>
      <Footer />
    </PageWrapper>
  );
};

export default NuestroEspacioPage;
