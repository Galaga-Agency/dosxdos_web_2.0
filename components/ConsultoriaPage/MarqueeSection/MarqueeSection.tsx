import React from "react";
import "./MarqueeSection.scss";

const MarqueeSection = () => {
  const repeatedText = Array.from({ length: 20 }).map((_, i) => (
    <span key={i}>
      aliados estratégicos&nbsp;<span className="dot">•</span>&nbsp;
    </span>
  ));

  return (
    <section className="marquee-section">
      <div className="marquee-container">
        <div className="marquee-track">
          <div className="marquee-text">{repeatedText}</div>
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
