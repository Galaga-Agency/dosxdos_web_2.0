"use client";

import React, { useEffect, useRef } from "react";
import "./FabricacionProcessSection.scss";

const FabricacionProcessSection: React.FC = () => {
  const servicios = [
    {
      titulo: "Impresión de gran formato",
      descripcion:
        "Vinilos monoméricos y poliméricos, microperforados, backlite, textiles, y soportes rígidos con impresión directa.",
    },
    {
      titulo: "Acabados especiales",
      descripcion:
        "Impresión con tinta blanca, barniz selectivo, troquelado, laminados y texturas que aportan valor añadido a cada pieza.",
    },
    {
      titulo: "Producción de rótulos",
      descripcion:
        "Cuadros con marco de aluminio, cajas de luz, bandoleras, roll-ups, displays y expositores.",
    },
    {
      titulo: "Corte y grabado láser",
      descripcion:
        "Sobre múltiples materiales: madera, acrílico, vidrio, mármol, piel, cerámica, caucho y más. Precisión extrema y acabados visuales de gran calidad.",
    },
  ];

  return (
    <section className="fabricacion-process-section">
      <div className="fabricacion-process-section__container container">
        <div className="fabricacion-process-section__header header">
          <h3 className="label">(Impresión)</h3>
          <h1 className="fabricacion-process-section__title secondary-title ">
            El detalle que multiplica&nbsp;
            <span className="highlight">el impacto</span>
          </h1>
          <div className="fabricacion-process-section__subtitle text">
            La impresión es la capa que define el acabado, la durabilidad, la
            textura y el valor visual de cualquier pieza. En Dos x Dos
            trabajamos con tecnología avanzada de impresión y corte, ofreciendo
            soluciones de alta calidad sobre una amplia variedad de soportes,
            con criterios de sostenibilidad, durabilidad y precisión.
          </div>
        </div>

        <div className="fabricacion-process-section__content">
          <div className="fabricacion-process-section__category">
            ¿Qué hacemos?
          </div>

          {servicios.map((servicio, index) => (
            <div key={index} className="fabricacion-process-section__item">
              <h3 className="fabricacion-process-section__item-title">
                {servicio.titulo}
              </h3>
              <p className="fabricacion-process-section__item-description">
                {servicio.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FabricacionProcessSection;
