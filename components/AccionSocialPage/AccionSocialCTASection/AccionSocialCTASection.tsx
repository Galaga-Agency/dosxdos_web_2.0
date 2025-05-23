"use client";

import React, { useRef } from "react";
import Image from "next/image";
import HoverCircleButton from "@/components/ui/HoverCircleButton/HoverCircleButton";
import "./AccionSocialCTASection.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";

const AccionSocialCTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { isMobile } = useDeviceDetect();

  return (
    <section ref={sectionRef} className="cta-section">
      <div className="cta-section__container">
        {/* Header section */}
        <div className="cta-section__header">
          <div className="cta-section__label">
            <span>NUESTRO EQUIPO</span>
          </div>

          <h2 className="cta-section__title fade_bottom">
            Todo empieza por una idea, <br /> lo demás lo hacemos <span className="highlight">juntos</span>.
          </h2>
        </div>

        {/* Content area with two columns */}
        <div className="cta-section__content">
          <div
            className="cta-section__visual-column"
            data-speed={isMobile ? "0" : "1.15"}
          >
            <div className="cta-section__image-wrapper">
              <Image
                src="/assets/img/team/dospodos_personal_oficina-3.webp"
                alt="Equipo Dos Por Dos"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                width={800}
                height={600}
                quality={90}
              />
            </div>
          </div>

          {/* Right column with content */}
          <div className="cta-section__content-column">
            <div className="cta-section__text">
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
