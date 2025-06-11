"use client";

import React from "react";
import "./EventosPhilosophySection.scss";

const EventosPhilosophySection: React.FC = () => {
  return (
    <section className="eventos-philosophy">
      <div className="eventos-philosophy__container container">
        <div className="eventos-philosophy__header header">
          <h2 className="eventos-philosophy__title secondary-title">
            Fabricación, instalación, realidad virtual y{" "}
            <span className="highlight">sostenibilidad</span> al servicio de
            eventos que dejan huella
          </h2>
          <p className="eventos-philosophy__description text">
            Con más de 40 profesionales especializados, soluciones tecnológicas
            avanzadas y un compromiso real con la sostenibilidad, en Dos x Dos
            convertimos cualquier espacio en una experiencia memorable. Llegamos
            donde otros no llegan: con creatividad, precisión y fiabilidad.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EventosPhilosophySection;
