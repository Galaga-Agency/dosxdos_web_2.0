import { $getRoot, $createParagraphNode, $createTextNode, $isElementNode } from "lexical";
import { $createHeadingNode } from "@lexical/rich-text";
import { $createListItemNode, $createListNode } from "@lexical/list";
import { $createImageNode } from "../nodes/image";
import { EditorBlock } from "@/types/blog-post-types";

/**
 * Convert from EditorBlock[] to Lexical nodes
 */
export function $convertToLexicalState(blocks: EditorBlock[]) {
  // Get the editor root
  const root = $getRoot();
  
  // Clear existing content
  root.clear();
  
  // Convert each block to Lexical nodes
  blocks.forEach(block => {
    switch (block.type) {
      case "paragraph": {
        const paragraphNode = $createParagraphNode();
        if (block.alignment) {
          paragraphNode.setFormat(block.alignment);
        }
        
        // Add content - handle HTML content if needed
        if (block.content) {
          // For simplicity, just create a text node
          // In a complete implementation, you would parse HTML
          const textNode = $createTextNode(block.content);
          paragraphNode.append(textNode);
        }
        
        root.append(paragraphNode);
        break;
      }
      
      case "heading_1": {
        const headingNode = $createHeadingNode("h1");
        if (block.alignment) {
          headingNode.setFormat(block.alignment);
        }
        
        // Add content
        if (block.content) {
          const textNode = $createTextNode(block.content);
          headingNode.append(textNode);
        }
        
        root.append(headingNode);
        break;
      }
      
      case "heading_2": {
        const headingNode = $createHeadingNode("h2");
        if (block.alignment) {
          headingNode.setFormat(block.alignment);
        }
        
        // Add content
        if (block.content) {
          const textNode = $createTextNode(block.content);
          headingNode.append(textNode);
        }
        
        root.append(headingNode);
        break;
      }
      
      case "quote": {
        const quoteNode = $createParagraphNode();
        quoteNode.setFormat('left'); // Replace 'left' with a valid ElementFormatType if needed
        
        // Add content
        if (block.content) {
          const textNode = $createTextNode(block.content);
          quoteNode.append(textNode);
        }
        
        root.append(quoteNode);
        break;
      }
      
      case "list_item": {
        const listNode = $createListNode("bullet");
        const listItemNode = $createListItemNode();
        
        // Add content
        if (block.content) {
          const textNode = $createTextNode(block.content);
          listItemNode.append(textNode);
        }
        
        listNode.append(listItemNode);
        root.append(listNode);
        break;
      }
      
      case "ordered_list_item": {
        const listNode = $createListNode("number");
        const listItemNode = $createListItemNode();
        
        // Add content
        if (block.content) {
          const textNode = $createTextNode(block.content);
          listItemNode.append(textNode);
        }
        
        listNode.append(listItemNode);
        root.append(listNode);
        break;
      }
      
      case "image": {
        if (block.content) {
          const imageNode = $createImageNode({
            src: block.content,
            altText: block.meta?.alt || "Blog image",
            caption: block.meta?.caption
          });
          
          root.append(imageNode);
        }
        break;
      }
      
      case "separator": {
        const separatorNode = $createImageNode({
          src: "separator",
          altText: "horizontal rule"
        });
        
        root.append(separatorNode);
        break;
      }
    }
  });
}

/**
 * Convert from Lexical state to EditorBlock[]
 */
export function $convertFromLexicalState(): EditorBlock[] {
  const blocks: EditorBlock[] = [];
  const root = $getRoot();
  
  // Convert each node to EditorBlock
  root.getChildren().forEach(node => {
    if ($isElementNode(node)) {
      const type = node.getType();
      const format = node.getFormat();
      
      switch (type) {
        case 'paragraph': {
          if (String(format) === 'format-quote') {
            // This is a quote
            blocks.push({
              id: `block-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
              type: "quote",
              content: node.getTextContent(),
              alignment: "left"
            });
          } else {
            // Regular paragraph
            blocks.push({
              id: `block-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
              type: "paragraph",
              content: node.getTextContent(),
              alignment: format as any || "left"
            });
          }
          break;
        }
        
        case 'heading': {
          const tag = (node as any).getTag?.() || (node as any).__tag || "p";
          
          if (tag === 'h1') {
            blocks.push({
              id: `block-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
              type: "heading_1",
              content: node.getTextContent(),
              alignment: format as any || "left"
            });
          } else if (tag === 'h2') {
            blocks.push({
              id: `block-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
              type: "heading_2",
              content: node.getTextContent(),
              alignment: format as any || "left"
            });
          }
          break;
        }
        
        case 'list': {
          const listType = (node as any).getListType?.();
          
          node.getChildren().forEach(listItemNode => {
            if ($isElementNode(listItemNode)) {
              blocks.push({
                id: `block-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                type: listType === 'bullet' ? "list_item" : "ordered_list_item",
                content: listItemNode.getTextContent(),
                alignment: "left"
              });
            }
          });
          break;
        }
        
        case 'image': {
          // This is handled by the ImageNode class
          // We'll extract the necessary properties
          const imageNode = node;
          
          if ((imageNode as any).__src === 'separator') {
            blocks.push({
              id: `block-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
              type: "separator",
              content: "",
              alignment: "left"
            });
          } else {
            blocks.push({
              id: `block-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
              type: "image",
              content: (imageNode as any).__src,
              alignment: "left",
              meta: {
                alt: (imageNode as any).__altText || "",
                caption: (imageNode as any).__caption || ""
              }
            });
          }
          break;
        }
      }
    }
  });
  
  return blocks;
}