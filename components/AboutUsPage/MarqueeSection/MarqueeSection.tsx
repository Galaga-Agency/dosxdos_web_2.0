import React from "react";
import "./MarqueeSection.scss"

const MarqueeSection: React.FC = () => {
  return (
    <div className="about-us-page__marquee-container">
      <div className="about-us-page__marquee-track">
        <div className="about-us-page__marquee-text">
          {Array.from({ length: 30 }).map((_, i) => (
            <span key={i}>DOS POR DOS &nbsp;</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeSection;