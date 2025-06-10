"use client";

import React, { useRef, useState, useEffect } from "react";
import BlogItem from "@/components/BlogItem/BlogItem";
import { BlogPost } from "@/types/blog-post-types";
import HoverCircleButton from "@/components/ui/HoverCircleButton/HoverCircleButton";
import "./BlogCarouselSection.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";

interface BlogCarouselSectionProps {
  posts: BlogPost[];
}

const BlogCarouselSection: React.FC<BlogCarouselSectionProps> = ({ posts }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isMobile, isTablet, isDesktop } = useDeviceDetect();

  // Calculate items per view based on device detection
  const itemsPerView = isMobile ? 1 : isTablet ? 2 : 3;

  // Calculate total slides
  const totalSlides = Math.max(1, Math.ceil(posts.length / itemsPerView));

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentSlide((prev) =>
      prev === 0 ? Math.max(0, totalSlides - 1) : prev - 1
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentSlide((prev) => (prev >= totalSlides - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentSlide(index);
  };

  if (posts.length === 0) {
    return (
      <div className="blog-carousel-section">No blog posts available.</div>
    );
  }

  // Calculate transform style
  const transformStyle = {
    transform: `translateX(-${currentSlide * 100}%)`,
  };

  return (
    <section ref={sectionRef} className="blog-carousel-section">
      <div className="blog-carousel-section__container container">
        <div className="blog-carousel-section__header header">
          <div className="blog-carousel-section__label label">
            <span>(Nuestro blog, lo que nos mueve.)</span>
          </div>

          <h2 className="blog-carousel-section__title secondary-title ">
            Ideas en <span className="highlight">movimiento</span>
          </h2>
        </div>

        <p className="blog-carousel-section__subtitle subtitle">
          Reflexiones, procesos y tendencias que nos mueven. Un espacio donde
          compartimos lo que aprendemos, creamos y nos inspira cada día.
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
              style={transformStyle}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={`slide-${slideIndex}`}
                  className="blog-carousel-section__page"
                >
                  {Array.from({ length: itemsPerView }).map((_, itemIndex) => {
                    const postIndex = slideIndex * itemsPerView + itemIndex;
                    const post = posts[postIndex];

                    if (!post) return null;

                    return (
                      <div
                        key={post.id || `post-${postIndex}`}
                        className="blog-carousel-section__carousel-slide"
                      >
                        <BlogItem item={post} index={postIndex} />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {totalSlides > 1 && (
            <div className="blog-carousel-section__carousel-dots">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={`dot-${index}`}
                  className={`blog-carousel-section__dot ${
                    currentSlide === index ? "active" : ""
                  }`}
                  onClick={(e) => handleDotClick(index, e)}
                  aria-label={`Ir a publicación ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="blog-carousel-section__cta-container">
          <HoverCircleButton href="/blog" label="Visita nuestro blog" />
        </div>
      </div>
    </section>
  );
};

export default BlogCarouselSection;
