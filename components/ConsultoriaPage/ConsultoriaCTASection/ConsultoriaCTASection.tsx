"use client";

import React from "react";

import "./ConsultoriaCTASection.scss";
import Link from "next/link";

const ConsultoriaCTASection: React.FC = () => {
  return (
    <section className="consultoria-cta">
      <div className="consultoria-cta__container container">
        <h3 className="consultoria-cta__label label">(¿Hablamos?)</h3>
        <h2 className="consultoria-cta__title char-animation secondary-title">
          <Link href="/contacto">¿En qué podemos ayudarte?</Link>
        </h2>
      </div>
    </section>
  );
};

export default ConsultoriaCTASection;
