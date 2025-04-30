"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import { animateStorySection } from "@/utils/animations/equipo-page-anim";
import "./StorySection.scss";

const StorySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const originStoryRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Enhanced animation implementation with timeout for safety
    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        animateStorySection({
          section: sectionRef.current,
          label: labelRef.current,
          title: titleRef.current,
          text: textRef.current,
          services: servicesRef.current,
          originStory: originStoryRef.current,
          image: imageRef.current,
        } as any);
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
      <div className="story-section__container">
        {/* Header with title and intro */}
        <div className="story-section__header">
          <div ref={labelRef} className="story-section__label">
            <span>NUESTRA HISTORIA</span>
          </div>

          <h2 ref={titleRef} className="story-section__title">
            Diseñamos{" "}
            <span className="highlight">experiencias comerciales</span> con
            identidad propia
          </h2>
        </div>

        {/* Main content with text and services */}
        <div className="story-section__content">
          {/* Left column with text content */}
          <div className="story-section__content-column">
            <div ref={textRef} className="story-section__text">
              <p className="story-section__intro-text">
                Somos un equipo de más de 45 profesionales apasionados por
                transformar espacios comerciales. Nuestra historia es un viaje
                de innovación, creatividad y compromiso con la excelencia.
              </p>

              <div className="story-section__philosophy">
                <h3>¿Por qué Dos Por Dos?</h3>
                <p>
                  Cada proyecto es <strong>único</strong>. Nos comprometemos a
                  entregar soluciones personalizadas con la misma pasión,
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

          {/* Right column with services */}
          <div className="story-section__services-column">
            <div
              ref={servicesRef}
              className="story-section__services-container"
            >
              <h3>Nuestros Servicios</h3>
              <ul className="story-section__services-list">
                {services.map((service, index) => (
                  <li key={index} className="story-section__service-item">
                    <span className="story-section__service-title">
                      {service.title}
                    </span>
                    <span className="story-section__service-description">
                      {service.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Our origins section */}
        <div className="story-section__origins">
          <div className="story-section__origins-content">
            <div ref={originStoryRef} className="story-section__origin-text">
              <h3>Nuestros Orígenes</h3>
              <p>
                Actualmente, somos un gran equipo formado por más de 45
                profesionales, pero todo empezó hace más de treinta años...
                Conchi y Julio, madrileña y manchego de nacimiento, comenzaron
                en febrero de 1987 un proyecto laboral y de vida con mucha
                ilusión.
              </p>
              <p>
                Conocedores del mundo de la marca y con la experiencia de
                trabajar para una de las firmas de perfume y cosmética
                internacional más importante, vieron la oportunidad de mejorar
                la visibilidad de las mismas en los puntos de venta de Canarias.
              </p>
              <p>
                Bajo estos valores hemos ido multiplicando de dos en dos, hasta
                formar este gran equipo. Más de 44 profesionales con los que
                seguimos creciendo día a día, gracias al trabajo y saber hacer,
                y con la misma ilusión y esencia de entonces, hace ya más de 36
                años.
              </p>
            </div>

            <div ref={imageRef} className="story-section__origin-image">
              <div className="story-section__image-frame">
                <div className="story-section__image-frame-inner">
                  <Image
                    src="/assets/img/about-us-page/family.jpg"
                    alt="Fundadores de Dos Por Dos"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="story-section__image"
                    priority
                  />
                  <div className="story-section__image-overlay"></div>
                  <div className="story-section__image-corner tl"></div>
                  <div className="story-section__image-corner tr"></div>
                  <div className="story-section__image-corner bl"></div>
                  <div className="story-section__image-corner br"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
