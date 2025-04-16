"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { SplitText } from "@/plugins";
import { charAnimation } from "@/utils/animations/title-anim";
import BlogItem from "@/components/BlogItem/BlogItem";
import { BlogPost } from "@/types/blog-post-types";
import "./BlogCarouselSection.scss";

interface BlogCarouselSectionProps {
  posts: BlogPost[];
}

const BlogCarouselSection: React.FC<BlogCarouselSectionProps> = ({ posts }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
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
    setTotalSlides(Math.ceil(posts.length / itemsPerView));
  }, [posts, itemsPerView]);

  // Title animation
  useEffect(() => {
    gsap.registerPlugin(SplitText);

    if (titleRef.current) {
      const timer = setTimeout(() => {
        charAnimation(titleRef.current);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Navigation handlers
  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

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

  return (
    <section className="blog-carousel-section">
      <div className="container">
        <div className="section-header">
          <h2 ref={titleRef} className="title">
            Últimas <span>publicaciones</span>
          </h2>
          <p className="subtitle">
            Descubre las últimas tendencias y noticias en nuestro blog
            especializado
          </p>
        </div>

        <div className="carousel-container">
          <div className="carousel-navigation">
            <button
              className="nav-button prev"
              onClick={handlePrev}
              aria-label="Previous slide"
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
              aria-label="Next slide"
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

          <div className="carousel-dots">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={`dot ${currentSlide === index ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="cta-container">
          <Link href="/blog" className="primary-button">
            Ver todas las publicaciones
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogCarouselSection;
