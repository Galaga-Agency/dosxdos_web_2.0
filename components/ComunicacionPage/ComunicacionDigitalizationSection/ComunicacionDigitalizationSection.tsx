"use client";

import React, { useRef, useState } from "react";
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
      title: "Digitalización que optimiza:",
      description:
        "Automatizamos procesos internos e integramos herramientas como CRM, ERP o WhatsApp Business para mejorar la gestión diaria y ahorrar tiempo.",
    },
    {
      title: "Retail conectado:",
      description:
        "Escaparates digitales, señalética interactiva y experiencias en tienda con tablets o tótems para crear puntos de contacto más dinámicos y útiles.",
    },
    {
      title: "Experiencias inmersivas:",
      description:
        "Activaciones con realidad aumentada, probadores virtuales o webs personalizadas que conectan con el cliente y refuerzan tu marca.",
    },
    {
      title: "Gestión eficiente con IoT:",
      description:
        "Soluciones como RFID, análisis de comportamiento o sistemas de autopago para ganar en control y eficiencia.",
    },
    {
      title: "Subvenciones sin complicaciones:",
      description:
        "Te acompañamos en todo el proceso de solicitud, justificación y gestión de ayudas públicas para digitalización.",
    },
  ];

  return (
    <section className="comunicacion-digitalization-section">
      <div className="comunicacion-digitalization-section__container container">
        <div className="comunicacion-digitalization-section__header header">
          <span className="comunicacion-digitalization-section__label label">
            (Digitalización)
          </span>
          <h2 className="comunicacion-digitalization-section__title secondary-title">
            Herramientas digitales que te ayudan a crecer
          </h2>
        </div>
        <div className="comunicacion-digitalization-section__content">
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
          <div className="comunicacion-digitalization-section__content-column container">
            <p className="comunicacion-digitalization-section__text text">
              La digitalización es un medio para que las marcas puedan operar
              con más agilidad, conectar con sus públicos y responder mejor a lo
              que el entorno exige. Desde Dos x Dos ofrecemos soluciones
              digitales a medida: desarrollo web, aplicaciones internas,
              plataformas de gestión y sistemas de contenidos que se integran
              con la identidad y los objetivos de cada empresa. Todo pensado
              para facilitar procesos, mejorar la presencia digital y acompañar
              el crecimiento.
            </p>
          </div>
        </div>
      </div>

      <div className="comunicacion-digitalization-section__bottom-text container">
        <p className="comunicacion-digitalization-section__text text">
          Además, contamos con la integración de <strong>Galaga Agency</strong>,
          nuestra empresa hermana especializada en digitalización y marketing
          experiencial. Esta colaboración nos permite ir un paso más allá: unir
          diseño, estrategia y tecnología para ofrecer experiencias digitales
          sólidas, funcionales y coherentes con la marca.
        </p>
      </div>

      <div className="comunicacion-digitalization-section__galaga-section container">
        <div className="comunicacion-digitalization-section__galaga-content">
          <div className="comunicacion-digitalization-section__galaga-left">
            <div className="comunicacion-digitalization-section__galaga-image">
              <Image
                src="/assets/img/servicios/comunicacion/galaga-image.avif"
                alt="Galaga Agency"
                width={400}
                height={300}
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          </div>
          <div className="comunicacion-digitalization-section__galaga-right">
            <div className="comunicacion-digitalization-section__galaga-text">
              <span className="comunicacion-digitalization-section__galaga-label">
                (¿Qué puede hacer Galaga por ti?)
              </span>
              <h3 className="comunicacion-digitalization-section__galaga-subtitle">
                Cada herramienta tiene un porqué. Y un para qué.
              </h3>
              <div className="comunicacion-digitalization-section__galaga-services">
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
        </div>
      </div>
    </section>
  );
};

export default ComunicacionDigitalizationSection;
