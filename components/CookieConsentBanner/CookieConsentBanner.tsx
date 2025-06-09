"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./CookieConsentBanner.scss";

export default function CookieConsentBanner() {
  const [showContent, setShowContent] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Only check localStorage after component is mounted on client
    const consentStored = localStorage.getItem("cookie_consent_seen");

    if (!consentStored) {
      setShowContent(true);
    }

    // Mark component as client-side loaded to prevent hydration mismatch
    setIsLoaded(true);
  }, []);

  // Client-side cookie setting function
  const setClientCookie = (consent: {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
  }) => {
    // Set the same cookie that the server action would set, but client-side
    const cookieValue = JSON.stringify(consent);
    const maxAge = 60 * 60 * 24 * 365; // 1 year

    // Set the cookie with the same properties as the server version
    document.cookie = `cookie_consent=${encodeURIComponent(
      cookieValue
    )}; max-age=${maxAge}; path=/; ${
      process.env.NODE_ENV === "production" ? "secure;" : ""
    } samesite=strict`;
  };

  const handleAcceptAll = () => {
    // Add localStorage
    localStorage.setItem("cookie_consent_seen", "true");

    // Set client-side cookie (same as server action but without revalidation)
    const fullConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
    };

    localStorage.setItem(
      "cookie_consent_preferences",
      JSON.stringify(fullConsent)
    );
    setClientCookie(fullConsent);

    // Hide the banner
    setShowContent(false);
  };

  const handleRejectNonEssential = () => {
    // Add localStorage
    localStorage.setItem("cookie_consent_seen", "true");

    // Set client-side cookie (same as server action but without revalidation)
    const essentialConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
    };

    localStorage.setItem(
      "cookie_consent_preferences",
      JSON.stringify(essentialConsent)
    );
    setClientCookie(essentialConsent);

    // Hide the banner
    setShowContent(false);
  };

  // Always render the container, but conditionally show content
  // This keeps the DOM structure intact
  return (
    <div
      className={`cookie-consent ${
        showContent ? "cookie-consent--visible" : "cookie-consent--hidden"
      }`}
      style={{
        transform: showContent
          ? "translateY(0)"
          : "translateY(calc(100% + 2rem))",
        opacity: showContent ? 1 : 0,
        pointerEvents: showContent ? "auto" : "none",
        transition:
          "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
      }}
    >
      {isLoaded && (
        <div className="cookie-consent__container">
          <div className="cookie-consent__content">
            <p className="cookie-consent__text">
              Este sitio web utiliza cookies para mejorar tu experiencia de
              navegación. Puedes configurar tus preferencias de cookies en
              cualquier momento.{" "}
              <a href="/politica-de-cookies" className="cookie-consent__link">
                Leer más sobre cookies
              </a>
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
      )}
    </div>
  );
}
