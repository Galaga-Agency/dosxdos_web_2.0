"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { initFadeAnimations } from "@/utils/animations/pages/homepage-anim";
import BlogItem from "@/components/BlogItem/BlogItem";
import { BlogPost } from "@/types/blog-post-types";
import HoverCircleButton from "@/components/ui/HoverCircleButton/HoverCircleButton";
import "./BlogCarouselSection.scss";

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
  const [itemsPerView, setItemsPerView] = useState(3);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Handle responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 992) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    // Set initial value
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate total slides
  useEffect(() => {
    setTotalSlides(Math.max(1, Math.ceil(posts.length / itemsPerView)));
  }, [posts, itemsPerView]);

  // Animation useEffect with 300ms delay
  useEffect(() => {
    if (sectionRef.current) {
      const timer = setTimeout(() => {
        // Initialize fade animations
        initFadeAnimations();

        // Force refresh to ensure ScrollTrigger works properly
        setTimeout(() => {
          if ((window as any).__smoother__) {
            console.log("Refreshing ScrollSmoother");
            (window as any).__smoother__.refresh();
          }
          ScrollTrigger.refresh();
        }, 100);
      }, 300);

      return () => clearTimeout(timer);
    }
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
          <div className="blog-carousel-section__label fade_top">
            <span>Nuestro Blog</span>
          </div>

          <h2 className="blog-carousel-section__title">
            <div className="title-row fade_top">ESTRATEGIAS E IDEAS</div>
            <div className="title-row fade_top">
              PARA ESPACIOS COMERCIALES
            </div>
          </h2>
        </div>

        <p className="blog-carousel-section__subtitle fade_left">
          Descubre nuestras últimas publicaciones sobre diseño y tendencias en
          el sector de la <strong>cosmética y perfumería</strong>
        </p>

        <div className="blog-carousel-section__carousel-container fade_top">
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
                  key={post.id}
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

        <div className="blog-carousel-section__cta-container fade_top">
          <HoverCircleButton href="/sobre-nosotros" label="Ver Más Artículos" />
        </div>
      </div>
    </section>
  );
};

export default BlogCarouselSection;
