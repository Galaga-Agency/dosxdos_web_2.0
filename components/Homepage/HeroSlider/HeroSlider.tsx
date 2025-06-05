"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";
import "./HeroSlider.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";

interface SlideItem {
  id: number;
  imageUrl: string;
}

interface HeroSliderProps {
  slides: SlideItem[];
  autoplaySpeed?: number;
  onImagesLoad?: () => void;
}

const HeroSlider: React.FC<HeroSliderProps> = ({
  slides,
  autoplaySpeed = 3000,
  onImagesLoad,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { isTouchDevice } = useDeviceDetect();
  const hasAnimated = useRef(false);

  // Animate hero content as soon as first image loads
  const animateHeroContent = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const tl = gsap.timeline();

    // Make container visible immediately
    if (sectionRef.current) {
      gsap.set(sectionRef.current.querySelector(".hero-slider__container"), {
        opacity: 1,
      });
    }

    // Animate title
    if (titleRef.current) {
      gsap.set(titleRef.current, {
        opacity: 0,
        y: -30,
      });

      tl.to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power2.out",
        },
        0.2
      );
    }

    // Animate CTA
    if (ctaRef.current) {
      gsap.set(ctaRef.current, {
        opacity: 0,
        y: 30,
      });

      tl.to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
        },
        0.4
      );
    }

    // Notify parent that hero is ready
    if (onImagesLoad) {
      onImagesLoad();
    }
  }, [onImagesLoad]);

  // Handle first image load
  const handleFirstImageLoad = useCallback(() => {
    setIsFirstImageLoaded(true);
    animateHeroContent();
  }, [animateHeroContent]);

  // Autoplay timer
  useEffect(() => {
    if (!isFirstImageLoaded) return;

    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, autoplaySpeed);

    return () => clearInterval(interval);
  }, [autoplaySpeed, slides.length, isFirstImageLoaded]);

  // Handle slide transitions with GSAP
  useEffect(() => {
    const tl = gsap.timeline();

    slides.forEach((_, index) => {
      const slideElement = sectionRef.current?.querySelector(
        `.hero-slider__slide:nth-child(${index + 1})`
      );

      if (slideElement) {
        tl.to(
          slideElement,
          {
            opacity: index === activeSlide ? 1 : 0,
            duration: 1,
            ease: "power2.inOut",
          },
          0
        );
      }
    });
  }, [activeSlide, slides]);

  const goToSlide = (index: number) => {
    if (index === activeSlide) return;
    setActiveSlide(index);
  };

  const goToPrevSlide = () => {
    const prevSlide = activeSlide === 0 ? slides.length - 1 : activeSlide - 1;
    setActiveSlide(prevSlide);
  };

  const goToNextSlide = () => {
    const nextSlide = (activeSlide + 1) % slides.length;
    setActiveSlide(nextSlide);
  };

  return (
    <div ref={sectionRef} className="hero-slider">
      {!isTouchDevice && isFirstImageLoaded && (
        <>
          <button
            className="hero-slider__nav hero-slider__nav--prev"
            onClick={goToPrevSlide}
            aria-label="Previous Slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            className="hero-slider__nav hero-slider__nav--next"
            onClick={goToNextSlide}
            aria-label="Next Slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}

      <div className="hero-slider__container featured-image-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slider__slide featured-image-wrapper hero-image-wrapper ${
              index === activeSlide ? "active" : ""
            }`}
          >
            <Image
              src={slide.imageUrl}
              alt={`Slide ${index + 1}`}
              fill
              priority={index === 0} // Only prioritize first image
              sizes="100vw"
              className="hero-slider__image"
              onLoad={index === 0 ? handleFirstImageLoad : undefined}
              loading={index === 0 ? "eager" : "lazy"}
              quality={index === 0 ? 90 : 75}
            />
          </div>
        ))}
      </div>

      <div className="hero-slider__content">
        <h1 ref={titleRef} className="hero-slider__title">
          <span className="hero-slider__rolling-text">CREAMOS</span> <br />
          ESPACIOS QUE INSPIRAN.
        </h1>

        <div ref={ctaRef} className="hero-slider__cta">
          <SecondaryButton href="/servicios" size="large">
            Descubrir Servicios
          </SecondaryButton>
        </div>
      </div>

      {isFirstImageLoaded && (
        <div className="hero-slider__indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`hero-slider__indicator ${
                index === activeSlide ? "active" : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSlider;
