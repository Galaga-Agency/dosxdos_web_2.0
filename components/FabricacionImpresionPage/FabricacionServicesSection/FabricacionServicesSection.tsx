"use client";

import React from "react";
import "./FabricacionServicesSection.scss";

const FabricacionServicesSection: React.FC = () => {
  return (
    <section className="fabricacion-services">
      <div className="fabricacion-services__container container">
        <div className="fabricacion-services__header header">
          <div className="fabricacion-services__label label fade_bottom">
            (Más de 38 años de experiencia)
          </div>
          <h2 className="fabricacion-services__title secondary-title">
            Fabricación: cuando la forma sigue a la idea - <br />
            Diseñamos y construimos piezas que no solo funcionan, sino que
            comunican.
          </h2>
        </div>

        <div className="fabricacion-services__content">
          <div className="fabricacion-services__categories">
            <div className="fabricacion-services__category">
              Mobiliario modular <br /> y personalizado
            </div>
            <div className="fabricacion-services__category">
              PLV, expositores <br /> y escaparates
            </div>
            <div className="fabricacion-services__category">
              Elementos decorativos
              <br /> y estructuras
            </div>
            <div className="fabricacion-services__category">
              Soluciones funcionales <br /> y sostenibles
            </div>
          </div>

          <div className="fabricacion-services__description">
            <p className="fabricacion-services__text text">
              La fabricación no es solo ejecución: es una extensión natural del
              diseño. Desde el mobiliario modular hasta los expositores,
              estructuras y elementos decorativos, producimos piezas que cumplen
              una función, pero también transmiten una idea.{" "}
            </p>
            <p className="fabricacion-services__text text">
              Nos diferenciamos por contar con un equipo técnico y creativo que
              trabaja mano a mano, asegurando coherencia, control de calidad y
              agilidad en plazos. Gracias a nuestros talleres propios, ofrecemos
              soluciones personalizadas, con acabados cuidados y materiales
              adaptados a cada proyecto. Fabricar para nosotros es construir con
              intención.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FabricacionServicesSection;
