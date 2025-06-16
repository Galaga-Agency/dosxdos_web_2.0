"use client";

import React, { useRef } from "react";
import "./NuestroEspacioImageSection.scss";
import Image from "next/image";

const NuestroEspacioImageSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="nuestro-espacio-image-section container">
        <div className="nuestro-espacio-image-section__wrapper">
          <Image
            src="/assets/img/nuestro-espacio-page/espacio.webp"
            alt="Nuestro espacio - Dos x Dos"
            className="nuestro-espacio-image-section__img"
            width={0}
            height={0}
            sizes="100vw"
            priority
            quality={100}
          />
        </div>
    </section>
  );
};

export default NuestroEspacioImageSection;
