"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { SplitText } from "@/plugins";
import { charAnimation } from "@/utils/animations/title-anim";
import { teamMembers } from "@/data/team";
import "./TeamSection.scss";

const TeamSection: React.FC = () => {
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
    <section className="team-section">
      <div className="container">
        <h2 ref={titleRef} className="title">
          Nuestro <span>Equipo</span>
        </h2>
        <p className="subtitle">
          Un equipo de profesionales apasionados, comprometidos con la
          creatividad y la excelencia en cada proyecto.
        </p>
        <div className="grid">
          {teamMembers.map((member, index) => (
            <Link
              key={member.id}
              ref={(el) => (cardsRef.current[index] = el) as any}
              href={`/equipo/${member.id}`}
              className="card"
            >
              <div className="image-wrapper">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill
                  priority
                  quality={100}
                  sizes="(min-width: 1024px) 80vw, (min-width: 768px) 60vw, 90vw"
                  className="image"
                />
              </div>

              <div className="glass">
                <span className="category">
                  <span className="category-inner">{member.name}</span>
                </span>
                <p className="description">{member.position}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
