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

      // Clean up any GSAP animations when component unmounts
      if (typeof window !== "undefined") {
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
              titleRef1.current,
              titleRef2.current,
              descriptionRef.current,
              ctaRef.current,
              bgContainerRef.current,
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

  return (
    <div className="accion-social-hero" ref={heroAreaRef}>
      <div className="accion-social-hero__bg-container" ref={bgContainerRef}>
        <div className="accion-social-hero__image-wrapper">
          <Image
            src="/assets/img/blog/default-blog-image.jpg"
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

        <div
          className="accion-social-hero__decorative-elements"
          ref={decorElementsRef}
        >
          <div
            ref={decorDotsRef}
            className="accion-social-hero__decor-dots"
          ></div>
          <div
            ref={decorLineRef}
            className="accion-social-hero__decor-line"
          ></div>
          <div
            ref={decorCircleRef}
            className="accion-social-hero__decor-circle"
          ></div>
          <div
            ref={decorGridRef}
            className="accion-social-hero__decor-grid"
          ></div>
        </div>

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
