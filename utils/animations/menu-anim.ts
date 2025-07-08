
export const menuUtils = {
  setupMenuScroll(menuElement: any) {
    if (!menuElement) return () => {};

    let lastScrollY = 0;
    let isHidden = false;

    // Add CSS transition to the menu element
    menuElement.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    menuElement.style.willChange = 'transform';

    // Simple function to show the menu - pure CSS
    function showMenu() {
      if (isHidden) {
        menuElement.style.transform = 'translateY(0)';
        isHidden = false;
      }
    }

    // Simple function to hide the menu - pure CSS
    function hideMenu() {
      if (!isHidden) {
        const menuHeight = menuElement?.offsetHeight || 0;
        menuElement.style.transform = `translateY(-${menuHeight}px)`;
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
          // Scrolling DOWN - hide menu
          hideMenu();
        }
      } else {
        // Reset for mobile/tablet
        showMenu();
      }

      lastScrollY = currentScrollY;
    }

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Return cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      // Reset styles on cleanup
      if (menuElement) {
        menuElement.style.transform = '';
        menuElement.style.transition = '';
        menuElement.style.willChange = '';
      }
    };
  },
};