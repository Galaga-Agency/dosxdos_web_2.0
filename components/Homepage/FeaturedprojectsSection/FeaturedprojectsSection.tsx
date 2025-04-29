"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  panelTwoAnimation,
  clearScrollTriggers,
} from "@/utils/animations/panel-animation";
import { animateAboutUsSection } from "@/utils/animations/homepage-anim";
import "./FeaturedprojectsSection.scss";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import { featuredProjects } from "@/data/projects";

const FeaturedprojectsSection: React.FC = () => {
  const initialized = useRef<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize panel animation
    if (!initialized.current) {
      clearScrollTriggers();
      const timer = setTimeout(() => {
        panelTwoAnimation();
        const forceAnimation = () => {
          if (titleRef.current && textRef.current) {
            animateAboutUsSection({
              section: sectionRef.current,
              label: labelRef.current,
              title: titleRef.current,
              text: textRef.current,
              cta: ctaRef.current,
            } as any);
          }
        };
        forceAnimation();
        initialized.current = true;
      }, 1500);

      return () => {
        clearTimeout(timer);
        clearScrollTriggers();
      };
    }
  }, []);

  return (
    <section ref={sectionRef} className="latest-projects">
      {/* <div className="latest-projects__intro">
        <div ref={labelRef} className="latest-projects__label">
          <span>Experiencias Visuales</span>
        </div>
        <h2 ref={titleRef} className="latest-projects__title">
          <span className="word">El</span> <span className="word">diseño</span>{" "}
          <span className="word">como</span>{" "}
          <span className="highlight">lenguaje visual</span>
        </h2>
        <div ref={textRef} className="latest-projects__description">
          <p>
            Interpretamos cada espacio como un lienzo donde la arquitectura, la
            luz y el material conversan. Transformamos entornos comerciales en
            experiencias que capturan la esencia de cada marca, invitando a
            explorar y descubrir.
          </p>
          <div ref={ctaRef} className="latest-projects__cta">
            <PrimaryButton href="/portfolio" size="medium">
              Descubrir Portfolio
            </PrimaryButton>
          </div>
        </div>
      </div> */}

      <div className="marquee-container">
        <div className="marquee-track">
          <div className="marquee-text">
            {Array.from({ length: 50 }).map((_, i) => (
              <span key={i}>our work&nbsp;</span>
            ))}
          </div>
        </div>
      </div>

      <div className="project-panel-area">
        {featuredProjects.map((project) => (
          <div key={project.id} className="project-panel">
            <div className="project-panel__image">
              <Image
                src={project.image}
                alt={project.title}
                width={1920}
                height={1080}
                className="project-panel__image-file"
                priority={project.id === "01"}
              />
              <div className="project-panel__overlay"></div>
            </div>

            <div className="project-panel__content">
              <h3 className="project-panel__title">{project.title}</h3>
              <Link
                href={`/portfolio/${project.slug}`}
                className="project-panel__link"
              >
                Explorar proyecto
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedprojectsSection;
