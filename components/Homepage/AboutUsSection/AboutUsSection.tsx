"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import { animateAboutUsSection } from "@/utils/animations/homepage-anim";
import "./AboutUsSection.scss";

const AboutUsSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Absolute force animation
    const forceAnimation = () => {
      if (titleRef.current && textRef.current && imageRef.current) {
        animateAboutUsSection({
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
    <section className="aboutus-section aboutus-section--alt">
      {/* Decorative dots */}
      <div className="aboutus-decor aboutus-decor-dot1"></div>
      <div className="aboutus-decor aboutus-decor-dot2"></div>
      <div className="aboutus-decor aboutus-decor-line1"></div>
      <div className="aboutus-decor aboutus-decor-line2"></div>
      <div className="aboutus-decor aboutus-decor-dot3"></div>

      <div className="aboutus-section__container">
        <div className="aboutus-section__image-wrapper" ref={imageRef}>
          <Image
            src="/assets/img/homepage/simbolo-red.png"
            alt="Dos Por Dos Símbolo"
            width={400}
            height={400}
            className="aboutus-section__image"
          />
        </div>

        <div className="aboutus-section__content-wrapper">
          <div className="aboutus-section__label">
            <span>QUIENES SOMOS</span>
          </div>

          <h2 className="aboutus-section__title" ref={titleRef}>
            Diseñamos historias visuales
            <br />a través de espacios únicos
          </h2>

          <div className="aboutus-section__text" ref={textRef}>
            <p>
              Llevamos más de <strong>30 años</strong> dedicados al diseño de
              espacios comerciales. Gracias a nuestro equipo de estudio, formado
              por arquitectos, interioristas y diseñadores gráficos, junto al
              departamento técnico y nuestros
              <strong> expertos en diseño de espacios comerciales</strong>,
              hacemos posible crear en cada proyecto un{" "}
              <strong>espacio único y con esencia propia</strong>.
            </p>

            <div className="aboutus-section__cta">
              <PrimaryButton href="/servicios" size="medium">
                Sobre Nosotros
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
