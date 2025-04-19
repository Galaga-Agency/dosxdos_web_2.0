import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Always register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface AboutUsSectionElements {
  section?: HTMLElement;
  label?: HTMLElement;
  title: HTMLElement;
  text: HTMLElement;
  cta?: HTMLElement;
  decor?: HTMLElement;
  image?: HTMLElement;
}

export const animateAboutUsSection = ({
  section,
  label,
  title,
  text,
  cta,
  decor,
  image
}: AboutUsSectionElements) => {
  // Create a timeline for better control
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section || title,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

  // Animate decorative elements if present
  if (decor) {
    const dots = decor.querySelector('.aboutus-section__decor-dots');
    const line1 = decor.querySelector('.aboutus-section__decor-line-1');
    const line2 = decor.querySelector('.aboutus-section__decor-line-2');
    const circle = decor.querySelector('.aboutus-section__decor-circle');
    const grid = decor.querySelector('.aboutus-section__decor-grid');

    if (dots) {
      tl.fromTo(
        dots,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 0.3,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        },
        0.4
      );
    }

    if (line1) {
      tl.fromTo(
        line1,
        {
          width: 0,
          opacity: 0,
        },
        {
          width: 80,
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
        },
        0.6
      );
    }

    if (line2) {
      tl.fromTo(
        line2,
        {
          width: 0,
          opacity: 0,
        },
        {
          width: 120,
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
        },
        0.8
      );
    }

    if (circle) {
      tl.fromTo(
        circle,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: "elastic.out(1, 0.5)",
        },
        0.5
      );
    }

    if (grid) {
      tl.fromTo(
        grid,
        {
          opacity: 0,
          x: 20,
        },
        {
          opacity: 0.5,
          x: 0,
          duration: 1,
          ease: "power2.out",
        },
        0.7
      );
    }
  }

  // Animate the label
  if (label) {
    tl.fromTo(
      label,
      {
        opacity: 0,
        x: -20,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      0
    );
  }

  // Animate pre-wrapped title words
  if (title) {
    const wordElements = title.querySelectorAll('.word, .highlight');
    
    tl.fromTo(
      wordElements,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
      },
      0.3
    );
  }

  // Animate the text
  if (text) {
    tl.fromTo(
      text,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      },
      0.6
    );

    // Additional animation for the left vertical line
    const verticalLine = text.querySelector("::before");
    if (verticalLine) {
      tl.fromTo(
        verticalLine,
        {
          scaleY: 0,
        },
        {
          scaleY: 1,
          duration: 1.2,
          ease: "power3.inOut",
        },
        0.8
      );
    }
  }

  // Animate the CTA
  if (cta) {
    tl.fromTo(
      cta,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.4)",
      },
      0.9
    );
  }

  // Find and animate image frame and stats if they exist
  const imageColumn = section?.querySelector('.aboutus-section__image-column');
  if (imageColumn) {
    const imageFrame = imageColumn.querySelector('.aboutus-section__image-frame');
    const stats = imageColumn.querySelector('.aboutus-section__stats');
    const corners = imageColumn.querySelectorAll('.aboutus-section__image-corner');
    
    if (imageFrame) {
      tl.fromTo(
        imageFrame,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        0.5
      );
    }
    
    if (corners && corners.length) {
      tl.fromTo(
        corners,
        {
          opacity: 0,
          scale: 0,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        0.8
      );
    }
    
    if (stats) {
      const statItems = stats.querySelectorAll('.aboutus-section__stat-item');
      tl.fromTo(
        statItems,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        },
        1
      );
    }
  }

  return tl;
};

// HeroSlider animation
interface HeroSliderElements {
  container: HTMLElement;
  title: HTMLElement;
  cta: HTMLElement;
}

export const animateHeroSlider = ({
  container,
  title,
  cta,
}: HeroSliderElements) => {
  // Create a master timeline
  const tl = gsap.timeline();
  
  // Title animation
  tl.fromTo(
    title,
    { 
      opacity: 0, 
      y: -30 
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
    }
  );
  
  // CTA button animation - special handling to prevent glassmorphism glitch
  tl.fromTo(
    cta,
    {
      opacity: 0, 
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      clearProps: "transform", // Important: clear transform after animation to prevent glitches
    },
    "-=0.8" // Overlap with title animation
  );
  
  return tl;
};

// Blog Carousel Section animation
interface BlogCarouselSectionElements {
  section?: HTMLElement;
  title?: HTMLElement;
  subtitle?: HTMLElement;
  carousel?: HTMLElement;
  cta?: HTMLElement;
}

export const animateBlogCarouselSection = ({
  section,
  title,
  subtitle,
  carousel,
  cta,
}: BlogCarouselSectionElements) => {
  if (!section) return;
  
  // First ensure all blog items are visible
  const blogItems = section.querySelectorAll('.blog-item');
  gsap.set(blogItems, { opacity: 1, y: 0 });
  
  // Create a timeline for section elements
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 90%",
      toggleActions: "play none none none",
    },
  });

  // Animate decorative line if present
  const decorLine = section.querySelector('.section-header__decorative-line');
  if (decorLine) {
    tl.fromTo(
      decorLine,
      {
        scaleY: 0,
        transformOrigin: "top",
      },
      {
        scaleY: 1,
        duration: 0.8,
        ease: "power3.inOut",
      },
      0
    );
  }

  // Animate title if it exists
  if (title) {
    const titleElements = title.querySelectorAll('span');
    
    if (titleElements.length) {
      tl.fromTo(
        title,
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        0.3
      );
      
      tl.fromTo(
        titleElements,
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        0.4
      );
    } else {
      tl.fromTo(
        title,
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        0.3
      );
    }
  }

  // Animate subtitle
  if (subtitle) {
    tl.fromTo(
      subtitle,
      {
        opacity: 0,
        x: -15,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      0.5
    );
  }

  // Animate CTA
  if (cta) {
    tl.fromTo(
      cta,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "back.out(1.4)",
      },
      0.9
    );
  }

  return tl;
};

// Blog Item Corner Animation
export const animateBlogItemCorners = (card: HTMLElement) => {
  if (!card) return;
  
  const corners = card.querySelectorAll('.blog-item__corner');
  if (!corners.length) return;
  
  // Set initial state
  gsap.set(corners, {
    width: 0,
    height: 0,
    opacity: 0,
  });
  
  // Create hover entry/exit animations using event listeners
  card.addEventListener('mouseenter', () => {
    gsap.to(corners, {
      width: 15,
      height: 15,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  });
  
  card.addEventListener('mouseleave', () => {
    gsap.to(corners, {
      width: 0,
      height: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  });
};