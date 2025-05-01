"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import { animateAboutUsSection } from "@/utils/animations/homepage-anim";
import "./AboutUsSection.scss";

const AboutUsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  // Initialize animations
  useEffect(() => {
    if (sectionRef.current && titleRef.current && textRef.current) {
      // Delay animation slightly to allow DOM to fully render
      const timer = setTimeout(() => {
        animateAboutUsSection({
          section: sectionRef.current,
          label: labelRef.current,
          title: titleRef.current,
          text: textRef.current,
          cta: ctaRef.current,
          image: visualRef.current,
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section ref={sectionRef} className="aboutus-section">
      <div className="aboutus-section__container">
        {/* Header section that spans full width */}
        <div className="aboutus-section__header">
          <div ref={labelRef} className="aboutus-section__label">
            <span>PROYECTAMOS SENSACIONES</span>
          </div>

          <h2 ref={titleRef} className="aboutus-section__title">
            Creamos <span className="highlight">experiencias únicas</span> en
            espacios comerciales
          </h2>
        </div>

        {/* Content area with two columns */}
        <div className="aboutus-section__content">
          {/* Left column with logo */}
          <div ref={visualRef} className="aboutus-section__visual-column">
            <div className="aboutus-section__animated-logo">
              <Image
                src="/assets/img/logo/logo-svg.svg"
                alt="Dos por Dos Grupo Imagen"
                fill
                sizes="(max-width: 768px) 150px, 200px"
                priority
              />
            </div>
          </div>

          {/* Right column with content */}
          <div className="aboutus-section__content-column">
            <div ref={textRef} className="aboutus-section__text">
              <p>
                Más de <strong>35 años de experiencia</strong> en el sector del
                diseño de interiores en espacios comerciales. Especialistas en
                el servicio integral a firmas de lujo de la cosmética y
                perfumería.
              </p>
              <p>
                Con un gran equipo de más de 45 profesionales, formado por
                arquitectos, interioristas, diseñadores y expertos en producción
                e instalación, te acompañamos durante todo el proceso.
              </p>
            </div>

            <div ref={ctaRef} className="aboutus-section__cta">
              <PrimaryButton href="/sobre-nosotros/equipo" size="medium">
                Conocenos &rarr;
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;