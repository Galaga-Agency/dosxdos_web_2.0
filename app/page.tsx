"use client";

import React, { useEffect, useState, useRef } from "react";
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
import "./homepage.scss";
import Footer from "@/components/layout/Footer/footer";
import Loading from "@/components/ui/Loading/Loading";
import { useInitialLoading } from "@/hooks/useInitialLoading";

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
  const homepageRef = useRef<HTMLDivElement>(null);

  // Force component remount on each page visit
  const [key] = useState(() => Date.now());

  // Use our custom hook to handle loading state
  const isLoading = useInitialLoading(1500);

  useEffect(() => {
    if (isLoading) return;

    initScrollTriggerConfig();

    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        console.log("Fetched blog posts:", data);
        const publishedPosts = data.filter(
          (post: BlogPost) => post.published === true
        );
        console.log("Published posts:", publishedPosts.length);
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
  }, [isLoading]);

  // Show loading component only on initial direct page load
  if (isLoading) {
    return <Loading />;
  }

  return (
    <SmoothScrollWrapper>
      <div ref={homepageRef} className="homepage" key={key}>
        <HeroSlider
          slides={heroSlides}
          autoplaySpeed={3000}
          key={`hero-${key}`}
        />
        <AboutUsSection key={`about-${key}`} />
        <LogoMarquee key={`marquee-${key}`} />
        <ServicesSection key={`services-${key}`} />
        <FeaturedprojectsSection key={`projects-${key}`} />
        {!loading && blogPosts.length > 0 && (
          <BlogCarouselSection posts={blogPosts} key={`blog-${key}`} />
        )}
        <Footer />
      </div>
    </SmoothScrollWrapper>
  );
};

export default Home;
