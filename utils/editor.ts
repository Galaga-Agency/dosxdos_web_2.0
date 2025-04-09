import { v4 as uuidv4 } from "uuid";
import { BlockType, EditorBlock, Alignment } from "@/types/editor-types";

/**
 * Converts a Lexical editor state to the EditorBlock format used in the app
 */
export function lexicalToEditorBlocks(lexicalState: string): EditorBlock[] {
  try {
    const parsedState = JSON.parse(lexicalState);
    const blocks: EditorBlock[] = [];

    // Process the root node and its children
    if (parsedState && parsedState.root && parsedState.root.children) {
      processChildren(parsedState.root.children, blocks);
    }

    return blocks;
  } catch (error) {
    console.error("Error converting Lexical state to EditorBlocks:", error);
    return [];
  }
}

function processChildren(children: any[], blocks: EditorBlock[]) {
  children.forEach((node) => {
    switch (node.type) {
      case "paragraph":
        processParagraph(node, blocks);
        break;
      case "heading":
        processHeading(node, blocks);
        break;
      case "image":
        processImage(node, blocks);
        break;
      case "quote":
        processQuote(node, blocks);
        break;
      case "list":
        processList(node, blocks);
        break;
      // Add other node types as needed
    }
  });
}

function processParagraph(node: any, blocks: EditorBlock[]) {
  let content = "";
  let alignment: Alignment = "left";

  // Get alignment if present
  if (node.format === 1) alignment = "center";
  else if (node.format === 2) alignment = "right";
  else if (node.format === 3) alignment = "right"; // Justify is not in Alignment type, using right

  // Extract text content from paragraph
  if (node.children) {
    content = extractTextContent(node.children);
  }

  blocks.push({
    id: uuidv4(),
    type: BlockType.PARAGRAPH,
    content,
    alignment,
    meta: {},
  });
}

function processHeading(node: any, blocks: EditorBlock[]) {
  let content = "";
  let alignment: Alignment = "left";

  // Get alignment if present
  if (node.format === 1) alignment = "center";
  else if (node.format === 2) alignment = "right";
  else if (node.format === 3) alignment = "right"; // Justify is not in Alignment type

  // Extract text content
  if (node.children) {
    content = extractTextContent(node.children);
  }

  // Map Lexical heading tag to BlockType
  let type: BlockType;
  switch (node.tag) {
    case "h1":
      type = BlockType.HEADING_1;
      break;
    case "h2":
      type = BlockType.HEADING_2;
      break;
    default:
      type = BlockType.HEADING_1; // Default to h1 for other heading levels
  }

  blocks.push({
    id: uuidv4(),
    type,
    content,
    alignment,
    meta: {},
  });
}

function processImage(node: any, blocks: EditorBlock[]) {
  // Make sure we have a valid URL from the node
  const imageUrl = node.src || "";

  // Add a check to prevent duplicate images
  const existingImageBlock = blocks.find(
    (block) => block.type === BlockType.IMAGE && block.content === imageUrl
  );

  if (imageUrl && !existingImageBlock) {
    blocks.push({
      id: uuidv4(),
      type: BlockType.IMAGE,
      content: imageUrl,
      alignment: "center" as Alignment,
      meta: {
        alt: node.altText || "",
        caption: node.caption || "",
      },
    });
  }
}

function processQuote(node: any, blocks: EditorBlock[]) {
  let content = "";

  // Extract text content
  if (node.children) {
    content = extractTextContent(node.children);
  }

  blocks.push({
    id: uuidv4(),
    type: BlockType.QUOTE,
    content,
    alignment: "left",
    meta: {},
  });
}

function processList(node: any, blocks: EditorBlock[]) {
  if (node.children && node.children.length > 0) {
    const isOrdered = node.listType === "number";

    node.children.forEach((item: any) => {
      if (item.type === "listitem" && item.children) {
        const content = extractTextContent(item.children);

        blocks.push({
          id: uuidv4(),
          type: isOrdered ? BlockType.ORDERED_LIST_ITEM : BlockType.LIST_ITEM,
          content,
          alignment: "left",
          meta: {},
        });
      }
    });
  }
}

/**
 * Extract text content from Lexical node children, preserving formatting
 */
function extractTextContent(children: any[]): string {
  let content = "";

  children.forEach((child) => {
    if (child.type === "text") {
      let text = child.text || "";

      // Apply text formatting
      if (child.format > 0) {
        const formats = decodeTextFormat(child.format);

        if (formats.bold) text = `<strong>${text}</strong>`;
        if (formats.italic) text = `<em>${text}</em>`;
        if (formats.underline) text = `<u>${text}</u>`;
        if (formats.strikethrough) text = `<s>${text}</s>`;
        if (formats.code) text = `<code>${text}</code>`;
      }

      content += text;
    } else if (child.type === "link" && child.children) {
      const linkText = extractTextContent(child.children);
      content += `<a href="${child.url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
    } else if (child.children) {
      // Recursive call for nested elements
      content += extractTextContent(child.children);
    }
  });

  return content;
}

/**
 * Decode Lexical text format bitmap
 */
function decodeTextFormat(format: number): {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  code: boolean;
} {
  return {
    bold: (format & 1) !== 0,
    italic: (format & 2) !== 0,
    underline: (format & 4) !== 0,
    strikethrough: (format & 8) !== 0,
    code: (format & 16) !== 0,
  };
}

/**
 * Converts EditorBlocks to a Lexical editor state string
 * This is a simplified implementation that may need to be expanded
 */
export function editorBlocksToLexical(blocks: EditorBlock[]): string {
  const children = blocks.map((block) => {
    switch (block.type) {
      case BlockType.PARAGRAPH:
        return createParagraphNode(
          block.content,
          getFormatFromAlignment(block.alignment)
        );
      case BlockType.HEADING_1:
        return createHeadingNode(
          block.content,
          "h1",
          getFormatFromAlignment(block.alignment)
        );
      case BlockType.HEADING_2:
        return createHeadingNode(
          block.content,
          "h2",
          getFormatFromAlignment(block.alignment)
        );
      case BlockType.IMAGE:
        return createImageNode(
          block.content,
          block.meta?.alt ?? "",
          block.meta?.caption ?? ""
        );
      case BlockType.QUOTE:
        return createQuoteNode(block.content);
      case BlockType.LIST_ITEM:
      case BlockType.ORDERED_LIST_ITEM:
        return createListNode(
          block.type === BlockType.ORDERED_LIST_ITEM ? "number" : "bullet",
          [block.content]
        );
      default:
        return createParagraphNode(block.content, 0);
    }
  });

  const lexicalState = {
    root: {
      children,
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  };

  return JSON.stringify(lexicalState);
}

function getFormatFromAlignment(alignment: Alignment): number {
  switch (alignment) {
    case "center":
      return 1;
    case "right":
      return 2;
    default:
      return 0; // "left"
  }
}

function createParagraphNode(content: string, format: number = 0): any {
  return {
    children: parseContentToChildren(content),
    direction: "ltr",
    format,
    indent: 0,
    type: "paragraph",
    version: 1,
  };
}

function createHeadingNode(
  content: string,
  tag: string,
  format: number = 0
): any {
  return {
    children: parseContentToChildren(content),
    direction: "ltr",
    format,
    indent: 0,
    type: "heading",
    tag,
    version: 1,
  };
}

function createImageNode(src: string, altText: string, caption: string): any {
  // Ensure we have a valid URL
  if (!src) {
    console.warn("Attempted to create image node with empty src");
    return null; // Skip this node if src is empty
  }

  return {
    altText,
    caption,
    src,
    type: "image",
    version: 1,
  };
}

function createQuoteNode(content: string): any {
  return {
    children: parseContentToChildren(content),
    direction: "ltr",
    format: 0,
    indent: 0,
    type: "quote",
    version: 1,
  };
}

function createListNode(listType: "bullet" | "number", items: string[]): any {
  return {
    children: items.map((item) => ({
      children: parseContentToChildren(item),
      direction: "ltr",
      format: 0,
      indent: 0,
      type: "listitem",
      version: 1,
      value: 1,
    })),
    direction: "ltr",
    format: 0,
    indent: 0,
    type: "list",
    listType,
    start: 1,
    version: 1,
  };
}

/**
 * Parse HTML content string to Lexical node children
 * This is a simplified implementation that extracts text and preserves basic formatting
 */
function parseContentToChildren(content: string): any[] {
  // If the content doesn't have HTML tags, return a simple text node
  if (!content.includes("<")) {
    return [createTextNode(content)];
  }

  // For this simplified implementation, we'll strip HTML tags and create a simple text node
  // In a real implementation, you'd want to parse the HTML and create appropriate formatting
  const plainText = content.replace(/<[^>]*>/g, "");
  return [createTextNode(plainText)];
}

function createTextNode(text: string, format: number = 0): any {
  return {
    detail: 0,
    format,
    mode: "normal",
    style: "",
    text,
    type: "text",
    version: 1,
  };
}

/**
 * Function to convert between Lexical JSON state and EditorBlocks
 * This handles both directions of conversion
 */
export function convertEditorFormat(
  data: string | EditorBlock[],
  toFormat: "lexical" | "blocks"
): string | EditorBlock[] {
  if (toFormat === "lexical") {
    // Convert EditorBlocks to Lexical state
    return editorBlocksToLexical(data as EditorBlock[]);
  } else {
    // Convert Lexical state to EditorBlocks
    return lexicalToEditorBlocks(data as string);
  }
}

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
          return `<p${getAlignmentStyle(block.alignment)}>${block.content}</p>`;

        case "heading_1":
          return `<h1${getAlignmentStyle(block.alignment)}>${
            block.content
          }</h1>`;

        case "heading_2":
          return `<h2${getAlignmentStyle(block.alignment)}>${
            block.content
          }</h2>`;

        case "image":
          console.log(
            "[processEditorContent] Processing image with src:",
            block.content
          );
          return `
            <div class="rich-text-editor__image-container">
              <div class="rich-text-editor__image-wrapper">
                <img src="${block.content}" alt="${
            block.meta?.alt || ""
          }" class="rich-text-editor__image" />
                ${
                  block.meta?.caption
                    ? `<figcaption class="rich-text-editor__image-caption">${block.meta.caption}</figcaption>`
                    : ""
                }
              </div>
            </div>
          `;

        case "list_item":
          return `<ul class="editor-list-ul"><li class="editor-list-li">${block.content}</li></ul>`;

        case "ordered_list_item":
          return `<ol class="editor-list-ol"><li class="editor-list-li">${block.content}</li></ol>`;

        case "quote":
          return `
            <blockquote class="rich-text-editor__quote">
              <p>${block.content}</p>
              ${
                block.meta?.citation
                  ? `<cite>${block.meta.citation}</cite>`
                  : ""
              }
            </blockquote>
          `;

        case "separator":
          return `<hr class="rich-text-editor__separator" />`;

        default:
          return `<p>${block.content}</p>`;
      }
    })
    .join("\n");
}

/**
 * Helper function to get style attribute for text alignment
 */
function getAlignmentStyle(alignment?: string): string {
  // Default to left if undefined
  const align = alignment || "left";
  if (align === "left") return "";
  return ` style="text-align: ${align}"`;
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
  if (
    typeof blogPost.content === "string" &&
    blogPost.content.startsWith("data:image")
  ) {
    return blogPost.content;
  }

  // Check for image in content if it's an array of blocks
  if (Array.isArray(blogPost.editorBlocks)) {
    try {
      const blocks = JSON.parse(blogPost.editorBlocks);
      const imageBlock = blocks.find((block: any) => block.type === "image");
      if (imageBlock && imageBlock.content) {
        return imageBlock.content;
      }
    } catch (e) {
      console.error("Error parsing editorBlocks:", e);
    }
  }

  // Otherwise use the regular image paths
  return blogPost.coverImage || "/assets/img/default-blog-image.jpg";
}

/**
 * Safely formats blog content for display, handling different content formats
 */
export function formatBlogContent(content: any): string {
  // Check if the content is a string that includes HTML tags
  if (typeof content === "string") {
    // If it's already HTML (contains tags), return it directly
    if (content.includes("<") && content.includes(">")) {
      return content;
    }
    // If it's plain text, wrap it in paragraph tags
    return `<p>${content}</p>`;
  }

  // If content is an array of editor blocks
  if (Array.isArray(content)) {
    if (
      content.length > 0 &&
      typeof content[0] === "object" &&
      content[0].type
    ) {
      // Process array of editor blocks
      return processEditorContent(content);
    } else {
      // If it's an array of strings, join with paragraph tags
      return content.map((item) => `<p>${item}</p>`).join("\n");
    }
  }

  // Handle base64 encoded images that might be stored directly in content
  if (typeof content === "string" && content.startsWith("data:image")) {
    return `<div class="rich-text-editor__image-container">
              <div class="rich-text-editor__image-wrapper">
                <img src="${content}" alt="Blog image" class="rich-text-editor__image" />
              </div>
            </div>`;
  }

  // If content is an object with editorBlocks attribute, try to parse it
  if (typeof content === "object" && content !== null) {
    // Check for editorBlocks stored as string
    if (content.editorBlocks && typeof content.editorBlocks === "string") {
      try {
        const blocks = JSON.parse(content.editorBlocks);
        return processEditorContent(blocks);
      } catch (e) {
        console.error("Error parsing editorBlocks:", e);
      }
    }

    // Check for content directly stored in blocks property
    if (content.blocks && Array.isArray(content.blocks)) {
      return processEditorContent(content.blocks);
    }

    // If it has an HTML property, use that
    if (content.html && typeof content.html === "string") {
      return content.html;
    }

    // Last resort: stringify the object
    try {
      return JSON.stringify(content);
    } catch (e) {
      return "<p>Content could not be displayed</p>";
    }
  }

  // Default fallback
  return "<p>No content available</p>";
}
