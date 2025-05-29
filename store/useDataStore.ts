// store/useDataStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Project } from "@/types/project-types";
import { BlogPost } from "@/types/blog-post-types";

interface DataState {
  // Projects
  projects: Project[];
  projectsLoaded: boolean;
  projectsError: string | null;

  // Blog Posts
  posts: BlogPost[];
  postsLoaded: boolean;
  postsError: string | null;

  // Actions
  fetchProjects: () => Promise<void>;
  fetchPosts: () => Promise<void>;
  fetchAllData: () => Promise<void>;

  // Getters
  getProjectBySlug: (slug: string) => Project | undefined;
  getPostBySlug: (slug: string) => BlogPost | undefined;

  // Reset functions
  resetProjects: () => void;
  resetPosts: () => void;
}

export const useDataStore = create<DataState>()(
  devtools(
    (set, get) => ({
      // Initial state
      projects: [],
      projectsLoaded: false,
      projectsError: null,

      posts: [],
      postsLoaded: false,
      postsError: null,

      // Fetch projects
      fetchProjects: async () => {
        try {
          const response = await fetch("/api/proyectos");
          if (!response.ok) throw new Error("Failed to fetch projects");

          const projects: Project[] = await response.json();

          set({
            projects,
            projectsLoaded: true,
            projectsError: null,
          });
        } catch (error) {
          console.error("Error fetching projects:", error);
          set({
            projectsError:
              error instanceof Error ? error.message : "Unknown error",
            projectsLoaded: true, // Still mark as loaded to prevent infinite retries
          });
        }
      },

      // Fetch blog posts
      fetchPosts: async () => {
        try {
          const response = await fetch("/api/blog");
          if (!response.ok) throw new Error("Failed to fetch posts");

          const posts: BlogPost[] = await response.json();

          set({
            posts,
            postsLoaded: true,
            postsError: null,
          });
        } catch (error) {
          console.error("Error fetching posts:", error);
          set({
            postsError:
              error instanceof Error ? error.message : "Unknown error",
            postsLoaded: true,
          });
        }
      },

      // Fetch all data at once
      fetchAllData: async () => {
        const { fetchProjects, fetchPosts } = get();
        await Promise.allSettled([fetchProjects(), fetchPosts()]);
      },

      // Get project by slug
      getProjectBySlug: (slug: string) => {
        const { projects } = get();
        return projects.find((project) => project.slug === slug);
      },

      // Get post by slug
      getPostBySlug: (slug: string) => {
        const { posts } = get();
        return posts.find((post) => post.slug === slug);
      },

      // Reset functions
      resetProjects: () =>
        set({
          projects: [],
          projectsLoaded: false,
          projectsError: null,
        }),

      resetPosts: () =>
        set({
          posts: [],
          postsLoaded: false,
          postsError: null,
        }),
    }),
    {
      name: "data-store", // Name for devtools
    }
  )
);
