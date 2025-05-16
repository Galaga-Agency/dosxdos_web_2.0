"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { menuItems, ctaButton } from "@/data/menu-data";
import { Plus, Minus, ChevronDown } from "lucide-react";
import HamburgerIcon from "@/components/HamburgerIcon/HamburgerIcon";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import AdminBadge from "@/components/AdminBadge/AdminBadge";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import { menuUtils } from "@/utils/animations/menu-anim";
import { PhoneCall, Mail, ArrowRight, ChevronRight } from "lucide-react";
import "./Menu.scss";

const Menu: React.FC = () => {
  // Get session status
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  // State management
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Refs
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const submenuItemsRef = useRef<Map<string, HTMLElement[]>>(new Map());
  const menuRef = useRef<HTMLElement>(null);

  // Device detection
  const { isMobile, isDesktop } = useDeviceDetect();

  // Setup scroll-based styling and animations
  useEffect(() => {
    // Basic scroll handler for styling
    const handleBasicScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Add basic scroll listener
    window.addEventListener("scroll", handleBasicScroll, { passive: true });

    // Add menu scroll behavior
    let cleanup = () => {};
    if (!isMobile && menuRef.current) {
      cleanup = menuUtils.setupMenuScroll(menuRef.current);
    }

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleBasicScroll);
      cleanup();
    };
  }, [isMobile]);

  // Submenu animation management
  useEffect(() => {
    if (openSubmenu && submenuItemsRef.current.has(openSubmenu)) {
      const items = submenuItemsRef.current.get(openSubmenu) || [];

      // Staggered animation for submenu items
      items.forEach((item, index) => {
        setTimeout(() => {
          item.style.transition = "all 0.3s ease";
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, index * 50);
      });
    }
  }, [openSubmenu]);

  // Mobile menu toggle handler
  const toggleMobileMenu = () => {
    if (isMobileOpen) {
      setOpenSubmenu(null);
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
    setIsMobileOpen(!isMobileOpen);
  };

  // Submenu toggle handler
  const toggleSubmenu = (id: string) => {
    if (openSubmenu === id) {
      const items = submenuItemsRef.current.get(id) || [];
      items.forEach((item) => {
        if (item) {
          item.style.opacity = "0";
          item.style.transform = "translateY(10px)";
        }
      });
    }

    setTimeout(
      () => {
        setOpenSubmenu(openSubmenu === id ? null : id);
      },
      openSubmenu === id ? 0 : 10
    );
  };

  // Mouse event handlers for desktop dropdown
  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoveredItem(id);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 400);
  };

  // Utility for managing submenu items
  const collectSubmenuItem = (parentId: string, el: HTMLElement | null) => {
    if (el) {
      if (!submenuItemsRef.current.has(parentId)) {
        submenuItemsRef.current.set(parentId, []);
      }
      const items = submenuItemsRef.current.get(parentId) || [];
      if (!items.includes(el)) {
        el.style.opacity = "0";
        el.style.transform = "translateY(10px)";
        items.push(el);
        submenuItemsRef.current.set(parentId, items);
      }
    }
  };

  // Determine which logo to use based on scroll state
  const getLogo = () => {
    if (isMobile && isScrolled) {
      return "/assets/img/logo/logo-gris.png";
    } else if (isMobile && !isScrolled) {
      return "/assets/img/logo/logo-berengena.png";
    } else {
      // Logo changes based on scroll state
      return isScrolled
        ? "/assets/img/logo/logo_full_gris.svg" // White logo when scrolled (on dark bg)
        : "/assets/img/logo/logo-full-berenjena.png"; // Dark logo initially (on light bg)
    }
  };

  // Render the appropriate CTA button based on scroll state
  // In your renderCtaButton function, change:
  const renderCtaButton = () => {
    const ctaProps = {
      href: ctaButton.href,
      className: "menu__cta",
      size: "medium" as const,
    };

    // For desktop: Button type changes based on scroll state
    if (!isMobile) {
      if (!isDesktop) {
        return null; // Don't render anything if not on xxxl screens
      }

      return isScrolled ? (
        <SecondaryButton {...ctaProps}>{ctaButton.label} →</SecondaryButton>
      ) : (
        <PrimaryButton {...ctaProps}>{ctaButton.label} →</PrimaryButton>
      );
    }

    // For mobile: Always Primary button
    return (
      <>
        {isDesktop ? (
          <PrimaryButton
            href={ctaButton.href}
            onClick={toggleMobileMenu}
            fullWidth
          >
            {ctaButton.label}
          </PrimaryButton>
        ) : null}
      </>
    );
  };

  return (
    <header
      ref={menuRef}
      className={`menu ${isScrolled ? "menu--scrolled" : ""}`}
    >
      <div className="menu__container">
        {/* Logo Area */}
        <Link href="/" className="menu__logo">
          <Image
            src={getLogo()}
            alt="Logo"
            width={isMobile ? 180 : 200}
            height={isMobile ? 50 : 50}
            priority
            className="menu__logo-image"
          />
        </Link>

        {/* Main Navigation */}
        <nav className="menu__nav">
          <ul className="menu__nav-list">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`menu__nav-item ${
                  item.children ? "has-children" : ""
                }`}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                {item.children ? (
                  <>
                    <Link href={item.href} className="menu__nav-button">
                      {item.label}
                      <ChevronDown
                        className={`menu__nav-icon ${
                          hoveredItem === item.id ? "rotate" : ""
                        }`}
                        size={16}
                      />
                    </Link>
                    <div
                      className={`menu__dropdown ${
                        hoveredItem === item.id ? "menu__dropdown--active" : ""
                      }`}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.id}
                          href={child.href}
                          className="menu__dropdown-link"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link href={item.href} className="menu__nav-link">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions Area */}
        <div className="menu__actions">
          {/* Admin Badge - Only show when authenticated */}
          {isAuthenticated && <AdminBadge className="menu__admin-badge" />}

          {/* CTA Button */}
          {renderCtaButton()}

          {/* Desktop Social Icons */}
          <div className="menu__social-desktop">
            <SocialIcons
              iconSize="small"
              color={!isScrolled ? "primary" : "white"}
            />
          </div>

          {/* Mobile Hamburger */}
          <div className="menu__hamburger-wrapper" onClick={toggleMobileMenu}>
            <HamburgerIcon
              isActive={isMobileOpen}
              isScrolled={isScrolled}
              color={isMobileOpen ? "white" : isScrolled ? "white" : "black"}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`menu__mobile ${isMobileOpen ? "open" : ""}`}>
        <div className="menu__mobile-inner">
          <div className="menu__mobile-header">
            <div className="menu__mobile-logo">
              <Image
                src="/assets/img/logo/logo_full_gris.svg"
                alt="Logo"
                width={180}
                height={40}
                className="menu__mobile-logo-image"
              />
            </div>
          </div>

          <nav className="menu__mobile-nav">
            {menuItems.map((item) => (
              <div key={item.id} className="menu__mobile-item">
                {item.children ? (
                  <>
                    <div className="menu__mobile-button-wrapper">
                      <Link
                        href={item.href}
                        className="menu__mobile-button-main"
                        onClick={toggleMobileMenu}
                      >
                        {item.label}
                      </Link>
                      <button
                        className="menu__mobile-button-toggle"
                        onClick={() => toggleSubmenu(item.id)}
                        aria-label={`Toggle ${item.label} submenu`}
                      >
                        <span className="menu__mobile-icon">
                          {openSubmenu === item.id ? (
                            <Minus size={18} />
                          ) : (
                            <Plus size={18} />
                          )}
                        </span>
                      </button>
                    </div>

                    {/* Submenu container */}
                    <div
                      className={`menu__mobile-submenu ${
                        openSubmenu === item.id
                          ? "menu__mobile-submenu--open"
                          : ""
                      }`}
                    >
                      <div className="menu__mobile-submenu-inner">
                        {item.children.map((sub) => (
                          <Link
                            key={sub.id}
                            href={sub.href}
                            className="menu__mobile-sublink"
                            onClick={toggleMobileMenu}
                            ref={(el) =>
                              collectSubmenuItem(item.id, el as HTMLElement)
                            }
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="menu__mobile-link"
                    onClick={toggleMobileMenu}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="menu__mobile-footer">
            <div className="menu__contact-item">
              <span className="menu__contact-item-icon">
                <PhoneCall size={20} />
              </span>
              <p>+34 928 71 22 22</p>
            </div>
            <div className="menu__contact-item">
              <span className="menu__contact-item-icon">
                <Mail size={20} />
              </span>
              <p>hola@dospordosgrupoimagen.com</p>
            </div>

            {/* Mobile Social Icons */}
            <div className="menu__social-mobile">
              <SocialIcons
                iconSize="medium"
                color="white"
                className="menu__social-icons"
              />
            </div>

            <div className="menu__mobile-cta">
              <PrimaryButton
                href={ctaButton.href}
                onClick={toggleMobileMenu}
                fullWidth
              >
                {ctaButton.label}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileOpen && (
        <div className="menu__overlay" onClick={toggleMobileMenu}></div>
      )}
    </header>
  );
};

export default Menu;
