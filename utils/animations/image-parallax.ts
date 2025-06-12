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
        const isMobile = window.innerWidth < 768;

        // Only apply parallax effects on desktop
        if (!isMobile) {
          // Prepare inner element with scale to prevent white edges
          gsap.set(innerElement, {
            scale: 1.25,
            transformOrigin: "center center",
          });

          // Create a proxy object to track scroll progress
          const proxy = { progress: 0 };

          // Main ScrollTrigger to track scroll position
          ScrollTrigger.create({
            trigger: containerElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 3,
            onUpdate: (self: any) => {
              gsap.to(proxy, {
                progress: self.progress,
                duration: 0.6,
                overwrite: "auto",
                ease: "sine.out",
                onUpdate: () => {
                  // Apply movement to container
                  gsap.set(containerElement, {
                    y: proxy.progress * -150,
                  });

                  // Apply movement to inner element
                  gsap.set(innerElement, {
                    y: proxy.progress * -150,
                  });
                },
              });
            },
          });
        } else {
          // Mobile: reset any transforms and ensure static positioning
          gsap.set(containerElement, {
            y: 0,
            transform: "none",
          });

          gsap.set(innerElement, {
            y: 0,
            scale: 1,
            transform: "none",
          });
        }
      }
    });

    // Force refresh
    setTimeout(() => {
      if ((window as any).__smoother__) {
        (window as any).__smoother__.refresh();
      }
      ScrollTrigger.refresh();
    }, 100);
  }
}

export { imageParallax };
