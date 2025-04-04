// types/editorTypes.ts
export enum BlockType {
  PARAGRAPH = "paragraph",
  HEADING_1 = "heading_1",
  HEADING_2 = "heading_2",
  IMAGE = "image",
  QUOTE = "quote",
  LIST_ITEM = "list_item",
  ORDERED_LIST_ITEM = "ordered_list_item",
  SEPARATOR = "separator",
}

export type Alignment = "left" | "center" | "right";

export interface BlockMeta {
  alt?: string;
  caption?: string;
  file?: File;
  [key: string]: any;
}

export interface EditorBlock {
  id: string;
  type: BlockType;
  content: string;
  alignment: Alignment;
  meta: BlockMeta;
}

export interface RichTextEditorProps {
  value?: EditorBlock[];
  onChange?: (blocks: EditorBlock[]) => void;
  onImageUpload?: (file: File) => Promise<string>;
  className?: string;
  placeholder?: string;
}
