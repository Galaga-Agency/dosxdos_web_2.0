"use client";

import React, { useRef, useEffect } from "react";
import { initFadeAnimations } from "@/utils/animations/pages/accion-social-page-anim";
import "./ValuesSection.scss";

const ValuesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      initFadeAnimations();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // List the values for the three categories
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
        <h2 ref={titleRef} className="values-section__title fade_bottom">
          Diseñamos espacios con&nbsp;
          <span className="highlight"> esencia propia</span> que transmiten los
          valores de cada marca.
        </h2>

        <div ref={textRef} className="values-section__description fade_bottom">
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

        <div ref={servicesRef} className="values-section__services">
          <h3 className="values-section__services-title fade_bottom">
            NUESTROS PRINCIPIOS
          </h3>
          <div className="values-section__services-grid">
            <div className="values-section__services-column fade_bottom">
              <h4 className="values-section__column-title">Misión</h4>
              {misionValues.map((value, index) => (
                <div key={index} className="values-section__services-item">
                  {value}
                </div>
              ))}
            </div>
            <div className="values-section__services-column fade_bottom">
              <h4 className="values-section__column-title">Visión</h4>
              {visionValues.map((value, index) => (
                <div key={index} className="values-section__services-item">
                  {value}
                </div>
              ))}
            </div>
            <div className="values-section__services-column fade_bottom">
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
