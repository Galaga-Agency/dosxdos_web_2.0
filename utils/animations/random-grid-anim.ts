import { gsap } from "gsap";

export function randomGridAnim(): void {
  if (typeof window === "undefined") return;

  const projectsGrid = document.querySelector(".mas-proyectos-grid");
  if (!projectsGrid) return;

  const gridItems = projectsGrid.querySelectorAll(".item");
  if (gridItems.length === 0) return;

  // Set initial opacity to 0
  gsap.set(gridItems, {
    opacity: 0,
  });

  // Reveal with stagger
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
