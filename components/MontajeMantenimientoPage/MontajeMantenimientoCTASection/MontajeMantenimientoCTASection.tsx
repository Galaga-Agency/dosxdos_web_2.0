"use client";

import React from "react";
import "./MontajeMantenimientoCTASection.scss";
import Link from "next/link";

const MontajeMantenimientoCTASection: React.FC = () => {
  return (
    <section className="montaje-mantenimiento-cta">
      <div className="montaje-mantenimiento-cta__container container">
        <h3 className="montaje-mantenimiento-cta__label label">(¿Hablamos?)</h3>
        <h2 className="montaje-mantenimiento-cta__title char-animation title">
          <a href="/contacto">Contáctanos</a>
        </h2>
      </div>
    </section>
  );
};

export default MontajeMantenimientoCTASection;
