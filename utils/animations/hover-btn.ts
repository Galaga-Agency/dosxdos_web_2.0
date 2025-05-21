// ts-ignore
// @ts-nocheck

import $ from "jquery";
import { gsap, Power2 } from "gsap";

function hoverCircleButtonAnimation() {
  $('.hover-circle-button').on('mouseenter mouseout', function (e) {
    const dot = $(this).find('.hover-circle-button__dot');
    const offset = $(this).offset();
    const x = e.pageX - offset.left;
    const y = e.pageY - offset.top;

    dot.css({ top: y, left: x });
  });

  const wrappers = gsap.utils.toArray(".hover-circle-button__wrapper");
  const items = gsap.utils.toArray(".hover-circle-button__item");

  wrappers.forEach((wrapper, i) => {
    $(wrapper).mousemove(function (e) {
      const relX = e.pageX - $(wrapper).offset().left;
      const relY = e.pageY - $(wrapper).offset().top;
      gsap.to(items[i], {
        x: ((relX - $(wrapper).width() / 2) / $(wrapper).width()) * 60,
        y: ((relY - $(wrapper).height() / 2) / $(wrapper).height()) * 60,
        ease: Power2.easeOut,
        duration: 1,
      });
    });

    $(wrapper).mouseleave(() => {
      gsap.to(items[i], {
        x: 0,
        y: 0,
        ease: Power2.easeOut,
        duration: 1,
      });
    });
  });
}

function cleanupHoverCircleButton() {
  gsap.killTweensOf(".hover-circle-button__item");
  $(".hover-circle-button").off();
  $(".hover-circle-button__wrapper").off();
}

export { hoverCircleButtonAnimation, cleanupHoverCircleButton };