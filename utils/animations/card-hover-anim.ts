import $ from "jquery";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Keep track of current animations
let currentAnimations = new Map();

export function hoverBtn() {
  $(".hover-btn").on("mouseenter", function (e: any) {
    let x = e.pageX - $(this).offset()!.left;
    let y = e.pageY - $(this).offset()!.top;

    $(this).find(".btn-circle-dot").css({
      top: y,
      left: x,
    });
  });

  $(".hover-btn").on("mouseout", function (e: any) {
    let x = e.pageX - $(this).offset()!.left;
    let y = e.pageY - $(this).offset()!.top;

    $(this).find(".btn-circle-dot").css({
      top: y,
      left: x,
    });
  });

  const hoverBtns = gsap.utils.toArray(".hover-btn-wrapper");
  const hoverBtnItem: any = gsap.utils.toArray(".hover-btn-item");

  hoverBtns.forEach((btn: any, i) => {
    $(btn).mousemove(function (e) {
      callParallax(e);
    });

    function callParallax(e: any) {
      parallaxIt(e, hoverBtnItem[i], 60);
    }

    function parallaxIt(e: any, target: any, movement: any) {
      const $this: any = $(btn);
      const relX = e.pageX - $this.offset().left;
      const relY = e.pageY - $this.offset().top;

      gsap.to(target, {
        x: ((relX - $this.width() / 2) / $this.width()) * movement,
        y: ((relY - $this.height() / 2) / $this.height()) * movement,
        ease: "power2.out",
        duration: 1,
      });
    }

    $(btn).mouseleave(function (e) {
      gsap.to(hoverBtnItem[i], {
        x: 0,
        y: 0,
        ease: "power2.out",
        duration: 1,
      });
    });
  });
}

// Complete rewrite for card animation
export function initCardMouseParallax() {
  // First remove all existing event listeners
  $('.hover-card, .team-section.card, .service-card').off('mouseenter mousemove mouseleave');
  
  // Kill all existing tweens
  gsap.killTweensOf('.image');
  
  // Reset all images to their default state
  gsap.set('.image', { x: 0, y: 0, scale: 1.2 });
  
  // Now add new event listeners directly with jQuery
  $('.hover-card, .team-section.card, .service-card').each(function() {
    const card: any = $(this);
    const image = card.find('.image');
    
    // Only once, on mouse enter
    card.on('mouseenter', function() {
      gsap.to(image, {
        duration: 0.6,
        ease: "power2.out"
      });
    });
    
    // Continuously on mouse move
    card.on('mousemove', function(e: any) {
      const relX = e.pageX - card.offset().left;
      const relY = e.pageY - card.offset().top;
      
      gsap.to(image, {
        x: ((relX - card.width() / 2) / card.width()) * 40,
        y: ((relY - card.height() / 2) / card.height()) * 40,
        duration: 1,
        ease: "power2.out",
        overwrite: "auto" // Important to prevent multiple animations
      });
    });
    
    // On mouse leave
    card.on('mouseleave', function() {
      gsap.to(image, {
        x: 0,
        y: 0,
        scale: 1.2,
        duration: 0.6,
        ease: "power2.out",
        overwrite: true // Force overwrite any running animation
      });
    });
  });
}