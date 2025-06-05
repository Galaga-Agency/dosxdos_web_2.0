"use client";

import { useState, useEffect } from "react";
import { setCookieConsent } from "@/lib/cookie-actions";
import Link from "next/link";
import "./CookieConsentBanner.scss";
import TransitionLink from "../Link";

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Only check localStorage after component is mounted on client
    const consentStored = localStorage.getItem("cookie_consent_seen");

    if (!consentStored) {
      setIsVisible(true);
    }

    // Mark component as client-side loaded to prevent hydration mismatch
    setIsLoaded(true);
  }, []);

  const handleAcceptAll = async () => {
    const fullConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
    };

    try {
      // Set server-side cookie
      await setCookieConsent(fullConsent);

      // Mark as seen in localStorage
      localStorage.setItem("cookie_consent_seen", "true");

      setIsVisible(false);
    } catch (error) {
      console.error("Error setting cookie consent:", error);
    }
  };

  const handleRejectNonEssential = async () => {
    const essentialConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
    };

    try {
      // Set server-side cookie
      await setCookieConsent(essentialConsent);

      // Mark as seen in localStorage
      localStorage.setItem("cookie_consent_seen", "true");

      setIsVisible(false);
    } catch (error) {
      console.error("Error setting cookie consent:", error);
    }
  };

  // Don't render anything during SSR to prevent hydration mismatch
  if (!isLoaded) return null;

  // Don't render if user has already given consent
  if (!isVisible) return null;

  return (
    <div className="cookie-consent">
      <div className="cookie-consent__container">
        <div className="cookie-consent__content">
          <p className="cookie-consent__text">
            Este sitio web utiliza cookies para mejorar tu experiencia de
            navegación. Puedes configurar tus preferencias de cookies en
            cualquier momento.{" "}
            <Link href="/politica-de-cookies" className="cookie-consent__link">
              Leer más sobre cookies
            </Link>
          </p>
        </div>

        <div className="cookie-consent__actions">
          <button
            className="cookie-consent__button cookie-consent__button--secondary"
            onClick={handleRejectNonEssential}
          >
            Rechazar no esenciales
          </button>
          <button
            className="cookie-consent__button cookie-consent__button--primary"
            onClick={handleAcceptAll}
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
}
