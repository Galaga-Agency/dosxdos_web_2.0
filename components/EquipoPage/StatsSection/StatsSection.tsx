"use client";

import React, { useEffect, useRef } from "react";
import { animateStatsSection } from "@/utils/animations/equipo-page-anim";
import "./StatsSection.scss";

const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      animateStatsSection({
        section: sectionRef.current,
        stats: statsRef.current,
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { number: 250, suffix: "+", label: "PROYECTOS COMPLETADOS" },
    { number: 37, suffix: "+", label: "AÑOS DE EXPERIENCIA" },
    { number: 45, suffix: "+", label: "PROFESIONALES" },
    { number: 94, suffix: "%", label: "SATISFACCIÓN DE CLIENTES" },
  ];

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="stats-section__container">
        <h2 className="stats-section__title">
          <span className="stats-section__title-icon">✕</span> Dos x Dos en
          Números
        </h2>

        <div className="stats-section__grid" ref={statsRef}>
          {stats.map((stat, index) => (
            <div key={index} className="stats-section__item">
              <div
                className="stats-section__number"
                data-value={stat.number}
                data-suffix={stat.suffix}
              >
                0{stat.suffix}
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