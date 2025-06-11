// @ts-nocheck
"use server";

import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { v4 as uuidv4 } from "uuid";
import { Project } from "@/types/project-types";
import { generateUniqueSlug } from "@/utils/slug-generator";

const PROJECTS_DIRECTORY = path.join(process.cwd(), "data/projects");

export async function getAllProjects(): Promise<Project[]> {
  try {
    // Ensure the directory exists
    try {
      await fs.access(PROJECTS_DIRECTORY);
    } catch {
      console.warn(`Projects directory not found: ${PROJECTS_DIRECTORY}`);
      return [];
    }

    const fileNames = await fs.readdir(PROJECTS_DIRECTORY);

    const allProjectsData: Project[] = [];
    const existingSlugs: string[] = [];

    for (const fileName of fileNames) {
      if (!fileName.endsWith(".md")) continue;

      // Read markdown file as string
      const fullPath = path.join(PROJECTS_DIRECTORY, fileName);
      const fileContents = await fs.readFile(fullPath, "utf8");

      // Use gray-matter to parse the project metadata section
      const matterResult = matter(fileContents);

      // Convert date to string if it's a Date object
      const date = matterResult.data.date
        ? matterResult.data.date instanceof Date
          ? matterResult.data.date.toISOString()
          : matterResult.data.date
        : new Date().toISOString();

      // Generate or use existing slug
      const slug =
        matterResult.data.slug ||
        generateUniqueSlug(
          matterResult.data.name || matterResult.data.title,
          existingSlugs
        );
      existingSlugs.push(slug);

      // Create project object
      const project: Project = {
        id: matterResult.data.id || uuidv4(),
        name:
          matterResult.data.name ||
          matterResult.data.title ||
          "Proyecto Sin Nombre",
        slug,
        client: matterResult.data.client || "",
        categories: matterResult.data.categories || [], // ✅ FIXED
        location: matterResult.data.location || "",
        year: matterResult.data.year || new Date().getFullYear(),
        description: matterResult.data.description || "",
        challenge: matterResult.data.challenge || "",
        solution: matterResult.data.solution || "",
        coverImage:
          matterResult.data.coverImage ||
          matterResult.data.image ||
          "/assets/img/default-project-image.jpg",
        images: matterResult.data.images || [],
        date,
        featured: matterResult.data.featured || false,
      };

      allProjectsData.push(project);
    }

    // Sort projects by date in descending order
    return allProjectsData.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error getting all projects:", error);
    return [];
  }
}

export async function getProjectById(
  projectId: string
): Promise<Project | null> {
  try {
    const fullPath = path.join(PROJECTS_DIRECTORY, `${projectId}.md`);

    // Check if file exists
    await fs.access(fullPath);

    const fileContents = await fs.readFile(fullPath, "utf8");
    const matterResult = matter(fileContents);

    const project: Project = {
      id: matterResult.data.id || projectId,
      name:
        matterResult.data.name ||
        matterResult.data.title ||
        "Proyecto Sin Nombre",
      slug: matterResult.data.slug || "",
      client: matterResult.data.client || "",
      categories: matterResult.data.categories || [], // ✅ FIXED
      location: matterResult.data.location || "",
      year: matterResult.data.year || new Date().getFullYear(),
      description: matterResult.data.description || "",
      challenge: matterResult.data.challenge || "",
      solution: matterResult.data.solution || "",
      coverImage:
        matterResult.data.coverImage ||
        matterResult.data.image ||
        "/assets/img/default-project-image.jpg",
      images: matterResult.data.images || [],
      date: matterResult.data.date || new Date().toISOString(),
      featured: matterResult.data.featured || false,
    };

    return project;
  } catch (error) {
    console.error(`Error getting project by ID "${projectId}":`, error);
    return null;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const allProjects = await getAllProjects();
    const project = allProjects.find((project) => project.slug === slug);

    return project || null;
  } catch (error) {
    console.error(`Error getting project by slug "${slug}":`, error);
    return null;
  }
}

export async function createOrUpdateProject(
  project: Project
): Promise<Project> {
  try {
    // Ensure we have an id
    const id = project.id || uuidv4();

    // Get all existing projects to generate unique slug
    const allProjects = await getAllProjects();
    const existingSlugs = allProjects
      .map((p) => p.slug)
      .filter((slug) => slug !== project.slug);

    // Generate or use existing slug
    const slug =
      project.slug || generateUniqueSlug(project.name, existingSlugs);

    // Update the project with the id and slug
    const updatedProject = { ...project, id, slug };

    // Prepare frontmatter
    const frontmatter = {
      id: updatedProject.id,
      name: updatedProject.name,
      slug: updatedProject.slug,
      client: updatedProject.client,
      categories: updatedProject.categories || [],
      location: updatedProject.location || "",
      year: updatedProject.year || new Date().getFullYear(),
      description: updatedProject.description || "",
      challenge: updatedProject.challenge || "",
      solution: updatedProject.solution || "",
      coverImage:
        updatedProject.coverImage || "/assets/img/default-project-image.jpg",
      images: updatedProject.images || [],
      date: updatedProject.date || new Date().toISOString(),
      featured: updatedProject.featured || false,
    };

    // Create markdown content
    const markdown = matter.stringify(
      "", // Empty content since everything is in frontmatter
      frontmatter
    );

    // Ensure the directory exists
    await fs.mkdir(PROJECTS_DIRECTORY, { recursive: true });

    // Write the file
    const fullPath = path.join(PROJECTS_DIRECTORY, `${id}.md`);
    await fs.writeFile(fullPath, markdown);

    return { ...updatedProject, id, slug };
  } catch (error) {
    console.error("Error creating/updating project:", error);
    throw error;
  }
}

export async function deleteProject(projectId: string): Promise<boolean> {
  try {
    const fullPath = path.join(PROJECTS_DIRECTORY, `${projectId}.md`);

    // Check if file exists
    await fs.access(fullPath);

    // Delete the file
    await fs.unlink(fullPath);

    console.log(`Deleted project with ID: ${projectId}`);
    return true;
  } catch (error) {
    console.error(`Error deleting project with ID ${projectId}:`, error);
    return false;
  }
}
