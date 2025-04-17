import $ from "jquery";
import { gsap } from "gsap";

function hoverBtn() {
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

function initCardMouseParallax() {
  const cards = document.querySelectorAll(".team-section.card, .service-card");

  cards.forEach((card) => {
    const image = card.querySelector(".image") as HTMLElement;
    
    if (!image) return;

    $(card).mousemove(function (e: any) {
      const $this: any = $(card);
      const relX = e.pageX - $this.offset().left;
      const relY = e.pageY - $this.offset().top;

      gsap.to(image, {
        x: ((relX - $this.width() / 2) / $this.width()) * 40,
        y: ((relY - $this.height() / 2) / $this.height()) * 40,
        scale: 1.3,
        ease: "power2.out",
        duration: 2.5,
      });
    });

    $(card).mouseleave(function () {
      gsap.to(image, {
        x: 0,
        y: 0,
        scale: 1,
        ease: "power2.out",
        duration: 2,
      });
    });
  });
}

export { hoverBtn, initCardMouseParallax };