"use client";

import React, { useEffect, useRef } from "react";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import { animateStorySection } from "@/utils/animations/equipo-page-anim";
import "./StorySection.scss";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const StorySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        animateStorySection({
          section: sectionRef.current,
          title: titleRef.current,
          text: textRef.current,
          services: servicesRef.current,
          decor: decorRef.current
        });
      });
    }, 300);
  
    return () => clearTimeout(timer);
  }, []);
  

  const services = [
    {
      title: "Escaparatismo",
      description: "Diseño de escaparates que capturan la esencia de tu marca.",
    },
    {
      title: "Espacios Promocionales",
      description: "Creamos ambientes que impulsan la experiencia del cliente.",
    },
    {
      title: "Producción Digital",
      description: "Soluciones digitales que complementan tu espacio físico.",
    },
    {
      title: "Perfumería",
      description: "Diseños que realzan la experiencia sensorial.",
    },
    {
      title: "Shop in Shop",
      description: "Conceptos de marca que se integran perfectamente.",
    },
    {
      title: "Interiorismo Comercial",
      description: "Transformamos espacios con diseño y funcionalidad.",
    },
  ];

  return (
    <section className="story-section" ref={sectionRef}>
      <div className="story-section__decorative-elements" ref={decorRef}>
        <div className="story-section__decor story-section__decor-dots"></div>
        <div className="story-section__decor story-section__decor-line-1"></div>
        <div className="story-section__decor story-section__decor-line-2"></div>
        <div className="story-section__decor story-section__decor-circle"></div>
        <div className="story-section__decor story-section__decor-grid"></div>
      </div>
      
      <div className="story-section__container">
        <div className="story-section__content-wrapper">
          <div className="story-section__label">
            <span>NUESTRA HISTORIA</span>
          </div>

          <h2 ref={titleRef} className="story-section__title">
            <span className="word">Diseñamos</span>{" "}
            <span className="word">experiencias</span>{" "}
            <span className="word">comerciales</span>
            <br />
            <span className="word">con</span>{" "}
            <span className="word highlight">identidad propia</span>
          </h2>

          <div ref={textRef} className="story-section__text">
            <div className="story-section__intro">
              <p>
                Somos un equipo de más de 45 profesionales apasionados por
                transformar espacios comerciales. Nuestra historia es un viaje
                de innovación, creatividad y compromiso con la excelencia.
              </p>
            </div>

            <div className="story-section__philosophy">
              <h3>¿Por qué Dos Por Dos?</h3>
              <p>
                Cada proyecto es <strong>único</strong>. Nos comprometemos a entregar
                soluciones personalizadas con la misma pasión,
                independientemente de su escala o presupuesto.
              </p>
            </div>

            <div className="story-section__cta">
              <PrimaryButton href="/portfolio" size="medium">
                Ver Nuestro Trabajo
              </PrimaryButton>
            </div>
          </div>
        </div>
        
        <div className="story-section__services-column">
          <div className="story-section__services-container" ref={servicesRef}>
            <h3>Nuestros Servicios</h3>
            <ul className="story-section__services-list">
              {services.map((service, index) => (
                <li key={index} className="story-section__service-item">
                  <span className="story-section__service-title">{service.title}</span>
                  <span className="story-section__service-description">{service.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;