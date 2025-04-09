import { NextResponse } from "next/server";
import { getAllPosts, createOrUpdatePost } from "@/lib/blog-service";

export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching posts" },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newPost = await createOrUpdatePost(body);
    return NextResponse.json(newPost);
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json({ error: "Error creating post" }, { status: 500 });
  }
}
