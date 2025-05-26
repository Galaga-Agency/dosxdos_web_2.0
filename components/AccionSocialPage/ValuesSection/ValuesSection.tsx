"use client";

import React, { useRef } from "react";
import "./ValuesSection.scss";

const ValuesSection: React.FC = () => {
  const misionValues = [
    "Diseñar con propósito",
    "Crear impacto positivo",
    "Fomentar la colaboración",
    "Conectar personas",
  ];

  const visionValues = [
    "Liderar con valores",
    "Transformar espacios",
    "Inspirar futuro",
    "Diseñar con conciencia",
  ];

  const principiosValues = [
    "Creatividad",
    "Compromiso",
    "Sostenibilidad",
    "Empatía",
  ];

  return (
    <section className="values-section">
      <div className="values-section__container container">
        <h2 className="values-section__title secondary-title fade_bottom">
          Nuestro trabajo no termina en el estudio. <br/>
          <span className="highlight">Empieza en la comunidad.</span>
        </h2>

        <div className="values-section__description text">
            Desde Dos x Dos creemos que el privilegio de poder
            crear debe ir de la mano del{" "}
            compromiso de contribuir. <br />Por eso
             apoyamos iniciativas que promueven la inclusión,{" "}
            colaboramos con entidades que trabajan con quienes
            más lo necesitan y adoptamos medidas reales para
            reducir nuestra huella ecológica: desde el uso de materiales
            sostenibles hasta el autoconsumo energético y la optimización de
            nuestros desplazamientos.
            <br /> Porque ser parte del cambio también es parte de{" "}
            nuestro trabajo.
        </div>

        <div className="values-section__services">
          <h3 className="values-section__services-title">
            NUESTROS PRINCIPIOS
          </h3>
          <div className="values-section__services-grid">
            <div className="values-section__services-column">
              <h4 className="values-section__column-title">Misión</h4>
              {misionValues.map((value, index) => (
                <div key={index} className="values-section__services-item">
                  {value}
                </div>
              ))}
            </div>
            <div className="values-section__services-column">
              <h4 className="values-section__column-title">Visión</h4>
              {visionValues.map((value, index) => (
                <div key={index} className="values-section__services-item">
                  {value}
                </div>
              ))}
            </div>
            <div className="values-section__services-column">
              <h4 className="values-section__column-title">Valores</h4>
              {principiosValues.map((value, index) => (
                <div key={index} className="values-section__services-item">
                  {value}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
