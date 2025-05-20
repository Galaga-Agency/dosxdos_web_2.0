"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import LogoMarquee from "@/components/Homepage/LogoMarquee/LogoMarquee";
import { initFadeAnimations } from "@/utils/animations/pages/homepage-anim";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
import "./ClientsSection.scss";
import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";

// Register plugins if (typeof window !== "undefined") {
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ClientsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      // Initialize animation
      const timer = setTimeout(() => {
        // Initialize fade animations
        initFadeAnimations();

        // Force refresh to ensure ScrollTrigger works properly
        setTimeout(() => {
          if ((window as any).__smoother__) {
            console.log("Refreshing ScrollSmoother");
            (window as any).__smoother__.refresh();
          }
          ScrollTrigger.refresh();
        }, 100);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section className="clients-section" ref={sectionRef}>
      <div className="clients-section__container">
        <h2 className="clients-section__title fade_bottom">
          Nuestros clientes
        </h2>
      </div>

      <div className="clients-section__marquee-wrapper">
        <LogoMarquee showHeader={false} darkMode={true} />
      </div>

      <div className="clients-section__container">
        <div className="clients-section__content">
          <p className="clients-section__text fade_bottom">
            Trabajamos con algunas de las marcas más reconocidas del sector, que
            valoran la calidad, la atención al detalle y una manera de hacer que
            va más allá de lo visual.
          </p>

          <div className="clients-section__cta fade_bottom">
            <SecondaryButton
              href="/servicios"
              className="clients-section__cta-link"
            >
              Conóce nuestros servicios →
            </SecondaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
