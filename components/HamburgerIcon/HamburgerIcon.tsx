"use client";

import React from "react";
import "./HamburgerIcon.scss";

interface HamburgerIconProps {
  isActive: boolean;
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({ isActive }) => {
  return (
    <div className="hamburger">
      <div className={`hamburger__inner ${isActive ? "active" : "not-active"}`}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default HamburgerIcon;
