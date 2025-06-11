export function cursorBubbleAnimation(): () => void {
  if (typeof window === "undefined") return () => {};

  // Check if bubble already exists and remove it
  const existingBubble = document.querySelector(".cursor-bubble");
  if (existingBubble) {
    existingBubble.remove();
  }

  // Cancel any existing animation frame
  if (window.cursorAnimationFrame) {
    cancelAnimationFrame(window.cursorAnimationFrame);
  }

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
  const handleMouseMove = (e: MouseEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  document.addEventListener("mousemove", handleMouseMove);

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
    {
      selector: ".consultoria-cta__title",
      text: "Ponte en contacto",
    },
    {
      selector: ".montaje-mantenimiento-cta__title",
      text: "Ponte en contacto",
    },
    {
      selector: ".eventos-cta__title",
      text: "Ponte en contacto",
    },
  ];

  // Store event listeners for cleanup
  const eventListeners: Array<{
    element: Element;
    type: string;
    handler: EventListener;
  }> = [];

  const setupEventListeners = () => {
    elementConfig.forEach(({ selector, text }) => {
      document.querySelectorAll(selector).forEach((item) => {
        const mouseEnterHandler = () => {
          const spanElement = bubble.querySelector("span");
          if (spanElement) {
            spanElement.innerHTML = text;
          }
          bubble.classList.add("active");
        };

        const mouseLeaveHandler = () => {
          bubble.classList.remove("active");
        };

        item.addEventListener("mouseenter", mouseEnterHandler);
        item.addEventListener("mouseleave", mouseLeaveHandler);

        // Store for cleanup
        eventListeners.push(
          { element: item, type: "mouseenter", handler: mouseEnterHandler },
          { element: item, type: "mouseleave", handler: mouseLeaveHandler }
        );
      });
    });
  };

  setTimeout(setupEventListeners, 300);

  // Return cleanup function
  return () => {
    // Remove event listeners
    eventListeners.forEach(({ element, type, handler }) => {
      element.removeEventListener(type, handler);
    });

    // Remove mouse move listener
    document.removeEventListener("mousemove", handleMouseMove);

    // Cancel animation frame
    if (window.cursorAnimationFrame) {
      cancelAnimationFrame(window.cursorAnimationFrame);
      window.cursorAnimationFrame = undefined;
    }

    // Remove bubble from DOM
    if (bubble && bubble.parentNode) {
      bubble.parentNode.removeChild(bubble);
    }
  };
}
