"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import dynamic from "next/dynamic";
import useScrollSmooth from "@/hooks/useScrollSmooth";
import { gsap } from "gsap";
import { ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

import SocialIcons from "@/components/SocialIcons/SocialIcons";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

// Lazy load heavy components
const Footer = dynamic(() => import("@/components/layout/Footer/footer"), {
  ssr: false,
});

const ContactForm = dynamic(
  () => import("@/components/ContactForm/ContactForm"),
  { ssr: false }
);

const LocationCard = dynamic(
  () => import("@/components/LocationCard/LocationCard"),
  { ssr: false }
);

const ZohoContactForm = dynamic(
  () => import("@/components/ZohoContactForm/ZohoContactForm"),
  { ssr: false }
);

// Lazy load animations to reduce initial bundle size
const loadAnimations = () => {
  return Promise.all([
    import("@/utils/animations/text-anim"),
    import("@/utils/animations/highlight-anim"),
    import("@/utils/animations/mouse-move-anim"),
    import("@/utils/animations/footer-anim"),
  ]);
};

import "./contact-page.scss";

const ContactPage: React.FC = () => {
  useScrollSmooth();
  const cleanupRef = useRef<(() => void) | null>(null);
  const [heroReady, setHeroReady] = useState(false);
  const [animationsLoaded, setAnimationsLoaded] = useState(false);
  const animationsInitialized = useRef(false);

  useEffect(() => {
    document.body.classList.add("smooth-scroll");

    // Preload animations after component mounts
    loadAnimations().then(() => {
      setAnimationsLoaded(true);
    });

    // Hero is ready immediately for this page (no image loading callback)
    setHeroReady(true);

    return () => {
      document.body.classList.remove("smooth-scroll");

      // Execute cleanup if it exists
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, []);

  // Initialize animations only once when both conditions are met
  const initializeAnimations = useCallback(async () => {
    if (animationsInitialized.current || !heroReady || !animationsLoaded) {
      return;
    }

    animationsInitialized.current = true;

    try {
      const [
        { charAnimation },
        { highlightAnimation },
        { setupMouseMoveAnimation },
        { footerAnimation },
      ] = await loadAnimations();

      // Use requestIdleCallback for better performance
      const runAnimations = () => {
        charAnimation();
        footerAnimation();
        highlightAnimation();

        // Mouse move animation returns cleanup function
        cleanupRef.current = setupMouseMoveAnimation();
      };

      if ("requestIdleCallback" in window) {
        requestIdleCallback(runAnimations);
      } else {
        setTimeout(runAnimations, 100);
      }
    } catch (error) {
      console.error("Failed to load animations:", error);
    }
  }, [heroReady, animationsLoaded]);

  // Run animations when conditions are met
  useEffect(() => {
    initializeAnimations();
  }, [initializeAnimations]);

  return (
    <PageWrapper>
      <div className="contact-page">
        <div className="contact-page__container">
          <div className="contact-page__header">
            <h4 className="contact-page__subtitle label">
              (Solicita tu presupuesto personalizado, sin compromiso)
            </h4>
            <h1 className="contact-page__title char-animation">Contáctanos</h1>
          </div>

          <div className="contact-page__layout">
            <div className="contact-page__left ">
              <div className="contact-page__left-info-section">
                <p>
                  Contacta con nosotros para cualquier tipo de consulta o para
                  obtener más información. Nuestro equipo te responderá lo antes
                  posible.
                </p>
                <div className="contact-page__info-divider"></div>
                <div className="contact-page__additional-info">
                  <h2 className="contact-page__additional-info-title small-title">
                    Horario de atención
                  </h2>
                  <p>
                    Lunes a Jueves, 08:00 - 16:00 <br />
                    Viernes, 08:00 - 14:45
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-page__right ">
              <ZohoContactForm />
            </div>
          </div>

          <div className="contact-page__offices ">
            <h2 className="offices-title">
              Nuestras <span className="highlight">Oficinas</span>
            </h2>

            <div className="offices-grid location-cards-container">
              <LocationCard
                key="location-canarias-1"
                city="Gran Canaria"
                timezone="GMT+0"
                timeZoneIdentifier="Atlantic/Canary"
                address={["Calle Arado, nº2", "35220 Telde", "Gran Canaria"]}
                email="hola@dospordosgrupoimagen.com"
                phones={["+34 928 71 22 22"]}
                mapUrl="https://maps.google.com/?q=Calle+Arado+2+35220+Telde+Gran+Canaria"
              />

              <LocationCard
                key="location-madrid-2"
                city="Madrid"
                timezone="GMT+1"
                timeZoneIdentifier="Europe/Madrid"
                address={[
                  "Calle Vicente Aleixandre, 2",
                  "Humanes de Madrid (MADRID)",
                ]}
                email="hola@dospordosgrupoimagen.com"
                phones={["+34 916 04 84 95"]}
                mapUrl="https://maps.google.com/?q=Calle+Vicente+Aleixandre+2+28970+Humanes+de+Madrid"
              />
            </div>
          </div>

          <div className="contact-page__desktop-social-cta ">
            <h3 className="small-title">
              Si quieres conocer{" "}
              <span className="highlight">nuestros últimos proyectos</span>{" "}
              únete a nuestras redes sociales y permanece en contacto.
            </h3>
            <div className="contact-page__desktop-social-icons">
              <SocialIcons orientation="horizontal" color="primary" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </PageWrapper>
  );
};

export default ContactPage;
