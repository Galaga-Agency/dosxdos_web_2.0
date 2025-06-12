"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import HoverCircleButton from "@/components/ui/HoverCircleButton/HoverCircleButton";
import "./ServicesGrid.scss";
import { servicesList } from "@/data/services";
import TextMarquee from "@/components/TextMarquee/TextMarquee";

const ServicesGrid: React.FC = () => {
  return (
    <section className="services-grid">
      <TextMarquee text="nuestros servicios" speed={50} dark={true} />
      <div className="services-grid__container">
        <div className="services-grid__items">
          {servicesList.map((service) => (
            <Link
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
