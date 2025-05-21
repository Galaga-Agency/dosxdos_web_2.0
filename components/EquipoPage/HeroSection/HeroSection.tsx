"use client";

import React from "react";
import Image from "next/image";
import "./HeroSection.scss";

const HeroSection: React.FC = () => {
  // Simple function to check if we're on a mobile device
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <>
      <div className="hero-section">
        <div className="hero-section__image-container featured-image-container">
          <div
            className="hero-section__image-wrapper fade-in-scale featured-image-wrapper"
            data-speed={isMobile ? "1" : "0.9"}
          >
            <Image
              src="/assets/img/team/dospodos_personal_oficina-3.webp"
              alt="Equipo dosxdos"
              fill
              priority
              quality={100}
              style={{
                objectFit: "cover",
                objectPosition: "center",
                willChange: "transform",
              }}
            />
          </div>

          <div className="hero-section__overlay"></div>

          <div className="hero-section__content">
            <div className="hero-section__label fade_bottom">
              <span>SOBRE NOSOTROS</span>
            </div>
            <h1 className="hero-section__title char-animation">
              Todo empieza con una idea. <br /> Lo demás, lo hacemos juntos.
            </h1>
            <div className="hero-section__title-underline fade_bottom"></div>
            <div className="hero-section__description rollup-text">
              <p>
                Contamos con un equipo multidisciplinar de más de 40 personas —
                arquitectos, interioristas, diseñadores, técnicos e instaladores
                — que entienden que cada proyecto es un lenguaje visual que debe
                decir algo único. Te acompañamos de principio a fin para
                transformar conceptos en espacios que inspiran
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="random-images">
        {/* Floating Images */}
        {[1, 2, 3].map((_, i) => {
          const imgSrc = `/assets/img/about-us-page/equipo-${i + 1}.webp`;

          // Set different speeds based on image index
          const containerSpeed = isMobile
            ? "1"
            : i === 0
            ? "1.3"
            : i === 1
            ? "0.9"
            : "1.1";

          const innerSpeed = i === 0 ? "1.1" : i === 1 ? "0.8" : "0.9";

          return (
            <div
              key={i}
              className={`random-images__container random-images__container--${
                i + 1
              } fade_bottom featured-image-container`}
              data-speed={containerSpeed}
            >
              <div
                className="random-images__inner-container featured-image-wrapper"
                data-speed={innerSpeed}
              >
                <Image
                  src={imgSrc}
                  alt={`Fiesta ${i + 1}`}
                  fill
                  priority
                  unoptimized={true}
                  quality={100}
                  className="random-images__img"
                  sizes="(min-width: 1024px) 80vw, (min-width: 768px) 60vw, 90vw"
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HeroSection;
