"use client";

import React, { useEffect, useState, use } from "react";
import useScrollSmooth from "@/hooks/useScrollSmooth";
import { gsap } from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

import SocialIcons from "@/components/SocialIcons/SocialIcons";
import HeroSection from "@/components/ProjectDetailsPage/HeroSection/HeroSection";
import { projects } from "@/data/projects";
import { Project } from "@/types/project-types";
import Loading from "@/components/ui/Loading/Loading";
import ProjectObjectiveSection from "@/components/ProjectDetailsPage/ProjectObjectiveSection/ProjectObjectiveSection";
import ProjectProcessSection from "@/components/ProjectDetailsPage/ProjectProcessSection/ProjectProcessSection";
import ProjectCTASection from "@/components/ProjectDetailsPage/ProjectCTASection/ProjectCTASection";
import Footer from "@/components/layout/Footer/footer";

import {
  charAnimation,
  fadeAnimation,
  rollUpTextAnimation,
} from "@/utils/animations/text-anim";
import { gallerySliderAnimation } from "@/utils/animations/gallery-slider-anim";
import { floatingImagesAnimation } from "@/utils/animations/floating-images-anim";

import "./project-details-page.scss";
import { highlightAnimation } from "@/utils/animations/highlight-anim";

interface ProjectDetailsPageProps {
  params: {
    projectSlug: string;
  };
}

const ProjectDetailsPage: React.FC<ProjectDetailsPageProps> = ({ params }) => {
  useScrollSmooth();

  const resolvedParams = use(params as any);
  const { projectSlug } = resolvedParams as any;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add("smooth-scroll");

    // Find the project data when component mounts
    const foundProject: Project | undefined = projects.find(
      (p) => p.slug === projectSlug
    );

    if (foundProject) {
      setProject(foundProject);
    }

    setLoading(false);

    return () => {
      document.body.classList.remove("smooth-scroll");
    };
  }, [projectSlug]);

  useGSAP(() => {
    const timer = setTimeout(() => {
      fadeAnimation();
      charAnimation();
      rollUpTextAnimation();
      gallerySliderAnimation();
      floatingImagesAnimation();
      highlightAnimation();
    }, 300);

    return () => clearTimeout(timer);
  });

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
                <ProjectObjectiveSection project={project} />
                <ProjectProcessSection project={project} />
                <ProjectCTASection project={project} />
              </>
            ) : (
              <div className="project-details-page__not-found">
                <h2>Proyecto no encontrado</h2>
                <p>Lo sentimos, no pudimos encontrar el proyecto solicitado.</p>
              </div>
            )}

            <div className="project-details-page__mobile-social-section">
              <div className="project-details-page__mobile-social-header">
                <h3 className="project-details-page__mobile-social-title">
                  Síguenos
                </h3>
                <div className="project-details-page__mobile-social-divider"></div>
              </div>
              <SocialIcons orientation="horizontal" color="primary" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
