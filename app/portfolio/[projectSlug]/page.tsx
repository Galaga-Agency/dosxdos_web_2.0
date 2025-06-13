"use client";

import React, { useEffect, useState, use } from "react";
import useScrollSmooth from "@/hooks/useScrollSmooth";
import { gsap } from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

import HeroSection from "@/components/ProjectDetailsPage/HeroSection/HeroSection";
import { Project } from "@/types/project-types";
import { useDataStore } from "@/store/useDataStore";
import Loading from "@/components/ui/Loading/Loading";
import ProjectChallengeSection from "@/components/ProjectDetailsPage/ProjectChallengeSection/ProjectChallengeSection";
import ProjectSolutionSection from "@/components/ProjectDetailsPage/ProjectSolutionSection/ProjectSolutionSection";
import ProjectCTASection from "@/components/ProjectDetailsPage/ProjectCTASection/ProjectCTASection";
import Footer from "@/components/layout/Footer/footer";
import { notFound } from "next/navigation";

import {
  charAnimation,
  rollUpTextAnimation,
} from "@/utils/animations/text-anim";
import { gallerySliderAnimation } from "@/utils/animations/gallery-slider-anim";
import { floatingImagesAnimation } from "@/utils/animations/floating-images-anim";

import "./project-details-page.scss";
import { highlightAnimation } from "@/utils/animations/highlight-anim";
import ProjectGalleryMarquee from "@/components/ProjectDetailsPage/ProjectGalleryMarquee/ProjectGalleryMarquee";
import FloatingProjectImages from "@/components/ProjectDetailsPage/FloatingProjectImages/FloatingProjectImages";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

interface ProjectDetailsPageProps {
  params: Promise<{
    projectSlug: string;
  }>;
}

const ProjectDetailsPage: React.FC<ProjectDetailsPageProps> = ({ params }) => {
  useScrollSmooth();

  const { projectSlug } = use(params);
  const { getProjectBySlug } = useDataStore();

  // Get project - data should already be loaded by DataPreloader
  const project = getProjectBySlug(projectSlug);

  // Trigger animations once loaded
  useGSAP(() => {
    const timer = setTimeout(() => {
      charAnimation();
      rollUpTextAnimation();
      gallerySliderAnimation();
      floatingImagesAnimation();
      highlightAnimation();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PageWrapper>
      <main className="project-details-page">
        <div className="project-details-page__container">
          {project && <HeroSection project={project} />}

          {project && project.challenge && <ProjectChallengeSection project={project} />}

          {project?.images && project.images.length >= 8 && (
            <ProjectGalleryMarquee project={project} />
          )}

          {project?.solution && <ProjectSolutionSection project={project} />}

          {project && <FloatingProjectImages project={project} />}

          {project && <ProjectCTASection project={project} />}
        </div>
      </main>
      <Footer />
    </PageWrapper>
  );
};

export default ProjectDetailsPage;
