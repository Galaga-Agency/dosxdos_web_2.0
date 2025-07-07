"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import "./DisenoInterioresProcessSection.scss";
import useScrollSmooth from "@/hooks/useScrollSmooth";
import { useGSAP } from "@gsap/react";
import { scrollImageExpandAnimation } from "@/utils/animations/scroll-image-expand-anim";

const DisenoInterioresProcessSection: React.FC = () => {
  useScrollSmooth();

  useGSAP(() => {
    const timer = setTimeout(() => {
      scrollImageExpandAnimation();
    }, 100);
    return () => clearTimeout(timer);
  });

  return (
    <section className="diseno-interiores-process">
      <div className="diseno-interiores-process__container container">
        <div className="diseno-interiores-process__header">
          <h2 className="diseno-interiores-process__title small-title ">
            Un <span className="highlight">proceso cuidado</span> de principio a
            fin
          </h2>
          <p className="diseno-interiores-process__description text">
            Diseñamos espacios que comunican, conectan y funcionan. Desde locales 
            comerciales hasta hogares, creamos entornos alineados con la identidad 
            y los objetivos de cada cliente.
          </p>
          <p className="diseno-interiores-process__description-2 text">
            Nuestro equipo —formado por más de 45 profesionales de distintas 
            disciplinas— trabaja para que diseño, experiencia de usuario y filosofía 
            de marca hablen un mismo idioma. Apostamos por soluciones sostenibles, 
            funcionales y con carácter, que respondan tanto a las necesidades del 
            presente como a los retos del futuro.
          </p>
        </div>
      </div>

      <div className="diseno-interiores-process__image-area">
        <div className="diseno-interiores-process__image-wrapper">
          <Image
            src="/assets/img/servicios/diseno-interiores/disneo-interirores-img-amplia-scroll.webp"
            alt="Proceso de diseño de interiores"
            fill
            quality={100}
            priority
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      </div>

      <h3 className="diseno-interiores-process__below-statement small-title">
        Nuestro método garantiza{" "}
        <span className="highlight">resultados sólidos</span>, estéticos y
        realistas, sin sorpresas. Independientemente del tipo de espacio,{" "}
        acompañamos al cliente en cada paso.
      </h3>
    </section>
  );
};

export default DisenoInterioresProcessSection;