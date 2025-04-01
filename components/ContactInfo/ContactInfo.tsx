"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Mail, Phone, MapPin } from "lucide-react";

import "./ContactInfo.scss";

const ContactInfo: React.FC = () => {
  const infoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (infoRef.current) {
      const infoItems = infoRef.current.querySelectorAll(".contact-info-item");

      gsap.fromTo(
        infoItems,
        {
          opacity: 0,
          x: -50,
        },
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }
  }, []);

  return (
    <div ref={infoRef} className="contact-info-section">
      <div className="contact-message-section">
        <h2>Información de Contacto</h2>
        <p>
          Estamos listos para escuchar sobre tu proyecto y cómo podemos
          ayudarte.
        </p>

        <div className="contact-info-list">
          <div className="contact-info-item">
            <div className="contact-info-icon">
              <Mail size={24} />
            </div>
            <div className="contact-info-content">
              <h3>Correo Electrónico</h3>
              <p>hola@dospordosgrupoimagen.com</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon">
              <Phone size={24} />
            </div>
            <div className="contact-info-content">
              <h3>Teléfono</h3>
              <p>+52 (55) 1234 5678</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon">
              <MapPin size={24} />
            </div>
            <div className="contact-info-content">
              <h3>Ubicación</h3>
              <p>Ciudad de México, CDMX</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
