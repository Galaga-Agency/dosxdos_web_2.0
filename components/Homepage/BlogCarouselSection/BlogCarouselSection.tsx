"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import BlogItem from "@/components/BlogItem/BlogItem";
import { BlogPost } from "@/types/blog-post-types";
import HoverCircleButton from "@/components/ui/HoverCircleButton/HoverCircleButton";
import "./BlogCarouselSection.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface BlogCarouselSectionProps {
  posts: BlogPost[];
}

const BlogCarouselSection: React.FC<BlogCarouselSectionProps> = ({ posts }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Use device detection hook
  const { isMobile, isTablet, isDesktop } = useDeviceDetect();

  // Calculate items per view based on device detection
  const itemsPerView = isMobile ? 1 : isTablet ? 2 : 3;

  // Calculate total slides
  useEffect(() => {
    setTotalSlides(Math.max(1, Math.ceil(posts.length / itemsPerView)));
  }, [posts, itemsPerView]);

  // Direct animation approach without initFadeAnimations
  useEffect(() => {
    if (!sectionRef.current) return;

    console.log("Blog Carousel Section mounted");

    // Get references to elements we want to animate
    const labelEl = sectionRef.current.querySelector(
      ".blog-carousel-section__label"
    );
    const titleRowEls = sectionRef.current.querySelectorAll(".title-row");
    const subtitleEl = sectionRef.current.querySelector(
      ".blog-carousel-section__subtitle"
    );
    const carouselContainerEl = sectionRef.current.querySelector(
      ".blog-carousel-section__carousel-container"
    );
    const ctaContainerEl = sectionRef.current.querySelector(
      ".blog-carousel-section__cta-container"
    );

    // Create a timeline for animations
    const tl = gsap.timeline();

    // Label animation
    if (labelEl) {
      gsap.set(labelEl, { opacity: 0, y: 30 });
      tl.to(
        labelEl,
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        0.2
      );
    }

    // Title rows animation
    if (titleRowEls.length) {
      gsap.set(titleRowEls, { opacity: 0, y: 30 });
      titleRowEls.forEach((row, index) => {
        tl.to(
          row,
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          0.3 + index * 0.2
        );
      });
    }

    // Subtitle animation
    if (subtitleEl) {
      gsap.set(subtitleEl, { opacity: 0, x: -30 });
      tl.to(
        subtitleEl,
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        0.5
      );
    }

    // Carousel container animation
    if (carouselContainerEl) {
      gsap.set(carouselContainerEl, { opacity: 0, y: 40 });
      tl.to(
        carouselContainerEl,
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        0.7
      );
    }

    // CTA container animation
    if (ctaContainerEl) {
      gsap.set(ctaContainerEl, { opacity: 0, y: 20 });
      tl.to(
        ctaContainerEl,
        { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.4)" },
        0.9
      );
    }

    // Create ScrollTrigger with a lower start point to ensure it triggers
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      animation: tl,
      start: "top 90%",
      once: true,
    });

    // Clean up on unmount
    return () => {
      if (trigger) trigger.kill();
      if (tl) tl.kill();
    };
  }, []);

  // Update carousel position
  useEffect(() => {
    if (carouselRef.current) {
      const translateValue = -currentSlide * 100;
      gsap.to(carouselRef.current, {
        xPercent: translateValue,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }, [currentSlide]);

  // Navigation handlers
  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <section ref={sectionRef} className="blog-carousel-section">
      <div className="blog-carousel-section__container">
        <div className="blog-carousel-section__header">
          <div className="blog-carousel-section__label">
            <span>Nuestro Blog</span>
          </div>

          <h2 className="blog-carousel-section__title">
            <div className="title-row">ESTRATEGIAS E IDEAS</div>
            <div className="title-row">PARA ESPACIOS COMERCIALES</div>
          </h2>
        </div>

        <p className="blog-carousel-section__subtitle">
          Descubre nuestras últimas publicaciones sobre diseño y tendencias en
          el sector de la <strong>cosmética y perfumería</strong>
        </p>

        <div className="blog-carousel-section__carousel-container">
          <div className="blog-carousel-section__carousel-navigation">
            <button
              className="blog-carousel-section__nav-button blog-carousel-section__nav-button--prev"
              onClick={handlePrev}
              aria-label="Publicación anterior"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              className="blog-carousel-section__nav-button blog-carousel-section__nav-button--next"
              onClick={handleNext}
              aria-label="Siguiente publicación"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 6L15 12L9 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="blog-carousel-section__carousel-track-container">
            <div
              className="blog-carousel-section__carousel-track"
              ref={carouselRef}
            >
              {posts.map((post, index) => (
                <div
                  className="blog-carousel-section__carousel-slide"
                  key={post.id || index}
                >
                  <BlogItem item={post} index={index} />
                </div>
              ))}
            </div>
          </div>

          {totalSlides > 1 && (
            <div className="blog-carousel-section__carousel-dots">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  className={`blog-carousel-section__dot ${
                    currentSlide === index ? "active" : ""
                  }`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Ir a publicación ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="blog-carousel-section__cta-container">
          <HoverCircleButton href="/blog" label="Ver Más Artículos" />
        </div>
      </div>
    </section>
  );
};

export default BlogCarouselSection;
