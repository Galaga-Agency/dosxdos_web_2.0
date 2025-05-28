"use client";

import React, { useState } from "react";
import Image from "next/image";
import "./DisenoInterioresMethodologySection.scss";

const DisenoInterioresMethodologySection = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const methodologySteps = [
    {
      title: "Reunión inicial",
      description: "Entendemos necesidades, ideas y objetivos.",
    },
    {
      title: "Visita al espacio",
      description: "Análisis in situ y toma de medidas.",
    },
    {
      title: "Diseño del proyecto + renderizado 3D",
      description: "Traducimos la propuesta en imágenes realistas.",
    },
    {
      title: "Presentación y validación",
      description: "Afinamos el diseño con el cliente.",
    },
    {
      title: "Fabricación e instalación",
      description: "Llevamos el proyecto a la realidad, cuidando cada detalle.",
    },
  ];

  const handleAccordionClick = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <section className="diseno-interiores-methodology-section">
      <div className="container">
        <div className="diseno-interiores-methodology-section__header">
          <span className="diseno-interiores-methodology-section__label label">
            (Lo que hacemos)
          </span>
          <h2 className="diseno-interiores-methodology-section__title secondary-title">
            De la idea al espacio: un proceso pensado <span className="highlight">para transformar.</span>
          </h2>
        </div>

        <div className="diseno-interiores-methodology-section__grid">
          <div className="diseno-interiores-methodology-section__image" data-speed="1.15">
            <Image
              src="/assets/img/servicios/consultoria/consultoria-1.webp"
              alt="Proceso de diseño de interiores"
              width={500}
              height={500}
            />
          </div>

          <div className="diseno-interiores-methodology-section__content">
            <div className="diseno-interiores-methodology-section__accordion">
              {methodologySteps.map((step, index) => (
                <div
                  key={index}
                  className={`diseno-interiores-methodology-section__accordion-item ${
                    openAccordion === index ? "is-open" : ""
                  }`}
                >
                  <button
                    className="diseno-interiores-methodology-section__accordion-header"
                    onClick={() => handleAccordionClick(index)}
                    aria-expanded={openAccordion === index}
                  >
                    <div className="diseno-interiores-methodology-section__accordion-left">
                      <h3 className="diseno-interiores-methodology-section__step-title">
                        {step.title}
                      </h3>
                    </div>
                    <div className="diseno-interiores-methodology-section__accordion-toggle">
                      <div className="plus-minus-icon">
                        <span className="horizontal-line"></span>
                        <span className="vertical-line"></span>
                      </div>
                    </div>
                  </button>

                  <div className="diseno-interiores-methodology-section__accordion-content">
                    <div className="diseno-interiores-methodology-section__accordion-body">
                      <p className="diseno-interiores-methodology-section__step-description">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisenoInterioresMethodologySection;
