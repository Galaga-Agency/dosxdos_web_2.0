"use client";

import React, { useRef } from "react";
import Image from "next/image";
import "./HeroSection.scss";

const HeroSection: React.FC = () => {
  const heroAreaRef = useRef<HTMLDivElement>(null);
  const bgContainerRef = useRef<HTMLDivElement>(null);
  const titleRef1 = useRef<HTMLHeadingElement>(null);
  const titleRef2 = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  return (
    <div className="accion-social-hero" ref={heroAreaRef}>
      <div
        className="accion-social-hero__bg-container featured-image-container"
        ref={bgContainerRef}
      >
        <div className="accion-social-hero__image-wrapper featured-image-wrapper">
          <Image
            src="/assets/img/about-us-page/vicente-ferrer-illustration.jpg"
            alt="Acción Social"
            fill
            quality={100}
            priority
            style={{
              objectFit: "cover",
              objectPosition: "center",
              willChange: "transform",
            }}
          />
        </div>

        <div className="accion-social-hero__overlay"></div>

        <div className="accion-social-hero__content">
          <h3 ref={labelRef} className="accion-social-hero__label">
            (COMPROMISO QUE TRANSFORMA)
          </h3>

          <h2 ref={titleRef1} className="accion-social-hero__title text-1">
            Un diseño que también
          </h2>
          <h2 ref={titleRef2} className="accion-social-hero__title text-2">
            <span>transforma comunidades y entorno</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
