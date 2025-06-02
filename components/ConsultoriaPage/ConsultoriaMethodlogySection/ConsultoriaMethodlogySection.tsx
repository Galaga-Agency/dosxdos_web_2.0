"use client";

import Image from "next/image";
import React, { useState } from "react";
import { BiAnalyse } from "react-icons/bi";
import { TbCalendarTime } from "react-icons/tb";
import { RiPlantLine } from "react-icons/ri";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { LuLaptopMinimalCheck } from "react-icons/lu";

import "./ConsultoriaMethodlogySection.scss";
import FiveStepInfographic from "@/components/ConsultoriaInfographic/ConsultoriaInfographic";
import ConsultoriaInfographic from "@/components/ConsultoriaInfographic/ConsultoriaInfographic";

const ConsultoriaMethodlogySection = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const methodologySteps = [
    {
      title: "Análisis y optimización de espacios comerciales",
      description:
        "Mejoramos la funcionalidad, el flujo y el rendimiento de tus puntos de venta mediante estudios detallados del comportamiento del cliente y optimización del layout para maximizar las ventas.",
      icon: <BiAnalyse />,
    },
    {
      title: "Planificación estratégica de campañas y activaciones",
      description:
        "Diseñamos planes integrales que maximizan impacto y eficiencia, coordinando todos los elementos desde la conceptualización hasta la ejecución final.",
      icon: <TbCalendarTime />,
    },
    {
      title: "Consultoría en sostenibilidad aplicada a retail y eventos",
      description:
        "Reducimos la huella ambiental integrando criterios sostenibles desde el inicio, implementando materiales eco-friendly y procesos responsables.",
      icon: <RiPlantLine />,
    },
    {
      title: "Auditorías operativas y de procesos",
      description:
        "Detectamos oportunidades de mejora para optimizar tiempos y recursos, analizando cada paso del proceso para aumentar la eficiencia operativa.",
      icon: <HiMiniMagnifyingGlass />,
    },
    {
      title: "Soporte en proyectos de digitalización",
      description:
        "Aplicamos tecnología para agilizar procesos y mejorar la experiencia del cliente, integrando soluciones digitales innovadoras en el punto de venta.",
      icon: <LuLaptopMinimalCheck />,
    },
  ];

  const handleAccordionClick = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <section className="methodology-section">
      <div className="container">
        <div className="methodology-section__header">
          <span className="methodology-section__label label">
            ¿Cómo trabajamos?
          </span>
          <h2 className="methodology-section__title secondary-title">
            De la necesidad al plan: una metodología pensada para transformar
          </h2>
        </div>

        <div className="methodology-section__grid">
          {/* Left side - Single Image */}
          <div className="methodology-section__image">
            {/* <Image
              src="/assets/img/servicios/consultoria/sv-shape-1.png"
              alt="Metodología de consultoría"
              width={500}
              height={500}
            /> */}
            <ConsultoriaInfographic activeIndex={openAccordion} />
          </div>

          {/* Right side - Accordion */}
          <div className="methodology-section__content">
            <div className="methodology-section__accordion">
              {methodologySteps.map((step, index) => (
                <div
                  key={index}
                  className={`methodology-section__accordion-item ${
                    openAccordion === index ? "is-open" : ""
                  }`}
                >
                  <button
                    className="methodology-section__accordion-header"
                    onClick={() => handleAccordionClick(index)}
                    aria-expanded={openAccordion === index}
                  >
                    <div className="methodology-section__accordion-left">
                      <div className="methodology-section__step-icon">
                        {step.icon}
                      </div>
                      <h3 className="methodology-section__step-title">
                        {step.title}
                      </h3>
                    </div>
                    <div className="methodology-section__accordion-toggle">
                      <div className="plus-minus-icon">
                        <span className="horizontal-line"></span>
                        <span className="vertical-line"></span>
                      </div>
                    </div>
                  </button>

                  <div className="methodology-section__accordion-content">
                    <div className="methodology-section__accordion-body">
                      <p className="methodology-section__step-description">
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

export default ConsultoriaMethodlogySection;
