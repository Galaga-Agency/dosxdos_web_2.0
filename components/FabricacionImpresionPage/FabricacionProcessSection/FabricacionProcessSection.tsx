"use client";

import React, { useEffect, useRef } from "react";
import "./FabricacionProcessSection.scss";

const FabricacionProcessSection: React.FC = () => {
  const procesos = [
    {
      id: "01",
      categoria: "Diseño técnico",
      titulo: "Planificación detallada",
      descripcion:
        "Desarrollamos planos técnicos precisos y especificaciones detalladas que garantizan la viabilidad y calidad de cada proyecto de fabricación.",
    },
    {
      id: "02",
      categoria: "Producción especializada",
      titulo: "Fabricación a medida",
      descripcion:
        "Utilizamos tecnología avanzada y materiales de primera calidad para fabricar elementos únicos que se adaptan perfectamente a cada necesidad.",
    },
    {
      id: "03",
      categoria: "Control de calidad",
      titulo: "Acabados perfectos",
      descripcion:
        "Cada pieza pasa por rigurosos controles de calidad para asegurar acabados impecables y durabilidad en el tiempo.",
    },
  ];

  return (
    <section className="fabricacion-process-section">
      <div className="fabricacion-process-section__container container">
        <div className="fabricacion-process-section__header header">
          <h1 className="fabricacion-process-section__title secondary-title fade_bottom">
            PROCESO <span className="highlight">INTEGRAL</span>
          </h1>
          <div className="fabricacion-process-section__subtitle text">
            Nuestro proceso de fabricación integral combina diseño técnico,
            tecnología avanzada y control de calidad riguroso. Desde la
            planificación inicial hasta los acabados finales, cada etapa está
            optimizada para garantizar resultados excepcionales.
          </div>
        </div>

        <div className="fabricacion-process-section__content">
          {procesos.map((proceso) => (
            <div key={proceso.id} className="fabricacion-process-section__item">
              <div className="fabricacion-process-section__item-header">
                <span className="fabricacion-process-section__item-number">
                  {proceso.id}
                </span>
                <span className="fabricacion-process-section__item-category">
                  {proceso.categoria}
                </span>
              </div>
              <h3 className="fabricacion-process-section__item-title">
                {proceso.titulo}
              </h3>
              <p className="fabricacion-process-section__item-description">
                {proceso.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FabricacionProcessSection;
