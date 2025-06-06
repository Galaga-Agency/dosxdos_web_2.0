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
            Servicios integrales de fabricación e impresión para transformar
            ideas en{" "}
            <span className="highlight">realidades tangibles</span>.
          </h2>
        </div>

        <div className="fabricacion-services__content">
          <div className="fabricacion-services__categories">
            <div className="fabricacion-services__category">
              Fabricación a medida
            </div>
            <div className="fabricacion-services__category">
              Impresión digital
            </div>
            <div className="fabricacion-services__category">Rotulación</div>
            <div className="fabricacion-services__category">Señalética</div>
            <div className="fabricacion-services__category">Elementos POP</div>
            <div className="fabricacion-services__category">
              Mobiliario comercial
            </div>
          </div>

          <div className="fabricacion-services__description">
            <p className="fabricacion-services__text text">
              Fabricamos soluciones. Imprimimos calidad. Creamos presencia. Con
              más de tres décadas perfeccionando técnicas de fabricación e
              impresión, ofrecemos un servicio integral que abarca desde el
              diseño técnico hasta la instalación final.
            </p>
            <p className="fabricacion-services__text text">
              Nuestro equipo de producción coordina cada fase del proceso con
              precisión y dedicación, garantizando acabados únicos, duraderos y
              sostenibles. Desde la fabricación de mobiliario comercial hasta la
              impresión de gran formato, trabajamos con tecnología avanzada y
              materiales de primera calidad.
            </p>
            <p className="fabricacion-services__text text">
              Pensamos cada pieza como parte de un conjunto: diseñamos,
              fabricamos, imprimimos, instalamos. Porque no se trata solo de
              producir elementos, sino de darles vida y funcionalidad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FabricacionServicesSection;
