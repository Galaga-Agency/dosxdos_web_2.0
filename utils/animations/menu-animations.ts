import { gsap } from 'gsap';

/**
 * Creates and returns the mobile menu animation timeline
 * @param {Object} elements - DOM elements to animate
 * @returns {gsap.core.Timeline} GSAP timeline with all animations
 */
export const createMenuTimeline = (elements: {
  mobileMenu: HTMLElement | null;
  overlay: HTMLElement | null;
  menuItems: (HTMLElement | null)[];
  ctaButton: HTMLElement | null;
}): gsap.core.Timeline => {
  const { mobileMenu, overlay, menuItems, ctaButton } = elements;
  
  // Create a new timeline that's paused initially
  const timeline = gsap.timeline({ 
    paused: true,
    defaults: { 
      ease: 'power2.inOut' 
    } 
  });
  
  if (mobileMenu && overlay) {
    // Overlay animation - fade in
    timeline.to(overlay, {
      autoAlpha: 1,
      duration: 0.4
    });
    
    // Mobile menu slide in from right
    timeline.to(mobileMenu, {
      x: 0,
      duration: 0.5,
      ease: 'power3.out'
    }, "-=0.2");
    
    // Animate menu items with stagger
    timeline.to(menuItems.filter(item => item !== null), {
      y: 0,
      autoAlpha: 1,
      stagger: 0.1,
      duration: 0.4,
      ease: 'back.out(1.7)'
    }, "-=0.3");
    
    // Animate CTA button
    if (ctaButton) {
      timeline.to(ctaButton, {
        y: 0,
        autoAlpha: 1,
        duration: 0.4,
        ease: 'back.out(1.7)'
      }, "-=0.2");
    }
  }
  
  return timeline;
};

/**
 * Sets up header animation based on scroll position
 * @param {HTMLElement} header - Header element to animate
 * @returns {() => void} Cleanup function to remove the scroll event listener
 */
export const setupHeaderScrollAnimation = (header: HTMLElement): () => void => {
  let lastScrollY = 0;
  let ticking = false;
  
  const scrollHandler = () => {
    const scrollY = window.scrollY;
    
    if (!ticking) {
      window.requestAnimationFrame(() => {
        // Add scrolled class when scrolling down
        if (scrollY > 20) {
          header.classList.add('menu--scrolled');
        } else {
          header.classList.remove('menu--scrolled');
        }
        
        // Hide/show header based on scroll direction
        if (scrollY > lastScrollY && scrollY > 200) {
          // Scrolling down - hide header
          header.classList.add('menu--hidden');
        } else {
          // Scrolling up - show header
          header.classList.remove('menu--hidden');
        }
        
        lastScrollY = scrollY;
        ticking = false;
      });
      
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', scrollHandler, { passive: true });
  
  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', scrollHandler);
  };
};

/**
 * Sets up logo hover animation
 * @param {HTMLElement} logo - Logo element to animate
 * @returns {() => void} Cleanup function to remove event listeners
 */
export const setupLogoAnimation = (logo: HTMLElement): () => void => {
  const hoverTimeline = gsap.timeline({ 
    paused: true,
    defaults: { 
      ease: 'power2.out',
      duration: 0.3 
    } 
  });

  hoverTimeline
    .to(logo, { 
      scale: 1.05,
      rotation: 2
    })
    .to(logo, { 
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
    }, 0);
  
  const handleMouseEnter = () => {
    hoverTimeline.play();
  };
  
  const handleMouseLeave = () => {
    hoverTimeline.reverse();
  };
  
  logo.addEventListener('mouseenter', handleMouseEnter);
  logo.addEventListener('mouseleave', handleMouseLeave);
  
  // Return cleanup function
  return () => {
    logo.removeEventListener('mouseenter', handleMouseEnter);
    logo.removeEventListener('mouseleave', handleMouseLeave);
  };
};

/**
 * Creates a subtle hover animation for menu items
 * @param {HTMLElement} menuItem - Menu item element to animate
 * @returns {() => void} Cleanup function to remove event listeners
 */
export const setupMenuItemHoverAnimation = (menuItem: HTMLElement): () => void => {
  const hoverTimeline = gsap.timeline({ 
    paused: true,
    defaults: { 
      ease: 'power2.out',
      duration: 0.2 
    } 
  });

  hoverTimeline
    .to(menuItem, { 
      color: '#yourPrimaryColor',
      scale: 1.05
    })
    .to(menuItem.querySelector('svg'), {
      rotation: 180
    }, 0);
  
  const handleMouseEnter = () => {
    hoverTimeline.play();
  };
  
  const handleMouseLeave = () => {
    hoverTimeline.reverse();
  };
  
  menuItem.addEventListener('mouseenter', handleMouseEnter);
  menuItem.addEventListener('mouseleave', handleMouseLeave);
  
  // Return cleanup function
  return () => {
    menuItem.removeEventListener('mouseenter', handleMouseEnter);
    menuItem.removeEventListener('mouseleave', handleMouseLeave);
  };
};