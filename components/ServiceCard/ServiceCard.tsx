"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
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
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!cardRef.current || !imageRef.current) return;

    const card = cardRef.current;
    const image = imageRef.current;

    // Mouse move parallax effect
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      
      gsap.to(image, {
        x: ((relX - rect.width / 2) / rect.width) * 40,
        y: ((relY - rect.height / 2) / rect.height) * 40,
        scale: 1.1,
        ease: "power2.out",
        duration: 1,
      });
    });

    // Reset on mouse leave
    card.addEventListener("mouseleave", () => {
      gsap.to(image, {
        x: 0,
        y: 0,
        scale: 1,
        ease: "power2.out",
        duration: 1,
      });
    });
  }, []);

  return (
    <div className="service-card" ref={cardRef}>
      <div className="service-card__image-container">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="service-card__image"
          ref={imageRef as any}
        />
      </div>
      
      <div className="service-card__overlay">
        <span className="service-card__category">{name}</span>
        <p className="service-card__description">{description}</p>
        <Link href={`/servicios/${id}`} className="service-card__link">
          Ver más →
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;