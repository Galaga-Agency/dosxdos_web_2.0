import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Animate project sections with scroll-triggered animations
 * @param sectionElement The project section DOM element
 */
export function animateProjectSection(sectionElement: HTMLElement) {
  // Clear any previous animations to prevent conflicts
  const projectIndex = parseInt(sectionElement.getAttribute('data-project-index') || '0');
  
  // Create a separate timeline for each element to avoid dependencies
  const detailsTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: sectionElement,
      start: 'top 80%',
      // Use different toggleActions for more reliable triggering
      toggleActions: 'restart none none reset'
    }
  });

  // Get all the elements we need to animate
  const projectDetails = sectionElement.querySelector('.project-details');
  const projectCategory = sectionElement.querySelector('.project-category');
  const projectTitle = sectionElement.querySelector('.section-title');
  const projectContent = sectionElement.querySelector('.section-content p');
  const projectBtn = sectionElement.querySelector('.view-project-btn');
  
  // Text elements animation - more pronounced and reliable
  if (projectDetails) {
    // Reset initial state first
    gsap.set([projectCategory, projectTitle, projectContent, projectBtn], { 
      opacity: 0, 
      y: 30 
    });
    
    // Sequential animation with clear timing
    detailsTimeline
      .to(projectCategory, { 
        opacity: 1, 
        y: 0, 
        duration: 0.5,
        ease: 'power2.out' 
      })
      .to(projectTitle, { 
        opacity: 1, 
        y: 0, 
        duration: 0.5,
        ease: 'power2.out' 
      }, '-=0.3')
      .to(projectContent, { 
        opacity: 1, 
        y: 0, 
        duration: 0.5,
        ease: 'power2.out' 
      }, '-=0.3')
      .to(projectBtn, { 
        opacity: 1, 
        y: 0, 
        duration: 0.5,
        ease: 'power2.out' 
      }, '-=0.3');
  }

  // Gallery animations - separate from text animations
  const galleryTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: sectionElement,
      start: 'top 70%',
      toggleActions: 'restart none none reset'
    }
  });

  const projectGallery = sectionElement.querySelector('.project-gallery');
  const projectImages = sectionElement.querySelectorAll('.project-image');
  
  if (projectGallery) {
    // Reset gallery initial state
    gsap.set(projectGallery, { opacity: 0, scale: 0.95 });
    
    galleryTimeline.to(projectGallery, { 
      opacity: 1, 
      scale: 1, 
      duration: 0.7,
      ease: 'power2.out' 
    });
  }
  
  // Individual images with staggered animation
  if (projectImages.length > 0) {
    // Reset all images first
    gsap.set(projectImages, { 
      opacity: 0, 
      y: 50, 
      scale: 0.9, 
      rotate: (-3 + (projectIndex * 2)) + 'deg' 
    });
    
    // Animate each image with staggered timing
    galleryTimeline.to(projectImages, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: '0deg',
      duration: 0.8,
      stagger: 0.15, // This creates the staggered effect
      ease: 'power3.out',
      clearProps: "rotate" // Clear the rotation after animation
    }, '-=0.5');
  }
  
  // Add hover effects to images
  projectImages.forEach((img) => {
    const element = img as HTMLElement;
    
    element.addEventListener('mouseenter', () => {
      gsap.to(element, { 
        y: -10, 
        scale: 1.03, 
        boxShadow: '0 20px 30px rgba(0, 0, 0, 0.15)', 
        duration: 0.4 
      });
    });
    
    element.addEventListener('mouseleave', () => {
      gsap.to(element, { 
        y: 0, 
        scale: 1, 
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)', 
        duration: 0.4 
      });
    });
  });
}

/**
 * Generate a random project layout based on a seed value
 * @param index - Project index to create deterministic randomness
 * @returns An array of 3 image layout objects
 */
export function generateRandomLayout(index: number) {
  // Use the index as a seed for pseudo-random but consistent layouts
  const seed = index + 1;
  
  // Use a different base layout for each project
  const layouts = [
    // Layout variations
    [
      { col: 1, row: 1, colSpan: 6, rowSpan: 6 },
      { col: 7, row: 2, colSpan: 5, rowSpan: 3 },
      { col: 8, row: 5, colSpan: 4, rowSpan: 3 }
    ],
    [
      { col: 2, row: 1, colSpan: 5, rowSpan: 5 },
      { col: 7, row: 3, colSpan: 5, rowSpan: 3 },
      { col: 4, row: 6, colSpan: 5, rowSpan: 3 }
    ],
    [
      { col: 2, row: 2, colSpan: 6, rowSpan: 4 },
      { col: 8, row: 1, colSpan: 4, rowSpan: 3 },
      { col: 1, row: 6, colSpan: 5, rowSpan: 3 }
    ],
    [
      { col: 1, row: 2, colSpan: 5, rowSpan: 4 },
      { col: 6, row: 3, colSpan: 4, rowSpan: 3 },
      { col: 9, row: 4, colSpan: 3, rowSpan: 3 }
    ]
  ];
  
  // Select a base layout based on the index
  const baseLayout = layouts[index % layouts.length];
  
  // Function to get deterministic random value based on seed
  const getRandom = (i: number, min: number, max: number) => {
    const random = Math.sin(seed * (i + 1) * 9.13) * 0.5 + 0.5;
    return min + Math.floor(random * (max - min + 1));
  };
  
  // Generate transforms based on project index
  const getTransform = (i: number) => {
    const transforms = [];
    
    // Add some translations based on the index
    if (i === 0) {
      const translateY = getRandom(i, -15, 5);
      transforms.push(`translateY(${translateY}%)`);
    } else if (i === 1) {
      const translateX = getRandom(i, -8, 8);
      transforms.push(`translateX(${translateX}%)`);
    } else {
      const translateY = getRandom(i, -5, 15);
      transforms.push(`translateY(${translateY}%)`);
    }
    
    // Add rotation for some images
    if (getRandom(i + seed, 0, 10) > 7) {
      const rotation = getRandom(i + seed, -3, 3);
      transforms.push(`rotate(${rotation}deg)`);
    }
    
    return transforms.join(' ');
  };
  
  // Create the randomized layout
  return baseLayout.map((item, i) => {
    // Add small variations to the base layout
    const colVar = getRandom(i * 3 + 1, -1, 1);
    const rowVar = getRandom(i * 3 + 2, -1, 1);
    const colSpanVar = getRandom(i * 3 + 3, -1, 1);
    const rowSpanVar = getRandom(i * 3 + 4, -1, 1);
    
    // Ensure we stay within grid bounds
    const col = Math.max(1, Math.min(10, item.col + colVar));
    const row = Math.max(1, Math.min(6, item.row + rowVar));
    const colSpan = Math.max(3, Math.min(6, item.colSpan + colSpanVar));
    const rowSpan = Math.max(2, Math.min(4, item.rowSpan + rowSpanVar));
    
    return {
      column: `${col} / span ${colSpan}`,
      row: `${row} / span ${rowSpan}`,
      transform: getTransform(i),
      zIndex: 3 - i // First image has highest z-index
    };
  });
}