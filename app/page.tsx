"use client";

import React, { useEffect, useState } from "react";
import useScrollSmooth from "@/hooks/useScrollSmooth";
import { gsap } from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

import HeroSlider from "@/components/Homepage/HeroSlider/HeroSlider";
import LogoMarquee from "@/components/Homepage/LogoMarquee/LogoMarquee";
import AboutUsSection from "@/components/Homepage/AboutUsSection/AboutUsSection";
import ServicesSection from "@/components/Homepage/ServicesSection/ServicesSection";
import FeaturedprojectsSection from "@/components/Homepage/FeaturedprojectsSection/FeaturedprojectsSection";
import BlogCarouselSection from "@/components/Homepage/BlogCarouselSection/BlogCarouselSection";
import Footer from "@/components/layout/Footer/footer";

import { BlogPost } from "@/types/blog-post-types";

import { charAnimation, fadeAnimation } from "@/utils/animations/text-anim";
import { panelTwoAnimation } from "@/utils/animations/panel-animation";
import { imageParallax } from "@/utils/animations/image-parallax";
import { initHeroSlider } from "@/utils/animations/homepage-hero";
import { initCardMouseParallax } from "@/utils/animations/card-hover-anim";
import { hoverCircleButtonAnimation } from "@/utils/animations/hover-btn";

// Slider data
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

const HomePage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useScrollSmooth();

  useEffect(() => {
    document.body.classList.add("smooth-scroll");
    return () => {
      document.body.classList.remove("smooth-scroll");
    };
  }, []);

  useEffect(() => {
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

    return () => {
      document.body.classList.remove("smooth-scroll");
    };
  }, []);

  useGSAP(() => {
    const timer = setTimeout(() => {
      fadeAnimation();
      charAnimation();
      initHeroSlider();
      imageParallax();
      initCardMouseParallax();
      panelTwoAnimation();
      hoverCircleButtonAnimation();
    }, 300);

    return () => clearTimeout(timer);
  });

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <main>
          <HeroSlider slides={heroSlides} autoplaySpeed={3000} />
          <AboutUsSection />
          <LogoMarquee />
          <ServicesSection />
          <FeaturedprojectsSection />
          {!loading && blogPosts.length > 0 && (
            <BlogCarouselSection posts={blogPosts} />
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
