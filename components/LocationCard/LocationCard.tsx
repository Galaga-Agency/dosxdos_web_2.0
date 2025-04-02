"use client";

import React, { useRef, useEffect, useState } from "react";
import { Mail, Phone, Clock, ExternalLink, MapPin } from "lucide-react";
import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";
import { setupMouseMoveAnimation } from "@/utils/animations/mouse-move-anim";
import "./LocationCard.scss";

interface LocationCardProps {
  city: string;
  timezone: string;
  timeZoneIdentifier: string; // e.g. "Europe/Madrid" or "Atlantic/Canary"
  address: string[];
  email: string;
  phones: string[];
  mapUrl: string;
}

const LocationCard: React.FC<LocationCardProps> = ({
  city,
  timezone,
  timeZoneIdentifier,
  address,
  email,
  phones,
  mapUrl,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState<string>("");

  // Setup mouse move animation
  useEffect(() => {
    if (cardRef.current) {
      const cleanup = setupMouseMoveAnimation({
        element: cardRef.current,
        highlightSelector: ".location-card__highlight",
        sensitivity: 25,
        highlightOpacity: 0.1,
      });

      return cleanup;
    }
  }, []);

  // Set up real-time clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const options: Intl.DateTimeFormatOptions = {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: timeZoneIdentifier,
        };

        const formatter = new Intl.DateTimeFormat("es-ES", options);
        setCurrentTime(formatter.format(new Date()));
      } catch (error) {
        console.error("Error formatting time:", error);
        setCurrentTime(""); // Empty fallback
      }
    };

    // Update immediately
    updateTime();

    // Then update every minute
    const intervalId = setInterval(updateTime, 60000);

    return () => clearInterval(intervalId);
  }, [timeZoneIdentifier]);

  return (
    <div className="location-card" ref={cardRef}>
      <div className="location-card__highlight"></div>
      <div className="location-card__content">
        <div className="location-card__header">
          <div className="location-card__city-badge">
            <MapPin size={16} />
            <h3>{city}</h3>
          </div>
          <div className="location-card__timezone">
            <Clock size={16} />
            <span>
              {timezone} {currentTime && `• ${currentTime}`}
            </span>
          </div>
        </div>

        <div className="location-card__body">
          <div className="location-card__address">
            {address.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>

          <div className="location-card__contact">
            {/* <a href={`mailto:${email}`} className="location-card__contact-item">
              <Mail size={16} />
              <span>{email}</span>
            </a> */}

            {phones.map((phone, index) => (
              <a
                key={index}
                href={`tel:${phone}`}
                className="location-card__contact-item"
              >
                <Phone size={16} />
                <span>{phone}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="location-card__footer">
          <SecondaryButton
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            icon={<ExternalLink size={16} />}
          >
            Ver en Google Maps
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
