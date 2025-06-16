"use client";

import React, { useRef } from "react";
import "./NuestroEspacioHeaderSection.scss";

const NuestroEspacioHeaderSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="nuestro-espacio-header-section">
      <div className="nuestro-espacio-header-section__container container">
        <div className="nuestro-espacio-header-section__header header">
          <h1 className="nuestro-espacio-header-section__title title char-animation">
            Donde las ideas <span className="highlight">toman forma</span>
          </h1>
        </div>

        <p className="nuestro-espacio-header-section__subtitle text rollup-text">
          Cada planta, cada equipo, cada rincón es una forma propia de hacer las
          cosas.
        </p>
      </div>
    </section>
  );
};

export default NuestroEspacioHeaderSection;
