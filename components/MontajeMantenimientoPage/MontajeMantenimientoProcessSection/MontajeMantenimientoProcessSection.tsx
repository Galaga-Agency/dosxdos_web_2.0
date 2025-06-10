"use client";

import React from "react";
import "./MontajeMantenimientoProcessSection.scss";

const MontajeMantenimientoProcessSection: React.FC = () => {
  const services = [
    {
      title: "Campañas promocionales, visuales y escaparates.",
    },
    {
      title: "Mobiliario y espacios comerciales llave en mano.",
    },
    {
      title: "Stands y espacios efímeros para ferias y congresos.",
    },
    {
      title: "Instalaciones técnicas con acabados premium.",
    },
  ];

  const repeatedText = Array.from({ length: 20 }).map((_, i) => (
    <span key={i}>
      del montaje al mantenimiento&nbsp;<span className="dot">•</span>&nbsp;
    </span>
  ));

  return (
    <section className="montaje-mantenimiento-process">
      <div className="montaje-mantenimiento-process__container container">
        <h3 className="montaje-mantenimiento-process__label label ">
          (Montaje. Especialistas en servicio llave en mano.)
        </h3>
        <h2 className="montaje-mantenimiento-process__title secondary-title">
          Convertimos los proyectos en espacios reales, <br />
          listos <span className="highlight">para impactar.</span>
        </h2>

        <div className="montaje-mantenimiento-process__content">
          <p className="montaje-mantenimiento-process__text text">
            Nuestro equipo de montaje trabaja con planificación, criterio
            técnico y respeto por los entornos en los que interviene. Instalamos
            campañas, mobiliario, estructuras y espacios efímeros, con garantía
            de precisión, acabados cuidados y cumplimiento riguroso de los
            plazos. Ofrecemos un servicio llave en mano, adaptado a cada
            cliente: tanto si el diseño es propio como si llega ya definido, nos
            encargamos de ejecutar e instalar con fidelidad y eficacia.
          </p>

          <div className="montaje-mantenimiento-process__services">
            <h3 className="montaje-mantenimiento-process__label label ">
              (¿De qué nos encargamos?)
            </h3>
            {services.map((service, index) => (
              <div
                key={index}
                className="montaje-mantenimiento-process__service"
              >
                <h4 className="montaje-mantenimiento-process__service-icon">
                  &#10095;
                </h4>
                <h4 className="montaje-mantenimiento-process__service-title small-title">
                  {service.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="marquee-section">
        <div className="marquee-container">
          <div className="marquee-track">
            <div className="marquee-text">{repeatedText}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MontajeMantenimientoProcessSection;
