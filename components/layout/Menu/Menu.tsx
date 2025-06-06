"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { menuItems, ctaButton } from "@/data/menu-data";
import { Plus, Minus, ChevronDown, PhoneCall, Mail } from "lucide-react";
import HamburgerIcon from "@/components/HamburgerIcon/HamburgerIcon";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import AdminBadge from "@/components/AdminBadge/AdminBadge";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import { menuUtils } from "@/utils/animations/menu-anim";
import "./Menu.scss";

const Menu: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = status === "authenticated";
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const submenuItemsRef = useRef<Map<string, HTMLElement[]>>(new Map());
  const menuRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { isMobile, isDesktop } = useDeviceDetect();

  // Setup scroll-based styling and animations
  useEffect(() => {
    const handleBasicScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleBasicScroll, { passive: true });

    let cleanup = () => {};
    if (!isMobile && menuRef.current) {
      cleanup = menuUtils.setupMenuScroll(menuRef.current);
    }

    return () => {
      window.removeEventListener("scroll", handleBasicScroll);
      cleanup();
    };
  }, [isMobile]);

  // INSTANT TRANSITION TRIGGER - WAITS FOR NAVIGATION
  const triggerInstantTransition = (href: string) => {
    const overlay = document.querySelector('[data-transition-overlay]') as HTMLElement;
    const logo = document.querySelector('[data-transition-logo]') as HTMLElement;
    
    if (overlay && logo) {
      // INSTANTLY SCROLL TO TOP
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // SET FLAG TO PREVENT TEMPLATE FROM INTERFERING
      window.__transitionTriggeredByMenu = true;
      window.__targetHref = href;
      
      // INSTANT: Show overlay and start logo animation immediately
      overlay.style.display = "block";
      overlay.style.opacity = "1";
      
      // Reset logo to start position
      logo.style.opacity = "1";
      logo.style.transition = "none";
      logo.style.transform = "translate(-50%, -50%) scale(0.5)";
      
      // Start animation to full size
      requestAnimationFrame(() => {
        logo.style.transition = "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        logo.style.transform = "translate(-50%, -50%) scale(1)";
      });

      // WAIT FOR NAVIGATION TO ACTUALLY HAPPEN BEFORE COMPLETING
      const checkNavigation = () => {
        if (window.location.pathname === href || window.location.pathname + '/' === href || window.location.pathname === href + '/') {
          // Navigation happened - SCROLL TO TOP AGAIN and complete animation
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          
          setTimeout(() => {
            // Logo shrink and fade out
            logo.style.transition = "all 0.25s cubic-bezier(0.55, 0.055, 0.675, 0.19)";
            logo.style.transform = "translate(-50%, -50%) scale(0.5)";
            logo.style.opacity = "0";
            
            // Overlay fade out
            setTimeout(() => {
              overlay.style.transition = "opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
              overlay.style.opacity = "0";
              
              // Hide overlay completely
              setTimeout(() => {
                overlay.style.display = "none";
                overlay.style.transition = "none";
                logo.style.transition = "none";
                
                // Reset for next time
                logo.style.transform = "translate(-50%, -50%) scale(0.5)";
                logo.style.opacity = "0";
                
                // FINAL SCROLL TO TOP
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
                
                // CLEAR FLAG
                window.__transitionTriggeredByMenu = false;
                window.__targetHref = null;
                
                // Refresh ScrollTrigger
                if (window.ScrollTrigger) {
                  window.ScrollTrigger.refresh(true);
                }
                
                if (window.ScrollSmoother) {
                  const smoother = window.ScrollSmoother.get();
                  if (smoother) {
                    smoother.refresh();
                  }
                }
              }, 300);
            }, 150);
          }, 300); // Small delay after navigation
        } else {
          // Navigation not happened yet - keep checking
          setTimeout(checkNavigation, 50);
        }
      };

      // Start checking after logo reaches full size
      setTimeout(checkNavigation, 600);
    }
  };

  // INSTANT NAVIGATION - ZERO LAG
  const handleNavigation = (href: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Don't navigate if already on same page
    if (pathname === href) {
      return;
    }

    // INSTANT: Trigger transition overlay immediately
    triggerInstantTransition(href);

    // Close mobile menu if open
    if (isMobileOpen) {
      setIsMobileOpen(false);
      document.body.style.overflow = "";
    }

    // Navigate AFTER showing transition
    router.push(href);
  };

  // Submenu animation management
  useEffect(() => {
    if (openSubmenu && submenuItemsRef.current.has(openSubmenu)) {
      const items = submenuItemsRef.current.get(openSubmenu) || [];

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

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const now = Date.now();

    if (!window.clickTimes) {
      window.clickTimes = [];
    }

    window.clickTimes.push(now);
    window.clickTimes = window.clickTimes.filter((time) => now - time < 1000);

    if (window.clickTimes.length >= 3) {
      window.clickTimes = [];
      handleNavigation("/login");
      return;
    }

    setTimeout(() => {
      if (window.clickTimes && window.clickTimes.length < 3) {
        handleNavigation("/");
        window.clickTimes = [];
      }
    }, 1000);
  };

  // Render the appropriate CTA button based on scroll state
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
        <SecondaryButton
          {...ctaProps}
          onClick={(e) => handleNavigation(ctaButton.href, e)}
        >
          {ctaButton.label}
        </SecondaryButton>
      ) : (
        <PrimaryButton
          {...ctaProps}
          onClick={(e) => handleNavigation(ctaButton.href, e)}
        >
          {ctaButton.label}
        </PrimaryButton>
      );
    }

    // For mobile: Always Primary button
    return (
      <>
        {isDesktop ? (
          <PrimaryButton
            href={ctaButton.href}
            onClick={(e) => {
              handleNavigation(ctaButton.href, e);
              toggleMobileMenu();
            }}
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
        <div
          onClick={handleLogoClick}
          className="menu__logo"
          style={{ cursor: "pointer" }}
        >
          {/* Mobile logos */}
          <Image
            src={
              isScrolled
                ? "/assets/img/logo/logo-gris.png"
                : "/assets/img/logo/logo-berengena.png"
            }
            alt="Logo"
            width={180}
            height={50}
            priority
            className="menu__logo-image menu__logo-image--mobile"
          />

          {/* Desktop logos */}
          <Image
            src={
              isScrolled
                ? "/assets/img/logo/logo_full_gris.svg"
                : "/assets/img/logo/logo-full-berenjena.png"
            }
            alt="Logo"
            width={200}
            height={50}
            priority
            className="menu__logo-image menu__logo-image--desktop"
          />
        </div>

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
                    <div
                      className="menu__nav-button"
                      onClick={(e) => handleNavigation(item.href, e)}
                      onMouseEnter={() => router.prefetch(item.href)}
                      style={{ cursor: "pointer" }}
                    >
                      {item.label}
                      <ChevronDown
                        className={`menu__nav-icon ${
                          hoveredItem === item.id ? "rotate" : ""
                        }`}
                        size={16}
                      />
                    </div>
                    <div
                      className={`menu__dropdown ${
                        hoveredItem === item.id ? "menu__dropdown--active" : ""
                      }`}
                    >
                      {item.children.map((child) => (
                        <div
                          key={child.id}
                          className="menu__dropdown-link"
                          onClick={(e) => handleNavigation(child.href, e)}
                          onMouseEnter={() => router.prefetch(child.href)}
                          style={{ cursor: "pointer" }}
                        >
                          {child.label}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div
                    className="menu__nav-link"
                    onClick={(e) => handleNavigation(item.href, e)}
                    onMouseEnter={() => {
                      router.prefetch(item.href);
                      // Preload the actual page component
                      import(`@/app${item.href}/page`);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {item.label}
                  </div>
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
            <div
              className="menu__mobile-logo"
              onClick={handleLogoClick}
              style={{ cursor: "pointer" }}
            >
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
                      <div
                        className="menu__mobile-button-main"
                        onClick={(e) => handleNavigation(item.href, e)}
                        style={{ cursor: "pointer" }}
                      >
                        {item.label}
                      </div>
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
                          <div
                            key={sub.id}
                            className="menu__mobile-sublink"
                            onClick={(e) => handleNavigation(sub.href, e)}
                            ref={(el: any) =>
                              collectSubmenuItem(item.id, el as HTMLElement)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {sub.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div
                    className="menu__mobile-link"
                    onClick={(e) => handleNavigation(item.href, e)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.label}
                  </div>
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
                iconSize="small"
                color="white"
                className="menu__social-icons"
              />
            </div>

            <div className="menu__mobile-cta">
              <PrimaryButton
                href={ctaButton.href}
                onClick={(e) => {
                  handleNavigation(ctaButton.href, e);
                  toggleMobileMenu();
                }}
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