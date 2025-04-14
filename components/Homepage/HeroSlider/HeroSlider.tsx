"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import "./HeroSlider.scss";

interface SlideItem {
  id: number;
  imageUrl: string;
}

interface HeroSliderProps {
  slides: SlideItem[];
  autoplaySpeed?: number;
  logoImageUrl?: string;
  logoMobileImageUrl?: string;
}

const HeroSlider: React.FC<HeroSliderProps> = ({
  slides,
  autoplaySpeed = 3000,
  logoImageUrl = "/assets/img/homepage/portada-desktop.png",
  logoMobileImageUrl = "/assets/img/homepage/portada-movil.png",
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  // Check mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Logo and CTA animation
  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.5, ease: "power2.out" }
      );
    }

    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 1.5, ease: "power2.out" }
      );
    }
  }, []);

  // Initial slide setup and autoplay
  useEffect(() => {
    // Apply zoom effect to initial slide
    if (imageRefs.current[activeSlide]) {
      gsap.to(imageRefs.current[activeSlide], {
        scale: 1.1,
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

  // Handle slide transitions
  useEffect(() => {
    // Reset all slides to scale 1
    imageRefs.current.forEach((imgRef) => {
      if (imgRef) {
        gsap.set(imgRef, { scale: 1 });
      }
    });

    // Zoom effect on active slide
    if (imageRefs.current[activeSlide]) {
      gsap.to(imageRefs.current[activeSlide], {
        scale: 1.1,
        duration: 6,
        ease: "power1.inOut",
      });
    }
  }, [activeSlide]);

  const goToSlide = (index: number) => {
    if (index === activeSlide) return;
    setActiveSlide(index);
  };

  return (
    <div className="hero-slider">
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

      <div className="hero-slider__logo" ref={logoRef}>
        <Image
          src={isMobile ? logoMobileImageUrl : logoImageUrl}
          alt="Dos Por Dos Grupo Imagen"
          width={700}
          height={350}
          className="hero-slider__logo-image"
          priority
        />
      </div>

      <div className="hero-slider__cta" ref={ctaRef}>
        <PrimaryButton href="/portfolio" size="large">
          Descubrir Proyectos
        </PrimaryButton>
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
