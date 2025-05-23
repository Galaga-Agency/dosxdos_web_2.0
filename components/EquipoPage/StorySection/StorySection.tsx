"use client";

import React, { useRef } from "react";
import "./StorySection.scss";

const StorySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  const services = [
    "Interiorismo comercial",
    "Residenciales",
    "Escaparatismo",
    "Producción gráfica",
    "Creación de eventos",
    "Comunicación",
    "Diseño gráfico",
    "Mobiliario",
    "Consultoría",
  ];

  return (
    <section className="story-section" ref={sectionRef}>
      <div className="story-section__container">
        <h2 ref={titleRef} className="story-section__title fade_bottom">
          <span className="highlight"> El diseño es nuestro ADN.</span> <br />
          El compromiso, nuestra manera de estar en el mundo.
        </h2>

        <div ref={textRef} className="story-section__description">
          <p>
            Creemos en una forma de trabajar donde la creatividad convive con la
            responsabilidad. Donde cada proyecto se construye sobre valores
            compartidos: calidad, sostenibilidad, trabajo en equipo y respeto
            por el entorno.
          </p>
          <p>
            No diseñamos solo espacios. Diseñamos formas de hacer, de mirar, de
            habitar. Y lo hacemos con la convicción de que el diseño puede
            transformar mucho más que superficies.
          </p>
        </div>

        <div ref={servicesRef} className="story-section__services">
          <h3 className="story-section__services-title">
            LO QUE HACEMOS
          </h3>
          <div className="story-section__services-grid">
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
