"use client";

import React from "react";
import Image from "next/image";
import { Project } from "@/types/project-types";
import "./ProjectGalleryMarquee.scss";

interface ProjectGalleryMarqueeProps {
  project: Project;
}

const ProjectGalleryMarquee: React.FC<ProjectGalleryMarqueeProps> = ({
  project,
}) => {
  return (
    <section className="project-gallery-marquee">
      <div className="project-gallery-marquee__image-column">
        <div className="project-gallery-marquee__gallery">
          <div className="moving-gallery slider-wrap-top">
            <div className="wrapper-gallery">
              {project.images.slice(0, 4).map((imgSrc, i) => (
                <div key={i} className="project-gallery-marquee__gallery-item">
                  <div className="image-container">
                    <Image
                      src={imgSrc}
                      alt={`Project image ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="moving-gallery slider-wrap-bottom">
            <div className="wrapper-gallery">
              {project.images.slice(4, 8).map((imgSrc, i) => (
                <div
                  key={i + 4}
                  className="project-gallery-marquee__gallery-item"
                >
                  <div className="image-container">
                    <Image
                      src={imgSrc}
                      alt={`Project image ${i + 5}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectGalleryMarquee;
