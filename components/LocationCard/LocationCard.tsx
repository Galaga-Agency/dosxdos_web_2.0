"use client";

import React, { useEffect, useState } from "react";
import { Mail, Phone, Clock, MapPin, ArrowRight } from "lucide-react";
import "./LocationCard.scss";
import PrimaryButton from "../ui/PrimaryButton/PrimaryButton";
import Link from "next/link";

interface LocationCardProps {
  city: string;
  timezone: string;
  timeZoneIdentifier: string; // e.g. "Europe/Madrid" or "Atlantic/Canary"
  address: string[];
  email: string;
  phones: string[];
  mapUrl: string;
  className?: string;
}

const LocationCard: React.FC<LocationCardProps> = ({
  city,
  timezone,
  timeZoneIdentifier,
  address,
  email,
  phones,
  mapUrl,
  className,
}) => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

  // Set up real-time clock and date
  useEffect(() => {
    const updateTimeAndDate = () => {
      try {
        const timeOptions: Intl.DateTimeFormatOptions = {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: timeZoneIdentifier,
        };

        const dateOptions: Intl.DateTimeFormatOptions = {
          weekday: "short",
          day: "numeric",
          month: "short",
          timeZone: timeZoneIdentifier,
        };

        const timeFormatter = new Intl.DateTimeFormat("es-ES", timeOptions);
        const dateFormatter = new Intl.DateTimeFormat("es-ES", dateOptions);

        setCurrentTime(timeFormatter.format(new Date()));
        setCurrentDate(dateFormatter.format(new Date()));
      } catch (error) {
        console.error("Error formatting time/date:", error);
        setCurrentTime(""); // Empty fallback
        setCurrentDate("");
      }
    };

    // Update immediately
    updateTimeAndDate();

    // Then update every minute
    const intervalId = setInterval(updateTimeAndDate, 60000);

    return () => clearInterval(intervalId);
  }, [timeZoneIdentifier]);

  return (
    <div className={`location-card ${className || ""}`}>
      <div className="location-card__highlight"></div>
      <div className="location-card__content">
        <div className="location-card__header">
          <div className="location-card__city-badge">
            <MapPin size={20} color="#281528" />
            <h3>{city}</h3>
          </div>
          <div className="location-card__timezone">
            <Clock size={14} />
            <span>
              {timezone} {currentTime && `• ${currentTime}`}
              {currentDate && <small></small>}
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
            <Link
              href={`mailto:${email}`}
              className="location-card__contact-item"
            >
              <Mail size={18} />
              <span>{email}</span>
            </Link>

            {phones.map((phone, index) => (
              <Link
                key={index}
                href={`tel:${phone}`}
                className="location-card__contact-item"
              >
                <Phone size={18} />
                <span>{phone}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="location-card__footer">
          <PrimaryButton
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver en Google Maps <ArrowRight size={16} className="ml-2" />
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
