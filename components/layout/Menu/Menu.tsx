"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
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

  // Optimize scroll handler with throttling
  const throttledScrollHandler = useCallback(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    return handleScroll;
  }, []);

  // Setup scroll-based styling and animations
  useEffect(() => {
    const handleScroll = throttledScrollHandler();
    window.addEventListener("scroll", handleScroll, { passive: true });

    let cleanup = () => {};
    if (!isMobile && menuRef.current) {
      cleanup = menuUtils.setupMenuScroll(menuRef.current);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cleanup();
    };
  }, [isMobile, throttledScrollHandler]);

  const handleNavigation = (href: string, e?: React.MouseEvent) => {
    console.log("🟡 Click received at:", Date.now());
    if (e) e.preventDefault();
    console.log("🟢 About to call router.push at:", Date.now());
    router.push(href);
    console.log("🔵 router.push called at:", Date.now());
  };

  // Memoized submenu animation
  const animateSubmenuItems = useCallback((submenuId: string) => {
    if (submenuItemsRef.current.has(submenuId)) {
      const items = submenuItemsRef.current.get(submenuId) || [];
      items.forEach((item, index) => {
        setTimeout(() => {
          item.style.transition = "all 0.3s ease";
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, index * 50);
      });
    }
  }, []);

  // Submenu animation management
  useEffect(() => {
    if (openSubmenu) {
      animateSubmenuItems(openSubmenu);
    }
  }, [openSubmenu, animateSubmenuItems]);

  // Mobile menu toggle handler
  const toggleMobileMenu = useCallback(() => {
    if (isMobileOpen) {
      setOpenSubmenu(null);
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
    setIsMobileOpen(!isMobileOpen);
  }, [isMobileOpen]);

  // Submenu toggle handler
  const toggleSubmenu = useCallback(
    (id: string) => {
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
    },
    [openSubmenu]
  );

  // Mouse event handlers for desktop dropdown
  const handleMouseEnter = useCallback((id: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoveredItem(id);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 400);
  }, []);

  // Utility for managing submenu items
  const collectSubmenuItem = useCallback(
    (parentId: string, el: HTMLElement | null) => {
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
    },
    []
  );

  // Simple logo click handler
  const handleLogoClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      const now = Date.now();

      if (!window.clickTimes) {
        window.clickTimes = [];
      }

      window.clickTimes.push(now);
      window.clickTimes = window.clickTimes.filter((time) => now - time < 1000);

      if (window.clickTimes.length >= 3) {
        window.clickTimes = [];
        router.push("/login");
        return;
      }

      setTimeout(() => {
        if (window.clickTimes && window.clickTimes.length < 3) {
          router.push("/");
          window.clickTimes = [];
        }
      }, 1000);
    },
    [router]
  );

  // Memoize logo sources to prevent unnecessary re-renders
  const logoSources = useMemo(
    () => ({
      mobile: {
        scrolled: "/assets/img/logo/logo-gris.png",
        default: "/assets/img/logo/logo-berengena.png",
      },
      desktop: {
        scrolled: "/assets/img/logo/logo_full_gris.svg",
        default: "/assets/img/logo/logo-full-berenjena.png",
      },
    }),
    []
  );

  // Render the appropriate CTA button based on scroll state
  const renderCtaButton = useCallback(() => {
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
  }, [isMobile, isDesktop, isScrolled, handleNavigation, toggleMobileMenu]);

  return (
    <header
      ref={menuRef}
      className={`menu ${isScrolled ? "menu--scrolled" : ""}`}
    >
      <div className="menu__container">
        {/* Logo Area */}
        <Link href="/" className="menu__logo" onClick={handleLogoClick}>
          {/* Mobile logos */}
          <Image
            src={
              isScrolled
                ? logoSources.mobile.scrolled
                : logoSources.mobile.default
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
                ? logoSources.desktop.scrolled
                : logoSources.desktop.default
            }
            alt="Logo"
            width={200}
            height={50}
            priority
            className="menu__logo-image menu__logo-image--desktop"
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
                    <Link
                      href={item.href}
                      className="menu__nav-button"
                      onClick={(e) => handleNavigation(item.href, e)}
                    >
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
                          onClick={(e) => handleNavigation(child.href, e)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="menu__nav-link"
                    onClick={(e) => handleNavigation(item.href, e)}
                  >
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
            <Link
              href="/"
              className="menu__mobile-logo"
              onClick={handleLogoClick}
            >
              <Image
                src="/assets/img/logo/logo_full_gris.svg"
                alt="Logo"
                width={180}
                height={40}
                className="menu__mobile-logo-image"
              />
            </Link>
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
                        onClick={(e) => {
                          handleNavigation(item.href, e);
                          toggleMobileMenu();
                        }}
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
                            ref={(el: any) =>
                              collectSubmenuItem(item.id, el as HTMLElement)
                            }
                            onClick={(e) => {
                              handleNavigation(sub.href, e);
                              toggleMobileMenu();
                            }}
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
                    onClick={(e) => {
                      handleNavigation(item.href, e);
                      toggleMobileMenu();
                    }}
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
