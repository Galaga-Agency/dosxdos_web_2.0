"use client";

import React, { useRef } from "react";
import Image from "next/image";
import HoverCircleButton from "@/components/ui/HoverCircleButton/HoverCircleButton";
import "./AccionSocialCTASection.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";

const AccionSocialCTASection = () => {
  const { isMobile } = useDeviceDetect();

  return (
    <section className="cta-section">
      <div className="cta-section__container container">
        <div className="cta-section__header header">
          <h3 className="cta-section__label label label">(NUESTRO EQUIPO)</h3>

          <h2 className="cta-section__title fade_bottom secondary-title">
            Todo empieza por una idea, <br /> lo demás lo hacemos{" "}
            <span className="highlight">juntos</span>.
          </h2>
        </div>
        <div className="cta-section__content container">
          <div
            className="cta-section__visual-column"
            data-speed={isMobile ? "0" : "1.15"}
          >
            <div className="cta-section__image-wrapper">
              <Image
                src="/assets/img/team/dospodos_personal_oficina-3.webp"
                alt="Equipo Dos Por Dos"
                sizes="(max-width: 767px) 90vw, (max-width: 991px) 45vw, 40vw"
                priority
                width={800}
                height={600}
                quality={90}
              />
            </div>
          </div>
          <div className="cta-section__content-column">
            <div className="cta-section__text text">
              Contamos con un equipo multidisciplinar de más de 40 personas —
              arquitectos, interioristas, diseñadores, técnicos e instaladores —
              que entienden que cada proyecto es un lenguaje visual que debe
              decir algo único. Te acompañamos de principio a fin para
              transformar conceptos en espacios que inspiran.
            </div>

            <div className="cta-section__cta">
              <HoverCircleButton
                href="/sobre-nosotros/equipo"
                label="Conocer al Equipo"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccionSocialCTASection;
