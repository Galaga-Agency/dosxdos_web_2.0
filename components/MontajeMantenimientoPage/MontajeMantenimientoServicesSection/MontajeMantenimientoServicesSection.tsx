"use client";

import React from "react";
import "./MontajeMantenimientoServicesSection.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import Image from "next/image";

const MontajeMantenimientoServicesSection: React.FC = () => {
  const { isMobile } = useDeviceDetect();

  return (
    <section className="montaje-mantenimiento-services">
      <div className="montaje-mantenimiento-services__container container">
        <div className="montaje-mantenimiento-services__header header">
          <div className="montaje-mantenimiento-services__label label ">
            (Mantenimiento. Continuidad asegurada)
          </div>
          <h2 className="montaje-mantenimiento-services__title secondary-title">
            El cuidado continuo que garantiza una{" "}
            <span className="highlight">imagen impecable</span>.
          </h2>
        </div>

        <div className="montaje-mantenimiento-services__content">
          <div className="montaje-mantenimiento-services__visual-column">
            <div
              className="montaje-mantenimiento-services__animated-logo"
              data-speed={isMobile ? "0" : "1.15"}
            >
              <Image
                src="/assets/img/servicios/montaje-mantenimiento/horizontal-montaje-1.webp"
                alt="Diseño de interiores"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                data-speed="0.95"
              />
            </div>
          </div>
          <div className="montaje-mantenimiento-services__description">
            <p className="montaje-mantenimiento-services__text text">
              Los espacios bien diseñados también necesitan atención con el
              tiempo. Por eso ofrecemos un servicio de mantenimiento pensado
              para prolongar la vida útil de cada instalación y asegurar que
              todo siga funcionando como el primer día: estética, funcionalidad
              y técnica incluidas. Actuamos con revisiones periódicas,
              intervenciones correctivas o puntuales, y también con
              actualizaciones de campañas o piezas que requieren renovación.
            </p>
            <p className="montaje-mantenimiento-services__text text">
              Cuidamos lo que ya has construido. Apostamos por un mantenimiento
              inteligente, que previene fallos, evita costes innecesarios y
              mantiene la coherencia de marca en el tiempo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MontajeMantenimientoServicesSection;
