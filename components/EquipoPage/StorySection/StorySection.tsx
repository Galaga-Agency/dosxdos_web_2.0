"use client";

import React, { useEffect, useRef } from "react";
import "./StorySection.scss";
import { initFadeAnimations } from "@/utils/animations/pages/equipo-page-anim";

const StorySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      initFadeAnimations();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const services = [
    "Escaparatismo",
    "Espacios Promocionales",
    "Producción Digital",
    "Perfumería",
    "Shop in Shop",
    "Interiorismo Comercial",
    "Diseño de Marca",
    "Experiencia de Cliente",
    "Diseño Comercial",
  ];

  return (
    <section className="story-section" ref={sectionRef}>
      <div className="story-section__container">
        <h2 ref={titleRef} className="story-section__title fade_bottom">
          Somos un estudio creativo especializado en
          <span className="highlight">
            {" "}
            diseñar experiencias comerciales
          </span>{" "}
          con identidad propia para empresas y individuos.
        </h2>

        <div ref={textRef} className="story-section__description fade_bottom">
          <p>
            Un equipo de más de 45 profesionales apasionados por transformar
            espacios comerciales. Nuestra historia es un viaje de innovación,
            creatividad y compromiso con la excelencia.
          </p>
          <p>
            Cada proyecto es <strong>único</strong>. Nos comprometemos a
            entregar soluciones personalizadas con la misma pasión,
            independientemente de su escala o presupuesto.
          </p>
        </div>

        <div ref={servicesRef} className="story-section__services">
          <h3 className="story-section__services-title fade_bottom">
            LO QUE HACEMOS
          </h3>
          <div className="story-section__services-grid fade_bottom">
            {services.map((service, index) => (
              <div key={index} className="story-section__services-item">
                {service}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
