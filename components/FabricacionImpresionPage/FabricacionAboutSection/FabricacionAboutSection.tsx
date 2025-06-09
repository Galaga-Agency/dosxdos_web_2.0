"use client";

import React, { useRef } from "react";
import Image from "next/image";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import "./FabricacionAboutSection.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";

const FabricacionAboutSection: React.FC = () => {
  const { isMobile } = useDeviceDetect();

  return (
    <section className="fabricacion-about-section">
      <div className="fabricacion-about-section__container container">
        <div className="fabricacion-about-section__header header">
          <h2 className="fabricacion-about-section__title secondary-title fade_bottom">
            Entendemos que una idea vale lo que vale su{" "}
            <span className="highlight">ejecución.</span>
          </h2>
        </div>
        <div className="fabricacion-about-section__content">
          <div className="fabricacion-about-section__visual-column">
            <div
              className="fabricacion-about-section__animated-logo"
              data-speed={isMobile ? "0" : "1.15"}
            >
              <Image
                src="/assets/img/servicios/fabricacion-impresion/Foto horizontal .avif"
                alt="Fabricación e impresión - Dos por Dos"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                data-speed="0.95"
              />
            </div>
          </div>
          <div className="fabricacion-about-section__content-column">
            <p className="fabricacion-about-section__text text">
              Por eso unimos en un mismo flujo de trabajo dos servicios que,
              aunque diferentes, comparten un objetivo común: dar forma a los
              conceptos con precisión, calidad y personalidad. Nuestra capacidad
              de fabricación propia, unida a nuestra experiencia en impresión y
              acabados avanzados, nos permite materializar proyectos desde cero,
              con soluciones a medida, control de cada detalle y una visión
              global que va más allá de lo visual.
            </p>
            <div className="fabricacion-about-section__tags">
              <span className="fabricacion-about-section__tag">Fabricamos</span>
              <span className="fabricacion-about-section__tag">Imprimimos</span>
              <span className="fabricacion-about-section__tag">Resolvemos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FabricacionAboutSection;
