"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import useScrollSmooth from "@/hooks/useScrollSmooth";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";
import { gsap } from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

import "./not-found.scss";
import Footer from "@/components/layout/Footer/footer";
import { initNotFoundAnimations } from "@/utils/animations/not-found-anim";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

const NotFound = () => {
  const router = useRouter();
  const cleanupRef = useRef<(() => void) | null>(null);

  useScrollSmooth();

  useEffect(() => {
    document.body.classList.add("smooth-scroll");

    return () => {
      document.body.classList.remove("smooth-scroll");

      // Execute cleanup if it exists
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, []);

  useGSAP(() => {
    const timer = setTimeout(() => {
      initNotFoundAnimations();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  });

  return (
    <PageWrapper>
      <div className="not-found">
        <div className="not-found__container">
          <div className="not-found__content">
            <h1 className="not-found__title char-animation">404</h1>

            <h2 className="not-found__subtitle">PÁGINA NO ENCONTRADA</h2>

            <p className="not-found__text">
              La página que estás buscando no existe o ha sido movida. Puedes
              volver a la página de inicio o explorar otros contenidos.
            </p>

            <div className="not-found__cta">
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
    </PageWrapper>
  );
};

export default NotFound;
