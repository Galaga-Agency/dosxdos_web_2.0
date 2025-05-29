import React from "react";

/**
 * Text formatting utility functions
 */

/**
 * Truncates text at a specified length and adds ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text) return "";
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

/**
 * Adds a line break if word exceeds specified length
 */
export const breakLongWords = (
  text: string,
  maxLength: number = 25
): string => {
  if (!text) return "";

  return text
    .split(" ")
    .map((word) => {
      if (word.length > maxLength) {
        // Add zero-width space character after maxLength chars
        return word.replace(new RegExp(`(.{${maxLength}})`, "g"), "$1\u200B");
      }
      return word;
    })
    .join(" ");
};

/**
 * Converts string to title case (first letter of each word capitalized)
 */
export const toTitleCase = (text: string): string => {
  if (!text) return "";

  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Forces text to wrap (useful for CSS) with non-breaking spaces
 */
export const forceTextWrap = (text: string): string => {
  if (!text) return "";

  return text.replace(/ /g, "\u00A0");
};

/**
 * Removes all HTML tags from a string
 */
export const stripHtml = (html: string): string => {
  if (!html) return "";

  return html.replace(/<[^>]*>/g, "");
};

/**
 * Limits text to a certain number of words
 */
export const limitWords = (text: string, wordCount: number): string => {
  if (!text) return "";

  const words = text.split(/\s+/);
  if (words.length <= wordCount) return text;

  return words.slice(0, wordCount).join(" ") + "...";
};

/**
 * Formats text with line breaks into proper paragraphs
 * Preserves paragraph structure from markdown/text format
 */
export const formatParagraphs = (text: string): string => {
  if (!text) return "";

  // Split by double line breaks (paragraph separators)
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  // If only one paragraph, return as is
  if (paragraphs.length === 1) {
    return paragraphs[0];
  }

  // Return paragraphs joined with proper spacing
  return paragraphs.join("\n\n");
};

/**
 * Renders text with preserved paragraph formatting as React elements
 * Use this when you need actual paragraph tags
 */
export const renderFormattedText = (text: string): React.ReactNode => {
  if (!text) return null;

  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return paragraphs.map((paragraph, index) => (
    <p key={index} className="text">
      {paragraph}
    </p>
  ));
};
