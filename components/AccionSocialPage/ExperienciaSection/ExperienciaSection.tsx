"use client";

import React, { useEffect, useRef } from "react";
import "./ExperienciaSection.scss";

const ExperienciaSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const experiencias = [
    {
      id: "01",
      categoria: "Utilizamos energia limpia",
      titulo: "Energías renovables",
      descripcion:
        "Apostamos por la energía renovable, instalando placas solares que alimentan nuestras oficinas y reducen el consumo de energía convencional.",
    },
    {
      id: "02",
      categoria: "Elección responsable",
      titulo: "Materiales ecológicos",
      descripcion:
        "Seleccionamos materiales sostenibles y respetuosos con el medio ambiente, minimizando el impacto desde la fase de diseño hasta la ejecución.",
    },
    {
      id: "03",
      categoria: "Movilidad consciente",
      titulo: "Desplazamientos verdes",
      descripcion:
        "Comprometidos con la movilidad responsable, optimizamos y reducimos la huella de carbono en todos nuestros traslados por las islas.",
    },
  ];

  return (
    <section ref={sectionRef} className="experiencia-section">
      <div className="experiencia-section__container">
        <div className="experiencia-section__header">
          <h2 className="experiencia-section__title fade_bottom">
            <span className="word">FUTURO</span>{" "}
            <span className="word">CONSCIENTE</span>
          </h2>
          <div className="experiencia-section__subtitle">
            Apostamos por un futuro consciente, integrando prácticas sostenibles
            que protegen el medio ambiente y promueven un desarrollo
            equilibrado. Cada decisión que tomamos busca reducir nuestro impacto
            y contribuir a un entorno más saludable y resiliente.
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
