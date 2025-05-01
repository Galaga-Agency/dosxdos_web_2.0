"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { initAccionSocialHeroAnimations } from "@/utils/animations/accion-social-page-anim";
import "./HeroSection.scss";

const HeroSection: React.FC = () => {
  const heroAreaRef = useRef<HTMLDivElement>(null);
  const bgContainerRef = useRef<HTMLDivElement>(null);
  const titleRef1 = useRef<HTMLHeadingElement>(null);
  const titleRef2 = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const decorElementsRef = useRef<HTMLDivElement>(null);
  const decorDotsRef = useRef<HTMLDivElement>(null);
  const decorLineRef = useRef<HTMLDivElement>(null);
  const decorCircleRef = useRef<HTMLDivElement>(null);
  const decorGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize animations with a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initAccionSocialHeroAnimations({
        heroArea: heroAreaRef.current,
        bgContainer: bgContainerRef.current,
        titleRef1: titleRef1.current,
        titleRef2: titleRef2.current,
        descriptionRef: descriptionRef.current,
        ctaRef: ctaRef.current,
        decorElements: {
          container: decorElementsRef.current,
          dots: decorDotsRef.current,
          line: decorLineRef.current,
          circle: decorCircleRef.current,
          grid: decorGridRef.current,
        },
      });
    }, 1500);

    // Clean up function
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="accion-social-hero" ref={heroAreaRef}>
      <div className="accion-social-hero__bg-container" ref={bgContainerRef}>
        <div className="accion-social-hero__image-wrapper">
          <Image
            src="/assets/img/about-us-page/vicente-ferrer-illustration.jpg"
            alt="Acción Social"
            fill
            quality={100}
            priority
            style={{
              objectFit: "cover",
              objectPosition: "center",
              willChange: "transform",
            }}
          />
        </div>

        <div className="accion-social-hero__overlay"></div>

        <div className="accion-social-hero__content">
          <div className="accion-social-hero__label">
            <span>IMPACTO COMUNITARIO</span>
          </div>

          <h2 ref={titleRef1} className="accion-social-hero__title text-1">
            Compromiso
          </h2>
          <h2 ref={titleRef2} className="accion-social-hero__title text-2">
            <span>Social</span>
          </h2>

          <div ref={descriptionRef} className="accion-social-hero__description">
            <p>
              Transformando comunidades a través de iniciativas sociales que
              generan un impacto real y duradero. Creamos oportunidades para el
              desarrollo sostenible y la inclusión social.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;