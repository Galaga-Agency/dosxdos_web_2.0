import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { charAnimation } from "@/utils/animations/title-anim";
import "./IntroSection.scss";

interface IntroSectionProps {
  isActive: boolean;
}

const IntroSection: React.FC<IntroSectionProps> = ({ isActive }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Apply character animation when section becomes active
  useEffect(() => {
    if (isActive && titleRef.current) {
      // Add a 1.5 second delay before starting the animation
      const timer = setTimeout(() => {
        charAnimation(titleRef.current);
      }, 1500);

      // Clean up the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    <section className="intro-section">
      <div className="intro-section__container">
        <div className="intro-section__content">
          <div className="intro-section__text-area">
            <h1 ref={titleRef} className="intro-section__title char-animation">
              Proyectos que <br /> hablan por <br /> si solos
              <span className="intro-section__title-asterisk">*</span>
            </h1>

            <p className="intro-section__description fade-in">
              Nos encargamos de la{" "}
              <strong>gestión integral de las firmas</strong>. Estudiamos las
              necesidades específicas de cada proyecto y diseñamos basándonos en
              las especificaciones de la firma.
            </p>
          </div>

          <div className="intro-section__gallery">
            <div className="intro-section__image intro-section__image--1 fade-in delay-1">
              <Image
                src="/assets/img/blog/color-psychology.jpg"
                alt="Portfolio showcase"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="intro-section__image intro-section__image--2 fade-in delay-2">
              <Image
                src="/assets/img/blog/minimalist-spaces.jpg"
                alt="Portfolio showcase"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="intro-section__image intro-section__image--3 fade-in delay-3">
              <Image
                src="/assets/img/blog/commercial-photography.jpg"
                alt="Portfolio showcase"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="intro-section__image intro-section__image--4 fade-in delay-4">
              <Image
                src="/assets/img/blog/responsive-design.jpg"
                alt="Portfolio showcase"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
