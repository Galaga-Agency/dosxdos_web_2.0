"use client";

import React, { useEffect, useState } from "react";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import HeroSlider from "@/components/Homepage/HeroSlider/HeroSlider";
import LogoMarquee from "@/components/Homepage/LogoMarquee/LogoMarquee";
import AboutUsSection from "@/components/Homepage/AboutUsSection/AboutUsSection";
import ServicesSection from "@/components/Homepage/ServicesSection/ServicesSection";
import BlogCarouselSection from "@/components/Homepage/BlogCarouselSection/BlogCarouselSection";
import FeaturedprojectsSection from "@/components/Homepage/FeaturedprojectsSection/FeaturedprojectsSection";
import { BlogPost } from "@/types/blog-post-types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { cleanupHomepageAnimations } from "@/utils/animations/pages/homepage-anim";
import { initScrollTriggerConfig } from "@/utils/animations/scrolltrigger-config";
import "./page.scss";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Slider images data
const heroSlides = [
  {
    id: 1,
    imageUrl: "/assets/img/homepage/slider-3.webp",
  },
  {
    id: 2,
    imageUrl: "/assets/img/homepage/slider-1.webp",
  },
  {
    id: 3,
    imageUrl: "/assets/img/homepage/slider-2.webp",
  },
];

const Home: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Force component remount on each page visit
  const [key] = useState(() => Date.now());

  useEffect(() => {
    // Initialize ScrollTrigger configuration once
    initScrollTriggerConfig();

    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        const publishedPosts = data.filter(
          (post: BlogPost) => post.published === true
        );
        const latestPosts = publishedPosts.slice(0, 6);
        setBlogPosts(latestPosts);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    // Cleanup on unmount
    return () => {
      cleanupHomepageAnimations();
    };
  }, []);

  return (
    <SmoothScrollWrapper showBackToTop={false}>
      <div className="homepage" key={key}>
        <section className="homepage__hero">
          <HeroSlider
            slides={heroSlides}
            autoplaySpeed={3000}
            key={`hero-${key}`}
          />
        </section>

        <AboutUsSection key={`about-${key}`} />

        <div className="homepage__marquee">
          <LogoMarquee key={`marquee-${key}`} />
        </div>

        <ServicesSection key={`services-${key}`} />
        <FeaturedprojectsSection key={`projects-${key}`} />

        {!loading && blogPosts.length > 0 && (
          <BlogCarouselSection posts={blogPosts} key={`blog-${key}`} />
        )}
      </div>
    </SmoothScrollWrapper>
  );
};

export default Home;
