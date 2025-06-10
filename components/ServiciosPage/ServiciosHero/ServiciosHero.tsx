"use client";

import React from "react";
import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";
import "./ServiciosHero.scss";

const ServiciosHero: React.FC = () => {
  return (
    <section className="servicios-hero">
      <div className="servicios-hero__container container">
        <h1 className="servicios-hero__title">
          <span className="experience">Experiencia </span>
          <span className="plus">+</span>
          <span className="creatividad"> Compromiso</span>
        </h1>

        <p className="servicios-hero__subtitle subtitle">
          Espacios que hablan, proyectos que conectan. <br />
          Ofrecemos un servicio completo: diseño, producción, logística y
          ejecución.
        </p>

        <SecondaryButton href="/portfolio" lightBg={true}>
          Ver proyectos →
        </SecondaryButton>
      </div>
    </section>
  );
};

export default ServiciosHero;
