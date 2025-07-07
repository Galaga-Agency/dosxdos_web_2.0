"use client";

import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
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
import Breadcrumbs from "@/components/SEO/Breadcrumbs";

import { useDataStore } from "@/store/useDataStore";

import { charAnimation } from "@/utils/animations/text-anim";
import { panelTwoAnimation } from "@/utils/animations/panel-animation";
import { imageParallax } from "@/utils/animations/image-parallax";
import { initCardMouseParallax } from "@/utils/animations/card-hover-anim";
import { hoverCircleButtonAnimation } from "@/utils/animations/hover-btn";
import { featuredImageAnimation } from "@/utils/animations/featured-image-anim";
import { highlightAnimation } from "@/utils/animations/highlight-anim";
import { initRollingTextAnimation } from "@/utils/animations/rolling-text-animation";
import { animateHeroSlider } from "@/utils/animations/homepage-hero";
import { servicesList } from "@/data/services";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

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
  const [animationsInitialized, setAnimationsInitialized] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  // Get data from zustand store
  const projects = useDataStore((state) => state.projects);
  const posts = useDataStore((state) => state.posts);
  const postsLoaded = useDataStore((state) => state.postsLoaded);
  const projectsLoaded = useDataStore((state) => state.projectsLoaded);

  // Memoize filtered data to prevent unnecessary re-renders
  const featuredProjects = useMemo(
    () => projects.filter((p) => p.featured),
    [projects]
  );

  const publishedPosts = useMemo(
    () => posts.filter((p) => p.published).slice(0, 6),
    [posts]
  );

  const hasServices = servicesList.length > 0;
  const hasFeaturedProjects = projectsLoaded && featuredProjects.length > 0;
  const hasBlogPosts = postsLoaded && publishedPosts.length > 0;

  useScrollSmooth();

  const breadcrumbItems = useMemo(() => [{ name: "Inicio", href: "/" }], []);

  useEffect(() => {
    document.body.classList.add("smooth-scroll");

    return () => {
      document.body.classList.remove("smooth-scroll");
      // Execute cleanup if it exists
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, []);

  const handleHeroReady = useCallback(() => {
    setHeroReady(true);
  }, []);

  useGSAP(() => {
    if (!animationsInitialized) {
      // Set a flag to prevent re-initialization
      setAnimationsInitialized(true);

      // Initialize hero animations immediately
      animateHeroSlider();

      // Initialize rolling text (but don't start auto-animation since HeroSlider controls it)
      const cleanupRollingText = initRollingTextAnimation();

      // Initialize other base animations with a small delay for DOM readiness
      const timer = setTimeout(() => {
        charAnimation();
        imageParallax();
        hoverCircleButtonAnimation();
        highlightAnimation();
        featuredImageAnimation();

        // Initialize service animations if services exist
        if (hasServices) {
          initCardMouseParallax();
        }
      }, 200);

      // Store cleanup function
      cleanupRef.current = () => {
        clearTimeout(timer);
        if (cleanupRollingText) {
          cleanupRollingText();
        }
      };

      return () => {
        clearTimeout(timer);
        if (cleanupRollingText) {
          cleanupRollingText();
        }
      };
    }
  }, [animationsInitialized, hasServices]);

  // Initialize project-specific animations when projects are ready
  useGSAP(() => {
    if (animationsInitialized && hasFeaturedProjects) {
      const timer = setTimeout(() => {
        panelTwoAnimation();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [animationsInitialized, hasFeaturedProjects]);

  // Blog section animations - only when everything is ready
  useGSAP(() => {
    if (animationsInitialized && hasBlogPosts) {
      const timer = setTimeout(() => {
        highlightAnimation(0.3);
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [animationsInitialized, hasBlogPosts]);

  return (
    <PageWrapper>
      <div className="breadcrumbs">
        <div className="container">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      <main>
        <HeroSlider
          slides={heroSlides}
          autoplaySpeed={3000}
          onImagesLoad={handleHeroReady}
        />
        <AboutUsSection />
        <LogoMarquee />
        <ServicesSection services={servicesList} />
        <FeaturedprojectsSection projects={featuredProjects} />
        <BlogCarouselSection posts={publishedPosts} />
      </main>

      <Footer />
    </PageWrapper>
  );
};

export default HomePage;
