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
  href?: string;
  label: string;
  darkBg?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: "link" | "button";
}

const HoverCircleButton: React.FC<HoverCircleButtonProps> = ({
  href,
  label,
  darkBg = false,
  onClick,
  disabled = false,
  type = "link",
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
      cleanupHoverCircleButton();
    };
  }, []);

  const commonClasses = `hover-circle-button__item hover-circle-button ${
    darkBg ? "dark-bg" : ""
  } ${disabled ? "disabled" : ""}`;

  const content = (
    <>
      <span className="hover-circle-button__text">{label}</span>
      <span className="hover-circle-button__icon">
        <GoArrowUpRight />
      </span>
      <i className="hover-circle-button__dot"></i>
    </>
  );

  return (
    <div className="hover-circle-button__wrapper" ref={buttonRef}>
      {type === "link" && href ? (
        <Link href={href} className={commonClasses}>
          {content}
        </Link>
      ) : (
        <button
          className={commonClasses}
          onClick={onClick}
          disabled={disabled}
          type="button"
        >
          {content}
        </button>
      )}
    </div>
  );
};

export default HoverCircleButton;
