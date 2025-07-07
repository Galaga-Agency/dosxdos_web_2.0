"use client";

import React, { useRef } from "react";
import Link from "next/link";
import HoverCard from "../../ui/HoverCard/HoverCard";
import "./MontajeMantenimientoDiferenciasSection.scss";
import HoverCircleButton from "@/components/ui/HoverCircleButton/HoverCircleButton";

const MontajeMantenimientoDiferenciasSection: React.FC = () => {
  const montajeServices = [
    {
      id: "mantenimiento-preventivo",
      name: "Mantenimiento preventivo y correctivo",
      description:
        "Actuaciones planificadas y respuestas rápidas para mantener tus espacios en perfecto estado.",
      imageUrl:
        "/assets/img/servicios/montaje-mantenimiento/actualizacion-de-imagen.avif",
      slug: "mantenimiento-preventivo",
    },
    {
      id: "sustitucion-reparacion",
      name: "Sustitución o reparación de piezas o mobiliario",
      description:
        "Intervenciones especializadas para renovar, reparar o sustituir elementos que requieren atención.",
      imageUrl:
        "/assets/img/servicios/montaje-mantenimiento/sustitucion-o-reparacion.avif",
      slug: "sustitucion-reparacion",
    },
    {
      id: "revision-tecnica",
      name: "Revisión técnica y estética periódica",
      description:
        "Inspecciones regulares que garantizan el funcionamiento óptimo y la imagen impecable de tus instalaciones.",
      imageUrl:
        "/assets/img/servicios/montaje-mantenimiento/revision-tecnica.avif",
      slug: "revision-tecnica",
    },
    {
      id: "actualizacion-campanas",
      name: "Actualización de campañas o elementos visuales",
      description:
        "Renovación y modernización de elementos gráficos y visuales para mantener la relevancia de tu marca.",
      imageUrl:
        "/assets/img/servicios/montaje-mantenimiento/actualizacion-de-imagen.webp",
      slug: "actualizacion-campanas",
    },
  ];

  const repeatedText = Array.from({ length: 20 }).map((_, i) => (
    <span key={i}>
      INSTALAMOS&nbsp;<span className="dot">•</span>&nbsp;CUIDAMOS&nbsp;
      <span className="dot">•</span>&nbsp;MANTENEMOS&nbsp;
      <span className="dot">•</span>&nbsp;
    </span>
  ));

  return (
    <section className="montaje-mantenimiento-diferencias">
      <div className="montaje-mantenimiento-diferencias__container container">
        <div className="montaje-mantenimiento-diferencias__header">
          <h3 className="montaje-mantenimiento-diferencias__label label">
            (Lo que nos diferencia)
          </h3>
        </div>

        <div className="montaje-mantenimiento-diferencias__grid">
          {montajeServices.map((service, index) => (
            <div
              key={service.id}
              className="montaje-mantenimiento-diferencias__card-wrapper"
              style={{ zIndex: 10 }}
            >
              <HoverCard
                id={service.id}
                title={service.name}
                // description={service.description}
                imageUrl={service.imageUrl}
                showLink={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MontajeMantenimientoDiferenciasSection;
