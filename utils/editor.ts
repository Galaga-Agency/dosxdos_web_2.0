import { EditorBlock } from "@/types/blog-post-types";

// Average reading speed (words per minute)
const WORDS_PER_MINUTE = 225;

/**
 * Processes editor content into HTML for display
 */
export function processEditorContent(blocks: EditorBlock[]): string {
  if (!blocks || blocks.length === 0) return "";

  return blocks
    .map((block) => {
      switch (block.type) {
        case "paragraph":
          return `<p>${block.content}</p>`;

        case "heading":
          return `<h${block.level}>${block.content}</h${block.level}>`;

        case "image":
          return `
            <div class="rich-text-editor__image-container">
              <div class="rich-text-editor__image-wrapper">
                <img src="${block.content}" alt="${block.altText || ''}" class="rich-text-editor__image" />
                ${block.caption ? `<figcaption class="rich-text-editor__image-caption">${block.caption}</figcaption>` : ''}
              </div>
            </div>
          `;

        case "list":
          const listTag = block.listType === "ordered" ? "ol" : "ul";
          const listItems = block.items.map(item => `<li>${item}</li>`).join("");
          return `<${listTag} class="rich-text-editor__list rich-text-editor__list-${block.listType}">${listItems}</${listTag}>`;

        case "quote":
          return `
            <blockquote class="rich-text-editor__quote">
              <p>${block.content}</p>
              ${block.citation ? `<cite>${block.citation}</cite>` : ''}
            </blockquote>
          `;

        case "code":
          return `
            <pre class="rich-text-editor__code${block.language ? ` language-${block.language}` : ''}">
              <code>${block.content}</code>
            </pre>
          `;

        case "table":
          const headers = block.headers 
            ? `<thead><tr>${block.headers.map(h => `<th>${h}</th>`).join("")}</tr></thead>` 
            : "";
          
          const rows = block.rows.map(row => 
            `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`
          ).join("");
          
          return `
            <div class="rich-text-editor__table-container">
              <table class="rich-text-editor__table">
                ${headers}
                <tbody>${rows}</tbody>
              </table>
            </div>
          `;

        default:
          return "";
      }
    })
    .join("\n");
}

/**
 * Safely formats blog content for display, handling different content formats
 */
export function formatBlogContent(content: any): string {
  // Check if the content is a string that includes HTML tags
  if (typeof content === 'string') {
    // If it's already HTML (contains tags), return it directly
    if (content.includes('<') && content.includes('>')) {
      return content;
    }
    // If it's plain text, wrap it in paragraph tags
    return `<p>${content}</p>`;
  }
  
  // If content is an array of editor blocks
  if (Array.isArray(content)) {
    if (content.length > 0 && typeof content[0] === 'object' && content[0].type) {
      // Process array of editor blocks
      return processEditorContent(content);
    } else {
      // If it's an array of strings, join with paragraph tags
      return content.map(item => `<p>${item}</p>`).join('\n');
    }
  }
  
  // Handle base64 encoded images that might be stored directly in content
  if (typeof content === 'string' && content.startsWith('data:image')) {
    return `<div class="rich-text-editor__image-container">
              <div class="rich-text-editor__image-wrapper">
                <img src="${content}" alt="Blog image" class="rich-text-editor__image" />
              </div>
            </div>`;
  }
  
  // If content is an object with editorBlocks attribute, try to parse it
  if (typeof content === 'object' && content !== null) {
    // Check for editorBlocks stored as string
    if (content.editorBlocks && typeof content.editorBlocks === 'string') {
      try {
        const blocks = JSON.parse(content.editorBlocks);
        return processEditorContent(blocks);
      } catch (e) {
        console.error('Error parsing editorBlocks:', e);
      }
    }
    
    // Check for content directly stored in blocks property
    if (content.blocks && Array.isArray(content.blocks)) {
      return processEditorContent(content.blocks);
    }
    
    // If it has an HTML property, use that
    if (content.html && typeof content.html === 'string') {
      return content.html;
    }
    
    // Last resort: stringify the object
    try {
      return JSON.stringify(content);
    } catch (e) {
      return '<p>Content could not be displayed</p>';
    }
  }
  
  // Default fallback
  return '<p>No content available</p>';
}

/**
 * Calculates estimated reading time in minutes
 */
export function calculateReadTime(content: string): number {
  // Remove HTML tags
  const text = content.replace(/<[^>]*>/g, "");
  
  // Count words (splitting by whitespace)
  const wordCount = text.trim().split(/\s+/).length;
  
  // Calculate reading time in minutes
  const readTimeMinutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
  
  // Return at least 1 minute
  return Math.max(1, readTimeMinutes);
}

/**
 * Extracts plain text from HTML content
 */
export function extractTextFromHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

/**
 * Generates a slug from a title
 */
export function generateSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens with a single one
    .trim(); // Trim leading and trailing spaces/hyphens
}

/**
 * Helper function to get the image source for the featured image
 * @param blogPost The blog post object
 * @returns The URL for the featured image
 */
export function getImageSource(blogPost: any): string {
  // Check if blog post has a base64 encoded image
  if (typeof blogPost.content === 'string' && 
      blogPost.content.startsWith('data:image')) {
    return blogPost.content;
  }

  // Check for image in content if it's an array of blocks
  if (Array.isArray(blogPost.content)) {
    const imageBlock = blogPost.content.find(
      (block: any) => block.type === 'image'
    );
    if (imageBlock && imageBlock.src) {
      return imageBlock.src;
    } else if (imageBlock && imageBlock.content) {
      return imageBlock.content;
    }
  }
  
  // Check for editorBlocks JSON string
  if (blogPost.editorBlocks) {
    try {
      const blocks = JSON.parse(blogPost.editorBlocks);
      const imageBlock = blocks.find((block: any) => block.type === 'image');
      if (imageBlock && imageBlock.src) {
        return imageBlock.src;
      } else if (imageBlock && imageBlock.content) {
        return imageBlock.content;
      }
    } catch (e) {
      console.error('Error parsing editorBlocks for image:', e);
    }
  }
  
  // Otherwise use the regular image paths
  return blogPost.img || 
         blogPost.coverImage || 
         "/assets/img/default-blog-image.jpg";
}