import { NextRequest, NextResponse } from "next/server";
import {
  getPostById,
  createOrUpdatePost,
  deletePost,
  getAllPosts,
} from "@/lib/blog-service";

export async function GET() {
  try {
    console.log("[API] GET /api/blog hit"); // 👈 This must show
    const posts = await getAllPosts();
    console.log("[API] Posts loaded:", posts.length);
    return NextResponse.json(posts);
  } catch (error) {
    console.error("[API] Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Error fetching posts" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const updatedPost = await createOrUpdatePost({ ...body, id: params.id });
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json({ error: "Error updating post" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = await deletePost(params.id);
    if (!success) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json({ error: "Error deleting post" }, { status: 500 });
  }
}
