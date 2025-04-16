"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
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
}

const HeroSlider: React.FC<HeroSliderProps> = ({
  slides,
  autoplaySpeed = 3000,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const ctaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const { isTouchDevice } = useDeviceDetect();

  // Title and CTA animation
  useEffect(() => {
    // Title animation
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.3,
          ease: "power3.out",
          transformOrigin: "left center",
        }
      );
    }

    // CTA animation
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: "power2.out",
        }
      );
    }
  }, []);

  // Initial slide setup and autoplay
  useEffect(() => {
    // Apply zoom effect to initial slide
    if (imageRefs.current[activeSlide]) {
      gsap.to(imageRefs.current[activeSlide], {
        duration: 6,
        ease: "power1.inOut",
      });
    }

    // Autoplay timer
    const interval = setInterval(() => {
      const nextSlide = (activeSlide + 1) % slides.length;
      setActiveSlide(nextSlide);
    }, autoplaySpeed);

    return () => clearInterval(interval);
  }, [activeSlide, autoplaySpeed, slides.length]);

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
    <div className="hero-slider">
      {!isTouchDevice && (
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

      <div className="hero-slider__container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slider__slide ${
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
              ref={(el) => {
                imageRefs.current[index] = el;
              }}
            />
          </div>
        ))}
      </div>

      <h1 className="hero-slider__title" ref={titleRef}>
        Espacios Que Inspiran
      </h1>

      <div className="hero-slider__cta" ref={ctaRef}>
        <SecondaryButton href="/portfolio" size="large">
          Descubrir Proyectos
        </SecondaryButton>
      </div>

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
    </div>
  );
};

export default HeroSlider;
