"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import "./HoverCard.scss";

interface HoverCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  linkText?: string | null; // Make it optional with null possible
  showLink?: boolean; // New prop to control link visibility
}

const HoverCard: React.FC<HoverCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  linkUrl,
  linkText = "Ver más",
  showLink = true, // Default to showing the link
}) => {
  return (
    <Link href={linkUrl} className="hover-card">
      <div className="hover-card__image-wrapper">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="image"
        />
      </div>

      <div className="hover-card__overlay"></div>

      {/* Single content container with proper stacking */}
      <div className="hover-card__content">
        <h3 className="hover-card__title">{title}</h3>
        <p className="hover-card__description">{description}</p>
        {showLink && linkText && (
          <span className="hover-card__link">{linkText}</span>
        )}
      </div>
    </Link>
  );
};

export default HoverCard;