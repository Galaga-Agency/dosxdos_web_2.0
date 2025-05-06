"use client";

import React, { useRef, useEffect } from "react";
import {
  initFadeAnimations,
  cleanupServiciosAnimations,
} from "@/utils/animations/pages/servicios-page-anim";
import "./AboutServices.scss";

const AboutServices: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("AboutServices mounted");

    // Larger delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      console.log("Initializing animations");
      // Initialize fade animations
      initFadeAnimations();
    }, 300);

    return () => {
      console.log("AboutServices unmounting");
      // Clear the timeout on unmount
      clearTimeout(timer);
      // Clean up animations
      cleanupServiciosAnimations();
    };
  }, []);

  return (
    <section className="about-services" ref={sectionRef}>
      <div className="about-services__container">
        <div className="about-services__header">
          <div className="about-services__subtitle fade_left">
            Más de 35 años de experiencia
          </div>
          <h2 className="about-services__title">
            <div className="title-row fade_bottom">
              COMO ESPECIALISTAS EN DISEÑO DE INTERIORES,
            </div>
            <div className="title-row fade_bottom">
              CREAMOS ESPACIOS COMERCIALES DE LUJO QUE
            </div>
            <div className="title-row fade_bottom">CAUTIVAN Y VENDEN.</div>
          </h2>
        </div>

        <div className="about-services__content">
          <div className="about-services__categories">
            <div className="about-services__category fade_bottom">
              Diseño de interiores
            </div>
            <div className="about-services__category fade_bottom">
              Producción
            </div>
            <div className="about-services__category fade_bottom">
              Instalación
            </div>
            <div className="about-services__category fade_bottom">
              logística
            </div>
            <div className="about-services__category fade_bottom">
              Comunicación
            </div>
            <div className="about-services__category fade_bottom">
              Consultoría
            </div>
          </div>

          <div className="about-services__description">
            <p className="about-services__text fade_bottom">
              En Dos por Dos creamos ambientes comerciales que transforman la
              experiencia del cliente en el punto de venta. Nuestro enfoque
              integral potencia la identidad de marcas de lujo en el sector de
              la cosmética y perfumería con espacios que reflejan su
              exclusividad.
            </p>
            <p className="about-services__text fade_bottom">
              Creemos que entender las necesidades específicas de cada marca es
              la clave del éxito. Es momento de elevar la presentación de sus
              productos, ofrecer una nueva perspectiva y realizar todo el
              potencial de su espacio comercial.
            </p>
            <p className="about-services__text fade_bottom">
              Respaldados por más de tres décadas de experiencia y un proceso de
              diseño probado para las marcas más exigentes del sector.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutServices;
