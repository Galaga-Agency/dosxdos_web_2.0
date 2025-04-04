import React, { useMemo, useCallback } from "react";
import {
  createEditor,
  Transforms,
  Editor,
  Text,
  Descendant,
  Element as SlateElement,
  BaseEditor,
} from "slate";
import {
  Slate,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps,
  ReactEditor,
} from "slate-react";
import { HistoryEditor, withHistory } from "slate-history";
import "./PortableTextEditor.scss";

type CustomElement =
  | { type: "paragraph"; children: CustomText[] }
  | { type: "block-quote"; children: CustomText[] }
  | { type: "heading-one"; children: CustomText[] }
  | { type: "heading-two"; children: CustomText[] }
  | { type: "heading-three"; children: CustomText[] }
  | {
      type: "image";
      url: string;
      alt?: string;
      children: CustomText[];
    };

type CustomText = {
  text: string;
  bold?: true;
  italic?: true;
  underline?: true;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const CustomElement: React.FC<RenderElementProps> = ({
  attributes,
  children,
  element,
}) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "heading-three":
      return <h3 {...attributes}>{children}</h3>;
    case "image":
      return (
        <img
          {...attributes}
          src={element.url}
          alt={element.alt || ""}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf: React.FC<RenderLeafProps> = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  return <span {...attributes}>{children}</span>;
};

interface PortableTextEditorProps {
  initialValue?: Descendant[];
  onChange: (value: Descendant[]) => void;
}

const PortableTextEditor: React.FC<PortableTextEditorProps> = ({
  initialValue = [
    {
      type: "paragraph",
      children: [{ text: "Comienza a escribir tu contenido aquí..." }],
    },
  ],
  onChange,
}) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const renderElement = useCallback(
    (props: RenderElementProps) => <CustomElement {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );

  const toggleFormat = (format: "bold" | "italic" | "underline") => {
    const isActive = isFormatActive(editor, format);
    Transforms.setNodes(
      editor,
      { [format]: isActive ? null : true },
      { match: Text.isText, split: true }
    );
  };

  const insertBlock = (blockType: CustomElement["type"]) => {
    const newBlock: CustomElement =
      blockType === "image"
        ? { type: "image", url: "", children: [{ text: "" }] }
        : { type: blockType, children: [{ text: "" }] };
    Transforms.insertNodes(editor, newBlock);
  };

  return (
    <div className="portable-text-editor">
      <div className="editor-toolbar">
        <div className="toolbar-group">
          <button onClick={() => toggleFormat("bold")}>Negrita</button>
          <button onClick={() => toggleFormat("italic")}>Cursiva</button>
          <button onClick={() => toggleFormat("underline")}>Subrayado</button>
        </div>
        <div className="toolbar-group">
          <button onClick={() => insertBlock("heading-one")}>Título 1</button>
          <button onClick={() => insertBlock("heading-two")}>Título 2</button>
          <button onClick={() => insertBlock("heading-three")}>Título 3</button>
          <button onClick={() => insertBlock("block-quote")}>Cita</button>
        </div>
        <div className="toolbar-group">
          <button
            onClick={() => {
              const url = prompt("Introduce la URL de la imagen:");
              const alt = prompt("Introduce un texto alternativo:");
              if (url) {
                const imageNode: CustomElement = {
                  type: "image",
                  url,
                  alt: alt || "",
                  children: [{ text: "" }],
                };
                Transforms.insertNodes(editor, imageNode);
              }
            }}
          >
            Insertar Imagen
          </button>
        </div>
      </div>
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={(value) => {
          const isAstChange = editor.operations.some(
            (op) => op.type !== "set_selection"
          );
          if (isAstChange) {
            onChange(value);
          }
        }}
      >
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Escribe aquí..."
          className="editor-content"
        />
      </Slate>
    </div>
  );
};

const isFormatActive = (editor: Editor, format: string) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => (n as any)[format] === true,
    mode: "all",
  });
  return !!match;
};

export default PortableTextEditor;
