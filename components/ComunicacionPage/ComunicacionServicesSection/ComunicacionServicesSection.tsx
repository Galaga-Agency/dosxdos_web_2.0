"use client";

import React from "react";
import "./ComunicacionServicesSection.scss";

const ComunicacionServicesSection = () => {
  const services = [
    "Diagnóstico, Auditoría y Cultura de marca",
    "Definición de propósito corporativo",
    "Estrategia de marca",
    "Creación de naming, tono de voz y mensajes clave",
    "Diseño de identidad visual",
    "Activos de marca, manuales de identidad y brandbook",
    "Implementación y despliegue de marca",
  ];

  return (
    <section className="comunicacion-services-section">
      <div className="comunicacion-services-section__content container">
        <h3 className="comunicacion-services-section__description small-title">
          Hay marcas que se abren paso en el mercado, y otras que logran
          quedarse en la memoria. Nuestro trabajo empieza cuando una marca
          quiere hacer ambas cosas.
        </h3>

        <div className="comunicacion-services-section__columns">
          <div className="comunicacion-services-section__column">
            <p className="comunicacion-services-section__column-text text">
              Creamos marcas desde cero o las reorientamos cuando hace falta que
              la imagen tome un nuevo rumbo. Naming, identidad visual, tono,
              aplicaciones, contenido. Todo lo que ayuda a que una marca diga lo
              que tiene que decir, de forma coherente y reconocible.
            </p>
          </div>

          <div className="comunicacion-services-section__column">
            <p className="comunicacion-services-section__column-text text">
              Nuestro equipo de diseño y estrategia acompaña todo el proceso,
              cuidando los detalles y entendiendo el contexto.
            </p>
          </div>
        </div>
      </div>

      <div className="comunicacion-services-section__grid container">
        <div className="comunicacion-services-section__services-header">
          <span className="comunicacion-services-section__label">
            (¿En qué te podemos ayudar?)
          </span>
        </div>

        <div className="comunicacion-services-section__services-content">
          <div className="comunicacion-services-section__services-list">
            {services.map((service, index) => (
              <div
                key={index}
                className="comunicacion-services-section__service-item"
              >
                <p className="comunicacion-services-section__service-title">
                  {service}
                </p>
                <div className="comunicacion-services-section__service-line"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComunicacionServicesSection;
