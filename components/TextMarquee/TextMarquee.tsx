"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import "./TextMarquee.scss";

interface TextMarqueeProps {
  text: string;
  speed?: number;
  className?: string;
}

const TextMarquee: React.FC<TextMarqueeProps> = ({
  text,
  speed = 50,
  className = "",
}) => {
  return (
    <div className={`text-marquee ${className}`}>
      <Marquee
        speed={speed}
        gradient={false}
        pauseOnHover={false}
        autoFill={true}
        direction="right"
      >
        <span className="marquee-text">
          {text}&nbsp;<span className="dot">•</span>&nbsp;
        </span>
      </Marquee>
    </div>
  );
};

export default TextMarquee;
