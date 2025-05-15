'use client';

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
    // Skip initialization if still in initial loading state
    if (isLoading) return;
    
    console.log("Home component mounted");

    // Initialize ScrollTrigger configuration once
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

    // Set up intersection observer for lazy loading sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add a class to gradually show the section
            entry.target.classList.add("is-visible");

            // Unobserve after it becomes visible
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "100px 0px", threshold: 0.1 }
    );

    // Observe all sections except the hero (which should load immediately)
    document.querySelectorAll(".lazy-section").forEach((section) => {
      observer.observe(section);
    });

    // Ensure the ScrollTrigger is refreshed after all components render
    const refreshTimer = setTimeout(() => {
      if ((window as any).__smoother__) {
        (window as any).__smoother__.refresh();
      }
      ScrollTrigger.refresh();
    }, 500);

    // Cleanup on unmount
    return () => {
      console.log("Home component unmounting, cleaning up animations");
      clearTimeout(refreshTimer);
      observer.disconnect();
      cleanupHomepageAnimations();
    };
  }, [isLoading]);

  // Show loading component only on initial direct page load
  if (isLoading) {
    return <Loading />;
  }

  return (
    <SmoothScrollWrapper showBackToTop={false}>
      <div ref={homepageRef} className="homepage" key={key}>
        <section className="homepage__hero">
          <HeroSlider
            slides={heroSlides}
            autoplaySpeed={3000}
            key={`hero-${key}`}
          />
        </section>

        <section className="lazy-section">
          <AboutUsSection key={`about-${key}`} />
        </section>

        <section className="homepage__marquee lazy-section">
          <LogoMarquee key={`marquee-${key}`} />
        </section>

        <section className="lazy-section">
          <ServicesSection key={`services-${key}`} />
        </section>

        <section className="lazy-section">
          <FeaturedprojectsSection key={`projects-${key}`} />
        </section>

        {/* Blog section - show directly without lazy loading */}
        {!loading && blogPosts.length > 0 && (
          <section>
            <BlogCarouselSection posts={blogPosts} key={`blog-${key}`} />
          </section>
        )}
      </div>
      <Footer />
    </SmoothScrollWrapper>
  );
};

export default Home;