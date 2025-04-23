import { gsap } from "gsap";
import $ from "jquery";
import { ScrollTrigger } from "@/plugins";

function panelOneAnimation() {
  let pp = gsap.matchMedia();
  pp.add("(min-width: 1200px)", () => {
    const panelsSections: any = gsap.utils.toArray(".panels");
    for (var i = 0; i < panelsSections.length; i++) {
      const thePanelsSection = panelsSections[i];
      const panels = gsap.utils.toArray(
        ".panels-container .panel",
        thePanelsSection
      );
      const panelsContainer =
        thePanelsSection.querySelector(".panels-container");

      gsap.set(panelsContainer, { height: window.innerHeight });
      gsap.set(panels, { height: window.innerHeight });

      let totalPanelsWidth = 0;
      panels.forEach(function (panel) {
        if (panel) {
          totalPanelsWidth += $(panel).width() ?? 0;
        }
      });

      gsap.set(panelsContainer, { width: totalPanelsWidth });
      gsap.to(panels, {
        x: -totalPanelsWidth + innerWidth,
        ease: "none",
        scrollTrigger: {
          trigger: panelsContainer,
          pin: true,
          start: "top 140",
          scrub: 1,
          end: (st: any) => "+=" + (st.vars.trigger.offsetWidth - innerWidth),
        },
      });
    }
  });

  //
  let pj = gsap.matchMedia();
  pj.add("(min-width: 992px)", () => {
    if (document.querySelector(".project-2-area")) {
      let sections = gsap.utils.toArray(".project-2-area");
      let listItem = gsap.utils.toArray(".project");
      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          markers: false,
          start: "bottom 115%",
          end: "bottom -100%",
          toggleClass: { targets: listItem[index], className: "addclass" },
        });
      });
    }
  });
}

// PORTFOLIO TWO ANIMATION - FIXED VERSION
function panelTwoAnimation() {
  // Clean up existing ScrollTrigger instances related to panels to prevent glitches
  ScrollTrigger.getAll().forEach((trigger: any) => {
    if (trigger.vars && trigger.vars.trigger && 
        (trigger.vars.trigger.classList.contains('project-panel') || 
         trigger.vars.trigger.classList.contains('project-panel-area'))) {
      trigger.kill();
    }
  });
  
  // Use matchMedia for responsive behavior
  let pr = gsap.matchMedia();
  
  pr.add("(min-width: 768px)", () => {
    // Query the panels after media match to ensure DOM is ready
    let projectPanels = gsap.utils.toArray('.project-panel');
    
    if (projectPanels.length === 0) {
      console.warn("No project panels found");
      return;
    }
    
    // Create a new timeline for each execution to prevent conflicts
    let tl = gsap.timeline();
    
    // Get the project panel area for endTrigger
    const projectPanelArea = document.querySelector('.project-panel-area');
    if (!projectPanelArea) {
      console.warn("Project panel area not found");
      return;
    }
    
    // Force a small delay to ensure layout is complete
    gsap.delayedCall(0.1, () => {
      // Set up each panel individually
      projectPanels.forEach((panel:any, index) => {
        // Set explicit height to ensure consistency
        gsap.set(panel, { height: "100vh" });
        
        // Create animation for each panel
        tl.to(panel, {
          scrollTrigger: {
            id: `panel-trigger-${index}`,
            trigger: panel,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: "bottom 100%",
            endTrigger: projectPanelArea,
            pinSpacing: false,
            markers: false,
            onEnter: () => console.log(`Panel ${index+1} entered`),
            onLeaveBack: () => console.log(`Panel ${index+1} left backwards`),
            onRefresh: (self: any) => {
              // Ensure pin is properly set up on refresh
              self.pin = true;
            }
          } as any,
        });
      });
    });
  });
}


function studioPanel() {
  let pp_2 = gsap.matchMedia();
  pp_2.add("(min-width: 1200px)", () => {

    const panelsSectionss = gsap.utils.toArray(".panels-2");
    for (let i = 0; i < panelsSectionss.length; i++) {

      const thePanelsSection:any  = panelsSectionss[i];
      const panels = gsap.utils.toArray(".panels-container-2 .panel-2", thePanelsSection);
      const panelsContainer = thePanelsSection.querySelector(".panels-container-2");

      gsap.set(panelsContainer, { height: window.innerHeight });
      gsap.set(panels, { height: window.innerHeight });

      let totalPanelsWidth = 0;
      panels.forEach(function (panel) {
        totalPanelsWidth += $(panel as HTMLElement).width() ?? 0;
      });


      gsap.set(panelsContainer, { width: totalPanelsWidth });
      let scrollTween = gsap.to(panels, {
        x: - totalPanelsWidth + innerWidth,
        ease: "none",
        scrollTrigger: {
          trigger: panelsContainer,
          pin: true,
          pinSpacing: true,
          start: "top 0",
          scrub: 1,
          end: (st) => "+=" + totalPanelsWidth,
        }
      });

      const services_items = gsap.utils.toArray(".studio-service-item");

      services_items.forEach(function (item: any) {
        gsap.to(item, {
          marginLeft: '0',
          scrollTrigger: {
            trigger: '.studio-service-area',
            containerAnimation: scrollTween,
            start: "left center",
            end: "400px 200px",
            scrub: .5,
          }
        })
      });
    }

  });
}


function servicePanel() {
  const sv = gsap.matchMedia();
  const tl = gsap.timeline();
  sv.add("(min-width: 991px)", () => {
    const projectpanelss = document.querySelectorAll('.project-panel-2')
    projectpanelss.forEach((section) => {
      tl.to(section, {
        scrollTrigger: {
          trigger: section,
          pin: section,
          scrub: 1,
          start: 'top top',
          end: "bottom 100%",
          endTrigger: '.project-panel-area-2',
          pinSpacing: false,
          markers: false,
        },
      })
    })

  });
}


// Function to clean up all ScrollTrigger instances
function clearScrollTriggers() {
  if (ScrollTrigger) {
    ScrollTrigger.getAll().forEach((trigger: { kill: () => any; }) => trigger.kill());
  }
}


export { panelOneAnimation, panelTwoAnimation, studioPanel, servicePanel, clearScrollTriggers };