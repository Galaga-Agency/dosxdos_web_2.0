"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import LogoMarquee from "@/components/Homepage/LogoMarquee/LogoMarquee";
import "./ClientsSection.scss";
import { animateClientsSection } from "@/utils/animations/equipo-page-anim";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ClientsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timer = setTimeout(() => {
      animateClientsSection({
        section: sectionRef.current,
        title: titleRef.current,
        text: textRef.current,
        cta: ctaRef.current,
        decor: decorRef.current,
        logos: null,
      });

      // Refresh ScrollTrigger after animations are set up
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      // Cleanup ScrollTrigger instances for this section
      if (sectionRef.current) {
        ScrollTrigger.getAll()
          .filter((trigger) => trigger.trigger === sectionRef.current)
          .forEach((trigger) => trigger.kill());
      }
    };
  }, []);

  return (
    <section className="clients-section" ref={sectionRef}>
      <div className="clients-section__decorative-elements" ref={decorRef}>
        <div className="clients-section__decor clients-section__decor-dots"></div>
        <div className="clients-section__decor clients-section__decor-line"></div>
        <div className="clients-section__decor clients-section__decor-circle"></div>
        <div className="clients-section__decor clients-section__decor-grid"></div>
      </div>

      <div className="clients-section__container">
        <div className="clients-section__content-wrapper">
          <div className="clients-section__label">
            <span>COLABORACIONES</span>
          </div>

          <h2 ref={titleRef} className="clients-section__title">
            <span className="word">Nuestros</span>{" "}
            <span className="word highlight">clientes</span>
          </h2>
        </div>
      </div>

      <div className="clients-section__marquee-wrapper">
        <LogoMarquee showHeader={false} />
      </div>

      <div className="clients-section__container">
        <div className="clients-section__content-wrapper">
          <p ref={textRef} className="clients-section__text">
            Creemos en construir relaciones basadas en la honestidad y la
            conexión genuina. Es por eso que algunas de las empresas más
            importantes han permanecido con nosotros durante años.
          </p>

          <div ref={ctaRef} className="clients-section__cta">
            <Link href="/sobre-nosotros/accion-social" className="clients-section__cta-link">
              <span className="clients-section__cta-icon">○</span> Más sobre
              nosotros
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
