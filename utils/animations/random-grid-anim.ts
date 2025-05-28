import { gsap } from "gsap";

export function randomGridAnim(): void {
  if (typeof window === "undefined") return;

  const projectsGrid = document.querySelector(".mas-proyectos-grid");
  if (!projectsGrid) return;

  // Only animate initially visible items (first 6)
  const gridItems = projectsGrid.querySelectorAll(".item");

  if (gridItems.length === 0) return;

  // Set initial opacity to 0 for first 6 items
  gsap.set(gridItems, {
    opacity: 0,
  });

  // Reveal first 6 items with stagger
  gsap.to(gridItems, {
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
