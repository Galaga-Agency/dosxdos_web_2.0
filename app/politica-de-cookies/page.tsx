"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, SplitText, ScrollSmoother } from "@/plugins";
import { useGSAP } from "@gsap/react";
import useScrollSmooth from "@/hooks/useScrollSmooth";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

import SocialIcons from "@/components/SocialIcons/SocialIcons";
import Footer from "@/components/layout/Footer/footer";

import { charAnimation, fadeAnimation } from "@/utils/animations/text-anim";

import "./cookies-page.scss";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Link from "next/link";

const CookiesPage: React.FC = () => {
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
    }, 100);

    return () => clearTimeout(timer);
  });

  return (
    <PageWrapper>
      <div className="cookies-page">
        <div className="cookies-page__container">
          <div className="cookies-page__header">
            <h1 className="cookies-page__title char-animation">
              POLÍTICA DE COOKIES
            </h1>
          </div>

          <div className="cookies-page__content">
            <section className="cookies-page__section">
              <h3 className="cookies-page__section-title fade_bottom">
                Concepto de Cookies
              </h3>
              <p>
                Una cookie es un fichero que se descarga en su ordenador al
                acceder a determinadas páginas web. Las cookies permiten a una
                página web, entre otras cosas, almacenar y recuperar información
                sobre los hábitos de navegación de un usuario o de su equipo y,
                dependiendo de la información que contengan y de la forma en que
                utilice su equipo, pueden utilizarse para reconocer al usuario.
              </p>
              <p>
                Las cookies son instaladas durante la navegación por Internet,
                bien por los sitios web que visita el usuario o bien por
                terceros con los que se relaciona el sitio web, y permiten a
                éste conocer su actividad en el mismo sitio o en otros con los
                que se relaciona éste, por ejemplo: el lugar desde el que
                accede, el tiempo de conexión, el dispositivo desde el que
                accede (fijo o móvil), el sistema operativo y navegador
                utilizados, las páginas más visitadas, el número de clicks
                realizados y de datos respecto al comportamiento del usuario en
                Internet.
              </p>
              <p>
                El sitio web es accesible sin necesidad de que las cookies estén
                activadas, si bien, su desactivación puede impedir el correcto
                funcionamiento de este.
              </p>
            </section>

            <section className="cookies-page__section">
              <h3 className="cookies-page__section-title fade_bottom">
                Autorización para el uso de cookies
              </h3>
              <p>
                De conformidad con el aviso de cookies que aparece en este sitio
                web, el usuario o visitante de los mismos acepta que, al navegar
                por el mismo, consiente expresamente el uso de cookies según la
                descripción que se detalla a continuación, excepto en la medida
                que haya modificado la configuración de su navegador para
                rechazar la utilización de las mismas.
              </p>
            </section>

            <section className="cookies-page__section">
              <h3 className="cookies-page__section-title fade_bottom">
                Tipos de Cookies que se utilizan en la Web
              </h3>
              <p>En este sitio web usamos las cookies para:</p>
              <ul className="cookies-page__list">
                <li>
                  Asegurar que la página web puede funcionar correctamente.
                </li>
                <li>
                  Recopilar información estadística anónima, como qué páginas
                  has visto o cuánto tiempo has estado en el sitio web.
                </li>
              </ul>

              <h4 className="cookies-page__subsection-title">
                3.1. Cookies propias insertadas por el Titular
              </h4>
              <p>
                El Titular de la web utiliza cookies propias que sirven para
                facilitar la correcta navegación en el sitio Web, así como para
                asegurar que el contenido de los mismos se carga eficazmente.
                Algunas de estas cookies son, además, cookies de sesión es decir
                que tienen carácter temporal y expiran y se borran
                automáticamente cuando el usuario cierra su navegador.
              </p>

              <div className="cookies-page__cookie-types">
                <div className="cookies-page__cookie-type fade_left">
                  <h5 className="cookies-page__cookie-title">
                    Cookies de Sesión
                  </h5>
                  <p>
                    Son temporales y desaparecen cuando finaliza la sesión.
                    Ayudan a analizar pautas de tráfico en la web para adecuar a
                    ellas nuestros servicios.
                  </p>
                </div>

                <div className="cookies-page__cookie-type fade_right">
                  <h5 className="cookies-page__cookie-title">
                    Técnicas y funcionales
                  </h5>
                  <p>
                    Son estrictamente necesarias para navegar por este sitio web
                    y utilizar sus diferentes opciones o servicios.
                  </p>
                </div>
              </div>

              <h4 className="cookies-page__subsection-title">
                3.2. Cookies de terceros
              </h4>
              <p>
                Sirven para analizar los hábitos de navegación de los usuarios,
                con el objetivo de optimizar las funcionalidades y el
                mantenimiento técnico y operativo del sitio y garantizar el
                mejor servicio posible.
              </p>
              <p>
                <strong>Cookies de Google.com.gstatic.com:</strong> Puede ver la
                descripción detallada del uso de dichas cookies en:{" "}
                <Link
                  href="https://policies.google.com/technologies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cookies-page__link"
                >
                  https://policies.google.com/technologies
                </Link>
              </p>
            </section>

            <section className="cookies-page__section">
              <h3 className="cookies-page__section-title fade_bottom">
                Configuración del navegador
              </h3>
              <p>
                El Titular recuerda a sus usuarios que el uso de cookies podrá
                estar sujeto a su aceptación durante la instalación o
                actualización del navegador utilizado por éstos. Esta aceptación
                podrá ser revocada mediante las opciones de configuración de
                contenidos y privacidad disponibles en el mismo. El Titular
                recomienda a sus usuarios que consulten la ayuda de su navegador
                o acceda a las páginas web de ayuda de los principales
                navegadores:
              </p>
              <ul className="cookies-page__browser-list">
                <li>
                  <Link
                    href="https://support.mozilla.org/es/kb/impedir-que-los-sitios-web-guarden-sus-preferencia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cookies-page__link"
                  >
                    Firefox
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://support.microsoft.com/es-es/help/17442/windows-internet-explorer-delete-manage-cookies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cookies-page__link"
                  >
                    Internet Explorer
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cookies-page__link"
                  >
                    Safari
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://support.google.com/chrome/answer/95647?hl=es"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cookies-page__link"
                  >
                    Chrome
                  </Link>
                </li>
              </ul>
            </section>
          </div>

          <div className="cookies-page__mobile-social-section">
            <div className="cookies-page__mobile-social-header">
              <h3 className="cookies-page__mobile-social-title">Síguenos</h3>
            </div>
            <SocialIcons orientation="horizontal" />
          </div>
        </div>
      </div>
      <Footer />
    </PageWrapper>
  );
};

export default CookiesPage;
