import React from "react";
import "./Navigation.scss";

interface NavigationProps {
  totalSections: number;
  activeSection: number;
  onNavigate: (index: number) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  totalSections,
  activeSection,
  onNavigate,
}) => {
  return (
    <div className="section-navigation">
      {Array.from({ length: totalSections }).map((_, index) => (
        <button
          key={index}
          className={`nav-dot ${activeSection === index ? "active" : ""}`}
          onClick={() => onNavigate(index)}
          aria-label={`Navigate to section ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default Navigation;
