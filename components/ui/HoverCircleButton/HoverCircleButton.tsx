"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import {
  hoverCircleButtonAnimation,
  cleanupHoverCircleButton,
} from "@/utils/animations/hover-btn";
import { GoArrowUpRight } from "react-icons/go";
import "./HoverCircleButton.scss";

interface HoverCircleButtonProps {
  href: string;
  label: string;
  darkBg?: boolean;
}

const HoverCircleButton: React.FC<HoverCircleButtonProps> = ({
  href,
  label,
  darkBg = false,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (buttonRef.current) {
        hoverCircleButtonAnimation();
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      cleanupHoverCircleButton(); // Make sure this function exists and works properly
    };
  }, []);

  return (
    <div className="hover-circle-button__wrapper" ref={buttonRef}>
      <Link
        href={href}
        className={`hover-circle-button__item hover-circle-button ${
          darkBg ? "dark-bg" : ""
        }`}
      >
        <span className="hover-circle-button__text">{label}</span>
        <span className="hover-circle-button__icon">
          <GoArrowUpRight />
        </span>
        <i className="hover-circle-button__dot"></i>
      </Link>
    </div>
  );
};

export default HoverCircleButton;
