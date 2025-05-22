export function cursorBubbleAnimation() {
  if (typeof window === "undefined") return;

  // Create the cursor bubble
  const bubble = document.createElement("div");
  bubble.className = "cursor-bubble";
  bubble.innerHTML = "<span>Ver<br>Más</span>";
  document.body.appendChild(bubble);

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

    bubble.style.left = `${bubbleX + 10}px`;
    bubble.style.top = `${bubbleY - 10}px`;

    window.cursorAnimationFrame = requestAnimationFrame(animateBubble);
  };
  window.cursorAnimationFrame = requestAnimationFrame(animateBubble);

  // Configuration for different elements
  const elementConfig = [
    {
      selector: ".services-grid__item",
      text: "Ver<br>Más",
    },
    {
      selector: ".portfolio-item",
      text: "Ver<br>Más",
    },
    {
      selector: ".portfolio-cta__title",
      text: "Contacto",
    },
  ];

  setTimeout(() => {
    elementConfig.forEach(({ selector, text }) => {
      document.querySelectorAll(selector).forEach((item) => {
        item.addEventListener("mouseenter", () => {
          const spanElement = bubble.querySelector("span");
          if (spanElement) {
            spanElement.innerHTML = text;
          }
          bubble.classList.add("active");
        });

        item.addEventListener("mouseleave", () => {
          bubble.classList.remove("active");
        });
      });
    });
  }, 300);
}
