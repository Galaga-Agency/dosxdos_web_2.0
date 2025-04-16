import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { useParallax } from "@/utils/animations/parallax-image";
import { charAnimation } from "@/utils/animations/title-anim";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import "./HeroSection.scss";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";

const HeroSection: React.FC = () => {
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const heroImageContainerRef = useRef<HTMLDivElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const descriptionRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const ctaButtonRef = useRef<HTMLButtonElement | null>(null);

  // Floating image refs - CONTAINERS
  const floatingImage1Ref = useRef<HTMLDivElement | null>(null);
  const floatingImage2Ref = useRef<HTMLDivElement | null>(null);
  const floatingImage3Ref = useRef<HTMLDivElement | null>(null);

  // Floating image refs - IMAGES inside containers
  const floatingImageInner1Ref = useRef<HTMLDivElement | null>(null);
  const floatingImageInner2Ref = useRef<HTMLDivElement | null>(null);
  const floatingImageInner3Ref = useRef<HTMLDivElement | null>(null);

  // Parallax effect for the hero image
  useParallax(
    heroImageContainerRef as React.RefObject<HTMLElement>,
    heroImageRef as React.RefObject<HTMLElement>,
    {
      intensity: 0.2,
      scrubAmount: 1.2,
      delay: 500,
    }
  );

  useEffect(() => {
    // Character animation for the main title
    if (mainTitleRef.current) {
      gsap.set(mainTitleRef.current, { visibility: "hidden" });
      const timer = setTimeout(() => {
        charAnimation(mainTitleRef.current!);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Animation for the description and stats counters
    const timeline = gsap.timeline({ delay: 1.2 });

    if (descriptionRef.current) {
      timeline.fromTo(
        descriptionRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }

    if (statsRef.current) {
      const countElements = statsRef.current.querySelectorAll(
        ".hero-section__stat-value"
      );

      timeline.fromTo(
        statsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

      // Animate each number counting up
      countElements.forEach((el) => {
        const target = parseInt(el.textContent || "0", 10);
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            delay: 1.5,
          }
        );
      });
    }

    if (ctaButtonRef.current) {
      timeline.fromTo(
        ctaButtonRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.2"
      );
    }
  }, []);

  // NESTED PARALLAX: Container moves at one speed, image inside moves faster
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Container parallax settings (slower)
    const containerSettings = [
      { ref: floatingImage1Ref, offset: -25 },
      { ref: floatingImage2Ref, offset: -20 },
      { ref: floatingImage3Ref, offset: -65 },
    ];

    // Image inside parallax settings (faster)
    const imageSettings = [
      { ref: floatingImageInner1Ref, offset: 15 },
      { ref: floatingImageInner2Ref, offset: -15 },
      { ref: floatingImageInner3Ref, offset: 25 },
    ];

    // Animate containers
    containerSettings.forEach(({ ref, offset }) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { y: "0%" },
          {
            y: `${offset}%`,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.8,
              markers: false,
            },
          }
        );
      }
    });

    // Animate images inside containers (faster)
    imageSettings.forEach(({ ref, offset }) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { y: "0%" },
          {
            y: `${offset}%`,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2, // Faster scrub for smoother motion
              markers: false,
            },
          }
        );
      }
    });

    // Force refresh ScrollTrigger after images load
    const refreshScrollTrigger = () => {
      ScrollTrigger.refresh(true);
    };

    // Refresh on resize for better responsiveness
    window.addEventListener("resize", refreshScrollTrigger);

    // Initial refresh after images likely loaded
    setTimeout(refreshScrollTrigger, 500);

    return () => {
      // Cleanup
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("resize", refreshScrollTrigger);
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
              src="/assets/img/about-us-page/family.jpg"
              alt="Dos por Dos"
              fill
              quality={100}
              priority
              style={{
                objectFit: "cover",
                objectPosition: "center",
                willChange: "transform",
              }}
            />
          </div>

          <div className="hero-section__content">
            <div className="hero-section__overlay"></div>

            <h1
              ref={mainTitleRef}
              className="hero-section__title char-animation"
            >
              Nuestro <span>Equipo</span>
            </h1>

            <div ref={descriptionRef} className="hero-section__description">
              <p>
                Con un gran equipo de más de 45 profesionales, formado por
                arquitectos, interioristas, diseñadores y expertos en producción
                e instalación, te acompañamos durante todo el proceso.
              </p>
            </div>

            <div ref={statsRef} className="hero-section__stats">
              <div className="hero-section__stat">
                <span className="hero-section__stat-value">45</span>
                <span className="hero-section__stat-label">Profesionales</span>
              </div>
              <div className="hero-section__stat">
                <span className="hero-section__stat-value">37</span>
                <span className="hero-section__stat-label">
                  Años de experiencia
                </span>
              </div>
              <div className="hero-section__stat">
                <span className="hero-section__stat-value">300</span>
                <span className="hero-section__stat-label">
                  Proyectos completados
                </span>
              </div>
            </div>

            <PrimaryButton
              ref={ctaButtonRef}
              className="hero-section__cta-button"
              aria-label="Conoce más sobre nuestro equipo"
            >
              Conoce más
            </PrimaryButton>
          </div>
        </div>
      </div>

      {/* Floating images with NESTED parallax - both container and image inside move */}
      <div className="random-images">
        <div
          ref={floatingImage1Ref}
          className="random-images__container random-images__container--1"
        >
          <div
            ref={floatingImageInner1Ref}
            className="random-images__inner-container"
          >
            <Image
              src="/assets/img/about-us-page/fiesta-1.jpg"
              alt="Interior design"
              fill
              priority
              quality={100}
              className="random-images__img"
              sizes="(min-width: 1024px) 80vw, (min-width: 768px) 60vw, 90vw"
            />
          </div>
        </div>

        <div
          ref={floatingImage2Ref}
          className="random-images__container random-images__container--2"
        >
          <div
            ref={floatingImageInner2Ref}
            className="random-images__inner-container"
          >
            <Image
              src="/assets/img/about-us-page/fiesta-2.jpg"
              alt="Interior design"
              fill
              priority
              quality={100}
              className="random-images__img"
              sizes="(min-width: 1024px) 80vw, (min-width: 768px) 60vw, 90vw"
            />
          </div>
        </div>

        <div
          ref={floatingImage3Ref}
          className="random-images__container random-images__container--3"
        >
          <div
            ref={floatingImageInner3Ref}
            className="random-images__inner-container"
          >
            <Image
              src="/assets/img/about-us-page/fiesta-3.jpg"
              alt="Interior design"
              fill
              priority
              quality={100}
              className="random-images__img"
              sizes="(min-width: 1024px) 80vw, (min-width: 768px) 60vw, 90vw"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
