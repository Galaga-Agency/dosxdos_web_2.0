import { gsap } from "gsap";
import $ from "jquery";
import { ScrollTrigger } from "@/plugins";

// PORTFOLIO TWO ANIMATION
function panelTwoAnimation() {
  let pr = gsap.matchMedia();
  pr.add("(min-width: 768px)", () => {
    let tl = gsap.timeline();
    let projectPanels = document.querySelectorAll(".project-panel");
    // if (projectPanels.length > 0) {
    projectPanels.forEach((section) => {
      tl.to(section, {
        scrollTrigger: {
          trigger: section,
          pin: section,
          scrub: 1,
          start: "top top",
          end: "bottom 100%",
          endTrigger: ".project-panel-area",
          pinSpacing: false,
          markers: false,
        },
      });
    });
    // }
  });
}

function servicePanel() {
  const sv = gsap.matchMedia();
  const tl = gsap.timeline();
  sv.add("(min-width: 991px)", () => {
    const projectpanelss = document.querySelectorAll(".project-panel");
    projectpanelss.forEach((section) => {
      tl.to(section, {
        scrollTrigger: {
          trigger: section,
          pin: section,
          scrub: 1,
          start: "top top",
          end: "bottom 100%",
          endTrigger: ".project-panel-area",
          pinSpacing: false,
          markers: false,
        },
      });
    });
  });
}

export { panelTwoAnimation, servicePanel };
