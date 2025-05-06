"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import HoverCircleButton from "@/components/ui/HoverCircleButton/HoverCircleButton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  initFadeAnimations,
  cleanupServiciosAnimations,
} from "@/utils/animations/pages/servicios-page-anim";
import "./VisionSection.scss";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const VisionSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      setTimeout(() => {
        initFadeAnimations();

        // Force refresh to ensure ScrollSmoother picks up data-speed attributes
        setTimeout(() => {
          if ((window as any).__smoother__) {
            console.log("Refreshing ScrollSmoother");
            (window as any).__smoother__.refresh();
          }
          ScrollTrigger.refresh();
        }, 100);
      }, 300);
    }

    return () => {
      cleanupServiciosAnimations();
    };
  }, []);

  return (
    <section className="vision-section" ref={sectionRef}>
      <div className="vision-section__top">
        <div className="vision-section__container">
          <div className="vision-section__title-box">
            <span className="vision-section__label fade_bottom">
              our vision
            </span>
            <h2 className="vision-section__title fade_bottom">
              WE HELP CREATE
              <br />
              <span className="vision-section__title-row-2">
                AND SUPERCHARGE BRANDS
              </span>
            </h2>
          </div>

          <div className="vision-section__content">
            {/* Main image with parallax effect */}
            <div
              className="vision-section__image fade_bottom"
              data-speed="0.85"
            >
              <div className="vision-section__image-inner" data-speed="1.2">
                <Image
                  src="/assets/img/blog/corporate-branding.jpg"
                  alt="Branding"
                  width={600}
                  height={750}
                  priority
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    willChange: "transform",
                  }}
                />
              </div>
            </div>
            <div className="vision-section__text-wrap">
              <p className="vision-section__text fade_left">
                This is where data, know-how, and creativity meet design and
                walk the path to success. Thinking as one, acting as one, always
                by your side pushing boundaries. Our highly specialized approach
                offers a wide spectrum of services!
              </p>
              <div className="vision-section__button fade_bottom">
                <HoverCircleButton href="/about" label="About us" />
              </div>
            </div>
          </div>

          {/* Middle floating image with parallax effect */}
          <div
            className="vision-section__middle-image fade_right"
            data-speed="1.15"
          >
            <div
              className="vision-section__middle-image-inner"
              data-speed="0.8"
            >
              <Image
                src="/assets/img/blog/visual-storytelling.jpg"
                alt="Team working together"
                width={500}
                height={400}
                priority
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  willChange: "transform",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="vision-section__bottom">
        <div className="vision-section__container">
          <div className="vision-section__bottom-content">
            <h3 className="vision-section__statement fade_bottom">
              We strongly believe that only design reinforced by strategy can
              provide real results.
            </h3>

            <div className="vision-section__services">
              <div className="vision-section__service-item fade_bottom">
                <div className="vision-section__service-icon">
                  <Image
                    src="/assets/img/icons/service-icon-2.webp"
                    alt="Branding icon"
                    width={80}
                    height={80}
                  />
                </div>
                <h4 className="vision-section__service-title">Branding</h4>
                <p className="vision-section__service-text">
                  Branding is one of the most important ingredients for the
                  success of any business.
                </p>
              </div>

              <div className="vision-section__service-item fade_bottom">
                <div className="vision-section__service-icon">
                  <Image
                    src="/assets/img/icons/service-icon-1.webp"
                    alt="Website design icon"
                    width={80}
                    height={80}
                  />
                </div>
                <h4 className="vision-section__service-title">
                  Website design
                </h4>
                <p className="vision-section__service-text">
                  The perfect cocktail should still look and taste perfect no
                  matter the size of the glass you serve it in.
                </p>
              </div>

              <div className="vision-section__service-item fade_bottom">
                <div className="vision-section__service-icon">
                  <Image
                    src="/assets/img/icons/service-icon-3.webp"
                    alt="Marketing icon"
                    width={80}
                    height={80}
                  />
                </div>
                <h4 className="vision-section__service-title">Marketing</h4>
                <p className="vision-section__service-text">
                  We take that same approach with the apps & websites we create:
                  you go there because of the overall experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
