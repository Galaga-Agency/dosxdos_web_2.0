import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { charAnimation } from "@/utils/animations/title-anim";
import "./IntroSection.scss"

interface IntroSectionProps {
  isActive: boolean;
  mainScrollTrigger?: any;
}

const IntroSection: React.FC<IntroSectionProps> = ({
  isActive,
  mainScrollTrigger,
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Apply character animation when section becomes active
  useEffect(() => {
    if (isActive && titleRef.current) {
      charAnimation(titleRef.current);
    }
  }, [isActive]);

  return (
    <section className="intro-section">
      <div className="section-container">
        <h1 ref={titleRef} className="section-title main-title">
          Proyectos que hablan por si solos
        </h1>
        <div className="section-content">
          <p className="intro-text">
            Nos encargamos de la <strong>gestión integral de las firmas</strong>
            . Estudiamos las necesidades específicas de cada proyecto y
            diseñamos basándonos en las especificaciones de la firma.
            Posteriormente, realizamos los planos técnicos, producción de
            materiales e instalación en el punto de venta.
          </p>
          <div className="intro-images">
            <div className="intro-image section-image">
              <Image
                src="/assets/img/blog/color-psychology.jpg"
                alt="Portfolio showcase"
                width={400}
                height={320}
                className="img-fluid"
                priority
              />
            </div>
            <div className="intro-image section-image">
              <Image
                src="/assets/img/blog/minimalist-spaces.jpg"
                alt="Portfolio showcase"
                width={400}
                height={320}
                className="img-fluid"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;