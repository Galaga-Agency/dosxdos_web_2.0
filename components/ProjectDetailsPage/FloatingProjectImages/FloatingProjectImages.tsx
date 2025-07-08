"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { floatingImagesAnimation } from "@/utils/animations/floating-images-anim";
import "./FloatingProjectImages.scss";
import { Project } from "@/types/project-types";

interface FloatingProjectImagesProps {
  project: Project;
}

const FloatingProjectImages: React.FC<FloatingProjectImagesProps> = ({
  project,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      floatingImagesAnimation();
    }
  }, []);

  const imagesToUse = project.floatingImages && project.floatingImages.length > 0 
    ? project.floatingImages 
    : project.images;

  const mainImage = imagesToUse[0] || project.coverImage;
  const floatingImage1 = imagesToUse[1] || project.images[1];
  const floatingImage2 = imagesToUse[2] || project.images[2];

  return (
    <div ref={sectionRef} className="floating-project-images">
      <div className="floating-project-images__full-image">
        <div className="floating-project-images__image-container">
          <Image
            src={mainImage}
            alt={`${project.name} - Illustración`}
            fill
            quality={100}
            style={{ objectFit: "cover" }}
            sizes="100vw"
            priority
          />
        </div>
      </div>

      <div className="floating-project-images__floating-images">
        {floatingImage1 && (
          <div className="floating-project-images__floating-image floating-project-images__floating-image--1">
            <Image
              src={floatingImage1}
              alt={`${project.name} - `}
              fill
              sizes="(max-width: 768px) 90vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        )}

        {floatingImage2 && (
          <div className="floating-project-images__floating-image floating-project-images__floating-image--2">
            <Image
              src={floatingImage2}
              alt={`${project.name} - Illustración`}
              fill
              sizes="(max-width: 768px) 90vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingProjectImages;