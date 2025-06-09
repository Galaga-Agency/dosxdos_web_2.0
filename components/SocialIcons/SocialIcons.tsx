"use client";

import React from "react";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { RiFacebookCircleLine } from "react-icons/ri";
import { FaSquareFacebook } from "react-icons/fa6";

import "./SocialIcons.scss";

interface SocialIconsProps {
  className?: string;
  iconSize?: "small" | "medium" | "large";
  color?: "primary" | "white";
  orientation?: "vertical" | "horizontal";
}

const SocialIcons: React.FC<SocialIconsProps> = ({
  className = "",
  iconSize = "medium",
  color = "primary",
  orientation = "horizontal",
}) => {
  return (
    <div
      className={`
        social-icons 
        ${className} 
        ${iconSize} 
        ${color} 
        ${orientation === "vertical" ? "vertical" : "horizontal"}
      `}
    >
      {/* LinkedIn */}
      <Link
        href="https://es.linkedin.com/company/dos-por-dos-grupo-imagen"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="social-icons__link"
      >
        <FaLinkedin className="social-icons__icon linkedin-icon" />
      </Link>

      {/* Instagram */}
      <Link
        href="https://www.instagram.com/dosxdos.grupoimagen/"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icons__link"
        aria-label="Instagram"
      >
        <GrInstagram className="social-icons__icon" />
      </Link>

      {/* YouTube */}
      <Link
        href="https://www.youtube.com/channel/UCqZDFnB0lrlDv6pNnfx2GKQ"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icons__link"
        aria-label="YouTube"
      >
        <FaYoutube className="social-icons__icon" />
      </Link>

      {/* Facebook */}
      <Link
        href="https://www.facebook.com/dosxdos.grupoimagen/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="social-icons__link"
      >
        <FaSquareFacebook className="social-icons__icon" />
      </Link>
    </div>
  );
};

export default SocialIcons;
