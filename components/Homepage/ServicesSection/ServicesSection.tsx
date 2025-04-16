"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { SplitText } from "@/plugins";
import { charAnimation } from "@/utils/animations/title-anim";
import { categoriesList } from "@/data/categories";
import "./ServicesSection.scss";
import SloganSection from "../SloganSection/SloganSection";

const ServicesSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(SplitText);

    // Title animation
    if (titleRef.current) {
      const timer = setTimeout(() => {
        charAnimation(titleRef.current);
      }, 500);
      return () => clearTimeout(timer);
    }

    // Subtle card hover animations
    cardsRef.current.forEach((card) => {
      if (card) {
        const cardImage = card.querySelector(".image") as HTMLImageElement;
        const cardGlass = card.querySelector(".glass");
        const description = cardGlass?.querySelector(".description");
        const link = cardGlass?.querySelector(".link");

        card.addEventListener("mouseenter", () => {
          gsap.to(cardImage, {
            scale: 1.05,
            filter: "brightness(0.95)",
            duration: 0.6,
            ease: "power1.inOut",
          });

          if (cardGlass) {
            gsap.to(cardGlass, {
              height: "40%",
              backdropFilter: "blur(15px)",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              duration: 0.6,
              ease: "power1.inOut",
            });

            gsap.to([description, link], {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power1.inOut",
            });
          }
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(cardImage, {
            scale: 1,
            filter: "brightness(1)",
            duration: 0.6,
            ease: "power1.inOut",
          });

          if (cardGlass) {
            gsap.to(cardGlass, {
              height: "25%",
              backdropFilter: "blur(8px)",
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              duration: 0.6,
              ease: "power1.inOut",
            });

            gsap.to([description, link], {
              opacity: 0,
              y: 20,
              duration: 0.6,
              ease: "power1.inOut",
            });
          }
        });
      }
    });
  }, []);

  return (
    <section className="services-section">
      <div className="container">
        <h2 ref={titleRef} className="title">
          Nuestros <span>servicios</span>
        </h2>
        <p className="subtitle">
          Nuestros equipos en <strong>Canarias</strong> y{" "}
          <strong>Madrid</strong>. Nuestros servicios donde los necesites.
        </p>
        <div className="grid">
          {categoriesList.map((service, index) => (
            <Link
              key={service.id}
              ref={(el) => (cardsRef.current[index] = el) as any}
              href={`/servicios/${service.id}`}
              className="card"
            >
              <div className="image-wrapper">
                <Image
                  src={service.imageUrl}
                  alt={service.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="image"
                />
              </div>

              <div className="glass">
                <span className="category">
                  <span className="category-inner">{service.name}</span>
                </span>
                <p className="description">{service.description}</p>
                <span className="link">Ver más →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* <SloganSection /> */}

      <div className="marquee-container">
        <div className="marquee-track">
          <div className="marquee-text">
            {Array.from({ length: 50 }).map((_, i) => (
              <span key={i}>OUR WORK&nbsp;</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
