"use client";

import React, { useEffect, useState, useCallback } from "react";
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

import { useDataStore } from "@/store/useDataStore";
import { useHydration } from "@/hooks/useHydration";

import { charAnimation, fadeAnimation } from "@/utils/animations/text-anim";
import { panelTwoAnimation } from "@/utils/animations/panel-animation";
import { imageParallax } from "@/utils/animations/image-parallax";
import { initCardMouseParallax } from "@/utils/animations/card-hover-anim";
import { hoverCircleButtonAnimation } from "@/utils/animations/hover-btn";
import { featuredImageAnimation } from "@/utils/animations/featured-image-anim";
import { highlightAnimation } from "@/utils/animations/highlight-anim";
import { initRollingTextAnimation } from "@/utils/animations/rolling-text-animation";

// Slider data
const heroSlides = [
  {
    id: 1,
    imageUrl: "/assets/img/homepage/slider-3.avif",
  },
  {
    id: 2,
    imageUrl: "/assets/img/homepage/slider-1.avif",
  },
  {
    id: 3,
    imageUrl: "/assets/img/homepage/slider-2.avif",
  },
];

const HomePage = () => {
  const [heroReady, setHeroReady] = useState(false);
  const [sectionsReady, setSectionsReady] = useState(false);
  const isHydrated = useHydration();

  // Get data from zustand store
  const projects = useDataStore((state) => state.projects);
  const posts = useDataStore((state) => state.posts);
  const postsLoaded = useDataStore((state) => state.postsLoaded);
  const projectsLoaded = useDataStore((state) => state.projectsLoaded);

  // Filter data
  const featuredProjects = projects.filter((p) => p.featured);
  const publishedPosts = posts.filter((p) => p.published).slice(0, 6);

  // Check if we should show components
  const showFeaturedProjects = projectsLoaded && featuredProjects.length > 0;
  const showBlogCarousel = postsLoaded && publishedPosts.length > 0;

  useScrollSmooth();

  useEffect(() => {
    document.body.classList.add("smooth-scroll");

    return () => {
      document.body.classList.remove("smooth-scroll");
    };
  }, []);

  const handleHeroReady = useCallback(() => {
    setHeroReady(true);
  }, []);

  // Initialize hero animations immediately when hero is ready
  useGSAP(() => {
    if (heroReady && isHydrated) {
      // Run rolling text animation immediately for hero
      initRollingTextAnimation();
    }
  }, [heroReady, isHydrated]);

  // Initialize other animations when sections are ready
  useGSAP(() => {
    if (heroReady && isHydrated) {
      // Wait a bit for other sections to be ready
      const timer = setTimeout(() => {
        setSectionsReady(true);

        // Run all other animations
        fadeAnimation();
        charAnimation();
        imageParallax();
        initCardMouseParallax();
        hoverCircleButtonAnimation();

        if (showFeaturedProjects) {
          featuredImageAnimation();
        }

        highlightAnimation();
        panelTwoAnimation();
      }, 500); // Small delay to ensure sections are rendered

      return () => clearTimeout(timer);
    }
  }, [heroReady, isHydrated, showFeaturedProjects]);

  // Blog section animations
  useGSAP(() => {
    if (sectionsReady && showBlogCarousel) {
      highlightAnimation(0.3);
    }
  }, [sectionsReady, showBlogCarousel]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <main>
          <HeroSlider
            slides={heroSlides}
            autoplaySpeed={3000}
            onImagesLoad={handleHeroReady}
          />
          <AboutUsSection />
          <LogoMarquee />
          <ServicesSection />
          {showFeaturedProjects && (
            <FeaturedprojectsSection projects={featuredProjects} />
          )}
          {showBlogCarousel && <BlogCarouselSection posts={publishedPosts} />}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
