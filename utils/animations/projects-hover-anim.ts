export function projectHoverAnim(): void {
  if (typeof window === "undefined") return;

  // Skip on desktop - only run on mobile
  if (window.innerWidth >= 768) return;

  const projectItems = document.querySelectorAll(
    ".servicios-recent-projects__item"
  );

  if (projectItems.length === 0) {
    console.log("No project items found");
    return;
  }

  // Create an Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Get the elements we want to animate
        const item = entry.target;
        const infoElement = item.querySelector(
          ".servicios-recent-projects__hover-info"
        );
        const labelElement = item.querySelector(
          ".servicios-recent-projects__label"
        );
        const titleElement = item.querySelector(
          ".servicios-recent-projects__project-title"
        );

        if (!infoElement || !labelElement || !titleElement) return;

        if (entry.isIntersecting) {
          console.log("Item in view:", item);
          // When the item is in the viewport
          infoElement.classList.add("info-visible");
          labelElement.classList.add("label-visible");
          titleElement.classList.add("title-visible");
        } else {
          console.log("Item out of view:", item);
          // When the item is out of the viewport
          infoElement.classList.remove("info-visible");
          labelElement.classList.remove("label-visible");
          titleElement.classList.remove("title-visible");
        }
      });
    },
    {
      threshold: 0.5, // Trigger when 50% of the item is visible
      rootMargin: "0px",
    }
  );

  // Observe all project items
  projectItems.forEach((item) => {
    observer.observe(item);
    console.log("Observing item:", item);
  });
}

export default { projectHoverAnim };
