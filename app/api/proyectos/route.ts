import { NextResponse } from "next/server";
import { getAllProjects, createOrUpdateProject } from "@/lib/project-service";

export async function GET() {
  try {
    const projects = await getAllProjects();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener proyectos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newProject = await createOrUpdateProject(body);
    return NextResponse.json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Error al crear proyecto" },
      { status: 500 }
    );
  }
}