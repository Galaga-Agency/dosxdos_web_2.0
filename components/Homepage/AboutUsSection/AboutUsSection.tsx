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
      <div className="aboutus-section__container">
        <div className="aboutus-section__content-wrapper">
          <div className="aboutus-section__label">
            <span>QUIÉNES SOMOS</span>
          </div>

          <h2 className="aboutus-section__title">
            Diseñamos historias visuales
            <br />a través de <span>espacios únicos</span>
          </h2>

          <div className="aboutus-section__text">
            <p>
              Llevamos más de <strong>30 años</strong> dedicados al diseño de
              espacios comerciales. Gracias a nuestro equipo de arquitectos,
              interioristas y diseñadores gráficos, hacemos posible crear en
              cada proyecto un <strong>espacio con esencia propia</strong>.
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
