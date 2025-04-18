"use client";

import { useEffect } from "react";
import gsap from "gsap";
import "./Loading.scss";

export default function Loading() {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Animation for bounce effect
    const elements = document.querySelectorAll(".bounce-item");
    const tl = gsap.timeline({ repeat: -1 });

    elements.forEach((el, i) => {
      tl.to(
        el,
        {
          y: -12,
          duration: 0.4,
          ease: "sine.inOut",
        },
        i * 0.12
      ).to(
        el,
        {
          y: 0,
          duration: 0.4,
          ease: "sine.inOut",
        },
        i * 0.12 + 0.4
      );
    });

    // Add subtle rotation animation to the decorative elements
    gsap.to(".loading__decor-circle", {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });

    // Clean up function
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="loading">
      {/* Decorative elements */}
      <div className="loading__decor-circle"></div>
      <div className="loading__decor-square"></div>
      <div className="loading__decor-line"></div>
      <div className="loading__decor-dots"></div>
      
      <div className="loading__container">
        <div className="loading__line">
          <div className="loading__svg-block">
            <svg
              className="loading__icon bounce-item"
              viewBox="0 0 951 951"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0,951) scale(0.1,-0.1)"
                fill="#281528"
                stroke="none"
              >
                <path d="M895 6862 c-49 -23 -79 -55 -100 -104 -12 -30 -15 -83 -15 -280 0 -282 3 -291 91 -373 30 -28 413 -363 851 -744 698 -607 798 -698 798 -722 0 -24 -105 -119 -847 -763 -467 -404 -857 -750 -868 -768 -19 -31 -20 -51 -20 -305 l0 -271 30 -43 c17 -23 48 -51 70 -63 47 -24 127 -27 167 -5 27 15 2077 1790 2185 1892 38 36 70 78 85 110 21 48 23 65 23 222 0 165 -1 171 -27 220 -14 28 -44 66 -65 86 -115 110 -2182 1903 -2203 1911 -48 20 -113 20 -155 0z" />
              </g>
            </svg>

            <svg
              className="loading__icon bounce-item"
              viewBox="0 0 951 951"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0,951) scale(0.1,-0.1)"
                fill="#281528"
                stroke="none"
              >
                <path d="M8275 8386 c-16 -8 -165 -134 -330 -281 -228 -202 -306 -277 -325 -313 l-25 -46 -3 -753 -3 -753 -33 0 c-25 0 -38 7 -50 24 -28 44 -187 205 -265 270 -316 261 -678 386 -1123 386 -948 0 -1661 -496 -1942 -1350 -52 -160 -89 -331 -111 -530 -22 -185 -16 -640 9 -825 87 -621 325 -1110 701 -1438 355 -311 778 -457 1317 -457 336 1 597 63 892 213 216 110 402 272 551 482 59 84 71 96 94 93 l26 -3 8 -240 c4 -132 11 -287 15 -345 l7 -105 370 0 370 0 -3 90 c-1 50 -6 1383 -10 2962 l-7 2873 -25 24 c-32 32 -68 39 -105 22z m-1713 -2065 c189 -41 331 -101 481 -204 276 -188 454 -476 519 -837 18 -101 21 -169 25 -570 6 -535 -3 -734 -43 -890 -143 -567 -637 -909 -1314 -910 -527 0 -928 254 -1160 735 -86 179 -145 390 -181 655 -21 149 -18 635 4 780 48 310 128 530 266 736 200 300 479 470 866 528 17 2 122 3 235 1 162 -3 225 -8 302 -24z" />
              </g>
            </svg>
          </div>
          <span className="dot bounce-item"></span>
          <span className="dot bounce-item"></span>
          <span className="dot bounce-item"></span>
        </div>
        
        <div className="loading__line-decor"></div>
      </div>
    </div>
  );
}