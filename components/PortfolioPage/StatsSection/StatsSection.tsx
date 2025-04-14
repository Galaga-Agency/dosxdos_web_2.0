"use client";

import React, { useEffect, useRef } from "react";
import { initAllAnimations } from "@/utils/animations/stats-anim";
import "./StatsSection.scss";

const StatsSection: React.FC<{ isActive?: boolean }> = ({ isActive = false }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (isActive && !hasAnimatedRef.current) {
      console.log("🔥 activeSection is 1 — running stat animations");
      initAllAnimations();
      hasAnimatedRef.current = true;
    }
  }, [isActive]);

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Nuestro impacto en números</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            Llevamos casi cuatro décadas creando proyectos destacados con clientes de todo el mundo
          </p>
        </div>

        <div className="company-stats">
          <div className="stat-item">
            <span className="stat-number">21</span>
            <span className="stat-label">Proyectos</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">37</span>
            <span className="stat-label">Años en negocio</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">86</span>
            <span className="stat-label">Premios</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">2</span>
            <span className="stat-label">Oficinas</span>
          </div>
        </div>

        <div className="values-header">
          <h3>Nuestros valores fundamentales</h3>
        </div>

        <div className="company-values">
          {/* Row Layout Version */}
          <div className="value-item">
            <div className="value-header">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                  <line x1="16" y1="8" x2="2" y2="22"></line>
                  <line x1="17.5" y1="15" x2="9" y2="15"></line>
                </svg>
              </div>
              <h3 className="value-title">El concepto correcto para el cliente correcto</h3>
            </div>
            <p>Proyectos únicos y reconocibles tienen un concepto sólido que los sustenta. Nuestros diseños nacen de necesidades reales.</p>
          </div>

          <div className="value-item">
            <div className="value-header">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <h3 className="value-title">La belleza atrae personas</h3>
            </div>
            <p>El diseño y la estética son fundamentales para captar la atención del público y crear experiencias memorables que perduran.</p>
          </div>

          <div className="value-item">
            <div className="value-header">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              </div>
              <h3 className="value-title">Enfoque en el significado</h3>
            </div>
            <p>Cada elemento tiene un propósito y cuenta una historia dentro del proyecto. Nada es arbitrario, todo comunica un mensaje coherente.</p>
          </div>

          {/* 
          // Absolute Positioned Version - Uncomment to use this instead
          <div className="value-item">
            <div className="value-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                <line x1="16" y1="8" x2="2" y2="22"></line>
                <line x1="17.5" y1="15" x2="9" y2="15"></line>
              </svg>
            </div>
            <h3 className="value-title">El concepto correcto para el cliente correcto</h3>
            <p>Proyectos únicos y reconocibles tienen un concepto sólido que los sustenta. Nuestros diseños nacen de necesidades reales.</p>
          </div>

          <div className="value-item">
            <div className="value-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
            <h3 className="value-title">La belleza atrae personas</h3>
            <p>El diseño y la estética son fundamentales para captar la atención del público y crear experiencias memorables que perduran.</p>
          </div>

          <div className="value-item">
            <div className="value-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            </div>
            <h3 className="value-title">Enfoque en el significado</h3>
            <p>Cada elemento tiene un propósito y cuenta una historia dentro del proyecto. Nada es arbitrario, todo comunica un mensaje coherente.</p>
          </div>
          */}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;