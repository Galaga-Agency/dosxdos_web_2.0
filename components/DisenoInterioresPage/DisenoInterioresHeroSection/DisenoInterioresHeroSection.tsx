"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import gsap from "gsap";
import "./DisenoInterioresHeroSection.scss";

interface DisenoInterioresHeroSectionProps {
  onImageLoad?: () => void;
}

const DisenoInterioresHeroSection: React.FC<
  DisenoInterioresHeroSectionProps
> = ({ onImageLoad }) => {
  const { isMobile } = useDeviceDetect();
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    // Trigger animations after image is fully loaded
    if (onImageLoad) {
      // Small delay to ensure image is fully rendered
      setTimeout(onImageLoad, 50);
    }
  }, [onImageLoad]);

  useEffect(() => {
    // Set initial state and animate floating image
    gsap.set(".diseno-interiores-hero__floating-image-wrapper", {
      opacity: 0,
      y: 150,
    });

    gsap.to(".diseno-interiores-hero__floating-image-wrapper", {
      opacity: 1,
      y: 0,
      duration: 2.5,
      delay: 1.5,
      ease: "power2.out",
    });
  }, []);

  return (
    <>
      <div className="diseno-interiores-hero">
        <div className="diseno-interiores-hero__bg-container featured-image-container">
          <div
            ref={imageRef}
            className={`diseno-interiores-hero__image-wrapper featured-image-wrapper hero-image-wrapper ${
              imageLoaded ? "loaded" : "loading"
            }`}
          >
            <Image
              src="/assets/img/about-us-page/vicente-ferrer-illustration.avif"
              alt="Diseño de Interiores"
              fill
              quality={100}
              priority
              onLoad={handleImageLoad}
              onError={() => {
                console.error("Hero image failed to load");
                // Still trigger animations even if image fails
                handleImageLoad();
              }}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli2YY7jk/wB1OzN2+WV1OmT4BuLhR6wFpvGHrv1f6CqU\u003d\u003d"
            />
          </div>

          <div className="diseno-interiores-hero__overlay"></div>

          <div className="diseno-interiores-hero__content container">
            <h3 className="diseno-interiores-hero__label label">
              (ESPACIOS QUE CONECTAN)
            </h3>

            <h2 className="diseno-interiores-hero__title title text-1">
              Diseñamos espacios
            </h2>
            <h2 className="diseno-interiores-hero__title title text-2">
              <span>que conectan con las personas</span>
            </h2>
          </div>
        </div>
        {/* Floating Image - Back inside hero container */}
        <div
          className="diseno-interiores-hero__floating-image-wrapper featured-image-container"
          data-speed={isMobile ? "0" : "1.1"}
        >
          <Image
            src="/assets/img/about-us-page/vicente-ferrer-illustration.avif"
            alt="Diseño de Interiores Detail"
            fill
            quality={100}
            sizes="(min-width: 1024px) 450px, (min-width: 768px) 350px, 250px"
          />
        </div>
      </div>
    </>
  );
};

export default DisenoInterioresHeroSection;
