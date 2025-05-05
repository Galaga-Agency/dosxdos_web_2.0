"use client";

import { gsap, Power2 } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "@/plugins";
import { refreshScrollTrigger } from "../scrolltrigger-config";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

// Store all ScrollTrigger instances for cleanup
const scrollTriggerInstances: ScrollTrigger[] = [];

// Track ScrollTrigger instances for cleanup
function trackScrollTrigger(instance: ScrollTrigger): ScrollTrigger {
  scrollTriggerInstances.push(instance);
  return instance;
}

// Interface for hero section animations
export interface ServiciosHeroRefs {
  section: HTMLElement | null;
  title: HTMLElement | null;
  subtitle: HTMLElement | null;
  button: HTMLElement | null;
  [key: string]: HTMLElement | null;
}

// Initialize fade animations
export function initFadeAnimations(): void {
  if (typeof window === "undefined") return;

  // Fade Bottom animations
  if (document.querySelectorAll(".fade_bottom").length > 0) {
    gsap.set(".fade_bottom", { y: 100, opacity: 0 });
    const fadeArray = gsap.utils.toArray(".fade_bottom");
    fadeArray.forEach((item: any) => {
      const fadeTl = gsap.timeline({
        scrollTrigger: trackScrollTrigger(ScrollTrigger.create({
          trigger: item,
          start: "top center+=400",
        }))
      });
      
      fadeTl.to(item, {
        y: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 1.5,
      });
    });
  }

  // Fade Top animations
  if (document.querySelectorAll(".fade_top").length > 0) {
    gsap.set(".fade_top", { y: -100, opacity: 0 });
    const fadetopArray = gsap.utils.toArray(".fade_top");
    fadetopArray.forEach((item: any) => {
      const fadeTl = gsap.timeline({
        scrollTrigger: trackScrollTrigger(ScrollTrigger.create({
          trigger: item,
          start: "top center+=100",
        }))
      });
      
      fadeTl.to(item, {
        y: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 2.5,
      });
    });
  }

  // Fade Left animations
  if (document.querySelectorAll(".fade_left").length > 0) {
    gsap.set(".fade_left", { x: -100, opacity: 0 });
    const fadeleftArray = gsap.utils.toArray(".fade_left");
    fadeleftArray.forEach((item: any) => {
      const fadeTl = gsap.timeline({
        scrollTrigger: trackScrollTrigger(ScrollTrigger.create({
          trigger: item,
          start: "top center+=100",
        }))
      });
      
      fadeTl.to(item, {
        x: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 2.5,
      });
    });
  }

  // Fade Right animations
  if (document.querySelectorAll(".fade_right").length > 0) {
    gsap.set(".fade_right", { x: 100, opacity: 0 });
    const faderightArray = gsap.utils.toArray(".fade_right");
    faderightArray.forEach((item: any) => {
      const fadeTl = gsap.timeline({
        scrollTrigger: trackScrollTrigger(ScrollTrigger.create({
          trigger: item,
          start: "top center+=100",
        }))
      });
      
      fadeTl.to(item, {
        x: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 2.5,
      });
    });
  }
}

export function imageRevealAnimation() {
  const img_reveal = document.querySelectorAll(".img_reveal");

	if(img_reveal.length > 0) {
    img_reveal.forEach((img_reveal) => {
      let image = img_reveal.querySelector("img");
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: img_reveal,
          start: "top 70%",
        }
      });
  
      tl.set(img_reveal, { autoAlpha: 1 });
      tl.from(img_reveal, 1.5, {
        xPercent: -100,
        ease: Power2.easeOut
      } as any);
      tl.from(image, 1.5, {
        xPercent: 100,
        scale: 1.5,
        delay: -1.5,
        ease: Power2.easeOut
      } as any);
    });
  }
};

// Initialize hero section animations
export function animateServiciosHero(refs: ServiciosHeroRefs) {
  if (typeof window === "undefined") return;

  console.log("Initializing Servicios Hero Animations");

  // Title animation
  if (refs.title) {
    // Make the title visible for animation
    gsap.set(refs.title, {
      visibility: "visible"
    });
    
    // Character animation
    const splitText = new SplitText(refs.title, {
      type: "chars, words",
    });

    gsap.from(splitText.chars, {
      duration: 1,
      x: 100,
      autoAlpha: 0,
      stagger: 0.05,
    });
    
    // Create a match media for tablets and above
    let mm = gsap.matchMedia();
    
    // Only apply animations on tablets and up
    mm.add("(min-width: 576px)", () => {
      // FIRST: Create the scroll animation timeline 
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: refs.section,
          start: "top 30%",
          end: "bottom 20%",
          scrub: 1.5, // Higher value for smoother scrubbing
          invalidateOnRefresh: true
        }
      });
      
      // Add the scroll animation with easing
      tl.to(refs.title, {
        x: "-25%",
        ease: "power2.inOut" // Smooth easing for better transition
      });
      
      // SECOND: Set the initial position
      gsap.set(refs.title, {
        x: "0%"
      });
      
      // Track for cleanup
      if (tl.scrollTrigger) {
        trackScrollTrigger(tl.scrollTrigger);
      }
      
      return () => {};
    });
  }

  // Subtitle animation
  if (refs.subtitle) {
    gsap.fromTo(
      refs.subtitle,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 1.8, ease: "power2.out" }
    );
  }

  // Button animation
  if (refs.button) {
    gsap.fromTo(
      refs.button,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 2, ease: "power2.out" }
    );
  }
}

// Initialize all animations for the servicios page
export function initServiciosAnimations(): void {
  if (typeof window === "undefined") return;
  
  console.log("Initializing all servicios page animations");
  
  // Initialize fade animations
  initFadeAnimations();
  
  // Refresh ScrollTrigger
  refreshScrollTrigger();
}

// Cursor bubble animation
export function initCursorBubbleAnimation() {
  if (typeof window === "undefined") return;
  
  // Create the viewDemo bubble that follows cursor
  const viewDemo = document.createElement("div");
  viewDemo.className = "view-demo";
  viewDemo.innerHTML = "<span>View<br>Demo</span>";
  document.body.appendChild(viewDemo);
  
  // Variables for smooth following
  let mouseX = 0;
  let mouseY = 0;
  let bubbleX = 0;
  let bubbleY = 0;
  
  // Handle mouse movement
  const handleMouseMove = (e: MouseEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };
  
  document.addEventListener("mousemove", handleMouseMove);
  
  // Animate bubble position with requestAnimationFrame for smoother movement
  const animateBubble = () => {
    // Smoothly interpolate the bubble position to follow the mouse
    const speed = 0.15; // Lower value = smoother/slower follow
    
    // Calculate the distance between current position and target (mouse) position
    const distX = mouseX - bubbleX;
    const distY = mouseY - bubbleY;
    
    // Move the bubble a portion of the way to the mouse
    bubbleX += distX * speed;
    bubbleY += distY * speed;
    
    // Apply position with a small offset for more natural feel
    viewDemo.style.left = `${bubbleX + 10}px`;
    viewDemo.style.top = `${bubbleY - 10}px`;
    
    window.cursorAnimationFrame = requestAnimationFrame(animateBubble);
  };
  
  // Start animation loop
  window.cursorAnimationFrame = requestAnimationFrame(animateBubble);
  
  // Add event listeners to service items
  setTimeout(() => {
    const itemSelectors = ['.services-grid__item', '.portfolio-item'];
    
    itemSelectors.forEach(selector => {
      const items = document.querySelectorAll(selector);
      
      items.forEach(item => {
        item.addEventListener("mouseenter", () => {
          viewDemo.classList.add("active");
        });
        
        item.addEventListener("mouseleave", () => {
          viewDemo.classList.remove("active");
        });
      });
    });
  }, 300);
}

// Clean up cursor bubble animation
export function cleanupCursorBubbleAnimation() {
  if (typeof window === "undefined") return;
  
  // Remove the view demo bubble
  const viewDemo = document.querySelector('.view-demo');
  if (viewDemo && document.body.contains(viewDemo)) {
    document.body.removeChild(viewDemo);
  }
  
  // Cancel the animation frame
  if (window.cursorAnimationFrame) {
    cancelAnimationFrame(window.cursorAnimationFrame);
  }
}

// Cleanup function
export function cleanupServiciosAnimations(): void {
  if (typeof window === "undefined") return;

  console.log("⚠️ Cleaning up all servicios page animations");

  // Kill all ScrollTriggers
  scrollTriggerInstances.forEach((trigger) => {
    trigger.kill();
  });

  // Clear the array
  scrollTriggerInstances.length = 0;
  
  // Clear match media
  ScrollTrigger.clearMatchMedia();

  // Refresh ScrollTrigger
  refreshScrollTrigger();
}