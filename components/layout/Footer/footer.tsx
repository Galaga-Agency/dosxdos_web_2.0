"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { PhoneCall, Mail, ArrowRight, ChevronRight } from "lucide-react";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import Image from "next/image";
import { initFooterAnimations } from "@/utils/animations/footer-anim";
import logo from "@/public/assets/img/logo/logo_full_negro.png";
import "./Footer.scss";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import TransitionLink from "@/components/TransitionLink";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Refs for animations
  const footerRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Initialize animations on component mount
  useEffect(() => {
    // First, ensure all elements are fully visible
    const ensureVisibility = () => {
      if (contactRef.current) {
        // Reset any opacity or transform that might be applied
        const contactLinks = contactRef.current.querySelectorAll("a");
        contactLinks.forEach((link) => {
          link.style.opacity = "1";
          link.style.transform = "none";
        });
      }
    };

    // Call immediately to prevent flicker
    ensureVisibility();

    // Small delay to ensure DOM is fully rendered before animations
    const timeoutId = setTimeout(() => {
      const cleanup = initFooterAnimations({
        footer: footerRef.current,
        brand: brandRef.current,
        contact: contactRef.current,
        nav: navRef.current,
        cta: ctaRef.current,
        bottom: bottomRef.current,
      });

      // Cleanup on unmount
      return () => {
        if (typeof cleanup === "function") {
          cleanup();
        }
        // Ensure visibility on cleanup
        ensureVisibility();
      };
    }, 100);

    // Return cleanup function
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer__container">
        <div className="footer__main">
          {/* Brand Section */}
          <div className="footer__brand" ref={brandRef}>
            <div className="footer__brand-content">
              <TransitionLink href="/">
                <Image
                  src={logo}
                  alt="Dos por Dos Grupo Imagen"
                  className="footer__logo"
                />
              </TransitionLink>
              <p className="footer__tagline">Creamos espacios que inspiran.</p>
            </div>
            <div className="footer__contact" ref={contactRef}>
              <a
                href="mailto:hola@dospordosgrupoimagen.com"
                style={{ opacity: 1, transform: "none" }}
              >
                <span className="icon">
                  <Mail size={16} />
                </span>
                hola@dospordosgrupoimagen.com
              </a>
              <a
                href="tel:+34928712222"
                style={{ opacity: 1, transform: "none" }}
              >
                <span className="icon">
                  <PhoneCall size={16} />
                </span>
                +34 928 712 222
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="footer__nav-wrapper" ref={navRef}>
            <div className="footer__nav-column">
              <h4>Servicios</h4>
              <ul>
                <li>
                  <TransitionLink href="/servicios/diseno-de-interiores">
                    <span>Diseño de Interiores</span>
                    <ChevronRight size={14} className="link-arrow" />
                  </TransitionLink>
                </li>
                <li>
                  <TransitionLink href="/servicios/eventos">
                    <span>Eventos</span>
                    <ChevronRight size={14} className="link-arrow" />
                  </TransitionLink>
                </li>
                <li>
                  <TransitionLink href="/servicios/produccion">
                    <span>Producción</span>
                    <ChevronRight size={14} className="link-arrow" />
                  </TransitionLink>
                </li>
                <li>
                  <TransitionLink href="/servicios/logistica">
                    <span>Logística</span>
                    <ChevronRight size={14} className="link-arrow" />
                  </TransitionLink>
                </li>
                <li>
                  <TransitionLink href="/servicios/communicacion">
                    <span>Comunicación</span>
                    <ChevronRight size={14} className="link-arrow" />
                  </TransitionLink>
                </li>
                <li>
                  <TransitionLink href="/servicios/consultoria">
                    <span>Consultoría</span>
                    <ChevronRight size={14} className="link-arrow" />
                  </TransitionLink>
                </li>
              </ul>
            </div>
            <div className="footer__nav-column">
              <h4>Navegación</h4>
              <ul>
                <li>
                  <TransitionLink href="/sobre-nosotros/equipo">
                    <span>Sobre Nosotros</span>
                    <ChevronRight size={14} className="link-arrow" />
                  </TransitionLink>
                </li>
                <li>
                  <TransitionLink href="/portfolio">
                    <span>Portfolio</span>
                    <ChevronRight size={14} className="link-arrow" />
                  </TransitionLink>
                </li>
                <li>
                  <TransitionLink href="/blog">
                    <span>Blog</span>
                    <ChevronRight size={14} className="link-arrow" />
                  </TransitionLink>
                </li>
                <li>
                  <TransitionLink href="/contacto">
                    <span>Contacto</span>
                    <ChevronRight size={14} className="link-arrow" />
                  </TransitionLink>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="footer__cta" ref={ctaRef}>
            <div className="footer__cta-content">
              <h4>¿Hablamos?</h4>
              <p>¿Tienes un nuevo proyecto? Lo hacemos real.</p>
              <PrimaryButton href="/contacto">
                <span>Solicite presupuesto</span>
                <ArrowRight size={16} />
              </PrimaryButton>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer__bottom" ref={bottomRef}>
          <div className="footer__bottom-left">
            <div className="footer__copyright">
              <p>
                © {currentYear} Dos por Dos Grupo Imagen. Todos los derechos
                reservados.
              </p>
            </div>
            <div className="footer__legal-links">
              <TransitionLink href="/politica-de-privacidad">
                Política de Privacidad
              </TransitionLink>
              <TransitionLink href="/aviso-legal">Aviso Legal</TransitionLink>
              <TransitionLink href="/politica-de-cookies">
                Política de Cookies
              </TransitionLink>
              <TransitionLink href="/transparencia">
                Transparencia
              </TransitionLink>
            </div>
          </div>
          <div className="footer__social">
            <SocialIcons color="white" iconSize="medium" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
