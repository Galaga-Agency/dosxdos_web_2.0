"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { PhoneCall, Mail, ArrowRight, ChevronRight } from "lucide-react";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import Image from "next/image";
import { useFooterAnimations } from "@/hooks/useFooterAnimations";
import logo from "@/public/assets/img/logo/logo_full_rojo.png";
import "./Footer.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Refs for animations
  const footerRef = useRef(null);
  const brandRef = useRef(null);
  const contactRef = useRef(null);
  const navRef = useRef(null);
  const ctaRef = useRef(null);
  const bottomRef = useRef(null);

  // Use animation hook (make sure to update the animation hook to match these refs)
  useFooterAnimations({
    footerRef,
    brandRef,
    contactRef,
    navRef,
    ctaRef,
    bottomRef,
  });

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer__container">
        <div className="footer__main">
          {/* Brand Section */}
          <div className="footer__brand" ref={brandRef}>
            <div className="footer__brand-content">
              <Link href="/">
                <Image
                  src={logo}
                  alt="Dos por Dos Grupo Imagen"
                  className="footer__logo"
                />
              </Link>
              <p className="footer__tagline">
                Creamos espacios que conectan, emocionan y venden.
              </p>
            </div>
            <div className="footer__contact" ref={contactRef}>
              <a href="mailto:hola@dospordosgrupoimagen.com">
                <span className="icon">
                  <Mail size={16} />
                </span>
                hola@dospordosgrupoimagen.com
              </a>
              <a href="tel:+34928712222">
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
                  <Link href="/servicios/interiorismo-comercial">
                    <span>Interiorismo comercial</span>
                    <ChevronRight size={14} className="link-arrow" />
                  </Link>
                </li>
                <li>
                  <Link href="/servicios/produccion-digital">
                    <span>Producción digital</span>
                    <ChevronRight size={14} className="link-arrow" />
                  </Link>
                </li>
                <li>
                  <Link href="/servicios/perfumeria">
                    <span>Perfumería</span>
                    <ChevronRight size={14} className="link-arrow" />
                  </Link>
                </li>
                <li>
                  <Link href="/servicios/shop-in-shop">
                    <span>Shop in shop</span>
                    <ChevronRight size={14} className="link-arrow" />
                  </Link>
                </li>
                <li>
                  <Link href="/servicios/escaparatismo">
                    <span>Escaparatismo</span>
                    <ChevronRight size={14} className="link-arrow" />
                  </Link>
                </li>
                <li>
                  <Link href="/servicios/espacios-promocionales">
                    <span>Espacios Promocionales</span>
                    <ChevronRight size={14} className="link-arrow" />
                  </Link>
                </li>
                <li>
                  <Link href="/servicios/pergolas">
                    <span>Pérgolas</span>
                    <ChevronRight size={14} className="link-arrow" />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer__nav-column">
              <h4>Navegación</h4>
              <ul>
                <li>
                  <Link href="/sobre-nosotros">
                    <span>Sobre Nosotros</span>
                    <ChevronRight size={14} className="link-arrow" />
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio">
                    <span>Portfolio</span>
                    <ChevronRight size={14} className="link-arrow" />
                  </Link>
                </li>
                <li>
                  <Link href="/blog">
                    <span>Blog</span>
                    <ChevronRight size={14} className="link-arrow" />
                  </Link>
                </li>
                <li>
                  <Link href="/contacto">
                    <span>Contacto</span>
                    <ChevronRight size={14} className="link-arrow" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="footer__cta" ref={ctaRef}>
            <div className="footer__cta-content">
              <h4>¿Hablamos?</h4>
              <p>¿Tienes un nuevo proyecto? Lo hacemos real.</p>
              <Link href="/contacto" className="footer__cta-button">
                <span>Solicita presupuesto</span>
                <ArrowRight size={16} />
              </Link>
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
              <Link href="/politica-privacidad">Política de Privacidad</Link>
              <Link href="/aviso-legal">Aviso Legal</Link>
              <Link href="/politica-cookies">Política de Cookies</Link>
              <Link href="/transparencia">Transparencia</Link>
            </div>
          </div>
          <div className="footer__social">
            <SocialIcons iconSize="large" color="white" />
          </div>
        </div>
      </div>

      <div className="footer__bg-shape"></div>
    </footer>
  );
};

export default Footer;
