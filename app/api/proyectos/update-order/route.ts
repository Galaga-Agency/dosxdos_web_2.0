import { NextRequest, NextResponse } from "next/server";
import { Project } from "@/types/project-types";
import { getAllProjects, createOrUpdateProject } from "@/lib/project-service";

export async function POST(request: NextRequest) {
  try {
    // Check if user is admin (implement your auth logic here)
    // const isAdmin = await checkAdminAuth(request);
    // if (!isAdmin) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const { projects }: { projects: Project[] } = await request.json();

    if (!projects || !Array.isArray(projects)) {
      return NextResponse.json(
        { error: "Invalid projects data" },
        { status: 400 }
      );
    }

    // Get all existing projects to preserve their data
    const existingProjects = await getAllProjects();

    // Update each project with the new order while preserving all other data
    for (const updatedProject of projects) {
      const existingProject = existingProjects.find(
        (p) => p.id === updatedProject.id
      );

      if (existingProject) {
        // Merge the existing project data with the new order
        const projectToUpdate: Project = {
          ...existingProject,
          order: updatedProject.order,
        };

        // Use your existing service to update the file
        await createOrUpdateProject(projectToUpdate);
        console.log(
          `Updated order for project: ${existingProject.name} (${existingProject.id}) to ${updatedProject.order}`
        );
      } else {
        console.warn(`Project not found: ${updatedProject.id}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Project order updated successfully",
      updatedProjects: projects.length,
    });
  } catch (error) {
    console.error("Error updating project order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
