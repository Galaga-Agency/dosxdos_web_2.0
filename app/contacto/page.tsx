"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactForm from "@/components/ContactForm/ContactForm";
import { charAnimation } from "@/utils/animations/title-anim";
import "./contacto.scss";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import LocationCard from "@/components/LocationCard/LocationCard";
import SocialIcons from "@/components/SocialIcons/SocialIcons";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ContactPage: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Ensure the title is initially hidden
    if (titleRef.current) {
      gsap.set(titleRef.current, {
        visibility: "hidden",
      });

      // Ensure the animation runs after component mount
      const timer = setTimeout(() => {
        // If charAnimation is a function that takes a ref or selector
        charAnimation(titleRef.current);
      }, 1500);

      // Cleanup function
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <SmoothScrollWrapper>
      <div className="contact-page">
        <div className="contact-page__container">
          <div className="contact-page__social-sidebar">
            <div className="contact-page__social-wrapper">
              <span className="contact-page__social-label">Síguenos</span>
              <SocialIcons orientation="vertical" color="primary" />
            </div>
          </div>

          <div className="contact-page__header">
            <h4 className="contact-page__subtitle">
              Solicite su presupuesto personalizado, sin compromiso
            </h4>
            <h1 ref={titleRef} className="contact-page__title char-animation">
              Contáctenos
            </h1>
          </div>

          <div className="contact-page__layout">
            <div className="contact-page__left">
              <div className="contact-page__left-info-section">
                <p>
                  Contacte con nosotros para cualquier tipo de consulta o para
                  obtener más información. Nuestro equipo le responderá lo antes
                  posible.
                </p>
              </div>
            </div>

            <div className="contact-page__right">
              <ContactForm />
            </div>
          </div>

          <div className="contact-page__offices">
            <h2 className="offices-title">Nuestras Oficinas</h2>

            <div className="offices-grid">
              <LocationCard
                city="Gran Canaria"
                timezone="GMT+0"
                timeZoneIdentifier="Atlantic/Canary"
                address={["Calle Arado, nº2", "35220 Telde", "Gran Canaria"]}
                email="hola@dospordosgrupoimagen.com"
                phones={["+34 928 71 22 22"]}
                mapUrl="https://maps.google.com/?q=Calle+Arado+2+35220+Telde+Gran+Canaria"
              />

              <LocationCard
                city="Madrid"
                timezone="GMT+1"
                timeZoneIdentifier="Europe/Madrid"
                address={[
                  "Calle Vicente Aleixandre, 2",
                  "ENTPL;16, 28970",
                  "Humanes de Madrid (MADRID)",
                ]}
                email="hola@dospordosgrupoimagen.com"
                phones={["+34 916 04 84 95"]}
                mapUrl="https://maps.google.com/?q=Calle+Vicente+Aleixandre+2+28970+Humanes+de+Madrid"
              />
            </div>
          </div>
          <div className="contact-page__mobile-social-section">
            <div className="contact-page__mobile-social-header">
              <h3 className="contact-page__mobile-social-title">Síguenos</h3>
              <div className="contact-page__mobile-social-divider"></div>
            </div>
            <SocialIcons orientation="horizontal" color="primary" />
          </div>
          <div className="contact-page__desktop-social-cta">
            <div className="contact-page__desktop-social-cta-content">
              <h3>
                Si quiere conocer nuestros últimos proyectos únese a nuestras
                redes sociales y permanece en contacto.
              </h3>
              <div className="contact-page__desktop-social-icons">
                <SocialIcons orientation="horizontal" color="primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SmoothScrollWrapper>
  );
};

export default ContactPage;
