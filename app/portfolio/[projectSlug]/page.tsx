"use client";

import React, { useEffect, useState, use } from "react";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import HeroSection from "@/components/ProjectDetailsPage/HeroSection";
import { allProjects } from "@/data/projects";
import { Project } from "@/types/project-types";
import {
  cleanupScrollTriggers,
  initScrollTriggerConfig,
} from "@/utils/animations/scrolltrigger-config";
import "./ProjectDetailsPage.scss";
import Loading from "@/components/ui/Loading/Loading";

interface ProjectDetailsPageProps {
  params: {
    projectSlug: string;
  };
}

const ProjectDetailsPage: React.FC<ProjectDetailsPageProps> = ({ params }) => {
  // Use React.use() to unwrap the params promise
  const resolvedParams = use(params as any);
  const { projectSlug } = resolvedParams as any;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  // Find the project data when component mounts
  useEffect(() => {
    const foundProject: Project | undefined = allProjects.find(
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

    return () => {
      cleanupScrollTriggers();
    };
  }, []);

  return (
    <SmoothScrollWrapper>
      <div className="project-details-page">
        <div className="project-details-page__container">
          <div className="project-details-page__social-sidebar">
            <div className="project-details-page__social-wrapper">
              <span className="project-details-page__social-label">
                Síguenos
              </span>
              <SocialIcons orientation="vertical" color="white" />
            </div>
          </div>

          {loading ? (
            <div className="project-details-page__loading">
              <Loading/>
              Cargando detalles del proyecto...
            </div>
          ) : project ? (
            <>
              <HeroSection project={project} />

              {/* More sections will be added here in future updates */}
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
    </SmoothScrollWrapper>
  );
};

export default ProjectDetailsPage;
