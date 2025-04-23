"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import "./HoverCard.scss";

interface HoverCardProps {
  id: string;
  imageUrl: string;
  title?: string;
  description?: string;
  linkUrl?: string;
  linkText?: string;
  showTitle?: boolean;
  showDescription?: boolean;
  showLink?: boolean;
  showLinkUrl?: boolean;
}

const HoverCard: React.FC<HoverCardProps> = ({
  id,
  imageUrl,
  title = "",
  description = "",
  linkUrl = "",
  linkText = "Ver más",
  showTitle = true,
  showDescription = true,
  showLink = true,
  showLinkUrl = true,
}) => {
  const hasContent =
    (showTitle && title) ||
    (showDescription && description) ||
    (showLink && linkText);

  if (showLinkUrl && linkUrl) {
    return (
      <Link href={linkUrl} className="hover-card">
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
            {showTitle && title && (
              <h3 className="hover-card__title">{title}</h3>
            )}
            {showDescription && description && (
              <p className="hover-card__description">{description}</p>
            )}
            {showLink && linkText && (
              <span className="hover-card__link">{linkText}</span>
            )}
          </div>
        )}
      </Link>
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
    </div>
  );
};

export default HoverCard;
