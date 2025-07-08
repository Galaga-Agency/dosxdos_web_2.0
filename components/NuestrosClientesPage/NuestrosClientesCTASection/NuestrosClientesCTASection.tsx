"use client";

import React from "react";
import "./NuestrosClientesCTASection.scss";
import Link from "next/link";

const NuestrosClientesCTASection: React.FC = () => {
  return (
    <section className="nuestros-clientes-cta">
      <div className="nuestros-clientes-cta__container container">
        <h3 className="nuestros-clientes-cta__label label">(¿Hablamos?)</h3>
        <h2 className="nuestros-clientes-cta__title char-animation secondary-title">
          <Link href="/contacto">Contáctanos</Link>
        </h2>
      </div>
    </section>
  );
};

export default NuestrosClientesCTASection;
