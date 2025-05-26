"use client";

import React, { useRef } from "react";
import { servicesList } from "@/data/services";
import HoverCard from "@/components/ui/HoverCard/HoverCard";
import "./ServicesSection.scss";

const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="services-section">
      <div className="services-section__container">
        <div className="services-section__header">
          <div className="services-section__label-title">
            <div className="services-section__label">
              <span>(Nuestros servicios)</span>
            </div>

            <h2 className="services-section__title">
              <div className="title-row fade_bottom">
                Todo lo que tu marca necesita
              </div>
              <div className="title-row fade_bottom highlight">
                para destacar.
              </div>
            </h2>
          </div>

          <p className="services-section__subtitle">
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
                linkUrl={`/servicios/${service.id}`}
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
