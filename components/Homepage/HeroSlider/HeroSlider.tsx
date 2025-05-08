"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";
import "./HeroSlider.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import { animateHeroSlider } from "@/utils/animations/pages/homepage-anim";

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
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { isTouchDevice } = useDeviceDetect();

  // Initialize animations
  useEffect(() => {
    if (sectionRef.current && titleRef.current && ctaRef.current) {
      // Animate the hero section
      animateHeroSlider({
        section: sectionRef.current,
        title: titleRef.current,
        cta: ctaRef.current,
      });
    }
  }, []);

  // Autoplay timer
  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (activeSlide + 1) % slides.length;
      setActiveSlide(nextSlide);
    }, autoplaySpeed);

    return () => clearInterval(interval);
  }, [activeSlide, autoplaySpeed, slides.length]);

  // Handle slide transitions with GSAP
  useEffect(() => {
    slides.forEach((_, index) => {
      const slideElement = document.querySelector(
        `.hero-slider__slide:nth-child(${index + 1})`
      );

      if (slideElement) {
        if (index === activeSlide) {
          gsap.to(slideElement, {
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
          });
        } else {
          gsap.to(slideElement, {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
          });
        }
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
              priority
              sizes="100vw"
              className="hero-slider__image"
              ref={(el) => {
                imageRefs.current[index] = el;
              }}
            />
          </div>
        ))}
      </div>

      <div className="hero-slider__content">
        <h1 ref={titleRef} className="hero-slider__title">
          DISEÑAMOS ESPACIOS
          <br />
          QUE INSPIRAN
        </h1>

        <div ref={ctaRef} className="hero-slider__cta">
          <SecondaryButton href="/portfolio" size="large">
            Descubrir Proyectos
          </SecondaryButton>
        </div>
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
