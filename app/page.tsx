"use client";

import React from "react";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import HeroSlider from "@/components/Homepage/HeroSlider/HeroSlider";
import ServicesSection from "@/components/Homepage/ServicesSection/ServicesSection";
import "./page.scss";

// Slider images data
const heroSlides = [
  {
    id: 1,
    imageUrl: "/assets/img/homepage/slider-1.jpg",
  },
  {
    id: 2,
    imageUrl: "/assets/img/homepage/slider-2.jpg",
  },
  {
    id: 3,
    imageUrl: "/assets/img/homepage/slider-3.jpg",
  },
];

const Home: React.FC = () => {
  return (
    <SmoothScrollWrapper showBackToTop={false}>
      <div className="homepage">
        <section className="homepage__hero">
          <HeroSlider
            slides={heroSlides}
            autoplaySpeed={3000}
            logoImageUrl="/assets/img/homepage/portada-desktop.png"
            logoMobileImageUrl="/assets/img/homepage/portada-movil.png"
          />
        </section>

        <ServicesSection />
      </div>
    </SmoothScrollWrapper>
  );
};

export default Home;
