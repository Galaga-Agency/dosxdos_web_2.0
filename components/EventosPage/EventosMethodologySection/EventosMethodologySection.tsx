"use client";

import Image from "next/image";
import React, { useState } from "react";
import { BiAnalyse } from "react-icons/bi";
import { TbCalendarTime } from "react-icons/tb";
import { RiPlantLine } from "react-icons/ri";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { LuLaptopMinimalCheck } from "react-icons/lu";
import { MdOutlineVrpano } from "react-icons/md";
import useDeviceDetect from "@/hooks/useDeviceDetect";

import "./EventosMethodologySection.scss";

const EventosMethodologySection = () => {
  const { isMobile } = useDeviceDetect();
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const methodologySteps = [
    {
      title: "Simulación y realidad virtual",
      description:
        "Tecnología inmersiva con simuladores, gafas VR y dinámicas gamificadas para eventos interactivos.",
      icon: <MdOutlineVrpano />,
    },
    {
      title: "Eventos híbridos y digitales",
      description:
        "Formatos que combinan presencia física y conexión online: streaming, interacción remota y experiencias virtuales.",
      icon: <LuLaptopMinimalCheck />,
    },
    {
      title: "Mobiliario y decoración a medida",
      description:
        "Diseñamos y fabricamos piezas únicas que reflejan la identidad de cada marca.",
      icon: <BiAnalyse />,
    },
    {
      title: "Instalación profesional",
      description:
        "Montamos y desmontamos stands y espacios en cualquier isla, con total garantía y precisión.",
      icon: <HiMiniMagnifyingGlass />,
    },
    {
      title: "Alquiler de mobiliario y equipos",
      description:
        "Soluciones flexibles para eventos, con un amplio inventario de mobiliario y tecnología.",
      icon: <TbCalendarTime />,
    },
    {
      title: "Eventos sostenibles",
      description:
        "Materiales ecológicos, impresión responsable y prácticas que reducen la huella ambiental.",
      icon: <RiPlantLine />,
    },
  ];

  const handleAccordionClick = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <section className="eventos-methodology-section">
      <div className="container">
        <div className="eventos-methodology-section__header">
          <span className="eventos-methodology-section__label label">
            Lo que podemos hacer por ti
          </span>
          <h2 className="eventos-methodology-section__title secondary-title">
            Lo que imaginas, lo diseñamos. Y{" "}
            <span className="highlight">lo hacemos posible.</span>
          </h2>
        </div>

        <div className="eventos-methodology-section__grid">
          {/* Left side - Single Image */}
          <div className="eventos-methodology-section__image">
            <div
              className="eventos-methodology-section__main-image"
              data-speed={isMobile ? "0" : "0.95"}
            >
              <Image
                src="/assets/img/servicios/eventos/vertical-eventos.webp"
                alt="Metodología de eventos"
                width={500}
                height={500}
                data-speed={isMobile ? "0" : "1.05"}
              />
            </div>
            <div
              className="eventos-methodology-section__slogan-container"
              data-speed={isMobile ? "0" : "1.05"}
            >
              <Image
                src="/assets/img/servicios/eventos/slogan.webp"
                alt="Slogan eventos"
                width={200}
                height={200}
                className="slogan-overlay"
              />
            </div>
          </div>

          {/* Right side - Accordion */}
          <div className="eventos-methodology-section__content">
            <div className="eventos-methodology-section__accordion">
              {methodologySteps.map((step, index) => (
                <div
                  key={index}
                  className={`eventos-methodology-section__accordion-item ${
                    openAccordion === index ? "is-open" : ""
                  }`}
                >
                  <button
                    className="eventos-methodology-section__accordion-header"
                    onClick={() => handleAccordionClick(index)}
                    aria-expanded={openAccordion === index}
                  >
                    <div className="eventos-methodology-section__accordion-left">
                      <div className="eventos-methodology-section__step-icon">
                        {step.icon}
                      </div>
                      <p className="eventos-methodology-section__step-title">
                        {step.title}
                      </p>
                    </div>
                    <div className="eventos-methodology-section__accordion-toggle">
                      <div className="plus-minus-icon">
                        <span className="horizontal-line"></span>
                        <span className="vertical-line"></span>
                      </div>
                    </div>
                  </button>
                  <div className="eventos-methodology-section__accordion-content">
                    <div className="eventos-methodology-section__accordion-body">
                      <p className="eventos-methodology-section__step-description text">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="eventos-methodology-section__below-image">
          <div
            className="eventos-methodology-section__below-image-container"
            data-speed={isMobile ? "0" : "0.95"}
          >
            <Image
              src="/assets/img/servicios/eventos/horizontal-segunda-eventos.webp"
              alt="Metodología de eventos"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventosMethodologySection;
