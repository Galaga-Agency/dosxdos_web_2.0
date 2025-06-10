"use client";

import React from "react";
import Link from "next/link";
import { PhoneCall, Mail, ArrowRight, ChevronRight } from "lucide-react";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import Image from "next/image";
import logo from "@/public/assets/img/logo/logo_full_negro.png";
import "./Footer.scss";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__main">
          {/* Brand Section */}
          <div className="footer__brand">
            <div className="footer__brand-content">
              <Link href="/">
                <Image
                  src={logo}
                  alt="Dos por Dos Grupo Imagen"
                  className="footer__logo"
                />
              </Link>
              <p className="footer__tagline">Creamos espacios que inspiran.</p>
            </div>
            <div className="footer__contact">
              <Link href="mailto:hola@dospordosgrupoimagen.com">
                <span className="icon">
                  <Mail size={16} />
                </span>
                hola@dospordosgrupoimagen.com
              </Link>
              <Link href="tel:+34928712222">
                <span className="icon">
                  <PhoneCall size={16} />
                </span>
                +34 928 712 222
              </Link>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="footer__nav-wrapper">
            <div className="footer__nav-column">
              <h4>Servicios</h4>
              <ul className="footer__nav">
                <li>
                  <Link href="/servicios/consultoria">
                    <span>Consultoría</span>
                    <ChevronRight size={14} className="link-arrow" />
                  </Link>
                </li>
                <li>
                  <Link href="/servicios/diseno-de-interiores">
                    <span>Diseño de Interiores</span>
                    <ChevronRight size={14} className="link-arrow" />
                  </Link>
                </li>
                <li>
                  <Link href="/servicios/fabricacion-impresion">
                    <span>Fabricación e Impresión</span>
                    <ChevronRight size={14} className="link-arrow" />
                  </Link>
                </li>
                <li>
                  <Link href="/servicios/montaje-mantenimiento">
                    <span>Montaje y Mantenimiento</span>
                    <ChevronRight size={14} className="link-arrow" />
                  </Link>
                </li>
                <li>
                  <Link href="/servicios/comunicacion">
                    <span>Comunicación</span>
                    <ChevronRight size={14} className="link-arrow" />
                  </Link>
                </li>
                <li>
                  <Link href="/servicios/eventos">
                    <span>Eventos</span>
                    <ChevronRight size={14} className="link-arrow" />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer__nav-column">
              <h4>Navegación</h4>
              <ul className="footer__nav">
                <li>
                  <Link href="/sobre-nosotros/equipo">
                    <span>Sobre Nosotros</span>
                    <ChevronRight size={14} className="link-arrow" />
                  </Link>
                </li>
                <li>
                  <Link href="/servicios">
                    <span>Servicios</span>
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
          <div className="footer__cta">
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
        <div className="footer__bottom">
          <div className="footer__bottom-left">
            <div className="footer__copyright">
              <p>
                © {currentYear} Dos por Dos Grupo Imagen. Todos los derechos
                reservados.
              </p>
            </div>
            <div className="footer__legal-links">
              <Link href="/politica-de-privacidad">Política de Privacidad</Link>
              <Link href="/aviso-legal">Aviso Legal</Link>
              <Link href="/politica-de-cookies">Política de Cookies</Link>
              <Link href="/transparencia">Transparencia</Link>
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
