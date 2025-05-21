"use client";

import React, { useEffect, useRef } from "react";
import "./ExperienciaSection.scss";

const ExperienciaSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Sample data for experiences
  const experiencias = [
    {
      id: "01",
      categoria: "Espacios Comerciales",
      titulo: "Diseño Integral de Tiendas",
      descripcion:
        "Creamos espacios comerciales únicos que reflejan la identidad de cada marca, optimizando la experiencia del cliente y potenciando las ventas.",
    },
    {
      id: "02",
      categoria: "Arquitectura Comercial",
      titulo: "Proyectos Personalizados",
      descripcion:
        "Desarrollamos proyectos a medida que combinan estética, funcionalidad y estrategia comercial para crear ambientes memorables.",
    },
    {
      id: "03",
      categoria: "Visual Merchandising",
      titulo: "Estrategia de Exposición",
      descripcion:
        "Diseñamos la disposición perfecta de productos para maximizar su visibilidad y atractivo, creando recorridos que mejoran la experiencia de compra.",
    },
  ];

  return (
    <section ref={sectionRef} className="experiencia-section">
      <div className="experiencia-section__container">
        <div className="experiencia-section__header">
          <h2 className="experiencia-section__title fade_bottom">
            <span className="word">NUESTRA</span>{" "}
            <span className="word">EXPERIENCIA</span>
          </h2>
          <div className="experiencia-section__subtitle  fade_bottom">
            Más de 35 años transformando el retail con diseños innovadores que
            combinan funcionalidad y estética para crear espacios comerciales
            únicos y memorables.
          </div>
        </div>

        <div className="experiencia-section__content">
          {experiencias.map((exp) => (
            <div key={exp.id} className="experiencia-section__item">
              <div className="experiencia-section__item-header">
                <span className="experiencia-section__item-number">
                  {exp.id}
                </span>
                <span className="experiencia-section__item-category">
                  {exp.categoria}
                </span>
              </div>
              <h3 className="experiencia-section__item-title">{exp.titulo}</h3>
              <p className="experiencia-section__item-description">
                {exp.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienciaSection;
