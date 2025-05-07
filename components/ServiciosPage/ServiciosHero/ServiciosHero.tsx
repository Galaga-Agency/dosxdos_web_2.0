"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { animateServiciosHero } from "@/utils/animations/pages/servicios-page-anim";
import { GoArrowUpRight } from "react-icons/go";
import "./ServiciosHero.scss";

const ServiciosHero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current && titleRef.current) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        animateServiciosHero({
          section: sectionRef.current,
          title: titleRef.current,
          subtitle: subtitleRef.current,
          button: buttonRef.current,
        });
      }, 300);
    } else {
      console.error("Required refs not available");
    }

    return () => {
      console.log("ServiciosHero unmounting");
    };
  }, []);

  return (
    <section ref={sectionRef} className="servicios-hero">
      <div className="servicios-hero__container">
        <h1 ref={titleRef} className="servicios-hero__title char-animation">
          <span className="experience">Experiencia </span>
          <span className="plus">+</span>
          <span className="creatividad"> Creatividad</span>
        </h1>

        <p ref={subtitleRef} className="servicios-hero__subtitle">
          Somos una agencia de diseño de interiores especializada en crear
          espacios comerciales de lujo para firmas de cosmética y perfumería que
          elevan su marca y potencian sus ventas.
        </p>

        <div ref={buttonRef} className="servicios-hero__button-wrapper">
          <Link href="/portfolio" className="servicios-hero__button">
            <span className="servicios-hero__button-text">Ver Proyectos </span>
            <span className="servicios-hero__button-icon">
              <GoArrowUpRight />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiciosHero;
