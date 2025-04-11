import React from "react";
import "./StatsSection.scss";

const StatsSection: React.FC = () => {
  return (
    <section className="portfolio-section overview-section">
      <div className="section-container">
        <div className="company-stats">
          <div className="stat-item">
            <span className="stat-number">+21</span>
            <span className="stat-label">Proyectos</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">+17</span>
            <span className="stat-label">Años en negocio</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">+86</span>
            <span className="stat-label">Premios</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">+4</span>
            <span className="stat-label">Oficinas</span>
          </div>
        </div>

        <div className="company-values">
          <div className="value-item">
            <h3 className="value-title">
              El concepto correcto para el cliente correcto
            </h3>
            <p>
              Proyectos únicos y reconocibles tienen un concepto sólido que los
              sustenta.
            </p>
          </div>
          <div className="value-item">
            <h3 className="value-title">La belleza atrae personas</h3>
            <p>
              El diseño y la estética son fundamentales para captar la atención
              del público.
            </p>
          </div>
          <div className="value-item">
            <h3 className="value-title">Enfoque en el significado</h3>
            <p>
              Cada elemento tiene un propósito y cuenta una historia dentro del
              proyecto.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
