"use client";

import React from "react";

import "./ConsultoriaCTASection.scss";
import TransitionLink from "@/components/TransitionLink";

const ConsultoriaCTASection: React.FC = () => {
  return (
    <section className="consultoria-cta">
      <div className="consultoria-cta__container container">
        <h3 className="consultoria-cta__label label">(¿Hablamos?)</h3>
        <h2 className="consultoria-cta__title char-animation title">
          <TransitionLink href="/contacto">
            ¿En qué podemos ayudarte?
          </TransitionLink>
        </h2>
      </div>
    </section>
  );
};

export default ConsultoriaCTASection;
