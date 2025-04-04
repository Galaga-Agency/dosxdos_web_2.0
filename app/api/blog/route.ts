import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { BlogPost } from "@/types/blog-post-types";
import {
  getAllPosts,
  createOrUpdatePost,
  deletePost,
  getPostById,
} from "@/lib/blog-service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // First try to get by ID if provided
    if (id) {
      const post = await getPostById(id);

      if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }

      return NextResponse.json(post);
    }

    // Otherwise, return all posts
    const posts = await getAllPosts();

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error in GET /api/blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const postData: BlogPost = await request.json();
    const result = await createOrUpdatePost(postData);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in POST /api/blog:", error);
    return NextResponse.json({ error: "Failed to save post" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const deleted = await deletePost(id);

    if (!deleted) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE /api/blog:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
