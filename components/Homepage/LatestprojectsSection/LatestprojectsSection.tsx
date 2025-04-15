"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import "./LatestProjectsSection.scss";

const projectData = [
  {
    id: 1,
    title: "Silkvision",
    description: "Digital brand strategy and design",
    image: "/assets/img/blog/mobile-ux.jpg",
    link: "/portfolio/silkvision",
  },
  {
    id: 2,
    title: "Egatan",
    description: "Innovative urban planning concept",
    image: "/assets/img/blog/packaging-trends.jpg",
    link: "/portfolio/egatan",
  },
  {
    id: 3,
    title: "Métrica",
    description: "Data visualization platform",
    image: "/assets/img/blog/visual-storytelling.jpg",
    link: "/portfolio/metrica",
  },
];

const LatestProjectsSection: React.FC = () => {
  return (
    <section
      className="latest-projects-section"
      style={{
        backgroundImage: "url(/assets/img/home-04/brand/overly.png)",
      }}
    >
      <div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-xl-12">
            {projectData.map((item) => (
              <div key={item.id} className="tp-project-4-bg project-panel">
                <Link href="/portfolio-details-1">
                  <div className="tp-project-4-thumb">
                    <Image
                      src={item.image}
                      alt="port-thumb"
                      style={{ height: "auto" }}
                      width={0}
                      height={0}
                    />
                  </div>
                  <div className="tp-project-4-content z-index">
                    <h4 className="tp-project-4-title tp_reveal_anim-2">
                      {item.title}
                    </h4>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestProjectsSection;