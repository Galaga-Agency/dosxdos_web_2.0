export interface BlogPost {
  id: string;
  title: string;
  slug?: string;
  content: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  tags: string[]; 
  coverImage: string;
  img?: string;
  published: boolean;
  readTime?: number;
  editorBlocks: string;
}

export interface EditorBlock {
  id: string;
  type: string;
  content: string;
  alignment?: string;
  meta?: {
    alt?: string;
    caption?: string;
    citation?: string;
    [key: string]: any;
  };
}

export type EditorBlockType =
  | "paragraph"
  | "heading"
  | "image"
  | "list"
  | "quote"
  | "code"
  | "table";

export interface BaseEditorBlock {
  type: EditorBlockType;
}

export interface ParagraphBlock extends BaseEditorBlock {
  type: "paragraph";
  content: string;
}

export interface HeadingBlock extends BaseEditorBlock {
  type: "heading";
  level: number;
  content: string;
}

export interface ImageBlock extends BaseEditorBlock {
  type: "image";
  content: string;
  altText?: string;
  caption?: string;
}

export interface ListBlock extends BaseEditorBlock {
  type: "list";
  listType: "ordered" | "unordered";
  items: string[];
}

export interface QuoteBlock extends BaseEditorBlock {
  type: "quote";
  content: string;
  citation?: string;
}

export interface CodeBlock extends BaseEditorBlock {
  type: "code";
  content: string;
  language?: string;
}

export interface TableBlock extends BaseEditorBlock {
  type: "table";
  rows: string[][];
  headers?: string[];
}
