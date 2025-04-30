"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";
import "./HeroSlider.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";

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
  const { isTouchDevice } = useDeviceDetect();

  // Autoplay timer
  useEffect(() => {
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

  // Animation variants for Framer Motion
  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1.4,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.2
      }
    }
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1.2, 
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.4
      }
    }
  };

  return (
    <div className="hero-slider">
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

      <div className="hero-slider__content">
        <motion.h1 
          className="hero-slider__title"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          Espacios Que Inspiran
        </motion.h1>

        <motion.div 
          className="hero-slider__cta"
          initial="hidden"
          animate="visible"
          variants={ctaVariants}
        >
          <SecondaryButton href="/portfolio" size="large">
            Descubrir Proyectos
          </SecondaryButton>
        </motion.div>
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