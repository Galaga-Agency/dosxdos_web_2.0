"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { initHeroAnimations } from "@/utils/animations/equipo-page-anim";
import { charAnimation } from "@/utils/animations/title-anim";
import "./HeroSection.scss";

const HeroSection: React.FC = () => {
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

  // Track component mount state
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Mark component as mounted
    setIsMounted(true);

    // Initialize animations with a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Run character animation for the title
      if (titleRef.current) { 
        charAnimation(titleRef.current);
      } 
      initHeroAnimations({
        titleRef,
        underlineRef,
        heroImageContainerRef,
        heroImageRef,
        descriptionRef,
        statsRef,
        decorElements: {
          container: decorElementsRef,
          dots: decorDotsRef,
          line: decorLineRef,
          circle: decorCircleRef,
          grid: decorGridRef,
        },
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
    }, 500);

    // Clean up function
    return () => {
      clearTimeout(timer);

      // Clean up any GSAP animations when component unmounts
      if (typeof window !== "undefined") {
        // Import GSAP properly for cleanup
        try {
          const { gsap } = require("gsap");
          const { ScrollTrigger } = require("gsap/dist/ScrollTrigger");

          // Kill all ScrollTrigger instances
          if (ScrollTrigger) {
            ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
          }

          // Kill tweens targeting our elements
          if (gsap && gsap.killTweensOf) {
            const elements = [
              titleRef.current,
              underlineRef.current,
              descriptionRef.current,
              statsRef.current,
            ].filter(Boolean);

            elements.forEach((el) => {
              if (el) gsap.killTweensOf(el);
            });
          }
        } catch (err) {
          console.warn("Error cleaning up GSAP animations:", err);
        }
      }
    };
  }, []);

  // Initial values for stats to prevent flash of 0s
  const initialStats = {
    professionals: "45",
    experience: "37",
    projects: "250",
  };

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
              quality={100}
              priority
              style={{
                objectFit: "cover",
                objectPosition: "center",
                willChange: "transform",
              }}
            />
          </div>

          <div className="hero-section__overlay"></div>

          <div className="hero-section__content">
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

            {/* <div ref={statsRef} className="hero-section__stats">
              <div className="hero-section__stat">
                <span className="hero-section__stat-value" data-target="45">
                  {initialStats.professionals}
                </span>
                <span className="hero-section__stat-label">Profesionales</span>
              </div>
              <div className="hero-section__stat">
                <span className="hero-section__stat-value" data-target="37">
                  {initialStats.experience}
                </span>
                <span className="hero-section__stat-label">
                  Años de experiencia
                </span>
              </div>
              <div className="hero-section__stat">
                <span className="hero-section__stat-value" data-target="250">
                  {initialStats.projects}
                </span>
                <span className="hero-section__stat-label">
                  Proyectos completados
                </span>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="random-images">
        <div
          className="random-images__decorative-elements"
          ref={decorElementsRef}
        >
          <div ref={decorDotsRef} className="random-images__decor-dots"></div>
          <div ref={decorLineRef} className="random-images__decor-line"></div>
          <div
            ref={decorCircleRef}
            className="random-images__decor-circle"
          ></div>
          <div ref={decorGridRef} className="random-images__decor-grid"></div>
        </div>

        <div
          ref={floatingImage1Ref}
          className="random-images__container random-images__container--1"
        >
          <div className="corner corner--tl"></div>
          <div className="corner corner--tr"></div>
          <div className="corner corner--bl"></div>
          <div className="corner corner--br"></div>

          <div
            ref={floatingImageInner1Ref}
            className="random-images__inner-container"
          >
            <Image
              src="/assets/img/about-us-page/fiesta-1.jpg"
              alt="Interior design"
              fill
              priority
              quality={100}
              className="random-images__img"
              sizes="(min-width: 1024px) 80vw, (min-width: 768px) 60vw, 90vw"
            />
            <div className="random-images__overlay"></div>
            <div className="random-images__watermark">dosxdos</div>
          </div>
        </div>

        <div
          ref={floatingImage2Ref}
          className="random-images__container random-images__container--2"
        >
          <div className="corner corner--tl"></div>
          <div className="corner corner--tr"></div>
          <div className="corner corner--bl"></div>
          <div className="corner corner--br"></div>

          <div
            ref={floatingImageInner2Ref}
            className="random-images__inner-container"
          >
            <Image
              src="/assets/img/about-us-page/fiesta-2.jpg"
              alt="Interior design"
              fill
              priority
              quality={100}
              className="random-images__img"
              sizes="(min-width: 1024px) 80vw, (min-width: 768px) 60vw, 90vw"
            />
            <div className="random-images__overlay"></div>
            <div className="random-images__watermark">dosxdos</div>
          </div>
        </div>

        <div
          ref={floatingImage3Ref}
          className="random-images__container random-images__container--3"
        >
          <div className="corner corner--tl"></div>
          <div className="corner corner--tr"></div>
          <div className="corner corner--bl"></div>
          <div className="corner corner--br"></div>

          <div
            ref={floatingImageInner3Ref}
            className="random-images__inner-container"
          >
            <Image
              src="/assets/img/about-us-page/fiesta-3.jpg"
              alt="Interior design"
              fill
              priority
              quality={100}
              className="random-images__img"
              sizes="(min-width: 1024px) 80vw, (min-width: 768px) 60vw, 90vw"
            />
            <div className="random-images__overlay"></div>
            <div className="random-images__watermark">dosxdos</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
