"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import HoverCircleButton from "@/components/ui/HoverCircleButton/HoverCircleButton";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";
import {
  initFadeAnimations,
  cleanupServiciosAnimations,
} from "@/utils/animations/pages/servicios-page-anim";
import "./VisionSection.scss";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const VisionSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      setTimeout(() => {
        initFadeAnimations();

        // Force refresh to ensure ScrollSmoother picks up data-speed attributes
        setTimeout(() => {
          if ((window as any).__smoother__) {
            console.log("Refreshing ScrollSmoother");
            (window as any).__smoother__.refresh();
          }
          ScrollTrigger.refresh();
        }, 100);
      }, 300);
    }

    return () => {
      cleanupServiciosAnimations();
    };
  }, []);

  return (
    <section className="vision-section" ref={sectionRef}>
      <div className="vision-section__top">
        <div className="vision-section__container">
          <div className="vision-section__title-box">
            <span className="vision-section__label fade_bottom">
              nuestra visión
            </span>
            <h2 className="vision-section__title fade_bottom">
              CREAMOS ESPACIOS
              <br />
              <span className="vision-section__title-row-2">
                QUE POTENCIAN MARCAS DE LUJO
              </span>
            </h2>
          </div>

          <div className="vision-section__content">
            {/* Main image with parallax effect */}
            <div
              className="vision-section__image fade_bottom"
              data-speed="0.85"
            >
              <div className="vision-section__image-inner" data-speed="1.2">
                <Image
                  src="/assets/img/blog/corporate-branding.jpg"
                  alt="Diseño de interiores"
                  width={600}
                  height={750}
                  priority
                />
              </div>
            </div>
            <div className="vision-section__text-wrap">
              <p className="vision-section__text fade_bottom">
                Aquí es donde el conocimiento, la creatividad y la experiencia
                se fusionan con el diseño para crear espacios únicos. Pensamos y
                actuamos como un solo equipo, siempre a su lado, superando
                límites. Nuestro enfoque altamente especializado ofrece un
                amplio espectro de servicios para el sector de la cosmética y
                perfumería.
              </p>
              <div className="vision-section__button fade_bottom">
                <HoverCircleButton
                  href="/sobre-nosotros/equipo"
                  label="Conócenos"
                />
              </div>
            </div>
          </div>

          {/* Middle floating image with parallax effect */}
          <div
            className="vision-section__middle-image fade_bottom"
            data-speed="1.3"
          >
            <div className="vision-section__middle-image-inner">
              <Image
                src="/assets/img/blog/visual-storytelling.jpg"
                alt="Equipo trabajando juntos"
                width={500}
                height={400}
                priority
                data-speed=".9"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="vision-section__bottom">
        <div className="vision-section__container">
          <div className="vision-section__bottom-content">
            <h3 className="vision-section__statement fade_bottom">
              Creemos firmemente que solo el diseño reforzado por una estrategia
              sólida puede proporcionar resultados reales en espacios
              comerciales de lujo.
            </h3>

            <div className="vision-section__services">
              <div className="vision-section__service-item fade_bottom">
                <div className="vision-section__service-icon">
                  <Image
                    src="/assets/img/icons/service-icon-2.webp"
                    alt="Icono de diseño"
                    width={80}
                    height={80}
                  />
                </div>
                <h4 className="vision-section__service-title">
                  Diseño de interiores
                </h4>
                <p className="vision-section__service-text">
                  El diseño de espacios comerciales es uno de los ingredientes
                  más importantes para el éxito de cualquier marca de lujo en el
                  sector de la cosmética.
                </p>
              </div>

              <div className="vision-section__service-item fade_bottom">
                <div className="vision-section__service-icon">
                  <Image
                    src="/assets/img/icons/service-icon-1.webp"
                    alt="Icono de producción"
                    width={80}
                    height={80}
                  />
                </div>
                <h4 className="vision-section__service-title">
                  Producción integral
                </h4>
                <p className="vision-section__service-text">
                  La perfecta implementación debe verse y sentirse perfecta sin
                  importar el tamaño o la ubicación del espacio comercial en el
                  que se presente.
                </p>
              </div>

              <div className="vision-section__service-item fade_bottom">
                <div className="vision-section__service-icon">
                  <Image
                    src="/assets/img/icons/service-icon-3.webp"
                    alt="Icono de instalación"
                    width={80}
                    height={80}
                  />
                </div>
                <h4 className="vision-section__service-title">
                  Instalación profesional
                </h4>
                <p className="vision-section__service-text">
                  Aplicamos ese mismo enfoque con los espacios que creamos: el
                  cliente acude a ellos por la experiencia general que ofrecen y
                  que potencia la marca.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
