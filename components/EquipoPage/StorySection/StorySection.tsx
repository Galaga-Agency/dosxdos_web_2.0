"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
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
  const originStoryRef = useRef<HTMLDivElement>(null);
  const originImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        animateStorySection({
          section: sectionRef.current,
          title: titleRef.current,
          text: textRef.current,
          services: servicesRef.current,
          decor: decorRef.current,
          originStory: originStoryRef.current,
          originImage: originImageRef.current,
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

        <div className="story-section__services-column">
          <div className="story-section__services-container" ref={servicesRef}>
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

        <div className="story-section__origin-wrapper">
          <div ref={originStoryRef} className="story-section__origin">
            <h3>Nuestros Orígenes</h3>
            <p>
              Actualmente, somos un gran equipo formado por más de 45
              profesionales, pero todo empezó hace más de treinta años... Conchi
              y Julio, madrileña y manchego de nacimiento, comenzaron en febrero
              de 1987 un proyecto laboral y de vida con mucha ilusión.
            </p>
            <p>
              Conocedores del mundo de la marca y con la experiencia de trabajar
              para una de las firmas de perfume y cosmética internacional más
              importante, vieron la oportunidad de mejorar la visibilidad de las
              mismas en los puntos de venta de Canarias.
            </p>
            <p>
              Las islas Canarias siempre han sido un referente en cuanto a
              ventas de perfume, pero la presencia e imagen de las firmas hace
              treinta años era muy diferente. En esa época no existían espacios
              dedicados a las marcas en los escaparates, sino que se mezclaban
              todo tipo de productos en ellos.
            </p>
            <p>
              Gracias a su visión de marca, a su tesón y a la confianza que
              fueron depositando en ellos cada uno de sus clientes, podemos
              decir que hoy los escaparates en Canarias son diferentes al resto
              de España.
            </p>
            <p>
              Desde los primeros pasos a la actualidad, la empresa ha ido
              creciendo con cimientos y valores tan importantes como la
              humanidad, ética profesional, pasión, trabajo en equipo y
              esfuerzo.
            </p>
            <p>
              Bajo estos valores hemos ido multiplicando de dos en dos, hasta
              formar este gran equipo. Más de 44 profesionales con los que
              seguimos creciendo día a día, gracias al trabajo y saber hacer, y
              con la misma ilusión y esencia de entonces, hace ya más de 36
              años.
            </p>
          </div>

          <div ref={originImageRef} className="story-section__origin-image">
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
    </section>
  );
};

export default StorySection;