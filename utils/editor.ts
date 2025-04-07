// utils/editorUtils.ts
import { EditorBlock } from "@/types/blog-post-types";

/**
 * Create an empty editor block
 */
export const createEmptyBlock = (type: string = "paragraph"): EditorBlock => ({
  id: `block-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
  type,
  content: "",
  alignment: "left",
  meta: {},
});

/**
 * Process editor content to convert blocks to HTML
 */
export const processEditorContent = (blocks: EditorBlock[]): string => {
  if (!blocks.length) return "";
  
  const serializedContent = blocks.map(block => {
    switch (block.type) {
      case "heading_1":
        return `<h1 style="text-align:${block.alignment || 'left'}">${block.content}</h1>`;
        
      case "heading_2":
        return `<h2 style="text-align:${block.alignment || 'left'}">${block.content}</h2>`;
        
      case "quote":
        return `<blockquote>${block.content}</blockquote>`;
        
      case "list_item":
        return `<ul><li>${block.content}</li></ul>`;
        
      case "ordered_list_item":
        return `<ol><li>${block.content}</li></ol>`;
        
      case "image":
        return `<figure>
          <img src="${block.content}" alt="${block.meta?.alt || 'Imagen del blog'}" />
          ${block.meta?.caption ? `<figcaption>${block.meta.caption}</figcaption>` : ''}
        </figure>`;
        
      case "separator":
        return '<hr />';
        
      default: // paragraph
        return `<p style="text-align:${block.alignment || 'left'}">${block.content}</p>`;
    }
  }).join('\n\n');
  
  return serializedContent;
};

/**
 * Calculate read time for content
 */
export const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 225;
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readTime} min`;
};

/**
 * Handle positioning of the selection toolbar
 */
export const positionSelectionToolbar = (
  range: Range, 
  toolbarRef: React.RefObject<HTMLDivElement>,
  editorRef: React.RefObject<HTMLDivElement>
) => {
  if (!toolbarRef.current || !editorRef.current) return;

  const rect = range.getBoundingClientRect();
  const editorRect = editorRef.current.getBoundingClientRect();

  const toolbarWidth = toolbarRef.current.offsetWidth;
  const toolbarHeight = toolbarRef.current.offsetHeight;

  // Position it above the selection
  let left = rect.left + rect.width / 2 - toolbarWidth / 2 - editorRect.left;
  let top = rect.top - toolbarHeight - 10 - editorRect.top;

  // Keep it within bounds
  if (left < 0) left = 0;
  if (left + toolbarWidth > editorRect.width) {
    left = editorRect.width - toolbarWidth;
  }

  if (top < 0) {
    // Position below if above doesn't fit
    top = rect.bottom + 10 - editorRect.top;
  }

  toolbarRef.current.style.left = `${left}px`;
  toolbarRef.current.style.top = `${top}px`;
};

/**
 * Find the first image in editor content
 */
export const findFirstImage = (editorContent: EditorBlock[]): string | null => {
  const imageBlock = editorContent.find((block) => block.type === "image");
  return imageBlock?.content || null;
};