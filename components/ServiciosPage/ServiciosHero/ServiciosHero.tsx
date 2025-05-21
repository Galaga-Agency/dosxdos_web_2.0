"use client";

import React from "react";
import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";
import "./ServiciosHero.scss";

const ServiciosHero: React.FC = () => {
  return (
    <section className="servicios-hero">
      <div className="servicios-hero__container">
        <h1 className="servicios-hero__title">
          <span className="experience">Experiencia </span>
          <span className="plus">+</span>
          <span className="creatividad"> Creatividad</span>
        </h1>

        <p className="servicios-hero__subtitle">
          Somos una agencia de diseño de interiores especializada en crear
          espacios comerciales de lujo para firmas de cosmética y perfumería que
          elevan su marca y potencian sus ventas.
        </p>

          <SecondaryButton href="/portfolio" lightBg={true}>
            Ver proyectos →
          </SecondaryButton>
      </div>
    </section>
  );
};

export default ServiciosHero;
