"use client";

import React, { useEffect, useRef } from "react";
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
import Footer from "@/components/layout/Footer/footer";
import { footerAnimation } from "@/utils/animations/footer-anim";

const NotFound = () => {
  const router = useRouter();

  // Refs for animation
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Initialize animations when component mounts
  useEffect(() => {
    // Start animations
    const timer = setTimeout(() => {
      footerAnimation();
      requestAnimationFrame(() => {
        initNotFoundAnimations({
          container: containerRef.current || undefined,
          title: titleRef.current || undefined,
          subtitle: subtitleRef.current || undefined,
          content: contentRef.current || undefined,
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
      <div className="not-found">
        <div className="not-found__container">
          <div ref={contentRef} className="not-found__content">
            <h1 ref={titleRef} className="not-found__title">
              404
            </h1>

            <h2 ref={subtitleRef} className="not-found__subtitle">
              PÁGINA NO ENCONTRADA
            </h2>

            <p className="not-found__text">
              La página que estás buscando no existe o ha sido movida. Puedes
              volver a la página de inicio o explorar otros contenidos.
            </p>

            <div ref={ctaRef} className="not-found__cta">
              <SecondaryButton
                onClick={() => router.back()}
                className="not-found__back-button"
                lightBg={true}
              >
                ← Volver
              </SecondaryButton>

              <PrimaryButton href="/" className="not-found__home-button">
                Ir al inicio
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </SmoothScrollWrapper>
  );
};

export default NotFound;
