"use client";

import React, { useEffect, useRef } from "react";
import { animateValuesSection } from "@/utils/animations/accion-social-page-anim";
import "./ValuesSection.scss";

const ValuesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        animateValuesSection({
          section: sectionRef.current,
          title: titleRef.current,
          text: textRef.current,
          values: valuesRef.current,
          decor: decorRef.current,
        });
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const valueItems = [
    {
      title: "Somos",
      icon: "mission",
      values: [
        "Compromiso",
        "Implicación",
        "Pasión",
        "Trabajo en equipo",
        "Servicio",
        "Dinamismo",
        "Ilusión",
        "Motivación",
        "Experiencia",
      ],
    },
    {
      title: "Aportamos",
      icon: "valores",
      values: [
        "Calidad",
        "Desarrollo",
        "Proyectos",
        "Tendencias",
        "Cuidado de los detalles",
        "Diferenciación",
        "Materiales",
        "Innovación",
      ],
    },
    {
      title: "Nos apasionamos",
      icon: "vision",
      values: [
        "Creatividad",
        "Esencias",
        "Estudio",
        "Ambientes",
        "Diseño",
        "Marcas",
        "Espacios",
        "Conceptos",
        "Ideas",
        "Sensaciones",
      ],
    },
  ];

  return (
    <section className="values-section" ref={sectionRef}>
      <div className="values-section__decorative-elements" ref={decorRef}>
        <div className="values-section__decor values-section__decor-dots"></div>
        <div className="values-section__decor values-section__decor-line-1"></div>
        <div className="values-section__decor values-section__decor-line-2"></div>
        <div className="values-section__decor values-section__decor-circle"></div>
        <div className="values-section__decor values-section__decor-grid"></div>
      </div>

      <div className="values-section__container">
        <div className="values-section__content-wrapper">
          <div className="values-section__label">
            <span>NUESTROS VALORES</span>
          </div>

          <h2 ref={titleRef} className="values-section__title">
            <span className="word">Socialmente</span>{" "}
            <span className="word">responsables</span>{" "}
            <span className="word">con</span>{" "}
            <span className="word">nuestro</span>{" "}
            <span className="word highlight">entorno</span>
          </h2>

          <div ref={textRef} className="values-section__text">
            <div className="values-section__intro">
              <p>
                Siendo conscientes de la suerte que tenemos, estamos
                sensibilizados con las necesidades de nuestro entorno y con las
                de las zonas menos favorecidos, por ello aportamos cada año
                nuestro granito de arena.
              </p>
            </div>

            <div className="values-section__description">
              <p>
                Esto nos lleva a desarrollar iniciativas sociales y
                medioambientales para reducir nuestro impacto en el medio. Con
                más de 35 años de experiencia en el sector del diseño de
                interiores en espacios comerciales, entendemos nuestra
                responsabilidad de contribuir positivamente a la sociedad.
              </p>
              <p>
                Nuestro equipo de más de 45 profesionales no solo se dedica a
                crear experiencias comerciales únicas, sino que también nos
                esforzamos por implementar prácticas sostenibles y apoyar a
                comunidades necesitadas.
              </p>
            </div>
          </div>
        </div>

        <div className="values-section__values-container" ref={valuesRef}>
          {valueItems.map((item, index) => (
            <div key={index} className="values-section__value-column">
              <div className="values-section__value-icon">
                <div
                  className={`values-section__icon values-section__icon-${item.icon}`}
                >
                  <img
                    src={`/assets/img/about-us-page/${item.icon}.png`}
                    alt={item.title}
                    className="values-section__icon-image"
                  />
                </div>
              </div>
              <h3 className="values-section__value-title">{item.title}</h3>
              <div className="values-section__value-list">
                {item.values.map((value, i) => (
                  <span key={i} className="values-section__value-item">
                    {value}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
