"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import HoverCircleButton from "@/components/ui/HoverCircleButton/HoverCircleButton";
import "./ServicesGrid.scss";
import { servicesList } from "@/data/services";
import TransitionLink from "@/components/TransitionLink";

const ServicesGrid: React.FC = () => {
  return (
    <section className="services-grid">
      {/* Marquee text at the top */}
      <div className="services-grid__marquee">
        <div className="services-grid__marquee-track">
          <div className="services-grid__marquee-text">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i}>nuestros servicios&nbsp;&nbsp;&nbsp;</span>
            ))}
          </div>
        </div>
      </div>

      <div className="services-grid__container">
        <div className="services-grid__items">
          {servicesList.map((service) => (
            <TransitionLink
              href={`/servicios/${service.slug}`}
              key={service.id}
              className="services-grid__item"
            >
              <div className="img_reveal">
                <Image
                  src={service.imageUrl}
                  alt={service.name}
                  width={600}
                  height={750}
                  priority={service.id <= 2}
                />
                <div className="img_reveal__overlay"></div>
              </div>
              <div className="services-grid__content">
                <h2 className="services-grid__title">{service.name}</h2>
              </div>
            </TransitionLink>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
