import { Project } from "@/types/project-types";
import { allProjects } from "@/data/projects";

// Helper function to get projects by category
export const getProjectsByCategory = (category: string): Project[] => {
  if (category === "all") {
    return allProjects;
  }
  return allProjects.filter((project) => project.category === category);
};

// Helper function to get a project by its ID
export const getProjectById = (id: string): Project | undefined => {
  return allProjects.find((project) => project.id === id);
};

// Helper function to get a project by its slug
export const getProjectBySlug = (slug: string): Project | undefined => {
  return allProjects.find((project) => project.slug === slug);
};

// Helper function to get related projects
export const getRelatedProjects = (
  currentProject: Project,
  limit: number = 3
): Project[] => {
  // First try to find projects in the same category
  const sameCategory = allProjects.filter(
    (project) =>
      project.category === currentProject.category &&
      project.id !== currentProject.id
  );

  // If we have enough projects in the same category, return them
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  // Otherwise, fill with other projects
  const otherProjects = allProjects.filter(
    (project) =>
      project.category !== currentProject.category &&
      project.id !== currentProject.id
  );

  return [...sameCategory, ...otherProjects].slice(0, limit);
};
