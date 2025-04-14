"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import "./CTASection.scss";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";

interface CTASectionProps {
  isActive?: boolean;
}

const CTASection: React.FC<CTASectionProps> = ({ isActive = false }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaButtonBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    if (
      isActive ||
      (typeof window !== "undefined" && window.innerWidth < 768)
    ) {
      const elements = {
        title: titleRef.current,
        ctaButtonBox: ctaButtonBoxRef.current,
      };

      // Set initial states
      if (elements.title) {
        gsap.fromTo(
          elements.title,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          }
        );
      }

      if (elements.ctaButtonBox) {
        gsap.fromTo(
          elements.ctaButtonBox,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.2,
          }
        );
      }
    }
  }, [isActive]);

  return (
    <section
      className="portfolio-section cta-section"
      ref={sectionRef}
      data-section-index="4"
    >
      <div className="section-container">
        <h2 className="section-title cta-element" ref={titleRef}>
          Contáctenos y pídanos presupuesto para su proyecto
        </h2>

        <div className="section-content cta-content">
          <div className="row">
            <div className="col-xl-12">
              <div
                className="cta-button-box mb-45 d-flex justify-content-center"
                ref={ctaButtonBoxRef}
              >
                <Link
                  className="primary-animated-btn desktop-button"
                  href="/contacto"
                >
                  <span className="btn-expand"></span>
                  <span className="btn-1">Keep</span>
                  <span className="btn-2">In</span>
                  <span className="btn-3">Touch</span>
                </Link>
                <PrimaryButton href="/contacto" className="mobile-button">
                  Keep In Touch
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
