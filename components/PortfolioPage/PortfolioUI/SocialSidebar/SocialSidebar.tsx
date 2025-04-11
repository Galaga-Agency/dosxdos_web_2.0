import React from "react";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import "./SocialSidebar.scss";

interface SocialSidebarProps {
  orientation?: "vertical" | "horizontal";
  isMobile?: boolean;
}

const SocialSidebar: React.FC<SocialSidebarProps> = ({
  orientation = "vertical",
  isMobile = false,
}) => {
  if (isMobile) {
    return (
      <div className="portfolio-mobile-social">
        <div className="portfolio-mobile-social-header">
          <h3 className="portfolio-mobile-social-title">Síguenos</h3>
          <div className="portfolio-mobile-social-divider"></div>
        </div>
        <SocialIcons orientation="horizontal" color="primary" />
      </div>
    );
  }

  return (
    <div className="portfolio-social-sidebar">
      <div className="portfolio-social-wrapper">
        <span className="portfolio-social-label">Síguenos</span>
        <SocialIcons orientation="vertical" color="primary" />
      </div>
    </div>
  );
};

export default SocialSidebar;
