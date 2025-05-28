"use client";

import React, { useRef } from "react";
import Image from "next/image";
import "./DisenoInterioresHeroSection.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";

const DisenoInterioresHeroSection: React.FC = () => {
  const { isMobile } = useDeviceDetect();

  return (
    <div className="diseno-interiores-hero">
      <div className="diseno-interiores-hero__bg-container featured-image-container">
        <div className="diseno-interiores-hero__image-wrapper featured-image-wrapper">
          <Image
            src="/assets/img/about-us-page/vicente-ferrer-illustration.jpg"
            alt="Diseño de Interiores"
            fill
            quality={100}
            priority
          />
        </div>
        <div className="diseno-interiores-hero__overlay"></div>
        <div className="diseno-interiores-hero__content container">
          <h3 className="diseno-interiores-hero__label label">
            (Forma, función y emoción.)
          </h3>

          <h2 className="diseno-interiores-hero__title title text-1">
            Diseñamos espacios
          </h2>
          <h2 className="diseno-interiores-hero__title title text-2">
            <span>que conectan con las personas.</span>
          </h2>
        </div>
        <div className="diseno-interiores-hero__floating-image-wrapper">
          <Image
            src="/assets/img/servicios/consultoria/consultoria-1.webp"
            alt="Consultoría dosxdos"
            width={600}
            height={400}
            priority
            quality={100}
            unoptimized={true}
            data-speed={isMobile ? "1" : "1.25"}
          />
        </div>
      </div>
    </div>
  );
};

export default DisenoInterioresHeroSection;
