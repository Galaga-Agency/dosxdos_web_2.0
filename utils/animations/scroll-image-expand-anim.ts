import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";
gsap.registerPlugin(ScrollTrigger);

export function scrollImageExpandAnimation() {
  const pd = gsap.matchMedia();
  const area = document.querySelector(".diseno-interiores-process__image-area");
  const wrapper = document.querySelector(
    ".diseno-interiores-process__image-wrapper"
  );

  if (!area || !wrapper) return;

  pd.add("(min-width: 768px)", () => {
    gsap.set(wrapper, {
      width: "40vw",
      height: "100vh",
      margin: "0 auto",
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: area,
          start: "top top",
          end: "bottom 50%",
          scrub: 1,
          pin: area,
          pinSpacing: true,
          markers: false,
        },
      })
      .to(wrapper, {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        ease: "power2.out",
      });
  });

  // mobile version - no animation
  pd.add("max-width: 767px", () => {
    gsap.set(wrapper, {
      width: "100vw",
      height: "100vh",
      margin: "0 auto",
    });
  });
}
