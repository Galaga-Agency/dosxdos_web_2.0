"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { initCardMouseParallax } from "@/utils/animations/hover-btn";
import "./ServiceCard.scss";

interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  name,
  description,
  imageUrl,
}) => {
  // Call the utility function for mouse parallax after component mounts
  useEffect(() => {
    initCardMouseParallax();
  }, []);

  return (
    <Link 
      href={`/servicios/${id}`} 
      className="team-section card service-card"
    >
      <div className="service-card__image-wrapper">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="image"
        />
      </div>
      
      <div className="service-card__overlay"></div>
      
      {/* Single content container with proper stacking */}
      <div className="service-card__content">
        <h3 className="service-card__title">{name}</h3>
        <p className="service-card__description">{description}</p>
        <span className="service-card__link">Ver más</span>
      </div>
    </Link>
  );
};

export default ServiceCard;