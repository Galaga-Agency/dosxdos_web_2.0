"use client";

import React, { useEffect, useRef } from "react";
import useScrollSmooth from "@/hooks/useScrollSmooth";
import { gsap } from "gsap";
import {
  cursorAnimation,
  ScrollSmoother,
  ScrollTrigger,
  SplitText,
} from "@/plugins";
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

import "./nuestros-clientes-page.scss";
import NuestrosClientesHeroSection from "@/components/NuestrosClientesPage/NuestrosClientesHeroSection/NuestrosClientesHeroSection";
import NuestrosClientesGridSection from "@/components/NuestrosClientesPage/NuestrosClientesGridSection/NuestrosClientesGridSection";
import NuestrosClientesCTASection from "@/components/NuestrosClientesPage/NuestrosClientesCTASection/NuestrosClientesCTASection";
import { cursorBubbleAnimation } from "@/utils/animations/cursor-bubble-anim";

const NuestrosClientesPage = () => {
  useScrollSmooth();

  const cleanupRef = useRef<(() => void) | null>(null);

  const breadcrumbItems = [
    { name: "Inicio", href: "/" },
    { name: "Sobre Nosotros", href: "/sobre-nosotros/equipo" },
    { name: "Nuestros Clientes", href: "/sobre-nosotros/nuestros-clientes" },
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
      cursorBubbleAnimation();
      highlightAnimation();
    }, 200);

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
      <div className="nuestros-clientes-page">
        <div className="breadcrumbs">
          <div className="container">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </div>
        <NuestrosClientesHeroSection />
        <NuestrosClientesGridSection />
        <NuestrosClientesCTASection />
      </div>
      <Footer />
    </PageWrapper>
  );
};

export default NuestrosClientesPage;
