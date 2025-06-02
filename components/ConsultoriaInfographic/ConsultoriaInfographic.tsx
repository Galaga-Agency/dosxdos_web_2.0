"use client";

import React from "react";
import { BiAnalyse } from "react-icons/bi";
import { TbCalendarTime } from "react-icons/tb";
import { RiPlantLine } from "react-icons/ri";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { LuLaptopMinimalCheck } from "react-icons/lu";

import "./ConsultoriaInfographic.scss";

interface ConsultoriaInfographicProps {
  activeIndex: number | null;
  /** Only used internally for the SVG viewBox; sizing is handled via CSS */
  size?: number;
}

const ConsultoriaInfographic: React.FC<ConsultoriaInfographicProps> = ({
  activeIndex,
  size = 320,
}) => {
  const rOuter = size / 2;
  const ringThickness = 36;
  const rInner = rOuter - ringThickness;
  const cx = rOuter;
  const cy = rOuter;

  // Precompute each slice's SVG path (size-based), same as before:
  const slicePaths = Array.from({ length: 5 }).map((_, i) => {
    const startAngle = ((i * 72 - 90) * Math.PI) / 180;
    const endAngle = (((i + 1) * 72 - 90) * Math.PI) / 180;

    const x1 = cx + rOuter * Math.cos(startAngle);
    const y1 = cy + rOuter * Math.sin(startAngle);
    const x2 = cx + rOuter * Math.cos(endAngle);
    const y2 = cy + rOuter * Math.sin(endAngle);

    const x3 = cx + rInner * Math.cos(endAngle);
    const y3 = cy + rInner * Math.sin(endAngle);
    const x4 = cx + rInner * Math.cos(startAngle);
    const y4 = cy + rInner * Math.sin(startAngle);

    return `
      M ${x1.toFixed(2)} ${y1.toFixed(2)}
      A ${rOuter} ${rOuter} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}
      L ${x3.toFixed(2)} ${y3.toFixed(2)}
      A ${rInner} ${rInner} 0 0 0 ${x4.toFixed(2)} ${y4.toFixed(2)}
      Z
    `;
  });

  // Compute percentage‐based positions for icons and labels:
  const rMid = (rOuter + rInner) / 2;

  const iconPositionsPct = Array.from({ length: 5 }).map((_, i) => {
    const bisector = ((i * 72 - 90 + 36) * Math.PI) / 180;
    const px = cx + rMid * Math.cos(bisector);
    const py = cy + rMid * Math.sin(bisector);
    return {
      left: (px / size) * 100,
      top: (py / size) * 100,
    };
  });

  const labelPositionsPct = Array.from({ length: 5 }).map((_, i) => {
    const bisector = ((i * 72 - 90 + 36) * Math.PI) / 180;
    const offset = rOuter + 34;
    const px = cx + offset * Math.cos(bisector);
    const py = cy + offset * Math.sin(bisector);
    return {
      left: (px / size) * 100,
      top: (py / size) * 100,
    };
  });

  const icons = [
    <BiAnalyse key="icon1" className="consultoria-infographic__icon-svg" />,
    <TbCalendarTime key="icon2" className="consultoria-infographic__icon-svg" />,
    <RiPlantLine key="icon3" className="consultoria-infographic__icon-svg" />,
    <HiMiniMagnifyingGlass
      key="icon4"
      className="consultoria-infographic__icon-svg"
    />,
    <LuLaptopMinimalCheck
      key="icon5"
      className="consultoria-infographic__icon-svg"
    />,
  ];

  const labels = [
    "Análisis",
    "Planificación",
    "Sostenibilidad",
    "Auditorías",
    "Digitalización",
  ];

  return (
    <div className="consultoria-infographic">
      <svg
        className="consultoria-infographic__svg"
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {slicePaths.map((d, idx) => (
          <path
            key={idx}
            d={d}
            className={`consultoria-infographic__slice ${
              activeIndex === idx ? "consultoria-infographic__slice--active" : ""
            }`}
          />
        ))}
        <circle
          cx={cx}
          cy={cy}
          r={rInner}
          fill="none"
          stroke="rgba(0, 0, 0, 0.05)"
          strokeWidth="1"
        />
      </svg>

      {iconPositionsPct.map((pos, idx) => (
        <div
          key={idx}
          className={`consultoria-infographic__icon-holder ${
            activeIndex === idx ? "consultoria-infographic__icon-holder--active" : ""
          }`}
          style={{
            left: `${pos.left}%`,
            top: `${pos.top}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {icons[idx]}
        </div>
      ))}

      {labelPositionsPct.map((pos, idx) => {
        let anchor: "start" | "end" | "center" = "center";
        if (pos.left > 50 + 5) anchor = "start"; // far right
        else if (pos.left < 50 - 5) anchor = "end"; // far left

        const translateX =
          anchor === "start"
            ? "0"
            : anchor === "end"
            ? "-100%"
            : "-50%";

        return (
          <div
            key={idx}
            className={`consultoria-infographic__label ${
              activeIndex === idx ? "consultoria-infographic__label--active" : ""
            }`}
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              transform: `translate(${translateX}, -50%)`,
            }}
          >
            {labels[idx]}
          </div>
        );
      })}
    </div>
  );
};

export default ConsultoriaInfographic;
