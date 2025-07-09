"use client";

import React from "react";
import "./NuestrosClientesHeroSection.scss";

const NuestrosClientesHeroSection = () => {

  return (
    <section className="nuestros-clientes-hero-section">
      <div className="nuestros-clientes-hero-section__container container">
        <div className="nuestros-clientes-hero-section__header header">
          <h1
            className="nuestros-clientes-hero-section__title title char-animation"
          >
            Marcas que <span className="highlight">confían en nosotros.</span>
          </h1>
        </div>
        <p
          className="nuestros-clientes-hero-section__subtitle text rollup-text"
        >
          Más de 38 años creando experiencias únicas para las mejores marcas del
          sector cosmético y perfumería.
        </p>
      </div>
    </section>
  );
};

export default NuestrosClientesHeroSection;
