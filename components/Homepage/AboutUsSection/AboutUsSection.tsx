"use client";

import React, { useRef } from "react";
import Image from "next/image";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import "./AboutUsSection.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";

const AboutUsSection: React.FC = () => {
  const { isMobile } = useDeviceDetect();

  return (
    <section className="aboutus-section">
      <div className="aboutus-section__container container">
        <div className="aboutus-section__header header">
          <h2 className="aboutus-section__title secondary-title ">
            38 años diseñando, produciendo y <br />
            <span className="highlight">cuidando cada detalle</span> para marcas
            líderes
          </h2>
        </div>
        <div className="aboutus-section__content">
          <div className="aboutus-section__visual-column">
            <div
              className="aboutus-section__animated-logo"
              data-speed={isMobile ? "0" : "1.15"}
            >
              <Image
                src="/assets/img/homepage/foto-landing.avif"
                alt="Diseño de interiores"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                data-speed="0.95"
              />
            </div>
          </div>
          <div className="aboutus-section__content-column">
            <p className="aboutus-section__text text">
              En Dos por Dos Grupo Imagen llevamos más de 38 años creando
              proyectos integrales que conectan marcas con personas. <br />
              <br />
              Acompañamos a nuestros clientes desde la estrategia y la
              consultoría hasta el diseño, la fabricación, la impresión, el
              montaje y el mantenimiento de espacios comerciales, promocionales
              y experienciales. Nos implicamos en cada fase del proceso con un
              equipo propio y una ejecución impecable, adaptada a cada necesidad
              y a cada isla. <br /> <br /> Nuestra capacidad de dar servicio
              simultaneo en varias islas, nuestra experiencia multisectorial y
              nuestro compromiso con la sostenibilidad nos convierten en el
              socio ideal para quienes buscan resultados reales, con
              creatividad, agilidad y excelencia.
            </p>
            <div className="aboutus-section__cta">
              <SecondaryButton
                href="/sobre-nosotros/equipo"
                size="medium"
                lightBg
              >
                Conócenos
              </SecondaryButton>
              <SecondaryButton href="/contacto" size="medium" lightBg>
                ¿Hablamos?
              </SecondaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
