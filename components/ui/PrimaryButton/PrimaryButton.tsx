"use client";

import React from "react";
import Link from "next/link";
import "./PrimaryButton.scss";

interface PrimaryButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  disabled?: boolean;
  isDarkBackground?: boolean;
  isLoading?: boolean; // NEW: Loading state prop
  ref?: any;
  target?: string;
  rel?: string;
}

const PrimaryButton = ({
  children,
  href,
  onClick,
  className = "",
  type = "button",
  size = "medium",
  fullWidth = false,
  disabled = false,
  isDarkBackground,
  isLoading = false, // NEW: Default to false
  ref,
  target,
  rel,
}: PrimaryButtonProps) => {
  const baseClass = "primary-button";

  const buttonClasses = [
    baseClass,
    size && `${baseClass}--${size}`,
    fullWidth && `${baseClass}--full-width`,
    (disabled || isLoading) && `${baseClass}--disabled`, // NEW: Disable when loading
    isLoading && `${baseClass}--loading`, // NEW: Loading class
    isDarkBackground !== undefined &&
      `${baseClass}--on-${isDarkBackground ? "dark" : "light"}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // If href is provided, render as a Link
  if (href && !disabled && !isLoading) {
    const linkProps: any = {
      href,
      className: buttonClasses,
      onClick,
    };

    if (target) {
      linkProps.target = target;
      if (target === "_blank") {
        linkProps.rel = rel || "noopener noreferrer";
      } else if (rel) {
        linkProps.rel = rel;
      }
    }

    return (
      <Link {...linkProps}>
        <span className={`${baseClass}__content`}>{children}</span>
      </Link>
    );
  }

  // Otherwise render as a button
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || isLoading} // NEW: Disable when loading
    >
      <span className={`${baseClass}__content`}>
        {isLoading && (
          <span className={`${baseClass}__spinner`}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle
                cx="8"
                cy="8"
                r="6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="30"
                strokeDashoffset="30"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 8 8;360 8 8"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </span>
        )}
        {children}
      </span>
    </button>
  );
};

export default PrimaryButton;
