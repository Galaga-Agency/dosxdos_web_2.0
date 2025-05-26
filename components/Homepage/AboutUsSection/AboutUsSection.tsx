"use client";

import React, { useRef } from "react";
import Image from "next/image";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import "./AboutUsSection.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";

const AboutUsSection: React.FC = () => {
  const { isMobile } = useDeviceDetect();

  return (
    <section className="aboutus-section">
      <div className="aboutus-section__container container">
        <div className="aboutus-section__header header">
          <h2 className="aboutus-section__title secondary-title fade_bottom">
            Diseñamos experiencias que{" "}
            <span className="highlight">conectan</span>
            <br /> marcas con personas
          </h2>
        </div>
        <div className="aboutus-section__content">
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
          <div className="aboutus-section__content-column">
            <p className="aboutus-section__text text">
              Desde hace más de 38 años, en Dos x Dos Grupo Imagen creamos
              soluciones creativas para marcas que buscan dejar huella.
              Diseñamos espacios, eventos, identidades y herramientas digitales
              que inspiran y funcionan. Nuestra visión integral une diseño,
              producción, tecnología y estrategia para acompañarte en todo lo
              que tu negocio necesita, desde la idea hasta el resultado.
            </p>
            <div className="aboutus-section__cta">
              <SecondaryButton
                href="/sobre-nosotros/equipo"
                size="medium"
                lightBg
              >
                Conócenos
              </SecondaryButton>
              <SecondaryButton href="/contacto" size="medium" lightBg>
                ¿Hablamos?
              </SecondaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
