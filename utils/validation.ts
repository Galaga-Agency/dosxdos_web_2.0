/**
 * Validation and URL utility functions
 */

// Validate email
export const isValidEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// Create slug from string
export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')         // Replace spaces with -
    .replace(/&/g, '-and-')       // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')     // Remove all non-word characters
    .replace(/\-\-+/g, '-')       // Replace multiple - with single -
    .replace(/^-+/, '')           // Trim - from start of text
    .replace(/-+$/, '');          // Trim - from end of text
};

// Extract hostname from URL
export const getHostname = (url: string): string => {
  try {
    return new URL(url).hostname;
  } catch (e) {
    return url;
  }
};

// Check if URL is external
export const isExternalLink = (url: string, currentDomain?: string): boolean => {
  if (!url.startsWith('http')) return false;
  
  try {
    const domain = currentDomain || window.location.hostname;
    const urlDomain = new URL(url).hostname;
    return domain !== urlDomain;
  } catch (e) {
    return false;
  }
};