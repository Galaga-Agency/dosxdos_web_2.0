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
  ref?: any;
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
  ref,
}: SecondaryButtonProps) => {
  const baseClass = "secondary-button";

  const buttonClasses = [
    baseClass,
    size && `${baseClass}--${size}`,
    fullWidth && `${baseClass}--full-width`,
    disabled && `${baseClass}--disabled`,
    isOutlined && `${baseClass}--outlined`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // If href is provided, render as a Link
  if (href && !disabled) {
    return (
      <Link href={href} className={buttonClasses} onClick={onClick}>
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