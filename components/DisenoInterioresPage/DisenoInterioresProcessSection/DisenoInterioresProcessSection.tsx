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
          <h2 className="diseno-interiores-process__title secondary-title fade_bottom">
            Un <span className="highlight">proceso cuidado</span> de principio a
            fin
          </h2>
          <p className="diseno-interiores-process__description text">
            Desde locales comerciales hasta hogares, creamos entornos
            funcionales, estéticos y sostenibles. Cada proyecto nace del diálogo
            con el cliente y se traduce en un diseño único, alineado con su
            identidad y objetivos.
          </p>
        </div>
      </div>

      <div className="diseno-interiores-process__image-area">
        <div className="diseno-interiores-process__image-wrapper">
          <Image
            src="/assets/img/servicios/consultoria/consultoria-2.webp"
            alt="Proceso de diseño de interiores"
            fill
            quality={100}
            priority
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      </div>

      <h3 className="diseno-interiores-process__below-statement small-title">
        Nuestro método garantiza resultados sólidos, estéticos y realistas, sin
        sorpresas. Independientemente del tipo de espacio, <span className="highlight">acompañamos al
        cliente</span> en cada paso.
      </h3>
    </section>
  );
};

export default DisenoInterioresProcessSection;