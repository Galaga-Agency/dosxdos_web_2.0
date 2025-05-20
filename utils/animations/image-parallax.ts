import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";

function imageParallax() {
  const containers = document.querySelectorAll(".parallax-container");
  const inners = document.querySelectorAll(".parallax-inner");

  if (containers.length > 0 && inners.length > 0) {
    containers.forEach((container, index) => {
      if (inners[index]) {
        const containerElement = container as HTMLDivElement;
        const innerElement = inners[index] as HTMLDivElement;

        // Prepare inner element with scale to prevent white edges
        gsap.set(innerElement, {
          scale: 1.25, // Increased scale for larger movement
          transformOrigin: "center center",
        });

        // Create a proxy object to track scroll progress
        const proxy = { progress: 0 };

        // Main ScrollTrigger to track scroll position
        ScrollTrigger.create({
          trigger: containerElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 3, // Much higher scrub value for ultra-smooth movement
          onUpdate: (self: any) => {
            // Update proxy value
            gsap.to(proxy, {
              progress: self.progress,
              duration: 0.6, // Longer duration for smoother updating
              overwrite: "auto",
              ease: "sine.out", // Very subtle easing
              onUpdate: () => {
                // Apply smooth movement to container
                gsap.set(containerElement, {
                  y: proxy.progress * (window.innerWidth < 768 ? 0 : -150),
                });

                // Apply stronger movement to inner element
                gsap.set(innerElement, {
                  y: proxy.progress * -150,
                });
              },
            });
          },
        });
      }
    });

    // Force refresh for immediate effect
    setTimeout(() => {
      if ((window as any).__smoother__) {
        (window as any).__smoother__.refresh();
      }
      ScrollTrigger.refresh();
    }, 100);
  }
}

export { imageParallax };
