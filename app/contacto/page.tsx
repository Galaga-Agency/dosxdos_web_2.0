"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactForm from "@/components/ContactForm/ContactForm";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import LocationCard from "@/components/LocationCard/LocationCard";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import {
  initContactPageAnimations,
  cleanupContactPageAnimations,
} from "@/utils/animations/pages/contact-page-anim";
import { initScrollTriggerConfig } from "@/utils/animations/scrolltrigger-config";
import "./ContactPage.scss";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ContactPage: React.FC = () => {
  // Force component remount on each page visit
  const [key] = useState(() => Date.now());

  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const leftSectionRef = useRef<HTMLDivElement>(null);
  const rightSectionRef = useRef<HTMLDivElement>(null);
  const officesSectionRef = useRef<HTMLDivElement>(null);
  const officesGridRef = useRef<HTMLDivElement>(null);
  const socialCtaRef = useRef<HTMLDivElement>(null);

  // Initialize ScrollTrigger configuration once
  useEffect(() => {
    initScrollTriggerConfig();
  }, []);

  useEffect(() => {
    // Ensure animations run after component mount
    const timer = setTimeout(() => {
      // Initialize all animations
      initContactPageAnimations({
        title: titleRef.current,
        subtitle: subtitleRef.current,
        leftSection: leftSectionRef.current,
        rightSection: rightSectionRef.current,
        officesSection: officesSectionRef.current,
        officesGrid: officesGridRef.current,
        socialCta: socialCtaRef.current,
      });
    }, 300);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      cleanupContactPageAnimations();
    };
  }, []);

  return (
    <SmoothScrollWrapper>
      <div className="contact-page" key={key}>
        <div className="contact-page__container">
          <div className="contact-page__social-sidebar">
            <div className="contact-page__social-wrapper">
              <span className="contact-page__social-label">Síguenos</span>
              <SocialIcons orientation="vertical" color="primary" />
            </div>
          </div>

          <div className="contact-page__header">
            <h4 ref={subtitleRef} className="contact-page__subtitle">
              Solicite su presupuesto personalizado, sin compromiso
            </h4>
            <h1 ref={titleRef} className="contact-page__title char-animation">
              Contáctenos
            </h1>
          </div>

          <div className="contact-page__layout">
            <div ref={leftSectionRef} className="contact-page__left">
              <div className="contact-page__left-info-section">
                <p>
                  Contacte con nosotros para cualquier tipo de consulta o para
                  obtener más información. Nuestro equipo le responderá lo antes
                  posible.
                </p>
                <div className="contact-page__info-divider"></div>
                <div className="contact-page__additional-info">
                  <p>
                    <strong>Horario de atención:</strong> Lunes a Viernes, 9:00
                    - 18:00
                  </p>
                </div>
              </div>
            </div>

            <div ref={rightSectionRef} className="contact-page__right">
              <ContactForm />
            </div>
          </div>

          <div ref={officesSectionRef} className="contact-page__offices">
            <h2 className="offices-title">Nuestras Oficinas</h2>

            <div ref={officesGridRef} className="offices-grid">
              <LocationCard
                key={`location-canarias-${key}`}
                city="Gran Canaria"
                timezone="GMT+0"
                timeZoneIdentifier="Atlantic/Canary"
                address={["Calle Arado, nº2", "35220 Telde", "Gran Canaria"]}
                email="hola@dospordosgrupoimagen.com"
                phones={["+34 928 71 22 22"]}
                mapUrl="https://maps.google.com/?q=Calle+Arado+2+35220+Telde+Gran+Canaria"
              />

              <LocationCard
                key={`location-madrid-${key}`}
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

          <div ref={socialCtaRef} className="contact-page__desktop-social-cta">
            <div className="contact-page__desktop-social-cta-content">
              <h3>
                Si quiere conocer nuestros últimos proyectos únase a nuestras
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
