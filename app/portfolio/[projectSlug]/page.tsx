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
  fadeAnimation,
  rollUpTextAnimation,
} from "@/utils/animations/text-anim";
import { gallerySliderAnimation } from "@/utils/animations/gallery-slider-anim";
import { floatingImagesAnimation } from "@/utils/animations/floating-images-anim";

import "./project-details-page.scss";
import { highlightAnimation } from "@/utils/animations/highlight-anim";
import ProjectGalleryMarquee from "@/components/ProjectDetailsPage/ProjectGalleryMarquee/ProjectGalleryMarquee";
import FloatingProjectImages from "@/components/ProjectDetailsPage/FloatingProjectImages/FloatingProjectImages";

interface ProjectDetailsPageProps {
  params: Promise<{
    projectSlug: string;
  }>;
}

const ProjectDetailsPage: React.FC<ProjectDetailsPageProps> = ({ params }) => {
  useScrollSmooth();

  const { projectSlug } = use(params);
  const { projectsLoaded, getProjectBySlug } = useDataStore();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  // Enable smooth scroll body class
  useEffect(() => {
    document.body.classList.add("smooth-scroll");
    return () => {
      document.body.classList.remove("smooth-scroll");
    };
  }, []);

  // Load project from Zustand store once available
  useEffect(() => {
    if (!projectsLoaded) return;

    const found = getProjectBySlug(projectSlug);

    if (!found) {
      notFound(); // If slug is invalid
      return;
    }

    setProject(found);
    document.title = `${found.name} - Dos x Dos`;
    setLoading(false);
  }, [projectSlug, projectsLoaded]);

  // Trigger animations once loaded
  useGSAP(() => {
    if (!loading && project) {
      const timer = setTimeout(() => {
        fadeAnimation();
        charAnimation();
        rollUpTextAnimation();
        gallerySliderAnimation();
        floatingImagesAnimation();
        highlightAnimation();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [loading, project]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="project-details-page">
          <div className="project-details-page__container">
            {loading ? (
              <Loading />
            ) : project ? (
              <>
                <HeroSection project={project} />

                {project.challenge && (
                  <ProjectChallengeSection project={project} />
                )}

                {project.images && project.images.length >= 8 && (
                  <ProjectGalleryMarquee project={project} />
                )}

                {project.solution && (
                  <ProjectSolutionSection project={project} />
                )}

                <FloatingProjectImages project={project} />

                <ProjectCTASection project={project} />
              </>
            ) : (
              <div className="project-details-page__not-found">
                <h2>Proyecto no encontrado</h2>
                <p>Lo sentimos, no pudimos encontrar el proyecto solicitado.</p>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
