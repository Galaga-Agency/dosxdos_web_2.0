"use client";

import React from "react";
import "./StorySection.scss";

const StorySection: React.FC = () => {
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
    <section className="story-section">
      <div className="story-section__container container">
        <h2 className="story-section__title secondary-title fade_bottom">
          El diseño es <span className="highlight">nuestro ADN.</span> <br />
          El compromiso, nuestra manera de estar en el mundo.
        </h2>

        <div className="story-section__description text">
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

        <div className="story-section__services">
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
