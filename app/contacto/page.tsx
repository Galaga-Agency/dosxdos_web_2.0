"use client";

import React, { useEffect, useRef } from "react";
import useScrollSmooth from "@/hooks/useScrollSmooth";
import { gsap } from "gsap";
import { ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

import ContactForm from "@/components/ContactForm/ContactForm";
import LocationCard from "@/components/LocationCard/LocationCard";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import Footer from "@/components/layout/Footer/footer";
import ZohoContactForm from "@/components/ZohoContactForm/ZohoContactForm";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

import { charAnimation } from "@/utils/animations/text-anim";
import { highlightAnimation } from "@/utils/animations/highlight-anim";
import { setupMouseMoveAnimation } from "@/utils/animations/mouse-move-anim";

import "./contact-page.scss";
import { footerAnimation } from "@/utils/animations/footer-anim";

const ContactPage: React.FC = () => {
  useScrollSmooth();

  const cleanupRef = useRef<(() => void) | null>(null);

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
      charAnimation();
      footerAnimation();
      highlightAnimation();

      // Store cleanup function
      cleanupRef.current = setupMouseMoveAnimation();
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
      <div className="contact-page">
        <div className="contact-page__container">
          <div className="contact-page__header">
            <h4 className="contact-page__subtitle label">
              (Solicita tu presupuesto personalizado, sin compromiso)
            </h4>
            <h1 className="contact-page__title char-animation">Contáctanos</h1>
          </div>

          <div className="contact-page__layout">
            <div className="contact-page__left fade_bottom">
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

            <div className="contact-page__right fade_bottom">
              <ZohoContactForm />
            </div>
          </div>

          <div className="contact-page__offices fade_bottom">
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

          <div className="contact-page__desktop-social-cta fade_bottom">
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
