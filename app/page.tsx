"use client";

import React, { useEffect, useState } from "react";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import HeroSlider from "@/components/Homepage/HeroSlider/HeroSlider";
import LogoMarquee from "@/components/Homepage/LogoMarquee/LogoMarquee";
import AboutUsSection from "@/components/Homepage/AboutUsSection/AboutUsSection";
import ServicesSection from "@/components/Homepage/ServicesSection/ServicesSection";
import BlogCarouselSection from "@/components/Homepage/BlogCarouselSection/BlogCarouselSection";
import "./page.scss";
import { BlogPost } from "@/types/blog-post-types";
import FeaturedprojectsSection from "@/components/Homepage/FeaturedprojectsSection/FeaturedprojectsSection";

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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        // Filter to only published posts
        const publishedPosts = data.filter(
          (post: BlogPost) => post.published === true
        );
        // Get the latest 6 posts for the carousel
        const latestPosts = publishedPosts.slice(0, 6);
        setBlogPosts(latestPosts);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <SmoothScrollWrapper showBackToTop={false}>
      <div className="homepage">
        <section className="homepage__hero">
          <HeroSlider slides={heroSlides} autoplaySpeed={3000} />
        </section>

        <AboutUsSection />
        <LogoMarquee />
        <ServicesSection />
        <FeaturedprojectsSection />
        {!loading && blogPosts.length > 0 && (
          <BlogCarouselSection posts={blogPosts} />
        )}
      </div>
    </SmoothScrollWrapper>
  );
};

export default Home;
