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
  ref?: any;
  target?: string; // Add target property for links
  rel?: string; // Add rel property for security when using target="_blank"
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
  ref,
  target,
  rel,
}: PrimaryButtonProps) => {
  const baseClass = "primary-button";

  const buttonClasses = [
    baseClass,
    size && `${baseClass}--${size}`,
    fullWidth && `${baseClass}--full-width`,
    disabled && `${baseClass}--disabled`,
    isDarkBackground !== undefined &&
      `${baseClass}--on-${isDarkBackground ? "dark" : "light"}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // If href is provided, render as a Link
  if (href && !disabled) {
    // Add target and rel attributes when provided
    const linkProps: any = {
      href,
      className: buttonClasses,
      onClick,
    };

    // Only add target and rel if they are provided
    if (target) {
      linkProps.target = target;

      // Automatically add noopener and noreferrer when target="_blank" for security
      if (target === "_blank") {
        linkProps.rel = rel || "noopener noreferrer";
      } else if (rel) {
        linkProps.rel = rel;
      }
    }

    return (
      <a {...linkProps}>
        <span className={`${baseClass}__content`}>{children}</span>
      </a>
    );
  }

  // Otherwise render as a button
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={`${baseClass}__content`}>{children}</span>
    </button>
  );
};

export default PrimaryButton;
