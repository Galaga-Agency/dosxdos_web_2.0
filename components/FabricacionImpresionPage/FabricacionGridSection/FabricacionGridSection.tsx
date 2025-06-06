"use client";

import React, { useRef } from "react";
import HoverCard from "../../ui/HoverCard/HoverCard";
import "./FabricacionGridSection.scss";

const FabricacionGridSection: React.FC = () => {
  const fabricacionServices = [
    {
      id: "fabricacion-digital",
      name: "Fabricación Digital",
      description:
        "Tecnología avanzada para crear elementos únicos con precisión milimétrica y acabados perfectos.",
      imageUrl: "/assets/img/about-us-page/equipo-1.avif",
      slug: "fabricacion-digital",
    },
    {
      id: "impresion-gran-formato",
      name: "Impresión Gran Formato",
      description:
        "Soluciones de impresión de alta calidad para comunicación visual impactante y duradera.",
      imageUrl: "/assets/img/about-us-page/equipo-2.avif",
      slug: "impresion-gran-formato",
    },
    {
      id: "rotulacion-senaletica",
      name: "Rotulación y Señalética",
      description:
        "Sistemas de señalización integrales que orientan, informan y refuerzan la identidad de marca.",
      imageUrl: "/assets/img/about-us-page/equipo-3.avif",
      slug: "rotulacion-senaletica",
    },
  ];

  const repeatedText = Array.from({ length: 20 }).map((_, i) => (
    <span key={i}>
      Hecho en DosXdos&nbsp;<span className="dot">•</span>&nbsp;
    </span>
  ));

  return (
    <section className="fabricacion-services-grid">
      <div className="fabricacion-services-grid__container container">
        <div className="fabricacion-services-grid__grid">
          {fabricacionServices.map((service, index) => (
            <div
              key={service.id}
              className="fabricacion-services-grid__card-wrapper"
              style={{ zIndex: 10 }}
            >
              <HoverCard
                id={service.id}
                title={service.name}
                description={service.description}
                imageUrl={service.imageUrl}
                showLink={false}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="marquee-container">
        <div className="marquee-track">
          <div className="marquee-text">{repeatedText}</div>
        </div>
      </div>
    </section>
  );
};

export default FabricacionGridSection;
