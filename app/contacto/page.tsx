"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactForm from "@/components/ContactForm/ContactForm";
import { charAnimation } from "@/utils/animations/title-anim";
import "./contacto.scss";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ContactPage: React.FC = () => {
  useEffect(() => {
    // Ensure the animation runs after component mount
    const timer = setTimeout(() => {
      charAnimation();
    }, 100);

    // Cleanup function
    return () => clearTimeout(timer);
  }, []);

  return (
    <SmoothScrollWrapper>
      <div className="contact-page">
        <div className="contact-page__header">
          <h4 className="contact-page__subtitle">Dos x Dos Grupo Imagen</h4>
          <h1 className="contact-page__title char-animation">Contáctanos</h1>
        </div>

        <div className="contact-page__layout">
          <div className="contact-page__left">
            <div className="contact-page__left-info-section">
              <h2>Envía un Mensaje</h2>
              <p>Contáctanos</p>
            </div>
          </div>

          <div className="contact-page__right">
            <ContactForm />
          </div>
        </div>
      </div>
    </SmoothScrollWrapper>
  );
};

export default ContactPage;
