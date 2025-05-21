"use client";

import React from "react";
import "./PortfolioHeader.scss";

const PortfolioHeader: React.FC = () => {
  return (
    <div className="portfolio-header">
      <div className="portfolio-header__content">
        <p className="portfolio-header__label">dosxdos</p>
        <h1 className="portfolio-header__title char-animation">Portfolio</h1>
        <p className="portfolio-header__description rollup-text">
          Somos un equipo creativo que diseña espacios de marca únicos y
          experiencias visuales memorables para nuestros clientes.
        </p>
      </div>
    </div>
  );
};

export default PortfolioHeader;
