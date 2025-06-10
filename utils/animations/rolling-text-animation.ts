import { gsap } from "gsap";

let currentIndex = 0;
let container: HTMLElement | null = null;
let animationTimeline: gsap.core.Timeline | null = null;

const words = ["CREAMOS", "FABRICAMOS", "MONTAMOS", "DISEÑAMOS"];

export const initRollingTextAnimation = () => {
  const rollingTextElement = document.querySelector(
    ".hero-slider__rolling-text"
  );

  if (!rollingTextElement) return;

  container = rollingTextElement as HTMLElement;

  // Kill any existing animations
  gsap.killTweensOf(container);

  // Calculate the width needed for the longest word
  const calculateMaxWidth = () => {
    const tempSpan = document.createElement("span");
    tempSpan.style.visibility = "hidden";
    tempSpan.style.position = "absolute";
    tempSpan.style.fontSize = getComputedStyle(container!).fontSize;
    tempSpan.style.fontFamily = getComputedStyle(container!).fontFamily;
    tempSpan.style.fontWeight = getComputedStyle(container!).fontWeight;
    tempSpan.style.letterSpacing = getComputedStyle(container!).letterSpacing;

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

  // Return cleanup function
  return () => {
    gsap.killTweensOf(container);
    if (animationTimeline) {
      animationTimeline.kill();
    }
  };
};

// Expose function to trigger word change animation
export const animateToNextWord = (): Promise<void> => {
  return new Promise((resolve) => {
    if (!container) {
      resolve();
      return;
    }

    // Kill any existing animation
    if (animationTimeline) {
      animationTimeline.kill();
    }

    animationTimeline = gsap.timeline({
      onComplete: resolve,
    });

    animationTimeline
      .to(container, {
        rotationX: -90,
        duration: 0.6,
        ease: "power2.inOut",
        transformOrigin: "center center -100px",
      })
      .call(
        () => {
          currentIndex = (currentIndex + 1) % words.length;
          container!.textContent = words[currentIndex];
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
  });
};

// Function to get current word index (useful for syncing)
export const getCurrentWordIndex = () => currentIndex;

// Function to set specific word (useful for initial sync)
export const setWordIndex = (index: number) => {
  if (!container || index < 0 || index >= words.length) return;

  currentIndex = index;
  container.textContent = words[currentIndex];
};
