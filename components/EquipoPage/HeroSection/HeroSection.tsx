"use client";

import React, { useRef } from "react";
import Image from "next/image";
import "./HeroSection.scss";

const HeroSection: React.FC = () => {
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const heroImageContainerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const floatingImage1Ref = useRef<HTMLDivElement>(null);
  const floatingImage2Ref = useRef<HTMLDivElement>(null);
  const floatingImage3Ref = useRef<HTMLDivElement>(null);
  const floatingImageInner1Ref = useRef<HTMLDivElement>(null);
  const floatingImageInner2Ref = useRef<HTMLDivElement>(null);
  const floatingImageInner3Ref = useRef<HTMLDivElement>(null);

  // Simple function to check if we're on a mobile device
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <>
      <div className="hero-section">
        <div
          ref={heroImageContainerRef}
          className="hero-section__image-container"
        >
          <div
            ref={heroImageRef}
            className="hero-section__image-wrapper"
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
            <div ref={labelRef} className="hero-section__label">
              <span>SOBRE NOSOTROS</span>
            </div>
            <h1 ref={titleRef} className="hero-section__title char-animation">
              Todo empieza con una idea. <br /> Lo demás, lo hacemos juntos.
            </h1>
            <div
              ref={underlineRef}
              className="hero-section__title-underline"
            ></div>
            <div
              ref={descriptionRef}
              className="hero-section__description title_anim"
            >
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
          const containerRef = [
            floatingImage1Ref,
            floatingImage2Ref,
            floatingImage3Ref,
          ][i];
          const innerRef = [
            floatingImageInner1Ref,
            floatingImageInner2Ref,
            floatingImageInner3Ref,
          ][i];
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
              ref={containerRef}
              className={`random-images__container random-images__container--${
                i + 1
              }`}
              data-speed={containerSpeed}
            >
              <div
                ref={innerRef}
                className="random-images__inner-container"
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
