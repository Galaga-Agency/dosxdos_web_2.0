"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  animateValuesSection,
  animateTabContentChange,
} from "@/utils/animations/accion-social-page-anim";
import "./ValuesSection.scss";

const ValuesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("mision");
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Animate on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      animateValuesSection({
        section: sectionRef.current,
        title: titleRef.current,
        text: textRef.current,
        tabs: tabsRef.current,
        content: contentRef.current,
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (tab: string) => {
    // First update the state
    setActiveTab(tab);

    // Then animate the content change without scrolling
    setTimeout(() => {
      if (contentRef.current) {
        animateTabContentChange(contentRef.current);
      }
    }, 50);
  };

  const valuesData = {
    mision: {
      title: "Misión",
      subtitle: "Lo que somos",
      description:
        "Nuestra misión es crear espacios comerciales que transmitan la esencia de cada marca, generando experiencias únicas para el cliente final. Todo ello con nuestros valores como guía.",
      values: [
        {
          text: "Compromiso",
          description:
            "Nos comprometemos con cada proyecto como si fuera nuestro propio negocio",
        },
        {
          text: "Pasión",
          description:
            "Amamos lo que hacemos y lo transmitimos en cada detalle",
        },
        {
          text: "Trabajo en equipo",
          description:
            "Colaboramos estrechamente entre nosotros y con nuestros clientes",
        },
        {
          text: "Dinamismo",
          description: "Nos adaptamos ágilmente a nuevos retos y situaciones",
        },
        {
          text: "Experiencia",
          description:
            "Aplicamos nuestros más de 35 años de experiencia a cada proyecto",
        },
      ],
    },
    vision: {
      title: "Visión",
      subtitle: "A dónde vamos",
      description:
        "Aspiramos a ser líderes reconocidos en la transformación de espacios comerciales, elevando cada marca a través del diseño y creando conexiones emocionales con el consumidor.",
      values: [
        {
          text: "Innovación",
          description:
            "Buscamos constantemente nuevas formas de sorprender y emocionar",
        },
        {
          text: "Excelencia",
          description:
            "Perseguimos la máxima calidad en cada elemento del proyecto",
        },
        {
          text: "Creatividad",
          description:
            "Pensamos fuera de lo convencional para ofrecer soluciones únicas",
        },
        {
          text: "Tendencias",
          description:
            "Nos mantenemos al día con las últimas tendencias del sector",
        },
        {
          text: "Diferenciación",
          description: "Creamos espacios que destacan y se recuerdan",
        },
      ],
    },
    valores: {
      title: "Valores",
      subtitle: "Lo que nos define",
      description:
        "Nuestros valores son el corazón de nuestra empresa. Son los principios que guían nuestras decisiones y nuestra forma de trabajar cada día.",
      values: [
        {
          text: "Sostenibilidad",
          description: "Comprometidos con un futuro más verde y responsable",
        },
        {
          text: "Ética profesional",
          description:
            "Actuamos con honestidad y transparencia en todo momento",
        },
        {
          text: "Responsabilidad",
          description: "Asumimos las consecuencias de nuestras decisiones",
        },
        {
          text: "Colaboración",
          description:
            "Creemos en el poder del trabajo conjunto con nuestros clientes",
        },
        {
          text: "Pasión",
          description: "Ponemos el corazón en cada proyecto que emprendemos",
        },
      ],
    },
  };

  return (
    <section className="values-section" ref={sectionRef}>
      <div className="values-section__container">
        <div className="values-section__content-wrapper">
          <div className="values-section__label">
            <span>NUESTROS PRINCIPIOS</span>
          </div>

          <h2 ref={titleRef} className="values-section__title">
            <span className="word">Diseñamos</span>{" "}
            <span className="word">espacios</span>{" "}
            <span className="word">con</span>{" "}
            <span className="word highlight">esencia propia</span>
          </h2>

          <div ref={textRef} className="values-section__text">
            <p>
              En <strong>Dos Por Dos</strong>, creemos que lo que somos se
              refleja en cada proyecto que realizamos. Nuestros valores, misión
              y visión no son solo palabras, sino principios que vivimos día a
              día para crear experiencias comerciales extraordinarias.
            </p>
          </div>
        </div>

        <div className="values-section__tabs-wrapper">
          <div ref={tabsRef} className="values-section__tabs">
            <button
              className={`values-section__tab ${
                activeTab === "mision" ? "active" : ""
              }`}
              onClick={() => handleTabChange("mision")}
              type="button"
            >
              <span className="values-section__tab-text">Misión</span>
            </button>
            <button
              className={`values-section__tab ${
                activeTab === "vision" ? "active" : ""
              }`}
              onClick={() => handleTabChange("vision")}
              type="button"
            >
              <span className="values-section__tab-text">Visión</span>
            </button>
            <button
              className={`values-section__tab ${
                activeTab === "valores" ? "active" : ""
              }`}
              onClick={() => handleTabChange("valores")}
              type="button"
            >
              <span className="values-section__tab-text">Valores</span>
            </button>
          </div>
        </div>

        <div ref={contentRef} className="values-section__content">
          <div className="values-section__content-header">
            <span className="values-section__content-subtitle">
              {valuesData[activeTab as keyof typeof valuesData].subtitle}
            </span>
            <h3 className="values-section__content-title">
              {valuesData[activeTab as keyof typeof valuesData].title}
            </h3>
            <p className="values-section__content-description">
              {valuesData[activeTab as keyof typeof valuesData].description}
            </p>
          </div>

          <div className="values-section__values-wrapper">
            {valuesData[activeTab as keyof typeof valuesData].values.map(
              (value, index) => (
                <div key={index} className="values-section__value-item">
                  <div className="values-section__value-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h4 className="values-section__value-title">{value.text}</h4>
                  <p className="values-section__value-description">
                    {value.description}
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Social Responsibility Section */}
        <div className="values-section__social-responsibility">
          <div className="values-section__social-header">
            <h4 className="values-section__social-subtitle">
              Socialmente responsables con nuestro entorno
            </h4>
          </div>

          <div className="values-section__social-content">
            <p>
              <strong>Siendo conscientes de la suerte que tenemos</strong>,
              estamos sensibilizados con las necesidades de nuestro entorno y
              con las de las zonas menos favorecidos, por ello aportamos cada
              año nuestro granito de arena.
            </p>
            <p>
              Esto nos lleva a desarrollar iniciativas sociales y
              medioambientales para reducir nuestro impacto en el medio. Con más
              de 35 años de experiencia en el sector del diseño de interiores en
              espacios comerciales, entendemos nuestra responsabilidad de
              contribuir positivamente a la sociedad.
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
    </section>
  );
};

export default ValuesSection;