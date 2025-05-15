"use client";

import React from "react";
import "./HamburgerIcon.scss";

interface HamburgerIconProps {
  isActive: boolean;
  isScrolled: boolean;
  color: "white" | "black";
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({
  isActive,
  isScrolled,
  color,
}) => {
  return (
    <div className="hamburger">
      <div
        className={`hamburger__inner ${isActive ? "active" : "not-active"} ${
          isScrolled ? "scrolled" : "not-scrolled"
        } hamburger__inner--${color}`}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default HamburgerIcon;
