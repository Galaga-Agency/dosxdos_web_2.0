"use client";

import React, { useRef } from "react";
import "./StatsSection.scss";

const StatsSection: React.FC = () => {
  const stats = [
    { number: "+38", label: "Años de experiencia" },
    { number: "87%", label: "Satisfacción de los clientes" },
    { number: "+1.2K", label: "Instalaciones fijas montadas" },
    { number: "+35K", label: "Escaparates instalados" },
    { number: "180", label: "Espacios comerciales" },
    { number: "3.5K", label: "Diseño de espacios" },
  ];

  return (
    <section className="stats-section">
      <div className="stats-section__container">
        <h2 className="stats-section__title">
          <span className="stats-section__title-icon">✕</span> Dos x Dos en
          Números
        </h2>

        <div className="stats-section__grid">
          {stats.map((stat, index) => (
            <div key={index} className="stats-section__item">
              <div className="stats-section__number-container">
                <div className="stats-section__number" data-value={stat.number}>
                  {stat.number}
                </div>
              </div>
              <div className="stats-section__separator"></div>
              <div className="stats-section__label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
