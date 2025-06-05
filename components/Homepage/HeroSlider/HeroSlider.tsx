"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import { animateHeroSlider } from "@/utils/animations/homepage-hero";
import "./HeroSlider.scss";

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

  // Handle first image load and trigger animation
  const handleFirstImageLoad = useCallback(() => {
    setIsFirstImageLoaded(true);

    if (sectionRef.current && titleRef.current && ctaRef.current) {
      animateHeroSlider({
        section: sectionRef.current,
        title: titleRef.current,
        cta: ctaRef.current,
      });
    }

    if (onImagesLoad) onImagesLoad();
  }, [onImagesLoad]);

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
    slides.forEach((_, index) => {
      const slideElement = sectionRef.current?.querySelector(
        `.hero-slider__slide:nth-child(${index + 1})`
      );

      if (slideElement) {
        slideElement.setAttribute(
          "style",
          `opacity: ${
            index === activeSlide ? 1 : 0
          }; transition: opacity 1s ease-in-out;`
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
              priority={index === 0}
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
