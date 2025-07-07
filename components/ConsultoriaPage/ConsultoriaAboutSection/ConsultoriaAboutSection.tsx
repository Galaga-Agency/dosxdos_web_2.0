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
              src="/assets/img/servicios/consultoria/team.webp"
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
              Nos implicamos en cada proyecto como si fuera propio, combinando análisis, 
              creatividad y ejecución para dar respuestas concretas a necesidades reales.
            </p>
            
            <p className="consultoria-about__text text">
              Nuestro equipo interdisciplinar trabaja de forma integrada para convertir 
              ideas en soluciones funcionales, sostenibles y alineadas con tu marca. 
              Pensamos en cada detalle: desde cómo se estructura un espacio hasta cómo se 
              vive, se recorre y se recuerda. Aplicamos criterios de eficiencia, ergonomía 
              y diseño consciente para crear entornos que no solo se vean bien, sino que 
              funcionen mejor.
            </p>
            
            <p className="consultoria-about__text text">
              Creemos que la excelencia está en unir forma y propósito: espacios que 
              inspiran, comunican y se adaptan al cambio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultoriaAboutSection;