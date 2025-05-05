"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { hoverCircleButtonAnimation, cleanupHoverCircleButton } from "@/utils/animations/components/hover-btn";
import { GoArrowUpRight } from "react-icons/go";
import "./HoverCircleButton.scss";

interface HoverCircleButtonProps {
  href: string;
  label: string;
  darkBg?: boolean; // Add a prop for dark background variant
}

const HoverCircleButton: React.FC<HoverCircleButtonProps> = ({ 
  href, 
  label,
  darkBg = false // Default to light background
}) => {
  useEffect(() => {
    hoverCircleButtonAnimation();
    return () => cleanupHoverCircleButton();
  }, []);

  return (
    <div className="hover-circle-button__wrapper">
      <Link
        href={href}
        className={`hover-circle-button__item hover-circle-button ${darkBg ? 'dark-bg' : ''}`}
      >
        <span className="hover-circle-button__text">
          {label}
        </span>
        <span className="hover-circle-button__icon">
          <GoArrowUpRight />
        </span>
        <i className="hover-circle-button__dot"></i>
      </Link>
    </div>
  );
};

export default HoverCircleButton;