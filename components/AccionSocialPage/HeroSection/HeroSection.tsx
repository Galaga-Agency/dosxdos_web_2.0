"use client";

import React, { useRef } from "react";
import Image from "next/image";
import "./HeroSection.scss";

const HeroSection: React.FC = () => {
  return (
    <div className="accion-social-hero">
      <div className="accion-social-hero__bg-container featured-image-container">
        <div className="accion-social-hero__image-wrapper featured-image-wrapper">
          <Image
            src="/assets/img/about-us-page/vicente-ferrer-illustration.jpg"
            alt="Acción Social"
            fill
            quality={100}
            priority
          />
        </div>

        <div className="accion-social-hero__overlay"></div>

        <div className="accion-social-hero__content container">
          <h3 className="accion-social-hero__label label">
            (COMPROMISO QUE TRANSFORMA)
          </h3>

          <h2 className="accion-social-hero__title title text-1">
            Un diseño que también
          </h2>
          <h2 className="accion-social-hero__title title text-2">
            <span>transforma comunidades y entorno</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
