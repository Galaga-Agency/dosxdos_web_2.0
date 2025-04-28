"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";
import { gsap } from "gsap";
import {
  initNotFoundAnimations,
  cleanupNotFoundAnimations,
} from "@/utils/animations/not-found-anim";
import "./not-found.scss";

const NotFound = () => {
  const router = useRouter();

  // Refs for animation
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Initialize animations when component mounts
  useEffect(() => {
    // Start animations
    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        initNotFoundAnimations({
          container: containerRef.current || undefined,
          title: titleRef.current || undefined,
          subtitle: subtitleRef.current || undefined,
          number: numberRef.current || undefined,
          image: imageRef.current || undefined,
          cta: ctaRef.current || undefined,
        });
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      cleanupNotFoundAnimations();
    };
  }, []);

  return (
    <SmoothScrollWrapper>
      <div ref={containerRef} className="not-found">
        <div className="not-found__container">
          <div className="not-found__content">
            <div ref={numberRef} className="not-found__number">
              <span>404</span>
            </div>

            <h1 ref={titleRef} className="not-found__title">
              Página <span className="highlight">no encontrada</span>
            </h1>

            <p ref={subtitleRef} className="not-found__subtitle">
              La página que estás buscando no existe o ha sido movida. Puedes
              volver a la página de inicio o explorar otros contenidos.
            </p>

            <div ref={ctaRef} className="not-found__cta">
              <SecondaryButton
                onClick={() => router.back()}
                className="not-found__back-button"
                size="medium"
              >
                <span className="arrow">←</span> Volver
              </SecondaryButton>

              <PrimaryButton
                href="/"
                className="not-found__home-button"
                size="medium"
              >
                <span className="button-text">Ir al inicio</span>
                <span className="button-icon">→</span>
              </PrimaryButton>
            </div>
          </div>

          <div ref={imageRef} className="not-found__image-wrapper">
            <div className="not-found__image-frame">
              <div className="not-found__logo">
                <Image
                  src="/assets/img/logo/logo-black-bg-transparent.png"
                  alt="Espacio diseñado por dosxdos"
                  width={180}
                  height={180}
                  className="not-found__logo-image"
                  priority
                />
              </div>
              <div className="not-found__image-corner tl"></div>
              <div className="not-found__image-corner tr"></div>
              <div className="not-found__image-corner bl"></div>
              <div className="not-found__image-corner br"></div>
            </div>
          </div>
        </div>

        <div className="not-found__background-elements">
          <div className="not-found__bg-line line-1"></div>
          <div className="not-found__bg-line line-2"></div>
        </div>
      </div>
    </SmoothScrollWrapper>
  );
};

export default NotFound;
