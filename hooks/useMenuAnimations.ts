import { useEffect, useRef } from "react";
import gsap from "gsap";

interface UseMenuAnimationsProps {
  isMobileOpen: boolean;
  openSubmenu: string | null;
}

export const useMenuAnimations = ({
  isMobileOpen,
  openSubmenu,
}: UseMenuAnimationsProps) => {
  // Refs for GSAP animations
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const mobileItemsRef = useRef<HTMLDivElement[]>([]);
  const desktopItemsRef = useRef<HTMLLIElement[]>([]);
  const dropdownLinksRef = useRef<Map<string, HTMLAnchorElement[]>>(new Map());

  // Track active animations to cancel when needed
  const activeAnimationsRef = useRef<Map<string, gsap.core.Tween[]>>(new Map());
  const previousSubmenuRef = useRef<string | null>(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      // Kill all animations
      activeAnimationsRef.current.forEach((tweens) => {
        tweens.forEach((tween) => tween.kill());
      });
      activeAnimationsRef.current.clear();

      // Clear refs
      mobileItemsRef.current = [];
      desktopItemsRef.current = [];
      dropdownLinksRef.current.clear();
    };
  }, []);

  // Handle cleanup when submenu changes
  useEffect(() => {
    // If we had a previous submenu and it's different from the current one
    if (
      previousSubmenuRef.current &&
      previousSubmenuRef.current !== openSubmenu
    ) {
      // Kill animations for the previous submenu
      const previousAnimations =
        activeAnimationsRef.current.get(previousSubmenuRef.current) || [];
      previousAnimations.forEach((tween) => tween.kill());

      // Remove from active animations
      activeAnimationsRef.current.delete(previousSubmenuRef.current);
    }

    // Update previous submenu ref
    previousSubmenuRef.current = openSubmenu;
  }, [openSubmenu]);

  // Mobile menu animation
  useEffect(() => {
    if (!mobileNavRef.current) return;

    if (isMobileOpen) {
      // Kill any existing animations for menu items
      const menuAnimations =
        activeAnimationsRef.current.get("mobileItems") || [];
      menuAnimations.forEach((tween) => tween.kill());

      // Create and store new animation
      const tween = gsap.fromTo(
        mobileItemsRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform",
        }
      );

      activeAnimationsRef.current.set("mobileItems", [tween]);
    }
  }, [isMobileOpen]);

  // Desktop items initial animation
  useEffect(() => {
    if (desktopItemsRef.current.length === 0) return;

    const tween = gsap.fromTo(
      desktopItemsRef.current,
      { y: 10, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        clearProps: "transform",
      }
    );

    activeAnimationsRef.current.set("desktopItems", [tween]);

    return () => {
      tween.kill();
      activeAnimationsRef.current.delete("desktopItems");
    };
  }, []);

  // Function to manually animate mobile submenu items
  const animateMobileSubmenu = (submenuId: string, elements: HTMLElement[]) => {
    // First, kill any existing animations for this submenu
    const existingAnimations = activeAnimationsRef.current.get(submenuId) || [];
    existingAnimations.forEach((tween) => tween.kill());

    // Reset elements to initial state
    gsap.set(elements, { opacity: 0, y: 10 });

    // Create new animation with a small delay to let the container expand
    const tween = gsap.to(elements, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.3,
      delay: 0.2, // Small delay for container expansion
      ease: "power2.out",
      clearProps: "transform",
    });

    // Store animation for potential future cleanup
    activeAnimationsRef.current.set(submenuId, [tween]);
  };

  // Function to animate dropdown menu
  const animateDropdown = (dropdownId: string) => {
    const links = dropdownLinksRef.current.get(dropdownId) || [];
    if (links.length === 0) return;

    // Kill any existing animations
    const existingAnimations =
      activeAnimationsRef.current.get(`dropdown_${dropdownId}`) || [];
    existingAnimations.forEach((tween) => tween.kill());

    // Create new animation
    const tween = gsap.fromTo(
      links,
      { y: 15, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.06,
        ease: "power2.out",
        clearProps: "transform",
      }
    );

    // Store animation
    activeAnimationsRef.current.set(`dropdown_${dropdownId}`, [tween]);
  };

  // Ref collectors
  const collectMobileItem = (el: HTMLDivElement | null) => {
    if (el && !mobileItemsRef.current.includes(el)) {
      mobileItemsRef.current.push(el);
    }
  };

  const collectDesktopItem = (el: HTMLLIElement | null) => {
    if (el && !desktopItemsRef.current.includes(el)) {
      desktopItemsRef.current.push(el);
    }
  };

  const collectDropdownLink = (
    dropdownId: string,
    el: HTMLAnchorElement | null
  ) => {
    if (el) {
      if (!dropdownLinksRef.current.has(dropdownId)) {
        dropdownLinksRef.current.set(dropdownId, []);
      }
      const links = dropdownLinksRef.current.get(dropdownId) || [];
      if (!links.includes(el)) {
        links.push(el);
        dropdownLinksRef.current.set(dropdownId, links);
      }
    }
  };

  return {
    mobileNavRef,
    collectMobileItem,
    collectDesktopItem,
    collectDropdownLink,
    animateDropdown,
    animateMobileSubmenu,
  };
};

export default useMenuAnimations;
