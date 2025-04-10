// @ts-nocheck
"use server";

import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { v4 as uuidv4 } from "uuid";
import { BlogPost } from "@/types/blog-post-types";

const POSTS_DIRECTORY = path.join(process.cwd(), "data/blog-articles");

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    // Ensure the directory exists
    try {
      await fs.access(POSTS_DIRECTORY);
    } catch {
      console.warn(`Blog directory not found: ${POSTS_DIRECTORY}`);
      return [];
    }

    const fileNames = await fs.readdir(POSTS_DIRECTORY);

    const allPostsData: BlogPost[] = [];

    for (const fileName of fileNames) {
      if (!fileName.endsWith(".md")) continue;

      // Read markdown file as string
      const fullPath = path.join(POSTS_DIRECTORY, fileName);
      const fileContents = await fs.readFile(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Convert date to string if it's a Date object
      const date = matterResult.data.date
        ? matterResult.data.date instanceof Date
          ? matterResult.data.date.toISOString()
          : matterResult.data.date
        : new Date().toISOString();

      // Create blog post object
      const post: BlogPost = {
        id: matterResult.data.id || uuidv4(),
        title: matterResult.data.title || "Untitled",
        date,
        excerpt: matterResult.data.excerpt || "",
        content: matterResult.content,
        category: matterResult.data.category || "Uncategorized",
        coverImage:
          matterResult.data.coverImage || "/assets/img/default-blog-image.jpg",
        author: matterResult.data.author || "Admin",
        published: matterResult.data.published !== false,
        editorBlocks: matterResult.data.editorBlocks || "",
        tags: matterResult.data.tags || [],
      };

      allPostsData.push(post);
    }

    // Sort posts by date in descending order
    return allPostsData.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error getting all posts:", error);
    return [];
  }
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  try {
    const allPosts = await getAllPosts();
    const post = allPosts.find((post) => post.id === id);

    return post || null;
  } catch (error) {
    console.error(`Error getting post by ID "${id}":`, error);
    return null;
  }
}

export async function createOrUpdatePost(post: BlogPost): Promise<BlogPost> {
  try {
    // Ensure we have an id
    const id = post.id || uuidv4();

    // Update the post with the id
    const updatedPost = { ...post, id };

    // Prepare frontmatter — ✅ now includes editorBlocks
    const frontmatter = {
      id: updatedPost.id,
      title: updatedPost.title,
      date: updatedPost.date || new Date().toISOString(),
      excerpt: updatedPost.excerpt || "",
      category: updatedPost.category || "Uncategorized",
      coverImage:
        updatedPost.coverImage || "/assets/img/default-blog-image.jpg",
      author: updatedPost.author || "Admin",
      published: updatedPost.published !== false,
      tags: updatedPost.tags || [],
      editorBlocks: updatedPost.editorBlocks || "",
    };

    // Create markdown content (content = HTML, not blocks)
    const markdown = matter.stringify(updatedPost.content || "", frontmatter);

    // Ensure the directory exists
    await fs.mkdir(POSTS_DIRECTORY, { recursive: true });

    // Write the file
    const fullPath = path.join(POSTS_DIRECTORY, `${id}.md`);
    await fs.writeFile(fullPath, markdown);

    return { ...updatedPost, id };
  } catch (error) {
    console.error("Error creating/updating post:", error);
    throw error;
  }
}

export async function deletePost(id: string): Promise<boolean> {
  try {
    const fullPath = path.join(POSTS_DIRECTORY, `${id}.md`);

    try {
      await fs.access(fullPath);
    } catch {
      return false;
    }

    await fs.unlink(fullPath);
    return true;
  } catch (error) {
    console.error(`Error deleting post with id "${id}":`, error);
    throw error;
  }
}
