"use client";

import React, { useRef } from "react";
import LogoMarquee from "@/components/Homepage/LogoMarquee/LogoMarquee";
import "./ClientsSection.scss";
import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";

const ClientsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section className="clients-section" ref={sectionRef}>
      <div className="clients-section__container">
        <h2 className="clients-section__title fade_bottom">
          Nuestros clientes
        </h2>
      </div>

      <div className="clients-section__marquee-wrapper">
        <LogoMarquee showHeader={false} darkMode={true} />
      </div>

      <div className="clients-section__container">
        <div className="clients-section__content">
          <p className="clients-section__text">
            Trabajamos con algunas de las marcas más reconocidas del sector, que
            valoran la calidad, la atención al detalle y una manera de hacer que
            va más allá de lo visual.
          </p>

          <div className="clients-section__cta">
            <SecondaryButton
              href="/servicios"
              className="clients-section__cta-link"
            >
              Conóce nuestros servicios →
            </SecondaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
