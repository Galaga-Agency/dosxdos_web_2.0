"use client";

import React, { useRef } from "react";
import Link from "next/link";
import HoverCard from "../../ui/HoverCard/HoverCard";
import TextMarquee from "@/components/TextMarquee/TextMarquee";
import "./FabricacionGridSection.scss";
import HoverCircleButton from "@/components/ui/HoverCircleButton/HoverCircleButton";

const FabricacionGridSection: React.FC = () => {
  const fabricacionServices = [
    {
      id: "innovacion",
      name: "Innovación",
      description:
        "Una clara apuesta por la innovación tecnológica y la investigación constante en materiales.",
      imageUrl: "/assets/img/servicios/fabricacion-impresion/innovacion.jpg",
      slug: "innovacion",
    },
    {
      id: "fidelidad-cromatica",
      name: "Fidelidad cromática",
      description:
        "Impresiones con excelente fidelidad cromática, adaptadas a las necesidades del cliente, del presupuesto y del uso final.",
      imageUrl:
        "/assets/img/servicios/fabricacion-impresion/fidelidad-cromatica.avif",
      slug: "fidelidad-cromatica",
    },
    {
      id: "sostenibilidad",
      name: "Sostenibilidad",
      description:
        "Un enfoque de producción eficiente, sostenible y completo, que une agilidad, calidad y control de cada proceso.",
      imageUrl:
        "/assets/img/servicios/fabricacion-impresion/sostenibilidad.avif",
      slug: "sostenibilidad",
    },
  ];

  return (
    <section className="fabricacion-services-grid">
      <div className="fabricacion-services-grid__container container">
        <div className="fabricacion-services-grid__header">
          <h3 className="fabricacion-services-grid__label label">
            (¿Qué nos diferencia?)
          </h3>
        </div>

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

        <div className="fabricacion-services-grid__cta">
          <HoverCircleButton href="/contacto" label="¿Hablamos?" />
        </div>
      </div>

      <TextMarquee text="EMOCIONAMOS • DESTACAMOS • PERDURAMOS" speed={50} />
    </section>
  );
};

export default FabricacionGridSection;
