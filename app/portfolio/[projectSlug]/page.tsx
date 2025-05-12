"use client";

import React, { useEffect, useState, use } from "react";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import HeroSection from "@/components/ProjectDetailsPage/HeroSection/HeroSection";
import { projects } from "@/data/projects";
import { Project } from "@/types/project-types";
import {
  initScrollTriggerConfig,
  cleanupScrollTriggers,
} from "@/utils/animations/scrolltrigger-config";
import "./project-details-page.scss";
import Loading from "@/components/ui/Loading/Loading";
import ProjectObjectiveSection from "@/components/ProjectDetailsPage/ProjectObjectiveSection/ProjectObjectiveSection";
import ProjectProcessSection from "@/components/ProjectDetailsPage/ProjectProcessSection/ProjectProcessSection";
import ProjectCTASection from "@/components/ProjectDetailsPage/ProjectCTASection/ProjectCTASection";
import { cleanupProjectDetailsAnimations } from "@/utils/animations/pages/project-details-page-anim";
import Footer from "@/components/layout/Footer/footer";

interface ProjectDetailsPageProps {
  params: {
    projectSlug: string;
  };
}

const ProjectDetailsPage: React.FC<ProjectDetailsPageProps> = ({ params }) => {
  // Force component remount on each page visit
  const [key] = useState(() => Date.now());

  // Use React.use() to unwrap the params promise
  const resolvedParams = use(params as any);
  const { projectSlug } = resolvedParams as any;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  // Find the project data when component mounts
  useEffect(() => {
    const foundProject: Project | undefined = projects.find(
      (p) => p.slug === projectSlug
    );

    if (foundProject) {
      setProject(foundProject);
    }

    setLoading(false);
  }, [projectSlug]);

  // Initialize ScrollTrigger
  useEffect(() => {
    initScrollTriggerConfig();

    // Cleanup on unmount
    return () => {
      cleanupProjectDetailsAnimations();
      cleanupScrollTriggers();
    };
  }, []);

  return (
    <SmoothScrollWrapper>
      <div className="project-details-page" key={key}>
        <div className="project-details-page__container">
          {loading ? (
            <Loading />
          ) : project ? (
            <>
              <HeroSection project={project} key={`hero-${key}`} />
              <ProjectObjectiveSection
                project={project}
                key={`objective-${key}`}
              />
              <ProjectProcessSection project={project} key={`process-${key}`} />
              <ProjectCTASection project={project} key={`cta-${key}`} />
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
    </SmoothScrollWrapper>
  );
};

export default ProjectDetailsPage;
