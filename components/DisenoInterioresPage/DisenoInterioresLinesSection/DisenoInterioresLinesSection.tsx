"use client";

import React from "react";
import Image from "next/image";
import "./DisenoInterioresLinesSection.scss";

const interiorismoLines = [
  {
    id: 1,
    title: "Interiorismo comercial",
    description:
      "Diseñamos espacios que invitan, orientan y venden. Optimizamos la experiencia del cliente, mejoramos la funcionalidad y reflejamos la identidad de marca en cada rincón.",
    image: "/assets/img/homepage/slider-3.avif",
  },
  {
    id: 2,
    title: "Perfumería",
    description:
      "Más de 38 años diseñando perfumerías nos avalan. Creamos espacios sensoriales, cuidados y eficaces, adaptando cada propuesta al concepto de marca, a los materiales y a la funcionalidad específica de este tipo de negocio. Algunos de nuestros proyectos han sido reconocidos con premios de interiorismo.",
    image: "/assets/img/homepage/slider-1.avif",
  },
  {
    id: 3,
    title: "Residenciales",
    description:
      "Creamos hogares con carácter y coherencia. Desde una reforma puntual hasta un rediseño integral, cada proyecto se adapta a los gustos, estilo de vida y necesidades de quienes lo habitan. Buscamos equilibrio entre estética, funcionalidad y sostenibilidad.",
    image: "/assets/img/homepage/slider-2.avif",
  },
];

const DisenoInterioresLinesSection: React.FC = () => {
  return (
    <section className="collaborations-section">
      <div className="collaborations-section__header header container">
        <h2 className="collaborations-section__title secondary-title ">
          Tres líneas de interiorismo, <br />
          <span className="highlight">una misma dedicación.</span>
        </h2>
      </div>

      <div className="project-panel-area">
        {interiorismoLines.map((line) => (
          <div key={line.id} className="project-panel">
            <div className="project-panel__split-container">
              <div className="project-panel__image-side">
                <Image
                  src={line.image}
                  alt={line.title}
                  fill
                  className="project-panel__image-file"
                  priority={line.id === 1}
                />
              </div>

              <div className="project-panel__content-side">
                <div className="project-panel__content">
                  <div className="project-panel__index">
                    {String(line.id).padStart(2, "0")}
                  </div>
                  <h3 className="project-panel__title small-title">{line.title}</h3>
                  <p className="project-panel__description text">
                    {line.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DisenoInterioresLinesSection;
