"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { menuItems, ctaButton } from "@/data/menu-data";
import { Plus, Minus, ChevronDown } from "lucide-react";
import HamburgerIcon from "@/components/HamburgerIcon/HamburgerIcon";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import useMenuAnimations from "@/hooks/useMenuAnimations";
import "./Menu.scss";

const Menu: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const submenuItemsRef = useRef<Map<string, HTMLElement[]>>(new Map());
  const { isMobile } = useDeviceDetect();

  const {
    mobileNavRef,
    collectMobileItem,
    collectDesktopItem,
    collectDropdownLink,
    animateDropdown,
    animateMobileSubmenu,
  } = useMenuAnimations({ isMobileOpen, openSubmenu });

  // Handle submenu animation when it's opened
  useEffect(() => {
    if (openSubmenu && submenuItemsRef.current.has(openSubmenu)) {
      const items = submenuItemsRef.current.get(openSubmenu) || [];
      if (items.length > 0) {
        // We'll animate the submenu items
        animateMobileSubmenu(openSubmenu, items);
      }
    }
  }, [openSubmenu, animateMobileSubmenu]);

  // Handle scroll event for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    if (isMobileOpen) {
      // When closing the mobile menu, reset submenu and body scroll
      setOpenSubmenu(null);
      document.body.style.overflow = "";
    } else {
      // When opening the mobile menu, prevent body scroll
      document.body.style.overflow = "hidden";
    }

    // Toggle mobile menu state
    setIsMobileOpen(!isMobileOpen);
  };

  const toggleSubmenu = (id: string) => {
    // If we're closing the currently open submenu, make sure to hide items first
    if (openSubmenu === id) {
      // Hide all submenu items immediately
      const items = submenuItemsRef.current.get(id) || [];
      items.forEach((item) => {
        if (item) {
          item.style.opacity = "0";
        }
      });
    }

    // Toggle the submenu after a small delay to allow animations to complete
    setTimeout(
      () => {
        setOpenSubmenu(openSubmenu === id ? null : id);
      },
      openSubmenu === id ? 0 : 10
    ); // No delay when closing, tiny delay when opening
  };

  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoveredItem(id);

    // Trigger animation for dropdown links
    if (id) {
      animateDropdown(id);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 400);
  };

  // Helper function to collect submenu items
  const collectSubmenuItem = (parentId: string, el: HTMLElement | null) => {
    if (el) {
      if (!submenuItemsRef.current.has(parentId)) {
        submenuItemsRef.current.set(parentId, []);
      }
      const items = submenuItemsRef.current.get(parentId) || [];
      if (!items.includes(el)) {
        items.push(el);
        submenuItemsRef.current.set(parentId, items);
      }
    }
  };

  return (
    <header className={`menu ${isScrolled ? "menu--scrolled" : ""}`}>
      <div className="menu__bg-shape"></div>
      <div className="menu__container">
        {/* Logo Area */}
        <Link href="/" className="menu__logo">
          {isMobile ? (
            <Image
              src="/assets/img/logo/logo-red.png"
              alt="Logo"
              width={180}
              height={50}
              priority
              className="menu__logo-image"
            />
          ) : (
            <Image
              src="/assets/img/logo/logo_full_rojo.png"
              alt="Logo"
              width={200}
              height={50}
              priority
              className="menu__logo-image"
            />
          )}
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
                ref={collectDesktopItem}
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
                          ref={(el) => collectDropdownLink(item.id, el)}
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
          {/* CTA Button */}
          <Link href={ctaButton.href} className="menu__cta">
            <span>{ctaButton.label}</span>
          </Link>

          {/* Desktop Social Icons */}
          <div className="menu__social-desktop">
            <SocialIcons iconSize="small" />
          </div>

          {/* Mobile Hamburger */}
          <div className="menu__hamburger-wrapper" onClick={toggleMobileMenu}>
            <HamburgerIcon isActive={isMobileOpen} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`menu__mobile ${isMobileOpen ? "open" : ""}`}>
        <div className="menu__mobile-inner" ref={mobileNavRef}>
          <div className="menu__mobile-header">
            <div className="menu__mobile-logo">
              <Image
                src="/assets/img/logo/logo-red.png"
                alt="Logo"
                width={140}
                height={40}
                className="menu__mobile-logo-image"
              />
            </div>
          </div>

          <nav className="menu__mobile-nav">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="menu__mobile-item"
                ref={collectMobileItem}
              >
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
                            style={{ opacity: 0 }} // Initially hidden
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
            <p>+34 928 71 22 22</p>
            <p>hola@dospordosgrupoimagen.com</p>

            {/* Mobile Social Icons */}
            <div className="menu__social-mobile">
              <SocialIcons iconSize="medium" className="menu__social-icons" />
            </div>

            <Link
              href={ctaButton.href}
              className="menu__mobile-cta"
              onClick={toggleMobileMenu}
            >
              {ctaButton.label}
            </Link>
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
