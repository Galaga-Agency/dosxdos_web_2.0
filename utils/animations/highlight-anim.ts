import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";

gsap.registerPlugin(ScrollTrigger);

export const highlightAnimation = (delay: number = 0.5) => {
  const highlights = document.querySelectorAll(".highlight");

  highlights.forEach((highlight: any) => {
    gsap.fromTo(
      highlight,
      {
        "--highlight-scaleX": "0",
      },
      {
        "--highlight-scaleX": "1",
        duration: 0.8,
        delay: delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: highlight,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
};
