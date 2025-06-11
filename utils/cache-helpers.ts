import { useDataStore } from "@/store/useDataStore";
import { BlogPost } from "@/types/blog-post-types";
import { Project } from "@/types/project-types";

export const cacheHelpers = {
  // Blog post helpers
  addBlogPost: (post: BlogPost) => {
    useDataStore.getState().addPost(post);
  },

  updateBlogPost: (postId: string, updatedPost: Partial<BlogPost>) => {
    useDataStore.getState().updatePost(postId, updatedPost);
  },

  deleteBlogPost: (postId: string) => {
    useDataStore.getState().removePost(postId);
  },

  // Project helpers
  addProject: (project: Project) => {
    useDataStore.getState().addProject(project);
  },

  updateProject: (projectId: string, updatedProject: Partial<Project>) => {
    useDataStore.getState().updateProject(projectId, updatedProject);
  },

  deleteProject: (projectId: string) => {
    useDataStore.getState().removeProject(projectId);
  },

  // Force refresh helpers
  refreshBlogPosts: async () => {
    await useDataStore.getState().invalidatePosts();
  },

  refreshProjects: async () => {
    await useDataStore.getState().invalidateProjects();
  },

  refreshAllData: async () => {
    await useDataStore.getState().invalidateAllData();
  },
};
