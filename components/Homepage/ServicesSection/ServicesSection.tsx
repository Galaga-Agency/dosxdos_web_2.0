"use client";

import React, { useRef } from "react";
import HoverCard from "@/components/ui/HoverCard/HoverCard";
import "./ServicesSection.scss";
import { Service } from "@/types/service-types";

type ServicesSectionProps = {
  services: Service[];
};

const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  return (
    <section className="services-section">
      <div className="services-section__container container">
        <div className="services-section__header">
          <div className="services-section__header-left">
            <h3 className="services-section__label label">
              (Nuestros servicios)
            </h3>
            <h2 className="services-section__title secondary-title">
              TE ESCUCHAMOS. <br /> CREAMOS. FABRICAMOS. <br />
              INSTALAMOS. MANTENEMOS.
            </h2>
          </div>
          <div className="services-section__header-right">
            <p className="services-section__subtitle subtitle">
              En Dos por Dos te damos soluciones 360° que combinan estrategia,
              creatividad y ejecución impecable o también podemos entrar en el
              proceso en el que nos necesites. Somos expertos en desarrollar
              proyectos llave en mano que conectan con tu público y elevan el
              valor de tu marca. <br />
              <br />
              Integramos consultoría, diseño, fabricación, impresión, montaje y
              mantenimiento con un enfoque personalizado. Nuestras dos áreas
              complementarias –creativa y productiva– trabajan unidas para darte
              un servicio completo, rápido y con resultados medibles.
            </p>
          </div>
        </div>
        <div className="services-section__grid">
          {services.map((service, index) => (
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
