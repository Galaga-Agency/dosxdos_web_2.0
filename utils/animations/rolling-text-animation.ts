import { gsap } from "gsap";

export const initRollingTextAnimation = () => {
  const rollingTextElement = document.querySelector(
    ".hero-slider__rolling-text"
  );

  if (!rollingTextElement) return;

  const words = ["CREAMOS", "FABRICAMOS", "MONTAMOS", "DISEÑAMOS"];
  let currentIndex = 0;
  let intervalId: NodeJS.Timeout;

  const container = rollingTextElement as HTMLElement;

  // Kill any existing animations
  gsap.killTweensOf(container);

  // Calculate the width needed for the longest word
  const calculateMaxWidth = () => {
    const tempSpan = document.createElement("span");
    tempSpan.style.visibility = "hidden";
    tempSpan.style.position = "absolute";
    tempSpan.style.fontSize = getComputedStyle(container).fontSize;
    tempSpan.style.fontFamily = getComputedStyle(container).fontFamily;
    tempSpan.style.fontWeight = getComputedStyle(container).fontWeight;
    tempSpan.style.letterSpacing = getComputedStyle(container).letterSpacing;

    document.body.appendChild(tempSpan);

    let maxWidth = 0;
    words.forEach((word) => {
      tempSpan.textContent = word;
      maxWidth = Math.max(maxWidth, tempSpan.offsetWidth);
    });

    document.body.removeChild(tempSpan);
    return maxWidth;
  };

  // Set fixed width based on longest word
  const maxWidth = calculateMaxWidth();
  container.style.width = `${maxWidth}px`;
  container.style.textAlign = "left";
  container.textContent = words[currentIndex];

  // Set initial 3D properties
  gsap.set(container.parentElement, {
    perspective: 1000,
  });

  gsap.set(container, {
    transformStyle: "preserve-3d",
    rotationX: 0,
    transformOrigin: "center center -100px",
  });

  const animateWord = () => {
    const tl = gsap.timeline();

    tl.to(container, {
      rotationX: -90,
      duration: 0.6,
      ease: "power2.inOut",
      transformOrigin: "center center -100px",
    })
      .call(
        () => {
          currentIndex = (currentIndex + 1) % words.length;
          container.textContent = words[currentIndex];
        },
        [],
        0.3
      )
      .set(
        container,
        {
          rotationX: 90,
          transformOrigin: "center center -100px",
        },
        0.3
      )
      .to(
        container,
        {
          rotationX: 0,
          duration: 0.6,
          ease: "power2.inOut",
          transformOrigin: "center center -100px",
        },
        0.3
      );
  };

  // Start the rolling animation after a delay to let the initial animation complete
  const startRolling = () => {
    intervalId = setInterval(animateWord, 3500);
  };

  // Delay the start of rolling text to avoid conflicts
  gsap.delayedCall(2, startRolling);

  // Return cleanup function
  return () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    gsap.killTweensOf(container);
  };
};
