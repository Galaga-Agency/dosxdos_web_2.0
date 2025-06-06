"use client";

import React, { useRef } from "react";
import Image from "next/image";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import "./FabricacionAboutSection.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";

const FabricacionAboutSection: React.FC = () => {
  const { isMobile } = useDeviceDetect();

  return (
    <section className="fabricacion-about-section">
      <div className="fabricacion-about-section__container container">
        <div className="fabricacion-about-section__header header">
          <h2 className="fabricacion-about-section__title secondary-title fade_bottom">
            38 años diseñando, produciendo y <br />
            <span className="highlight">cuidando cada detalle</span> para marcas
            líderes
          </h2>
        </div>
        <div className="fabricacion-about-section__content">
          <div className="fabricacion-about-section__visual-column">
            <div
              className="fabricacion-about-section__animated-logo"
              data-speed={isMobile ? "0" : "1.15"}
            >
              <Image
                src="/assets/img/homepage/foto-landing.avif"
                alt="Fabricación e impresión - Dos por Dos"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                data-speed="0.95"
              />
            </div>
          </div>
          <div className="fabricacion-about-section__content-column">
            <p className="fabricacion-about-section__text text">
              En Dos por Dos Grupo Imagen llevamos más de 38 años creando
              proyectos integrales que conectan marcas con personas. Acompañamos
              a nuestros clientes desde la estrategia y la consultoría hasta el
              diseño, la fabricación, la impresión, el montaje y el
              mantenimiento de espacios comerciales, promocionales y
              experienciales. Nos implicamos en cada fase del proceso con un
              equipo propio y una ejecución impecable, adaptada a cada necesidad
              y a cada isla. Nuestra capacidad de dar servicio simultaneo en
              varias islas, nuestra experiencia multisectorial y nuestro
              compromiso con la sostenibilidad nos convierten en el socio ideal
              para quienes buscan resultados reales, con creatividad, agilidad y
              excelencia.
            </p>
            <div className="fabricacion-about-section__tags">
              <span className="fabricacion-about-section__tag">
                Fabricación
              </span>
              <span className="fabricacion-about-section__tag">
                Impresiones
              </span>
              <span className="fabricacion-about-section__tag">Rotulación</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FabricacionAboutSection;
