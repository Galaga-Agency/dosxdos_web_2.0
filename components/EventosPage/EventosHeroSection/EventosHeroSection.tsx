"use client";

import React from "react";
import Image from "next/image";
import "./EventosHeroSection.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";

const EventosHeroSection = () => {
  const { isMobile } = useDeviceDetect();
  
  return (
    <div className="eventos-hero">
      <div className="eventos-hero__container">
        <div className="eventos-hero__image-wrapper">
          <Image
            src="/assets/img/servicios/eventos/header-eventos.webp"
            alt="Eventos - Dos por Dos"
            fill
            priority
            className="eventos-hero__image"
          />
        </div>

        <div className="eventos-hero__overlay"></div>

        <div className="eventos-hero__content">
          <h3 className="eventos-hero__label label">
            (Soluciones completas hechas a medida.)
          </h3>

          <h1 className="eventos-hero__title char-animation title">
            Diseñamos lo que se ve. <br />
            Ejecutamos lo que se vive.
          </h1>
        </div>
      </div>

      <div
        className="eventos-hero__floating-image"
        data-speed={isMobile ? "0" : "1.15"}
      >
        <Image
          src="/assets/img/servicios/eventos/horizontal-segunda-eventos.webp"
          alt="Metodología de eventos"
          width={400}
          height={270}
        />
      </div>
    </div>
  );
};

export default EventosHeroSection;
