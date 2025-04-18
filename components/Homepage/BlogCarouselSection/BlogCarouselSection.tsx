"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import BlogItem from "@/components/BlogItem/BlogItem";
import { BlogPost } from "@/types/blog-post-types";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import "./BlogCarouselSection.scss";

interface BlogCarouselSectionProps {
  posts: BlogPost[];
}

const BlogCarouselSection: React.FC<BlogCarouselSectionProps> = ({ posts }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

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

  // Fix for animation issues - manually initialize basic visibility
  useEffect(() => {
    // Make sure items are visible regardless of animation
    const blogItems = document.querySelectorAll('.blog-item');
    if (blogItems.length) {
      gsap.set(blogItems, { opacity: 1, y: 0 });
    }
    
    // Let the homepage-anim.ts handle the rest of the animations
  }, []);

  return (
    <section ref={sectionRef} className="blog-carousel-section">
      <div className="container">
        <div className="section-header">
          <div className="section-header__decorative-line"></div>
          <h2 ref={titleRef} className="title">
            NUESTRO <span>BLOG</span>
          </h2>
          <p ref={subtitleRef} className="subtitle">
            Descubre las últimas tendencias y noticias en nuestro blog especializado
          </p>
        </div>

        <div className="carousel-container">
          <div className="carousel-navigation">
            <button
              className="nav-button prev"
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
              className="nav-button next"
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

          <div className="carousel-track-container">
            <div className="carousel-track" ref={carouselRef}>
              {posts.map((post, index) => (
                <div className="carousel-slide" key={post.id}>
                  <BlogItem item={post} index={index} />
                </div>
              ))}
            </div>
          </div>

          {totalSlides > 1 && (
            <div className="carousel-dots">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  className={`dot ${currentSlide === index ? "active" : ""}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Ir a publicación ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div ref={ctaRef} className="cta-container">
          <PrimaryButton href="/blog" size="medium">
            Ver todas las publicaciones
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default BlogCarouselSection;