import { $getRoot, $isElementNode, $isTextNode, LexicalNode } from "lexical";
import { $isHeadingNode, $isQuoteNode } from "@lexical/rich-text";
import { $isListNode, $isListItemNode } from "@lexical/list";
import { $isLinkNode } from "@lexical/link";
import { $isImageNode } from "@/nodes/image";
import { EditorBlock } from "@/types/blog-post-types";

// Convert Lexical state to our custom EditorBlock format
export function $convertFromLexicalState(): EditorBlock[] {
  const blocks: EditorBlock[] = [];
  const root = $getRoot();

  // Process all top-level nodes
  root.getChildren().forEach((node) => {
    processNode(node, blocks);
  });

  return blocks;
}

// Process a node and convert it to an EditorBlock
function processNode(node: LexicalNode, blocks: EditorBlock[]) {
  // Handle different node types
  if ($isHeadingNode(node)) {
    // Heading nodes
    const tag = node.getTag();
    const level = parseInt(tag.substring(1), 10); // h1 -> 1, h2 -> 2, etc.
    
    blocks.push({
      type: "heading",
      level,
      content: getTextContent(node),
    });
  } else if ($isQuoteNode(node)) {
    // Quote nodes
    blocks.push({
      type: "quote",
      content: getTextContent(node),
    });
  } else if ($isListNode(node)) {
    // List nodes
    const listType = node.getListType();
    
    blocks.push({
      type: "list",
      listType: listType === "bullet" ? "unordered" : "ordered",
      items: getListItems(node),
    });
  } else if ($isImageNode(node)) {
    // Image nodes
    blocks.push({
      type: "image",
      content: node.getSrc(),
      altText: node.getAltText(),
    });
  } else if ($isElementNode(node)) {
    // Generic element nodes (paragraphs, etc.)
    // Skip empty paragraphs
    const content = getTextContent(node);
    if (content.trim() !== "") {
      blocks.push({
        type: "paragraph",
        content,
      });
    }
  }
}

// Get text content from a node, preserving formatting
function getTextContent(node: LexicalNode): string {
  let content = "";
  
  // If it's a text node, get the text
  if ($isTextNode(node)) {
    let text = node.getTextContent();
    
    // Apply text formatting
    if (node.hasFormat("bold")) text = `<strong>${text}</strong>`;
    if (node.hasFormat("italic")) text = `<em>${text}</em>`;
    if (node.hasFormat("underline")) text = `<u>${text}</u>`;
    if (node.hasFormat("strikethrough")) text = `<s>${text}</s>`;
    if (node.hasFormat("highlight")) text = `<mark>${text}</mark>`;
    
    content += text;
  } else if ($isLinkNode(node)) {
    // Handle link nodes
    const url = node.getURL();
    const linkText = getTextContent(node.getChildren()[0]);
    content += `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
  } else if ($isElementNode(node)) {
    // Recursively process element nodes
    node.getChildren().forEach((child) => {
      content += getTextContent(child);
    });
  }
  
  return content;
}

// Extract list items from a list node
function getListItems(node: LexicalNode): string[] {
  const items: string[] = [];
  
  if ($isListNode(node)) {
    node.getChildren().forEach((child) => {
      if ($isListItemNode(child)) {
        items.push(getTextContent(child));
      }
    });
  }
  
  return items;
}

// Convert HTML back to Lexical state (to be implemented if needed)
export function $convertToLexicalState(blocks: EditorBlock[]) {
  // This would convert your custom block format back to Lexical state
  // Implementation depends on your specific use case
}