"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { animateHeroSection } from "@/utils/animations/pages/equipo-page-anim";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import "./HeroSection.scss";

// Register ScrollTrigger if needed
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroSection: React.FC = () => {
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const heroImageContainerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const floatingImage1Ref = useRef<HTMLDivElement>(null);
  const floatingImage2Ref = useRef<HTMLDivElement>(null);
  const floatingImage3Ref = useRef<HTMLDivElement>(null);
  const floatingImageInner1Ref = useRef<HTMLDivElement>(null);
  const floatingImageInner2Ref = useRef<HTMLDivElement>(null);
  const floatingImageInner3Ref = useRef<HTMLDivElement>(null);

  // Setup direct parallax first to avoid the bump
  useLayoutEffect(() => {
    if (heroImageRef.current) {
      // Apply direct GSAP parallax to the hero image
      gsap.to(heroImageRef.current, {
        y: () => window.innerHeight * 0.1, // Gentle parallax (10% of viewport)
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }
  }, []);

  // Then run your original animations as usual
  useEffect(() => {
    const timer = setTimeout(() => {
      animateHeroSection({
        section: heroImageContainerRef.current,
        label: labelRef.current,
        title: titleRef.current,
        underline: underlineRef.current,
        description: descriptionRef.current,
        stats: statsRef.current,
        image: heroImageRef.current,
        floatingImages: [
          {
            container: floatingImage1Ref,
            inner: floatingImageInner1Ref,
            offset: -25,
            innerOffset: 15,
          },
          {
            container: floatingImage2Ref,
            inner: floatingImageInner2Ref,
            offset: -20,
            innerOffset: -15,
          },
          {
            container: floatingImage3Ref,
            inner: floatingImageInner3Ref,
            offset: -55,
            innerOffset: 25,
          },
        ],
      });
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div className="hero-section">
        <div
          ref={heroImageContainerRef}
          className="hero-section__image-container"
        >
          <div ref={heroImageRef} className="hero-section__image-wrapper">
            <Image
              src="/assets/img/team/dospodos_personal_oficina-3.webp"
              alt="Equipo dosxdos"
              fill
              priority
              
              quality={100}
              style={{
                objectFit: "cover",
                objectPosition: "center",
                willChange: "transform",
              }}
            />
          </div>

          <div className="hero-section__overlay"></div>

          <div className="hero-section__content">
            <div ref={labelRef} className="hero-section__label">
              <span>SOBRE NOSOTROS</span>
            </div>
            <h1 ref={titleRef} className="hero-section__title char-animation">
              Todo empieza con una idea. <br /> Lo demás, lo hacemos juntos.
            </h1>
            <div
              ref={underlineRef}
              className="hero-section__title-underline"
            ></div>
            <div ref={descriptionRef} className="hero-section__description">
              <p>
                Contamos con un equipo multidisciplinar de más de 40 personas —
                arquitectos, interioristas, diseñadores, técnicos e instaladores
                — que entienden que cada proyecto es un lenguaje visual que debe
                decir algo único. Te acompañamos de principio a fin para
                transformar conceptos en espacios que inspiran
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="random-images">
        {/* Floating Images */}
        {[1, 2, 3].map((_, i) => {
          const containerRef = [
            floatingImage1Ref,
            floatingImage2Ref,
            floatingImage3Ref,
          ][i];
          const innerRef = [
            floatingImageInner1Ref,
            floatingImageInner2Ref,
            floatingImageInner3Ref,
          ][i];
          const imgSrc = `/assets/img/about-us-page/equipo-${i + 1}.webp`;

          return (
            <div
              key={i}
              ref={containerRef}
              className={`random-images__container random-images__container--${
                i + 1
              }`}
            >
              <div ref={innerRef} className="random-images__inner-container">
                <Image
                  src={imgSrc}
                  alt={`Fiesta ${i + 1}`}
                  fill
                  priority
                  unoptimized={true}
                  quality={100}
                  className="random-images__img"
                  sizes="(min-width: 1024px) 80vw, (min-width: 768px) 60vw, 90vw"
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HeroSection;
