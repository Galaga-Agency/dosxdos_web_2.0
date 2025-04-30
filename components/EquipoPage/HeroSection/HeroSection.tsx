"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { charAnimation } from "@/utils/animations/title-anim";
import { animateHeroSection } from "@/utils/animations/equipo-page-anim";
import "./HeroSection.scss";

const HeroSection: React.FC = () => {
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const heroImageContainerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const decorElementsRef = useRef<HTMLDivElement>(null);
  const decorDotsRef = useRef<HTMLDivElement>(null);
  const decorLineRef = useRef<HTMLDivElement>(null);
  const decorCircleRef = useRef<HTMLDivElement>(null);
  const decorGridRef = useRef<HTMLDivElement>(null);

  const floatingImage1Ref = useRef<HTMLDivElement>(null);
  const floatingImage2Ref = useRef<HTMLDivElement>(null);
  const floatingImage3Ref = useRef<HTMLDivElement>(null);

  const floatingImageInner1Ref = useRef<HTMLDivElement>(null);
  const floatingImageInner2Ref = useRef<HTMLDivElement>(null);
  const floatingImageInner3Ref = useRef<HTMLDivElement>(null);

  const animatedRef = useRef(false);

  useEffect(() => {
    // Don't re-run animation if already animated
    if (animatedRef.current) return;

    const timer = setTimeout(() => {
      if (titleRef.current) {
        // Add unique ID to each animation
        charAnimation(titleRef.current);

        animateHeroSection({
          section: heroImageContainerRef.current,
          label: labelRef.current,
          title: titleRef.current,
          underline: underlineRef.current,
          description: descriptionRef.current,
          stats: statsRef.current,
          decor: decorElementsRef.current,
          image: heroImageRef.current,
          floatingImages: [
            {
              container: floatingImage1Ref,
              inner: floatingImageInner1Ref,
              offset: -25,
              innerOffset: 15,
            },
            {
              container: floatingImage2Ref,
              inner: floatingImageInner2Ref,
              offset: -20,
              innerOffset: -15,
            },
            {
              container: floatingImage3Ref,
              inner: floatingImageInner3Ref,
              offset: -65,
              innerOffset: 25,
            },
          ],
        } as any);

        // Mark as animated
        animatedRef.current = true;
      }
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div className="hero-section">
        <div
          ref={heroImageContainerRef}
          className="hero-section__image-container"
        >
          <div ref={heroImageRef} className="hero-section__image-wrapper">
            <Image
              src="/assets/img/about-us-page/family.webp"
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
              Nuestro equipo de profesionales
            </h1>
            <div
              ref={underlineRef}
              className="hero-section__title-underline"
            ></div>
            <div ref={descriptionRef} className="hero-section__description">
              <p>
                Con un gran equipo de más de 45 profesionales, formado por
                arquitectos, interioristas, diseñadores y expertos en producción
                e instalación, te acompañamos durante todo el proceso para crear
                espacios únicos con personalidad propia.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="random-images">
        <div
          ref={decorElementsRef}
          className="random-images__decorative-elements"
        >
          <div ref={decorDotsRef} className="random-images__decor-dots" />
          <div ref={decorLineRef} className="random-images__decor-line" />
          <div ref={decorCircleRef} className="random-images__decor-circle" />
          <div ref={decorGridRef} className="random-images__decor-grid" />
        </div>

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
          const imgSrc = `/assets/img/about-us-page/fiesta-${i + 1}.jpg`;

          return (
            <div
              key={i}
              ref={containerRef}
              className={`random-images__container random-images__container--${
                i + 1
              }`}
            >
              <div className="corner corner--tl" />
              <div className="corner corner--tr" />
              <div className="corner corner--bl" />
              <div className="corner corner--br" />

              <div ref={innerRef} className="random-images__inner-container">
                <Image
                  src={imgSrc}
                  alt={`Fiesta ${i + 1}`}
                  fill
                  priority
                  quality={100}
                  className="random-images__img"
                  sizes="(min-width: 1024px) 80vw, (min-width: 768px) 60vw, 90vw"
                />
                <div className="random-images__overlay" />
                <div className="random-images__watermark">dosxdos</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HeroSection;
