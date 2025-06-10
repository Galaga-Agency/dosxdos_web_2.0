"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import { gsap } from "gsap";
import { animateToNextWord } from "@/utils/animations/rolling-text-animation";
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
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isTouchDevice } = useDeviceDetect();

  // Handle first image load
  const handleFirstImageLoad = useCallback(() => {
    setIsFirstImageLoaded(true);
    if (onImagesLoad) onImagesLoad();
  }, [onImagesLoad]);

  // Handle slide transitions with GSAP (keeping your original logic)
  useEffect(() => {
    if (!isFirstImageLoaded) return;

    slides.forEach((_, index) => {
      const slideElement = sectionRef.current?.querySelector(
        `.hero-slider__slide:nth-child(${index + 1})`
      );

      if (slideElement) {
        gsap.to(slideElement, {
          opacity: index === activeSlide ? 1 : 0,
          duration: 1,
          ease: "power2.inOut",
        });
      }
    });

    // Trigger rolling text animation when slide changes (but not on first load)
    if (activeSlide > 0 || isAnimating) {
      animateToNextWord();
    }
  }, [activeSlide, slides, isFirstImageLoaded, isAnimating]);

  // Autoplay timer
  useEffect(() => {
    if (!isFirstImageLoaded) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setActiveSlide((current) => {
        const next = (current + 1) % slides.length;
        // Reset animating flag after a delay
        setTimeout(() => setIsAnimating(false), 100);
        return next;
      });
    }, autoplaySpeed);

    return () => clearInterval(interval);
  }, [autoplaySpeed, slides.length, isFirstImageLoaded]);

  const goToSlide = (index: number) => {
    if (index === activeSlide || isAnimating) return;
    setIsAnimating(true);
    setActiveSlide(index);
    setTimeout(() => setIsAnimating(false), 100);
  };

  const goToPrevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const prevSlide = activeSlide === 0 ? slides.length - 1 : activeSlide - 1;
    setActiveSlide(prevSlide);
    setTimeout(() => setIsAnimating(false), 100);
  };

  const goToNextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const nextSlide = (activeSlide + 1) % slides.length;
    setActiveSlide(nextSlide);
    setTimeout(() => setIsAnimating(false), 100);
  };

  return (
    <div
      ref={sectionRef}
      className={`hero-slider ${
        isFirstImageLoaded ? "hero-slider--loaded" : ""
      }`}
    >
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
        <h1 className="hero-slider__title">
          <span className="hero-slider__rolling-text">CREAMOS</span> <br />
          ESPACIOS QUE INSPIRAN.
        </h1>

        <div className="hero-slider__cta">
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
