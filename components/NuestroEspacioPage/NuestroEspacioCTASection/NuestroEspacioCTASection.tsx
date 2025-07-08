"use client";

import React, { useRef } from "react";
import "./NuestroEspacioCTASection.scss";
import Link from "next/link";
import TextMarquee from "@/components/TextMarquee/TextMarquee";

const NuestroEspacioCTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section className="nuestro-espacio-cta-section" ref={sectionRef}>
      <div className="nuestro-espacio-cta-section__container">
        <div className="nuestro-espacio-cta-section__cta-container container">
          <h3 className="nuestro-espacio-cta-section__label label">
            (¿Hablamos?)
          </h3>
          <h2 className="nuestro-espacio-cta-section__title char-animation secondary-title">
            <Link href="/contacto">Contáctanos</Link>
          </h2>
        </div>
        <TextMarquee
          text="Nuestro punto de partida"
          speed={50}
          className="projects-marquee"
        />
      </div>
    </section>
  );
};

export default NuestroEspacioCTASection;
