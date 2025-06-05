"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import "./HoverCard.scss";
import TransitionLink from "@/components/TransitionLink";

interface HoverCardProps {
  id: string | number;
  imageUrl: string;
  title?: string;
  description?: string;
  email?: string;
  linkUrl?: string;
  linkText?: string;
  showTitle?: boolean;
  showDescription?: boolean;
  showEmail?: boolean;
  showLink?: boolean;
  showLinkUrl?: boolean;
  style?: React.CSSProperties;
}

const HoverCard: React.FC<HoverCardProps> = ({
  id,
  imageUrl,
  title = "",
  description = "",
  email = "",
  linkUrl = "",
  linkText = "Ver más",
  showTitle = true,
  showDescription = true,
  showEmail = true,
  showLink = true,
  showLinkUrl = true,
  style = {},
}) => {
  const hasContent =
    (showTitle && title) ||
    (showDescription && description) ||
    (showEmail && email) ||
    (showLink && linkText);

  if (showLinkUrl && linkUrl) {
    return (
      <TransitionLink href={linkUrl} className="hover-card">
        <div className="hover-card__image-wrapper">
          <Image
            src={imageUrl}
            alt={title || "Imagen"}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="image"
            unoptimized
          />
        </div>

        <div className="hover-card__overlay"></div>

        {hasContent && (
          <div className="hover-card__content">
            {showTitle && title && (
              <h3 className="hover-card__title">{title}</h3>
            )}
            {showDescription && description && (
              <p className="hover-card__description">{description}</p>
            )}
            {showEmail && email && (
              <a href={`mailto:${email}`} className="hover-card__email">
                {email}
              </a>
            )}
            {showLink && linkText && (
              <span className="hover-card__link">{linkText}</span>
            )}
          </div>
        )}
      </TransitionLink>
    );
  }

  return (
    <div className="hover-card">
      <div className="hover-card__image-wrapper">
        <Image
          src={imageUrl}
          alt={title || "Imagen"}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="image"
        />
      </div>

      <div className="hover-card__overlay"></div>

      {hasContent && (
        <div className="hover-card__content">
          {showTitle && title && <h3 className="hover-card__title">{title}</h3>}
          {showDescription && description && (
            <p className="hover-card__description">{description}</p>
          )}
          {showEmail && email && (
            <a href={`mailto:${email}`} className="hover-card__email">
              {email}
            </a>
          )}
          {showLink && linkText && (
            <span className="hover-card__link">{linkText}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default HoverCard;
