export function cursorBubbleAnimation() {
  if (typeof window === "undefined") return;

  // Create the viewDemo bubble
  const viewDemo = document.createElement("div");
  viewDemo.className = "view-demo";
  viewDemo.innerHTML = "<span>Ver<br>Más</span>";
  document.body.appendChild(viewDemo);

  // Variables for smooth following
  let mouseX = 0,
    mouseY = 0,
    bubbleX = 0,
    bubbleY = 0;

  // Handle mouse movement
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Animate bubble with requestAnimationFrame
  const animateBubble = () => {
    const speed = 0.15;
    bubbleX += (mouseX - bubbleX) * speed;
    bubbleY += (mouseY - bubbleY) * speed;

    viewDemo.style.left = `${bubbleX + 10}px`;
    viewDemo.style.top = `${bubbleY - 10}px`;

    window.cursorAnimationFrame = requestAnimationFrame(animateBubble);
  };
  window.cursorAnimationFrame = requestAnimationFrame(animateBubble);

  // Add hover events
  setTimeout(() => {
    [".services-grid__item", ".portfolio-item"].forEach((selector) => {
      document.querySelectorAll(selector).forEach((item) => {
        item.addEventListener("mouseenter", () =>
          viewDemo.classList.add("active")
        );
        item.addEventListener("mouseleave", () =>
          viewDemo.classList.remove("active")
        );
      });
    });
  }, 300);
}

