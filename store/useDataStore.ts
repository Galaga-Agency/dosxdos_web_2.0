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

  // Cache invalidation methods
  invalidateProjects: () => Promise<void>;
  invalidatePosts: () => Promise<void>;
  invalidateAllData: () => Promise<void>;

  // CRUD operations for posts
  addPost: (post: BlogPost) => void;
  updatePost: (postId: string, updatedPost: Partial<BlogPost>) => void;
  removePost: (postId: string) => void;

  // CRUD operations for projects
  addProject: (project: Project) => void;
  updateProject: (projectId: string, updatedProject: Partial<Project>) => void;
  removeProject: (projectId: string) => void;
  updateProjects: (projects: Project[]) => void; // Add this method for bulk updates

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

      // Cache invalidation methods - force fresh data
      invalidateProjects: async () => {
        set({ projectsLoaded: false, projectsError: null });
        await get().fetchProjects();
      },

      invalidatePosts: async () => {
        set({ postsLoaded: false, postsError: null });
        await get().fetchPosts();
      },

      invalidateAllData: async () => {
        set({
          projectsLoaded: false,
          postsLoaded: false,
          projectsError: null,
          postsError: null,
        });
        await get().fetchAllData();
      },

      // CRUD operations for posts
      addPost: (post: BlogPost) => {
        set((state) => ({
          posts: [post, ...state.posts],
        }));
      },

      updatePost: (postId: string, updatedPost: Partial<BlogPost>) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId ? { ...post, ...updatedPost } : post
          ),
        }));
      },

      removePost: (postId: string) => {
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== postId),
        }));
      },

      // CRUD operations for projects
      addProject: (project: Project) => {
        set((state) => ({
          projects: [project, ...state.projects],
        }));
      },

      updateProject: (projectId: string, updatedProject: Partial<Project>) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? { ...project, ...updatedProject }
              : project
          ),
        }));
      },

      removeProject: (projectId: string) => {
        set((state) => ({
          projects: state.projects.filter(
            (project) => project.id !== projectId
          ),
        }));
      },

      // Bulk update projects - ADD THIS METHOD
      updateProjects: (projects: Project[]) => {
        set({
          projects,
        });
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
