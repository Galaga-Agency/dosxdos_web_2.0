import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";

function imageRevealAnimation() {
  if (typeof window === "undefined") return;

  const imgRevealElements = document.querySelectorAll(".img_reveal");
  if (imgRevealElements.length === 0) return;

  imgRevealElements.forEach((imgReveal) => {
    const image = imgReveal.querySelector("img");
    const overlay = imgReveal.querySelector(".img_reveal__overlay");
    const gridItem = imgReveal.closest(".services-grid__item");
    const content = gridItem?.querySelector(".services-grid__content");

    if (!image) return;

    // Initially hide overlay and content
    if (overlay) gsap.set(overlay, { autoAlpha: 0 });
    if (content) gsap.set(content, { autoAlpha: 0 });

    const tl = gsap.timeline({
      scrollTrigger: ScrollTrigger.create({
        trigger: imgReveal,
        start: "top 70%",
      }),
    });

    // Keep your original animation
    tl.set(imgReveal, { autoAlpha: 1 })
      .from(imgReveal, {
        duration: 1.5,
        xPercent: -100,
        ease: "power2.out",
      })
      .from(image, {
        duration: 1.5,
        xPercent: 100,
        scale: 1.5,
        delay: -1.5,
        ease: "power2.out",
      });

    // After main animation completes, show overlay and content
    if (overlay) {
      tl.to(overlay, {
        autoAlpha: 1,
        duration: 0.3,
      });
    }

    if (content) {
      tl.to(
        content,
        {
          autoAlpha: 1,
          duration: 0.3,
        },
        "-=0.1"
      ); // Slightly overlap with overlay animation
    }
  });
}

export { imageRevealAnimation };
