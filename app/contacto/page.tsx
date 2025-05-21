"use client";

import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, SplitText, ScrollSmoother } from "@/plugins";
import { useGSAP } from "@gsap/react";
import useScrollSmooth from "@/hooks/useScrollSmooth";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

import ContactForm from "@/components/ContactForm/ContactForm";
import LocationCard from "@/components/LocationCard/LocationCard";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import Footer from "@/components/layout/Footer/footer";

import { charAnimation, fadeAnimation } from "@/utils/animations/text-anim";

import "./contact-page.scss";

const ContactPage: React.FC = () => {
  useScrollSmooth();

  useEffect(() => {
    document.body.classList.add("smooth-scroll");
    return () => {
      document.body.classList.remove("smooth-scroll");
    };
  }, []);

  useGSAP(() => {
    const timer = setTimeout(() => {
      fadeAnimation();
      charAnimation();
    }, 300);

    return () => clearTimeout(timer);
  });

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="contact-page">
          <div className="contact-page__container">
            <div className="contact-page__header">
              <h4 className="contact-page__subtitle">
                Solicite su presupuesto personalizado, sin compromiso
              </h4>
              <h1 className="contact-page__title char-animation">
                Contáctenos
              </h1>
            </div>

            <div className="contact-page__layout">
              <div className="contact-page__left fade_bottom">
                <div className="contact-page__left-info-section">
                  <p>
                    Contacte con nosotros para cualquier tipo de consulta o para
                    obtener más información. Nuestro equipo le responderá lo
                    antes posible.
                  </p>
                  <div className="contact-page__info-divider"></div>
                  <div className="contact-page__additional-info">
                    <p>
                      <strong>Horario de atención:</strong> Lunes a Viernes,
                      9:00 - 18:00
                    </p>
                  </div>
                </div>
              </div>

              <div className="contact-page__right fade_bottom">
                <ContactForm />
              </div>
            </div>

            <div className="contact-page__offices fade_bottom">
              <h2 className="offices-title">Nuestras Oficinas</h2>

              <div className="offices-grid location-cards-container">
                <LocationCard
                  key={`location-canarias-1`}
                  city="Gran Canaria"
                  timezone="GMT+0"
                  timeZoneIdentifier="Atlantic/Canary"
                  address={["Calle Arado, nº2", "35220 Telde", "Gran Canaria"]}
                  email="hola@dospordosgrupoimagen.com"
                  phones={["+34 928 71 22 22"]}
                  mapUrl="https://maps.google.com/?q=Calle+Arado+2+35220+Telde+Gran+Canaria"
                />

                <LocationCard
                  key={`location-madrid-2`}
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

            <div className="contact-page__desktop-social-cta fade_bottom">
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
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;
