"use client";

import React, { useRef } from "react";
import Image from "next/image";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import "./AboutUsSection.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";

const AboutUsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { isMobile } = useDeviceDetect();

  return (
    <section ref={sectionRef} className="aboutus-section">
      <div className="aboutus-section__container">
        {/* Header section */}
        <div className="aboutus-section__header">
          <h2 className="aboutus-section__title fade_bottom">
            Diseñamos experiencias que{" "}
            <span className="highlight">conectan</span>
            <br /> marcas con personas
          </h2>
        </div>

        {/* Content area with two columns */}
        <div className="aboutus-section__content">
          {/* Left column with image with parallax effect */}
          <div className="aboutus-section__visual-column">
            <div
              className="aboutus-section__animated-logo"
              data-speed={isMobile ? "0" : "1.15"}
            >
              <Image
                src="/assets/img/homepage/foto-landing.webp"
                alt="Diseño de interiores"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                data-speed="0.95"
              />
            </div>
          </div>

          {/* Right column with content */}
          <div className="aboutus-section__content-column">
            <div className="aboutus-section__text">
              Desde hace más de 38 años, en Dos x Dos Grupo Imagen creamos
              soluciones creativas para marcas que buscan dejar huella.
              Diseñamos espacios, eventos, identidades y herramientas digitales
              que inspiran y funcionan. Nuestra visión integral une diseño,
              producción, tecnología y estrategia para acompañarte en todo lo
              que tu negocio necesita, desde la idea hasta el resultado.
            </div>

            <div className="aboutus-section__cta">
              <SecondaryButton href="/sobre-nosotros/equipo" size="medium" lightBg>
                Conócenos →
              </SecondaryButton>
              <PrimaryButton href="/contacto" size="medium">
                ¿Hablamos?
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
