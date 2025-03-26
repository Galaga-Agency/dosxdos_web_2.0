"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { MenuIcon, XIcon, ChevronDown } from "lucide-react";
import { MenuItem } from "@/types/menu-types";
import { menuItems, ctaButton } from "@/data/menu-data";
import {
  createMenuTimeline,
  setupHeaderScrollAnimation,
  setupLogoAnimation,
} from "@/utils/animations/menu-animations";
import "./Menu.scss";

const Menu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  // Refs for animation targets
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const logoRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLDivElement>(null);

  // Init GSAP timeline
  const menuTl = useRef<gsap.core.Timeline | null>(null);

  // Setup timeline for menu animation
  useEffect(() => {
    if (!mobileMenuRef.current || !overlayRef.current) return;

    menuTl.current = createMenuTimeline({
      mobileMenu: mobileMenuRef.current,
      overlay: overlayRef.current,
      menuItems: menuItemsRef.current,
      ctaButton: ctaButtonRef.current,
    });

    return () => {
      // Clean up timeline on component unmount
      if (menuTl.current) {
        menuTl.current.kill();
      }
    };
  }, []);

  // Handle menu open/close
  useEffect(() => {
    if (!menuTl.current) return;

    if (isMenuOpen) {
      // Play the animation forward
      menuTl.current.play();
      // Lock body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Reverse the animation
      menuTl.current.reverse();
      // Restore body scroll after animation completes
      const timeoutId = setTimeout(() => {
        document.body.style.overflow = "";
      }, 800);

      return () => clearTimeout(timeoutId);
    }
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveSubmenu(null);
  }, [pathname]);

  // Header animation on scroll
  useEffect(() => {
    if (!headerRef.current) return;

    const cleanup = setupHeaderScrollAnimation(headerRef.current);
    return cleanup;
  }, []);

  // Logo animation on hover
  useEffect(() => {
    if (!logoRef.current) return;

    const cleanup = setupLogoAnimation(logoRef.current);
    return cleanup;
  }, []);

  // Handle escape key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [isMenuOpen]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
        setActiveSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const renderDesktopNavItem = (item: MenuItem, index: number) => {
    const isActive = pathname.startsWith(item.href);
    const hasSubmenu = item.children && item.children.length > 0;

    return (
      <div key={item.id} className="group">
        <Link
          href={item.href}
          onMouseEnter={() => setActiveSubmenu(hasSubmenu ? item.id : null)}
          onMouseLeave={() => setActiveSubmenu(null)}
        >
          {item.label}
          {hasSubmenu && (
            <ChevronDown
              className={`
                inline-block ml-1 
                ${activeSubmenu === item.id ? "rotate-180" : ""}
              `}
            />
          )}
        </Link>

        {hasSubmenu && activeSubmenu === item.id && (
          <div>
            {item.children?.map((subItem) => (
              <Link key={subItem.id} href={subItem.href}>
                {subItem.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderMobileNavItem = (item: MenuItem, index: number, depth = 0) => {
    const isActive = pathname.startsWith(item.href);
    const hasSubmenu = item.children && item.children.length > 0;

    return (
      <li
        key={item.id}
        ref={(el) => {
          menuItemsRef.current[index] = el;
        }}
        className={`menu__mobile-item ${
          isActive ? "menu__mobile-item--active" : ""
        }`}
      >
        <Link href={item.href}>
          <span className="menu__mobile-item-text">{item.label}</span>
          {depth === 0 && (
            <span className="menu__mobile-item-number">0{index + 1}</span>
          )}
          {hasSubmenu && (
            <ChevronDown
              onClick={(e) => {
                e.preventDefault();
                setActiveSubmenu(activeSubmenu === item.id ? null : item.id);
              }}
              className={`
                ${activeSubmenu === item.id ? "rotate-180" : ""}
              `}
            />
          )}
        </Link>

        {hasSubmenu && activeSubmenu === item.id && (
          <div>
            {item.children?.map((subItem, subIndex) =>
              renderMobileNavItem(subItem, subIndex, depth + 1)
            )}
          </div>
        )}
      </li>
    );
  };

  return (
    <>
      <nav ref={headerRef} className="menu">
        <div className="menu__container">
          {/* Logo */}
          <div ref={logoRef} className="menu__logo">
            <Link href="/">YourBrand</Link>
          </div>

          {/* Desktop Navigation */}
          <div className="menu__nav">{menuItems.map(renderDesktopNavItem)}</div>

          {/* CTA Button */}
          <div ref={ctaButtonRef} className="menu__cta">
            <Link href={ctaButton.href}>{ctaButton.label}</Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div
            ref={hamburgerRef}
            className={`menu__toggle ${isMenuOpen ? "menu__toggle--open" : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={overlayRef}
        className="menu__overlay"
        aria-hidden={!isMenuOpen}
      ></div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="menu__mobile"
        aria-hidden={!isMenuOpen}
      >
        <div className="menu__mobile-inner">
          <div className="menu__mobile-header">
            <span className="menu__mobile-title">Menu</span>
            <button
              onClick={toggleMenu}
              className="text-gray-800 hover:text-primary"
            >
              <XIcon size={24} />
            </button>
          </div>

          <nav className="menu__mobile-nav">
            <ul className="menu__mobile-list">
              {menuItems.map((item, index) => renderMobileNavItem(item, index))}
            </ul>
          </nav>

          <div ref={ctaButtonRef} className="menu__mobile-cta-wrapper">
            <Link href={ctaButton.href} className="menu__mobile-cta">
              {ctaButton.label}
            </Link>
          </div>

          <div className="menu__mobile-footer">
            <div className="menu__mobile-social">
              <a
                href="https://facebook.com"
                className="menu__mobile-social-link"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                className="menu__mobile-social-link"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                className="menu__mobile-social-link"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
