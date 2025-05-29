"use client";

import React, { useRef } from "react";
import { servicesList } from "@/data/services";
import HoverCard from "@/components/ui/HoverCard/HoverCard";
import "./ServicesSection.scss";

const ServicesSection: React.FC = () => {
  return (
    <section className="services-section">
      <div className="services-section__container container">
        <div className="services-section__header">
          <h3 className="services-section__label label">
            (Nuestros servicios)
          </h3>
          <h2 className="services-section__title secondary-title fade_bottom">
            Todo lo que tu marca necesita <br />
            <span className="highlight">para destacar</span>.
          </h2>
          <p className="services-section__subtitle subtitle">
            Creamos soluciones 360º que integran diseño, producción, tecnología
            y estrategia. Expertos en proyectos llave en mano, acompañamos a las
            marcas en todo el proceso: desde la idea hasta la puesta en marcha.
          </p>
        </div>
        <div className="services-section__grid">
          {servicesList.map((service, index) => (
            <div
              key={service.id}
              className="services-section__card-wrapper"
              style={{ zIndex: 10 }}
            >
              <HoverCard
                id={service.id}
                title={service.name}
                description={service.description as string}
                imageUrl={service.imageUrl}
                linkUrl={`/servicios/${service.slug}`}
                linkText={service.linkText}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
