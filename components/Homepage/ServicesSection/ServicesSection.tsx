"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import { animateServicesSection } from "@/utils/animations/homepage-anim";
import "./ServicesSection.scss";

const ServicesSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Absolute force animation
    const forceAnimation = () => {
      if (titleRef.current && textRef.current && imageRef.current) {
        animateServicesSection({
          title: titleRef.current,
          text: textRef.current,
          image: imageRef.current,
        });
      }
    };

    // Trigger animation on mount
    forceAnimation();

    // Optional: handle any late-loading scenarios
    const loadTimer = setTimeout(forceAnimation, 500);

    // Cleanup
    return () => {
      clearTimeout(loadTimer);
    };
  }, []);

  return (
    <section className="services-section services-section--alt">
      <div className="services-section__container">
        <div className="services-section__image-wrapper" ref={imageRef}>
          <Image
            src="/assets/img/homepage/simbolo-red.png"
            alt="Dos Por Dos Símbolo"
            width={400}
            height={400}
            className="services-section__image"
          />
        </div>

        <div className="services-section__content-wrapper">
          <div className="services-section__label">
            <span>QUÉ HACEMOS</span>
          </div>

          <h2 className="services-section__title" ref={titleRef}>
            Diseñamos historias visuales
            <br />a través de espacios únicos
          </h2>

          <div className="services-section__text" ref={textRef}>
            <p>
              Llevamos más de <strong>30 años</strong> dedicados al diseño de
              espacios comerciales. Gracias a nuestro equipo de estudio, formado
              por arquitectos, interioristas y diseñadores gráficos, junto al
              departamento técnico y nuestros
              <strong> expertos en diseño de espacios comerciales</strong>,
              hacemos posible crear en cada proyecto un{" "}
              <strong>espacio único y con esencia propia</strong>.
            </p>

            <div className="services-section__cta">
              <PrimaryButton href="/servicios" size="medium">
                Descubrir Servicios
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
