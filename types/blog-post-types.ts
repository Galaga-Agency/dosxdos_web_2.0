export interface BlogPost {
  id: string;
  title: string;
  slug?: string;
  date: string;
  content: string;
  excerpt: string;
  category: string;
  tags?: string[];
  author: string;
  coverImage: string;
  published: boolean;
  readTime?: string;
  editorBlocks?: string; // Store raw editor blocks for future editing
}

// Editor block types for the rich text editor
export interface EditorBlock {
  id: string;
  type: string;
  content: string;
  alignment?: "left" | "center" | "right";
  meta?: {
    alt?: string;
    caption?: string;
    [key: string]: any;
  };
}
