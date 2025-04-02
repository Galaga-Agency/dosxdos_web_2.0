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
  variant?: "light" | "dark";
  icon?: React.ReactNode;
  target?: string;
  rel?: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  href,
  onClick,
  className = "",
  type = "button",
  size = "medium",
  fullWidth = false,
  disabled = false,
  variant = "light",
  icon,
}) => {
  const baseClass = "secondary-button";

  const buttonClasses = [
    baseClass,
    size && `${baseClass}--${size}`,
    fullWidth && `${baseClass}--full-width`,
    disabled && `${baseClass}--disabled`,
    variant && `${baseClass}--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <span className={`${baseClass}__content`}>
      {icon && <span className={`${baseClass}__icon`}>{icon}</span>}
      <span className={`${baseClass}__text`}>{children}</span>
    </span>
  );

  // If href is provided, render as a Link
  if (href && !disabled) {
    return (
      <Link href={href} className={buttonClasses} onClick={onClick}>
        {content}
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
      {content}
    </button>
  );
};

export default SecondaryButton;
