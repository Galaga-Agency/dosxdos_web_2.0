"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";
import "./HeroSlider.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import { animateHeroSlider } from "@/utils/animations/pages/homepage-anim";
import { preloadNextImage, extractImageUrls } from "@/utils/imagePreloader";

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

  // Extract all image URLs for preloading
  const imageUrls = extractImageUrls(slides, "imageUrl");

  // Preload next slide whenever active slide changes
  useEffect(() => {
    preloadNextImage(activeSlide, imageUrls);
  }, [activeSlide, imageUrls]);

  // Initialize animations
  useLayoutEffect(() => {
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
      setActiveSlide((current) => (current + 1) % slides.length);
    }, autoplaySpeed);

    return () => clearInterval(interval);
  }, [autoplaySpeed, slides.length]);

  // Handle slide transitions with GSAP
  useEffect(() => {
    // Create a single GSAP timeline for smoother transitions
    const tl = gsap.timeline();

    slides.forEach((_, index) => {
      const slideElement = document.querySelector(
        `.hero-slider__slide:nth-child(${index + 1})`
      );

      if (slideElement) {
        if (index === activeSlide) {
          tl.to(
            slideElement,
            {
              opacity: 1,
              duration: 1,
              ease: "power2.inOut",
            },
            0
          );
        } else {
          tl.to(
            slideElement,
            {
              opacity: 0,
              duration: 1,
              ease: "power2.inOut",
            },
            0
          );
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
              priority={index === 0 || index === 1} // Prioritize first two slides
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
          <SecondaryButton href="/portfolio-2" size="large">
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
