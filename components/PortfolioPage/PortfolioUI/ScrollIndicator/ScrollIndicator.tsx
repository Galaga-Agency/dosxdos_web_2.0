import React from "react";
import "./ScrollIndicator.scss";

const ScrollIndicator: React.FC = () => {
  return (
    <div className="scroll-indicator">
      <span>Deslizar</span>
      <div className="scroll-arrow">→</div>
    </div>
  );
};

export default ScrollIndicator;
