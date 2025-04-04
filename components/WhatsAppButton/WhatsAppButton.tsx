"use client";

import React, { useRef, useEffect, useState } from "react";
import useWhatsAppAnimation from "@/hooks/useWhatsAppAnimation";
import "./WhatsAppButton.scss";

interface WhatsAppButtonProps {
  phoneNumber?: string; // Format: country code + phone number (e.g., "14155238886")
  message?: string;
  pulseAnimation?: boolean;
  position?: "bottom-right" | "bottom-left";
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = "34928712222", // Updated with your phone number as default
  message = "¡Hola! Estoy interesado en sus servicios.",
  pulseAnimation = true,
  position = "bottom-right",
}) => {
  const buttonRef = useRef<HTMLButtonElement>(
    null
  ) as React.RefObject<HTMLButtonElement>;
  const tooltipRef = useRef<HTMLSpanElement>(
    null!
  ) as React.RefObject<HTMLSpanElement>;
  const [visible, setVisible] = useState(true);

  // Show button after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check screen edge position and window size for tooltip positioning
  const [tooltipPosition, setTooltipPosition] = useState<"left" | "right">(
    "right"
  );

  useEffect(() => {
    const updateTooltipPosition = () => {
      if (!buttonRef.current) return;

      const buttonRect = buttonRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;

      // If button is close to the right edge of the screen
      if (buttonRect.right > screenWidth - 100) {
        setTooltipPosition("left");
      } else {
        setTooltipPosition("right");
      }
    };

    updateTooltipPosition();
    window.addEventListener("resize", updateTooltipPosition);

    return () => {
      window.removeEventListener("resize", updateTooltipPosition);
    };
  }, []);

  // Use animation hook
  const { playClickAnimation } = useWhatsAppAnimation({
    buttonRef,
    tooltipRef,
    visible,
  });

  // Create WhatsApp URL
  const getWhatsAppUrl = () => {
    // Make sure to properly encode the message for the URL
    const encodedMessage = encodeURIComponent(message);
    // Ensure proper URL formatting with country code and message
    return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
  };

  const handleClick = () => {
    playClickAnimation();
    window.open(getWhatsAppUrl(), "_blank");
  };

  return (
    <button
      ref={buttonRef}
      className={`whatsapp-button ${position} ${pulseAnimation ? "pulse" : ""}`}
      onClick={handleClick}
      aria-label="Contáctanos por WhatsApp"
    >
      <div className="whatsapp-button__icon-wrapper">
        <svg
          className="whatsapp-button__icon"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            fill="#FFFFFF"
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
          />
        </svg>
      </div>
      <span
        ref={tooltipRef}
        className={`whatsapp-button__tooltip whatsapp-button__tooltip--${tooltipPosition}`}
      >
        ¡Chatea con nosotros!
      </span>
    </button>
  );
};

export default WhatsAppButton;
