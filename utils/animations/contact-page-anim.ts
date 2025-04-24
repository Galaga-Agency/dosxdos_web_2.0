import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "@/plugins";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

// Store all ScrollTrigger instances for cleanup
const scrollTriggerInstances: ScrollTrigger[] = [];

// Helper to safely add ScrollTrigger instances to our cleanup array
const trackScrollTrigger = (instance: ScrollTrigger): ScrollTrigger => {
  scrollTriggerInstances.push(instance);
  return instance;
};

// Function to clean up all ScrollTrigger instances
export function cleanupContactPageAnimations(): void {
  // Kill all tracked ScrollTrigger instances
  scrollTriggerInstances.forEach((trigger) => {
    if (trigger) trigger.kill();
  });

  // Clear the array
  scrollTriggerInstances.length = 0;
}

// Character animation with SplitText (existing function)
export const charAnimation = (current: HTMLElement | null = null) => {
  // If a specific element is passed, only animate that
  if (current) {
    const splitTextLine = current;

    gsap.set(splitTextLine, {
      visibility: "hidden",
      perspective: 300,
    });

    const itemSplitted = new SplitText(splitTextLine, {
      type: "chars, words",
    });

    gsap.set(splitTextLine, { visibility: "visible" });

    const tl = gsap.timeline();
    tl.from(itemSplitted.chars, {
      duration: 1,
      x: 100,
      autoAlpha: 0,
      stagger: 0.05,
    });

    return;
  }

  // Original behavior for multiple elements
  let char_come = gsap.utils.toArray(".char-animation");
  char_come.forEach((splitTextLine: any) => {
    gsap.set(splitTextLine, {
      visibility: "hidden",
      perspective: 300,
    });

    const itemSplitted = new SplitText(splitTextLine, {
      type: "chars, words",
    });

    gsap.set(splitTextLine, { visibility: "visible" });

    const tl = gsap.timeline({
      scrollTrigger: trackScrollTrigger(
        ScrollTrigger.create({
          trigger: splitTextLine,
          start: "top 90%",
          end: "bottom 60%",
          scrub: false,
          markers: false,
          toggleActions: "play none none none",
        })
      ),
    });

    tl.from(itemSplitted.chars, {
      duration: 1,
      x: 100,
      autoAlpha: 0,
      stagger: 0.05,
    });
  });
};

// Function to animate the subtitle
export const animateSubtitle = (element: HTMLElement | null) => {
  if (!element) return;

  gsap.fromTo(
    element,
    {
      y: 20,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
    }
  );
};

// Function to animate the contact form and info sections
export const animateContactSections = (
  leftSection: HTMLElement | null,
  rightSection: HTMLElement | null
) => {
  if (!leftSection || !rightSection) return;

  // Animate left section
  gsap.fromTo(
    leftSection,
    {
      x: -50,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power3.out",
      delay: 0.4,
    }
  );

  // Animate right section
  gsap.fromTo(
    rightSection,
    {
      x: 50,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power3.out",
      delay: 0.6,
    }
  );
};

// Function to animate location cards
export const animateLocationCards = (container: HTMLElement | null) => {
  if (!container) return;

  const cards = container.querySelectorAll(".location-card");

  gsap.fromTo(
    cards,
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.8,
    }
  );
};

// Function to set up scroll triggers for office section
export const setupOfficesSectionAnimation = (section: HTMLElement | null) => {
  if (!section) return;

  const title = section.querySelector(".offices-title");

  trackScrollTrigger(
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => {
        // Animate title
        gsap.fromTo(
          title,
          {
            x: -50,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          }
        );
      },
      once: true,
    })
  );
};

// Function to animate social CTA section
export const animateSocialCTA = (section: HTMLElement | null) => {
  if (!section) return;

  trackScrollTrigger(
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(
          section.querySelector("h3"),
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          }
        );

        gsap.fromTo(
          section.querySelector(".contact-page__desktop-social-icons"),
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.3,
            ease: "power3.out",
          }
        );
      },
      once: true,
    })
  );
};
