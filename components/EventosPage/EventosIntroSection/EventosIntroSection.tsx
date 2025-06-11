"use client";

import React from "react";
import Image from "next/image";
import "./EventosIntroSection.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";

const EventosIntroSection: React.FC = () => {
  const { isMobile } = useDeviceDetect();
  const repeatedText = Array.from({ length: 20 }).map((_, i) => (
    <span key={i}>
      experiencias a medidas&nbsp;<span className="dot">•</span>&nbsp;
    </span>
  ));

  return (
    <>
      <section className="eventos-intro-section">
        <div className="eventos-intro-section__container container">
          <div className="eventos-intro-section__header header">
            <h2 className="eventos-intro-section__title secondary-title">
              Creamos <span className="highlight">eventos que funcionan</span>{" "}
              de principio a fin.
            </h2>
          </div>
          <div className="eventos-intro-section__content">
            <div className="eventos-intro-section__visual-column">
              <div className="eventos-intro-section__text-block ">
                <p className="eventos-intro-section__text text">
                  Diseñamos, producimos y montamos experiencias únicas,
                  tecnológicas y sostenibles, con medios propios y en cualquier
                  isla. Ya sea un stand, una instalación corporativa o una
                  experiencia inmersiva, nos encargamos de todo para que el
                  resultado esté a la altura: sin dependencias externas, sin
                  retrasos, sin improvisaciones.
                </p>
              </div>
              <div
                className="eventos-intro-section__animated-image"
                data-speed={isMobile ? "0" : "1.15"}
              >
                <Image
                  src="/assets/img/homepage/foto-landing.avif"
                  alt="Eventos y experiencias corporativas"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  data-speed="0.95"
                />
              </div>
            </div>
            <div className="eventos-intro-section__content-column">
              <div className="eventos-intro-section__text-blocks">
                <div className="eventos-intro-section__text-block">
                  <p className="eventos-intro-section__text text">
                    Contamos con un equipo multidisciplinar, tecnología puntera
                    y una red logística que cubre todas las islas. <br /> <br />
                    Fabricamos mobiliario y elementos decorativos a medida en
                    nuestras propias instalaciones, imprimimos con materiales
                    sostenibles y ofrecemos soluciones de alquiler para
                    optimizar cada montaje. Todo esto nos permite adaptarnos con
                    rapidez a cada proyecto, manteniendo el control total sobre
                    la calidad, el diseño y los plazos. <br /> <br />
                    Porque un evento no se repite. Y para nosotros, tampoco se
                    improvisa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="marquee-container">
        <div className="marquee-track">
          <div className="marquee-text">{repeatedText}</div>
        </div>
      </div>
    </>
  );
};

export default EventosIntroSection;
