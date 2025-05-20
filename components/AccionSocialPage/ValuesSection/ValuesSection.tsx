"use client";

import React, { useRef } from "react";
import "./ValuesSection.scss";

const ValuesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const misionValues = [
    "Compromiso",
    "Pasión",
    "Trabajo en equipo",
    "Dinamismo",
    "Experiencia",
  ];

  const visionValues = [
    "Innovación",
    "Excelencia",
    "Creatividad",
    "Tendencias",
    "Diferenciación",
  ];

  const principiosValues = [
    "Sostenibilidad",
    "Ética profesional",
    "Responsabilidad",
    "Colaboración",
    "Profesionalidad",
  ];

  return (
    <section className="values-section" ref={sectionRef}>
      <div className="values-section__container">
        <h2  className="values-section__title fade_bottom">
          Diseñamos espacios con&nbsp;
          <span className="highlight"> esencia propia</span> que transmiten los
          valores de cada marca.
        </h2>

        <div className="values-section__description">
          <p>
            En <strong>Dos Por Dos</strong>, creemos que lo que somos se refleja
            en cada proyecto que realizamos. Nuestros valores, misión y visión
            no son solo palabras, sino principios que vivimos día a día para
            crear experiencias comerciales extraordinarias.
          </p>
          <p>
            Cada espacio que creamos tiene una <strong>identidad única</strong>{" "}
            que responde a las necesidades específicas de cada cliente y a la
            esencia de su marca, potenciando su conexión con el cliente final.
          </p>
        </div>

        <div className="values-section__services">
          <h3 className="values-section__services-title fade_right">
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
