"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";
import "./HeroSlider.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import { preloadNextImages, extractImageUrls } from "@/utils/imagePreloader";

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
  const [loadedImages, setLoadedImages] = useState(new Set<number>());
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { isTouchDevice } = useDeviceDetect();

  // Extract all image URLs for preloading
  const imageUrls = extractImageUrls(slides, "imageUrl");

  // Handle individual image load
  const handleImageLoad = useCallback(
    (imageIndex: number) => {
      setLoadedImages((prev) => {
        const newSet = new Set(prev);
        newSet.add(imageIndex);

        // Check if first image is loaded (enough to start animations)
        if (imageIndex === 0 && onImagesLoad) {
          setTimeout(onImagesLoad, 50);
        }

        return newSet;
      });
    },
    [onImagesLoad]
  );

  // Preload next slide whenever active slide changes
  useEffect(() => {
    preloadNextImages(activeSlide, imageUrls, 1);
  }, [activeSlide, imageUrls]);

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

      <div className="hero-slider__container featured-image-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slider__slide featured-image-wrapper hero-image-wrapper ${
              index === activeSlide ? "active" : ""
            } ${loadedImages.has(index) ? "loaded" : "loading"}`}
          >
            <Image
              src={slide.imageUrl}
              alt={`Slide ${index + 1}`}
              fill
              priority={index === 0 || index === 1} // Prioritize first two slides
              sizes="100vw"
              className="hero-slider__image"
              onLoad={() => handleImageLoad(index)}
              ref={(el) => {
                imageRefs.current[index] = el;
              }}
            />
          </div>
        ))}
      </div>

      <div className="hero-slider__content">
        <h1 ref={titleRef} className="hero-slider__title">
          <span className="hero-slider__rolling-text">CREAMOS</span> <br />ESPACIOS
          
          QUE INSPIRAN.
        </h1>

        <div ref={ctaRef} className="hero-slider__cta">
          <SecondaryButton href="/servicios" size="large">
            Descubrir Servicios
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
