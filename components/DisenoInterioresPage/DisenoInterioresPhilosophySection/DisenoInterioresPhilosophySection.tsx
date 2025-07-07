"use client";

import React from "react";
import "./DisenoInterioresPhilosophySection.scss";
import HoverCircleButton from "@/components/ui/HoverCircleButton/HoverCircleButton";

const DisenoInterioresPhilosophySection: React.FC = () => {
  return (
    <section className="diseno-interiores-process">
      <div className="diseno-interiores-process__container container">
        <div className="diseno-interiores-process__header header">
          <h2 className="diseno-interiores-process__title secondary-title ">
            Diseñar es <span className="highlight">construir relaciones</span>{" "}
            entre personas y espacios
          </h2>
          <p className="diseno-interiores-process__description text">
            Nuestro equipo no solo diseña espacios: diseñamos experiencias.
            Nuestra mirada estratégica une técnica, creatividad y sensibilidad,
            apostando por soluciones realistas, responsables y duraderas.
            Trabajamos desde la confianza, la escucha activa y el compromiso con
            la excelencia.
          </p>
        </div>
        <div className="diseno-interiores-process__cta">
          <HoverCircleButton href="/contacto" label="¿Hablamos?" />
        </div>
      </div>
    </section>
  );
};

export default DisenoInterioresPhilosophySection;
