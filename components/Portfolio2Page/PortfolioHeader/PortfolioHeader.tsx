"use client";

import React from "react";
import "./PortfolioHeader.scss";

const PortfolioHeader: React.FC = () => {
  return (
    <div className="portfolio-header container">
      <div className="portfolio-header__content">
        <p className="portfolio-header__label">(Nuestro Portfolio)</p>
        <h1 className="portfolio-header__title title char-animation">
          Cada proyecto cuenta <span className="highlight">una historia</span>. Aquí te mostramos algunas.
        </h1>
        <p className="portfolio-header__description text rollup-text">
          Porque no creemos en las soluciones en serie, sino en los resultados a
          medida. Cada imagen, cada montaje, cada espacio… muestra nuestra forma
          de trabajar. Y si algo tenemos claro, es que lo mejor aún está por
          venir. Descúbrelo tú mismo.
        </p>
      </div>
    </div>
  );
};

export default PortfolioHeader;
