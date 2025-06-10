"use client";

import React from "react";
import Image from "next/image";
import HoverCircleButton from "@/components/ui/HoverCircleButton/HoverCircleButton";
import "./VisionSection.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";

const VisionSection: React.FC = () => {
  const { isMobile } = useDeviceDetect();

  return (
    <section className="vision-section">
      {/* Top Section - Services */}
      <div className="vision-section__top">
        <div className="vision-section__container container">
          <div className="vision-section__top-content">
            <h3 className="vision-section__statement small-title ">
              Ofrecemos soluciones llave en mano para que no tengas que
              preocuparte por nada. Desde el diseño inicial hasta el último
              detalle de la instalación,{" "}
              <span className="highlight">nos encargamos de todo</span>.
              Espacios, identidad, producción, montaje… adaptamos cada fase a lo
              que tu proyecto necesita.
            </h3>

            <div className="vision-section__services">
              <div className="vision-section__service-item ">
                <div className="vision-section__service-icon">
                  <Image
                    src="/assets/img/servicios/grafico.png"
                    alt="Icono de diseño"
                    width={80}
                    height={80}
                  />
                </div>
                <h4 className="vision-section__service-title">Diseñamos</h4>
                <p className="vision-section__service-text">
                  Creamos espacios, identidades visuales, mobiliario y todo lo
                  que tu evento o marca pueda necesitar. Nos adaptamos a tus
                  tiempos, a tu estilo y a tu público, combinando creatividad y
                  funcionalidad para que cada propuesta sea única.
                </p>
              </div>

              <div className="vision-section__service-item ">
                <div className="vision-section__service-icon">
                  <Image
                    src="/assets/img/servicios/eco-factory.png"
                    alt="Icono de producción"
                    width={80}
                    height={80}
                  />
                </div>
                <h4 className="vision-section__service-title">Fabricamos</h4>
                <p className="vision-section__service-text">
                  Damos forma a lo que diseñamos, y también a lo que tú nos
                  traes. Fabricamos mobiliario, rótulos, piezas gráficas en
                  todos los formatos y acabados. Siempre con precisión, calidad
                  y control total en cada proceso.
                </p>
              </div>

              <div className="vision-section__service-item ">
                <div className="vision-section__service-icon">
                  <Image
                    src="/assets/img/servicios/installation.png"
                    alt="Icono de instalación"
                    width={80}
                    height={80}
                  />
                </div>
                <h4 className="vision-section__service-title">Instalamos</h4>
                <p className="vision-section__service-text">
                  Nuestro equipo se desplaza allí donde haga falta para que todo
                  esté listo a tiempo y en perfecto estado. Coordinamos la
                  instalación con eficacia, cuidamos cada detalle y nos
                  aseguramos de que el resultado final esté listo para ser
                  vivido.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle floating image with parallax effect */}
      <div className="vision-section__middle-image " data-speed="1.15">
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

      {/* Bottom Section - Portfolio Preview (Using AboutUs structure) */}
      <div className="vision-section__bottom">
        <div className="vision-section__container container">
          <div className="vision-section__header header">
            <span className="vision-section__label label">
              (Descubre nuestro portfolio)
            </span>
            <h2 className="vision-section__title secondary-title ">
              Cada proyecto cuenta{" "}
              <span className="highlight">una historia</span>. <br />
              Aquí te mostramos algunas.
            </h2>
          </div>

          <div className="vision-section__content">
            <div className="vision-section__visual-column">
              <div
                className="vision-section__animated-image"
                data-speed={isMobile ? "0" : "0.95"}
              >
                <Image
                  src="/assets/img/blog/corporate-branding.jpg"
                  alt="Diseño de interiores"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  quality={90}
                  unoptimized={true}
                />
              </div>
            </div>

            <div className="vision-section__content-column">
              <p className="vision-section__text text">
                Nuestro trabajo habla por nosotros. Cada proyecto que llevamos a
                cabo es una oportunidad para demostrar lo que mejor sabemos
                hacer: escuchar, entender, proponer y ejecutar. En estos más de
                38 años hemos colaborado con grandes firmas del retail y marcas
                de distintos sectores, adaptándonos siempre a las necesidades de
                cada cliente. <br />
                <br /> Diseñamos espacios que comunican, producimos piezas que
                funcionan, instalamos con precisión y cuidamos cada detalle como
                si fuera propio. Nuestro portfolio es el reflejo de un proceso
                en el que creatividad, técnica y compromiso van siempre de la
                mano.
              </p>
              <div className="vision-section__cta ">
                <HoverCircleButton href="/portfolio" label="Ver proyectos" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
