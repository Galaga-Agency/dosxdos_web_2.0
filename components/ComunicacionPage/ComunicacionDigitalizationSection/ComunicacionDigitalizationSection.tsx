"use client";

import React, { useRef } from "react";
import Image from "next/image";
import "./ComunicacionDigitalizationSection.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";

const ComunicacionDigitalizationSection: React.FC = () => {
  const { isMobile } = useDeviceDetect();

  return (
    <section className="comunicacion-digitalization-section">
      <div className="comunicacion-digitalization-section__container container">
        <div className="comunicacion-digitalization-section__header header">
          <span className="comunicacion-digitalization-section__label label">
            (Digitalización)
          </span>
          <h2 className="comunicacion-digitalization-section__title secondary-title">
            Herramientas digitales que te ayudan a crecer
          </h2>
        </div>
        <div className="comunicacion-digitalization-section__content">
          <div className="comunicacion-digitalization-section__visual-column">
            <div
              className="comunicacion-digitalization-section__animated-logo"
              data-speed={isMobile ? "0" : "1.15"}
            >
              <Image
                src="/assets/img/homepage/foto-landing.avif"
                alt="Digitalización"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                data-speed="0.95"
              />
            </div>
          </div>
          <div className="comunicacion-digitalization-section__content-column container">
            <p className="comunicacion-digitalization-section__text text">
              La digitalización es un medio para que las marcas puedan operar
              con más agilidad, conectar con sus públicos y responder mejor a lo
              que el entorno exige. Desde Dos x Dos ofrecemos soluciones
              digitales a medida: desarrollo web, aplicaciones internas,
              plataformas de gestión y sistemas de contenidos que se integran
              con la identidad y los objetivos de cada empresa. Todo pensado
              para facilitar procesos, mejorar la presencia digital y acompañar
              el crecimiento.
            </p>
          </div>
        </div>
      </div>

      <div className="comunicacion-digitalization-section__bottom-text container">
        <p className="comunicacion-digitalization-section__text text">
          Además, contamos con la integración de <strong>Galaga Agency</strong>,
          nuestra empresa hermana especializada en digitalización y marketing
          experiencial. Esta colaboración nos permite ir un paso más allá: unir
          diseño, estrategia y tecnología para ofrecer experiencias digitales
          sólidas, funcionales y coherentes con la marca.
        </p>
      </div>
    </section>
  );
};

export default ComunicacionDigitalizationSection;
