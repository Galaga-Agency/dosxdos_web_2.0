"use client";

import React from "react";
import Link from "next/link";
import "./SecondaryButton.scss";

interface SecondaryButtonProps {
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
  isOutlined?: boolean;
  lightBg?: boolean; // New prop for light background variant
  ref?: any;
  target?: string;
  rel?: string;
}

const SecondaryButton = ({
  children,
  href,
  onClick,
  className = "",
  type = "button",
  size = "medium",
  fullWidth = false,
  disabled = false,
  isOutlined = false,
  lightBg = false, // Default to false for backward compatibility
  ref,
  target,
  rel,
}: SecondaryButtonProps) => {
  const baseClass = "secondary-button";

  const buttonClasses = [
    baseClass,
    size && `${baseClass}--${size}`,
    fullWidth && `${baseClass}--full-width`,
    disabled && `${baseClass}--disabled`,
    isOutlined && `${baseClass}--outlined`,
    lightBg && `${baseClass}--light-bg`, // Add the new class when lightBg is true
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
      disabled={disabled}
    >
      <span className={`${baseClass}__content`}>{children}</span>
    </button>
  );
};

export default SecondaryButton;
