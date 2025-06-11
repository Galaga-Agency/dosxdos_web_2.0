"use client";

import React from "react";
import "./EventosCTASection.scss";
import Link from "next/link";

const EventosCTASection: React.FC = () => {
  return (
    <section className="eventos-cta">
      <div className="eventos-cta__container container">
        <h3 className="eventos-cta__label label">(¿Trabajemos juntos?)</h3>
        <h2 className="eventos-cta__title char-animation secondary-title">
          <Link href="/contacto">Contáctanos</Link>
        </h2>
      </div>
    </section>
  );
};

export default EventosCTASection;
