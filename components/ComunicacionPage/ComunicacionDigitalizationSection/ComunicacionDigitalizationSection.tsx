"use client";

import React, { useState } from "react";
import Image from "next/image";
import "./ComunicacionDigitalizationSection.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";

const ComunicacionDigitalizationSection: React.FC = () => {
  const { isMobile } = useDeviceDetect();
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const handleAccordionClick = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const galagaServices = [
    {
      title: "Digitalización que optimiza",
      description: "Automatizamos procesos internos e integramos herramientas como CRM, ERP o WhatsApp Business para mejorar la gestión diaria y ahorrar tiempo."
    },
    {
      title: "Retail conectado",
      description: "Escaparates digitales, señalética interactiva y experiencias en tienda con tablets o tótems para crear puntos de contacto más dinámicos y útiles."
    },
    {
      title: "Experiencias inmersivas",
      description: "Activaciones con realidad aumentada, probadores virtuales o webs personalizadas que conectan con el cliente y refuerzan tu marca."
    },
    {
      title: "Gestión eficiente con IoT",
      description: "Soluciones como RFID, análisis de comportamiento o sistemas de autopago para ganar en control y eficiencia."
    },
    {
      title: "Subvenciones sin complicaciones",
      description: "Te acompañamos en todo el proceso de solicitud, justificación y gestión de ayudas públicas para digitalización."
    }
  ];

  return (
    <section className="comunicacion-digitalization-section">
      <div className="comunicacion-digitalization-section__container container">
        <div className="comunicacion-digitalization-section__header header">
          <span className="comunicacion-digitalization-section__label label">
            (Digitalización)
          </span>
          <h2 className="comunicacion-digitalization-section__title secondary-title">
            Herramientas digitales que te <span className="highlight">ayudan a crecer.</span>
          </h2>
        </div>
        <div className="comunicacion-digitalization-section__content">
          <div className="comunicacion-digitalization-section__content-column">
            <p className="comunicacion-digitalization-section__content-column-text text">
En Dos x Dos trabajamos la comunicación desde la raíz: entendiendo qué se quiere decir, a quién y para qué. Diseñamos identidades con coherencia y propósito, creamos marcas desde cero, impulsamos procesos de rebranding y desarrollamos piezas gráficas que no solo destacan, sino que funcionan.             </p>
          </div>
          <div className="comunicacion-digitalization-section__visual-column">
            <div
              className="comunicacion-digitalization-section__animated-logo"
              data-speed={isMobile ? "0" : "1.15"}
            >
              <Image
                src="/assets/img/servicios/comunicacion/digitalizacion-comunicacion.avif"
                alt="Digitalización"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                data-speed="0.95"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="comunicacion-digitalization-section__bottom-text-container container">
        <p className="comunicacion-digitalization-section__bottom-text-text text">
Junto a Galaga, nuestra empresa hermana especializada en desarrollo digital, damos forma a plataformas, aplicaciones y contenidos online que responden a necesidades reales. Del primer boceto a la última línea de código, unimos creatividad, criterio técnico y una mirada práctica.        </p>
      </div>

      <div className="comunicacion-digitalization-section__galaga-section container">
        <span className="comunicacion-digitalization-section__galaga-label label">
          (¿Qué puede hacer Galaga por ti?)
        </span>
        <h3 className="comunicacion-digitalization-section__galaga-subtitle small-title">
          Cada herramienta tiene un porqué. Y un para qué.
        </h3>
        
        <div className="comunicacion-digitalization-section__galaga-grid">
          <div className="comunicacion-digitalization-section__galaga-image">
            <Image
                src="/assets/img/servicios/comunicacion/digitalizacion-comunicacion.avif"
              alt="Galaga Agency"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              data-speed={isMobile ? "1" : "0.95"}
            />
          </div>
          
          <div className="comunicacion-digitalization-section__galaga-accordion">
            {galagaServices.map((service, index) => (
              <div
                key={index}
                className={`comunicacion-digitalization-section__service-item ${
                  openAccordion === index ? "is-open" : ""
                }`}
              >
                <button
                  className="comunicacion-digitalization-section__service-header"
                  onClick={() => handleAccordionClick(index)}
                  aria-expanded={openAccordion === index}
                >
                  <div className="comunicacion-digitalization-section__service-left">
                    <p className="comunicacion-digitalization-section__service-title">
                      {service.title}
                    </p>
                  </div>
                  <div className="comunicacion-digitalization-section__service-toggle">
                    <div className="plus-minus-icon">
                      <span className="horizontal-line"></span>
                      <span className="vertical-line"></span>
                    </div>
                  </div>
                </button>

                <div className="comunicacion-digitalization-section__service-content">
                  <div className="comunicacion-digitalization-section__service-body">
                    <p className="comunicacion-digitalization-section__service-description text">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComunicacionDigitalizationSection