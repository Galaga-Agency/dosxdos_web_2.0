import React, { useRef } from "react";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";

const BlogDetailCTASection: React.FC = () => {
  const ctaSectionRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={ctaSectionRef} className="blog-detail__cta-section">
      <div className="blog-detail__cta-content">
        <h2 className="blog-detail__cta-title">
          Descubre más <span className="highlight">inspiración</span>
        </h2>
        <p className="blog-detail__cta-text">
          Explora nuestra colección de artículos y encuentra ideas para tu
          próximo proyecto.
        </p>
        <PrimaryButton href="/blog" className="blog-detail__cta-button">
          <span className="button-text">Ver más artículos</span>
          <span className="button-icon">→</span>
        </PrimaryButton>
      </div>
    </div>
  );
};

export default BlogDetailCTASection;
