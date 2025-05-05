"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { initFadeAnimations, cleanupServiciosAnimations } from "@/utils/animations/pages/servicios-page-anim";
import HoverCircleButton from "@/components/ui/HoverCircleButton/HoverCircleButton";
import "./VisionSection.scss";

const VisionSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    console.log("VisionSection mounted");
    
    if (sectionRef.current) {
      setTimeout(() => {
        initFadeAnimations();
      }, 300);
    }
    
    return () => {
      console.log("VisionSection unmounting");
      cleanupServiciosAnimations();
    };
  }, []);

  return (
    <section className="vision-section" ref={sectionRef}>
      <div className="vision-section__top">
        <div className="vision-section__container">
          <div className="vision-section__top-content">
            <div className="vision-section__left">
              <span className="vision-section__small-text fade_bottom">our vision</span>
              <h2 className="vision-section__heading fade_bottom">
                WE HELP CREATE<br />
                AND SUPERCHARGE BRANDS
              </h2>
            </div>
            
            <div className="vision-section__right">
              <div className="vision-section__img-wrap fade_right">
                <Image 
                  src="/assets/img/blog/corporate-branding.jpg"
                  alt="Branding example"
                  width={400}
                  height={400}
                />
              </div>
              
              <div className="vision-section__text-container">
                <p className="vision-section__text fade_left">
                  This is where data, know-how, and creativity meet
                  design and walk the path to success. Thinking as
                  one, acting as one, always by your side pushing
                  boundaries. Our highly specialized approach
                  offers a wide spectrum of services!
                </p>
                
                <div className="vision-section__button-container fade_bottom">
                  <HoverCircleButton 
                    href="/about" 
                    label="About us" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Middle image positioned between sections */}
      <div className="vision-section__middle-image fade_bottom">
        <Image 
          src="/assets/img/blog/visual-storytelling.jpg"
          alt="Team working together"
          width={500}
          height={400}
        />
      </div>
      
      <div className="vision-section__bottom">
        <div className="vision-section__container">
          <div className="vision-section__bottom-content">
            <h3 className="vision-section__statement fade_bottom">
              We strongly believe that only design reinforced by
              strategy can provide real results.
            </h3>
            
            <div className="vision-section__services">
              <div className="vision-section__service-item fade_bottom">
                <div className="vision-section__service-icon">
                  <Image 
                    src="/assets/img/icons/branding.svg"
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
                    src="/assets/img/icons/web-design.svg"
                    alt="Website design icon"
                    width={80}
                    height={80}
                  />
                </div>
                <h4 className="vision-section__service-title">Website design</h4>
                <p className="vision-section__service-text">
                  The perfect cocktail should still look and taste perfect no 
                  matter the size of the glass you serve it in.
                </p>
              </div>
              
              <div className="vision-section__service-item fade_bottom">
                <div className="vision-section__service-icon">
                  <Image 
                    src="/assets/img/icons/marketing.svg"
                    alt="Marketing icon"
                    width={80}
                    height={80}
                  />
                </div>
                <h4 className="vision-section__service-title">Marketing</h4>
                <p className="vision-section__service-text">
                  We take that same approach with the apps & websites we 
                  create: you go there because of the overall experience.
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