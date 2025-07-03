"use client";

import React from "react";
import Image from "next/image";
import "./ConsultoriaAboutSection.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";

const ConsultoriaAboutSection: React.FC = () => {
  const { isMobile } = useDeviceDetect();

  return (
    <section className="consultoria-about">
      <div className="consultoria-about__container container">
        <div className="consultoria-about__header header">
          <div className="consultoria-about__label label ">
            (Más de 38 años de experiencia)
          </div>
          <h2 className="consultoria-about__title secondary-title">
            Pensamos contigo, trabajamos a tu lado, y ejecutamos{" "}
            <span className="highlight">con propósito.</span>
          </h2>
        </div>

        <div className="consultoria-about__content">
          <div className="consultoria-about__image-container" data-speed="0.95">
            <Image
              src="/assets/img/servicios/consultoria/consultoria-2.webp"
              alt="Consultoría dosxdos"
              fill
              priority
              quality={100}
              style={{
                objectFit: "cover",
                objectPosition: "center",
                willChange: "transform",
              }}
              unoptimized={true}
              data-speed={isMobile ? "1" : "1.15"}
            />
          </div>

          <div className="consultoria-about__description">
            <p className="consultoria-about__text text">
              Nos implicamos en cada proyecto como si fuera propio.
              Transformamos necesidades en soluciones tangibles, con foco en
              eficiencia, sostenibilidad y excelencia operativa. Nuestro equipo
              interdisciplinar aporta perspectiva, experiencia y compromiso en
              cada fase del proceso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultoriaAboutSection;
