"use client";

import React from "react";
import "./AboutServices.scss";

const AboutServices: React.FC = () => {
  return (
    <section className="about-services">
      <div className="about-services__container">
        <div className="about-services__header">
          <div className="about-services__label fade_bottom">
            Más de 37 años de experiencia
          </div>
          <h2 className="about-services__title">
            <div className="title-row fade_bottom">
              COMO ESPECIALISTAS EN DISEÑO DE INTERIORES,
            </div>
            <div className="title-row fade_bottom">
              CREAMOS ESPACIOS COMERCIALES DE LUJO QUE
            </div>
            <div className="title-row fade_bottom highlight">
              CAUTIVAN Y VENDEN.
            </div>
          </h2>
        </div>

        <div className="about-services__content">
          <div className="about-services__categories">
            {/* Remove the row structure - let categories flow naturally */}
            <div className="about-services__category fade_bottom">
              Diseño de interiores
            </div>
            <div className="about-services__category fade_bottom">
              Producción
            </div>
            <div className="about-services__category fade_bottom">Eventos</div>{" "}
            <div className="about-services__category fade_bottom">
              Comunicación
            </div>
            <div className="about-services__category fade_bottom">
              Logística
            </div>
            <div className="about-services__category fade_bottom">
              Consultoría
            </div>
          </div>

          <div className="about-services__description">
            <p className="about-services__text">
              En Dos por Dos creamos ambientes comerciales que transforman la
              experiencia del cliente en el punto de venta. Nuestro enfoque
              integral potencia la identidad de marcas de lujo en el sector de
              la cosmética y perfumería con espacios que reflejan su
              exclusividad.
            </p>
            <p className="about-services__text">
              Creemos que entender las necesidades específicas de cada marca es
              la clave del éxito. Es momento de elevar la presentación de sus
              productos, ofrecer una nueva perspectiva y realizar todo el
              potencial de su espacio comercial.
            </p>
            <p className="about-services__text">
              Respaldados por más de tres décadas de experiencia y un proceso de
              diseño probado para las marcas más exigentes del sector.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutServices;
