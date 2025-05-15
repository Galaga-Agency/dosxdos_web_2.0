"use client";

import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "next-share";
import { BlogPost } from "@/types/blog-post-types";
import { IoLogoWhatsapp } from "react-icons/io";
import { RiTwitterXFill  } from "react-icons/ri";

import "./ShareButtons.scss";

interface ShareButtonsProps {
  post: BlogPost;
  url: string;
  className?: string;
  iconSize?: "small" | "medium" | "large";
  color?: "primary" | "white";
  orientation?: "vertical" | "horizontal";
}

const ShareButtons: React.FC<ShareButtonsProps> = ({
  post,
  url,
  className = "",
  iconSize = "medium",
  color = "primary",
  orientation = "horizontal",
}) => {
  // Make sure we have an absolute URL
  const absoluteUrl = url.startsWith("http")
    ? url
    : `${typeof window !== "undefined" ? window.location.origin : ""}${url}`;

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
      <LinkedinShareButton url={absoluteUrl}>
        <span className="social-icons__link" aria-label="LinkedIn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="social-icons__icon"
          >
            <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
          </svg>
        </span>
      </LinkedinShareButton>

      {/* Facebook */}
      <FacebookShareButton
        url={absoluteUrl}
        quote={post.title} // Simplified to just the title
        hashtag={
          post.tags && post.tags.length > 0
            ? `#${post.tags[0].replace(/\s+/g, "")}`
            : "#dosxdos"
        }
      >
        <span className="social-icons__link" aria-label="Facebook">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="social-icons__icon"
          >
            <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
          </svg>
        </span>
      </FacebookShareButton>

      {/* Twitter */}
      <TwitterShareButton
        url={absoluteUrl}
        title={post.title}
        hashtags={
          post.tags
            ? post.tags.map((tag) => tag.replace(/\s+/g, ""))
            : ["dosxdos"]
        }
      >
          <RiTwitterXFill  className="social-icons__link" aria-label="Twitter"/>
      </TwitterShareButton>

      {/* WhatsApp */}
      <WhatsappShareButton
        url={absoluteUrl}
        title={post.title}
        separator=" - "
        blankTarget={true}
      >
        <IoLogoWhatsapp className="social-icons__link" aria-label="WhatsApp" />
      </WhatsappShareButton>
    </div>
  );
};

export default ShareButtons;
