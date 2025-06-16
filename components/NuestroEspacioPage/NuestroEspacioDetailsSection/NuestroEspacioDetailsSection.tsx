"use client";

import React, { useRef } from "react";
import "./NuestroEspacioDetailsSection.scss";

const NuestroEspacioDetailsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="nuestro-espacio-details-section">
      <div className="nuestro-espacio-details-section__container container">
        <div className="nuestro-espacio-details-section__content">
          <h2 className="nuestro-espacio-details-section__title secondary-title">
            Nuestra sede en Gran Canaria. <br />
            Nuestros servicios <span className="highlight">donde nos necesites.</span>
          </h2>
          <p className="nuestro-espacio-details-section__text text">
            Nuestra sede principal está en Telde, Gran Canaria, en la Calle Arado, nº 2. 
            Ahí es donde se cruzan la creatividad, la producción, el diseño y la logística. 
            Todo lo que ves hecho realidad empieza aquí. También nos encontrarás en Madrid, 
            pero es en este espacio —dividido por plantas, pero conectado por ideas— donde 
            late el ritmo de Dos x Dos.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NuestroEspacioDetailsSection;