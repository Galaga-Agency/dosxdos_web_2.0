"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import LogoMarquee from "@/components/Homepage/LogoMarquee/LogoMarquee";
import { initFadeAnimations } from "@/utils/animations/pages/homepage-anim";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import "./ClientsSection.scss";

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
          <p className="clients-section__text fade_left">
            Creemos en construir relaciones basadas en la honestidad y la
            conexión genuina. Por eso, algunas de las marcas más prestigiosas
            del sector han confiado en nosotros durante décadas.
          </p>

          <div className="clients-section__cta fade_bottom">
            <Link
              href="/sobre-nosotros/accion-social"
              className="clients-section__cta-link"
            >
              <span className="clients-section__cta-icon">○</span> Conócenos
              mejor
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
