"use client";

import React from "react";
import "./AboutServices.scss";

const AboutServices: React.FC = () => {
  return (
    <section className="about-services">
      <div className="about-services__container container">
        <div className="about-services__header header">
          <div className="about-services__label label ">
            (Más de 38 años de experiencia)
          </div>
          <h2 className="about-services__title secondary-title">
            Servicios integrales para transformar ideas <br /> en{" "}
            <span className="highlight">experiencias memorables</span>.
          </h2>
        </div>

        <div className="about-services__content">
          <div className="about-services__categories">
            <div className="about-services__category">Diseño de interiores</div>
            <div className="about-services__category">Producción</div>
            <div className="about-services__category">Eventos</div>
            <div className="about-services__category">Comunicación</div>
            <div className="about-services__category">Logística</div>
            <div className="about-services__category">Consultoría</div>
          </div>

          <div className="about-services__description">
            <p className="about-services__text text">
              Diseñamos espacios. Producimos soluciones. Creamos impacto. Con
              más de tres décadas al lado de las principales marcas del retail,
              ofrecemos un servicio integral que abarca desde el diseño
              conceptual hasta la instalación final.
            </p>
            <p className="about-services__text text">
              Nuestro equipo multidisciplinar coordina cada fase del proyecto
              con precisión y cercanía, garantizando resultados únicos,
              funcionales y sostenibles. Desde la creación de entornos
              comerciales hasta la producción de elementos visuales, eventos,
              comunicación o consultoría, trabajamos con un enfoque global y
              adaptado a cada cliente.
            </p>
            <p className="about-services__text text">
              Pensamos cada proyecto como un todo: diseñamos, fabricamos,
              instalamos, acompañamos. Porque no se trata solo de hacer
              espacios, sino de darles sentido.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutServices;
