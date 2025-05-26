import { gsap } from "gsap";

export function randomGridAnim(): void {
  if (typeof window === "undefined") return;

  const projectsGrid = document.querySelector(".mas-proyectos-grid");
  if (!projectsGrid) return;

  // Only animate initially visible items (first 6)
  const gridItems = projectsGrid.querySelectorAll(".item");
  const initialItems = Array.from(gridItems).slice(0, 6);

  if (initialItems.length === 0) return;

  // Set initial opacity to 0 for first 6 items
  gsap.set(initialItems, {
    opacity: 0,
  });

  // Reveal first 6 items with stagger
  gsap.to(initialItems, {
    opacity: 1,
    stagger: 0.1,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: projectsGrid,
      start: "top 85%",
    },
  });
}
