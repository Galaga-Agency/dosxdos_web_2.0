import { gsap } from "gsap";
import $ from "jquery";
import { SplitText } from "@/plugins";

// Helper function to check if fonts are ready
function waitForFonts(): Promise<void> {
  return new Promise((resolve) => {
    // Check if fonts are already loaded
    if (
      document.fonts.check('600 1rem "Big Shoulders Display"') &&
      document.fonts.check('400 1rem "Sarabun"')
    ) {
      resolve();
      return;
    }

    // Load fonts and wait
    Promise.all([
      document.fonts.load('600 1rem "Big Shoulders Display"'),
      document.fonts.load('700 1rem "Big Shoulders Display"'),
      document.fonts.load('400 1rem "Sarabun"'),
    ])
      .then(() => {
        document.fonts.ready.then(() => {
          resolve();
        });
      })
      .catch(() => {
        // Fallback timeout
        setTimeout(resolve, 1000);
      });
  });
}

function charAnimation(current?: any) {
  // If a specific element is passed, only animate that
  if (current) {
    const splitTextLine = current;

    // Wait for fonts before doing anything
    waitForFonts().then(() => {
      gsap.set(splitTextLine, {
        visibility: "hidden",
        opacity: 0,
        perspective: 300,
      });

      const itemSplitted = new SplitText(splitTextLine, {
        type: "chars, words",
      });

      gsap.set(splitTextLine, { visibility: "visible" });

      const tl = gsap.timeline();
      tl.from(itemSplitted.chars, {
        duration: 1,
        x: 100,
        autoAlpha: 0,
        stagger: 0.05,
      });
    });

    return;
  }

  // Original behavior for multiple elements - BUT wait for fonts first
  waitForFonts().then(() => {
    let char_come = gsap.utils.toArray(".char-animation");
    char_come.forEach((splitTextLine: any) => {
      gsap.set(splitTextLine, {
        visibility: "hidden",
        opacity: 0,
        perspective: 300,
      });

      const itemSplitted = new SplitText(splitTextLine, {
        type: "chars, words",
      });

      gsap.set(splitTextLine, { visibility: "visible", opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: splitTextLine,
          start: "top 90%",
          end: "bottom 60%",
          scrub: false,
          markers: false,
          toggleActions: "play none none none",
        },
      });

      tl.from(itemSplitted.chars, {
        duration: 1,
        x: 100,
        autoAlpha: 0,
        stagger: 0.05,
      });
    });
  });
}


function rollUpTextAnimation() {
  if ($(".rollup-text").length > 0) {
    let splitTitleLines = gsap.utils.toArray(".rollup-text");
    splitTitleLines.forEach((splitTextLine: any) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: splitTextLine,
          start: "top 90%",
          end: "bottom 60%",
          scrub: false,
          markers: false,
          toggleActions: "play none none none",
        },
      });

      const itemSplitted = new SplitText(splitTextLine, {
        type: "words, lines",
      });
      gsap.set(splitTextLine, {
        perspective: 400,
        opacity: 1,
        visibility: "visible",
      });
      itemSplitted.split({ type: "lines" });
      tl.from(itemSplitted.lines, {
        duration: 1,
        delay: 1.2,
        opacity: 0,
        rotationX: -80,
        force3D: true,
        transformOrigin: "top center -50",
        stagger: 0.1,
      });
    });
  }
}

export {
  charAnimation,
  rollUpTextAnimation,
  waitForFonts,
};
