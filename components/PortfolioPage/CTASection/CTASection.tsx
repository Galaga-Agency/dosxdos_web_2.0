import React from "react";
import Link from "next/link";
import "./CTASection.scss";

const CTASection: React.FC = () => {
  return (
    <section className="portfolio-section cta-section">
      <div className="section-container">
        <h2 className="section-title cta-element">
          Construyamos juntos el próximo gran proyecto
        </h2>
        <div className="section-content cta-content">
          <div className="keep-in-touch">
            <div className="keep-in-touch-logo cta-element">
              <span>Keep</span>
              <span>In</span>
              <span>Touch</span>
            </div>
            <Link href="/contacto" className="contact-btn cta-element">
              Contáctanos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
