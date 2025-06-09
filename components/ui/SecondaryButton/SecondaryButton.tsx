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
  lightBg?: boolean;
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
  lightBg = false,
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
    lightBg && `${baseClass}--light-bg`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // If href is provided, render as a Link
  if (href && !disabled) {
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
      <a {...linkProps}>
        <div className={`${baseClass}__blur-bg`}></div>
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
      <div className={`${baseClass}__blur-bg`}></div>
      <span className={`${baseClass}__content`}>{children}</span>
    </button>
  );
};

export default SecondaryButton;
