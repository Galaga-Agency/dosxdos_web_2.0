"use client";

import React from "react";
import "./PortfolioCTA.scss";
import Link from "next/link";

const PortfolioCTA: React.FC = () => {
  return (
    <section className="portfolio-cta">
      <div className="portfolio-cta__container container">
        <h3 className="portfolio-cta__label label">
          (¿Trabajemos juntos?)</h3>
        <h2 className="portfolio-cta__title char-animation title">
          <Link href="/contacto">CONTÁCTANOS</Link>
        </h2>
      </div>
    </section>
  );
};

export default PortfolioCTA;