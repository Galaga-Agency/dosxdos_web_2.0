"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import HoverCircleButton from "@/components/ui/HoverCircleButton/HoverCircleButton";
import {
  initFadeAnimations,
  cleanupServiciosAnimations,
  imageRevealAnimation,
  initCursorBubbleAnimation,
  cleanupCursorBubbleAnimation
} from "@/utils/animations/pages/servicios-page-anim";
import "./ServicesGrid.scss";

const ServicesGrid: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Services array
  const services = [
    {
      id: 1,
      title: "Diseño de interiores",
      slug: "diseno-de-interiores",
      image: "/assets/img/portfolio/interiorismo-comercial/interiorismo-comercial-1.jpg"
    },
    {
      id: 2,
      title: "Producción",
      slug: "produccion",
      image: "/assets/img/portfolio/produccion-digital/produccion-digital-2.jpg"
    },
    {
      id: 3,
      title: "Instalación",
      slug: "instalacion",
      image: "/assets/img/portfolio/perfumeria/perfumeria-3.jpg"
    },
    {
      id: 4,
      title: "Logística",
      slug: "logistica",
      image: "/assets/img/portfolio/shop-in-shop/shop-in-shop-3.jpg"
    },
    {
      id: 5,
      title: "Comunicación",
      slug: "comunicacion",
      image: "/assets/img/portfolio/escaparatismo/escapartismo-3.jpg"
    },
    {
      id: 6,
      title: "Consultoría",
      slug: "consultoria",
      image: "/assets/img/portfolio/espacios-promocionales/espacios-promocionales-3.jpg"
    }
  ];
  
  useEffect(() => {
    console.log("ServicesGrid mounted");
    
    if (sectionRef.current) {
      setTimeout(() => {
        initFadeAnimations();
        imageRevealAnimation();
        initCursorBubbleAnimation(); // Initialize cursor bubble from utility
      }, 300);
    }
    
    return () => {
      console.log("ServicesGrid unmounting");
      cleanupServiciosAnimations();
      cleanupCursorBubbleAnimation(); // Clean up cursor bubble
    };
  }, []);

  return (
    <section className="services-grid" ref={sectionRef}>
      {/* Marquee text at the top */}
      <div className="services-grid__marquee">
        <div className="services-grid__marquee-track">
          <div className="services-grid__marquee-text">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i}>nuestros servicios&nbsp;</span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="services-grid__container">
        <div className="services-grid__items">
          {services.map((service) => (
            <Link 
              href={`/servicios/${service.slug}`} 
              key={service.id} 
              className="services-grid__item"
            >
              <div className="img_reveal">
                <Image 
                  src={service.image}
                  alt={service.title}
                  width={600}
                  height={750}
                  priority={service.id === 1}
                />
                <div className="img_reveal__overlay"></div>
              </div>
              <div className="services-grid__category">Branding</div>
              <div className="services-grid__content">
                <div className="services-grid__year">2024</div>
                <h2 className="services-grid__title">{service.title}</h2>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="services-grid__button-container">
          <HoverCircleButton 
            href="/servicios" 
            label="Más Servicios" 
            darkBg={true}
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;