import gsap from "gsap";

export const menuUtils = {
  setupMenuScroll(menuElement: HTMLElement | null) {
    if (!menuElement) return () => {};

    let lastScrollY = 0;
    let isHidden = false;

    // Simple function to show the menu - with linear, smooth animation
    function showMenu() {
      if (isHidden) {
        gsap.to(menuElement, {
          y: 0,
          duration: 0.4, // Slightly longer for smoother feel
          ease: "power1.inOut", // Linear, smooth ease-in-out
        });
        isHidden = false;
      }
    }

    // Simple function to hide the menu - with linear, smooth animation
    function hideMenu() {
      if (!isHidden) {
        gsap.to(menuElement, {
          y: -(menuElement?.offsetHeight || 0),
          duration: 0.4, // Match the duration
          ease: "power1.inOut", // Linear, smooth ease-in-out
        });
        isHidden = true;
      }
    }

    // Direct scroll handler
    function handleScroll() {
      const currentScrollY = window.scrollY;

      // Only apply for desktop
      if (window.innerWidth >= 1200) {
        if (currentScrollY < lastScrollY) {
          // Scrolling UP - show menu
          showMenu();
        } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling DOWN - hide menu (after scrolling down a bit)
          hideMenu();
        }
      }

      lastScrollY = currentScrollY;
    }

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Return cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  },
};
