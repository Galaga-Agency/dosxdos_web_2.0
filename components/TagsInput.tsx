import React, { useState } from "react";

interface TagsInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  disabled?: boolean;
  placeholder?: string;
  inputId?: string;
}

const TagsInput: React.FC<TagsInputProps> = ({
  tags,
  onTagsChange,
  disabled = false,
  placeholder,
  inputId,
}) => {
  const [tagInput, setTagInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        onTagsChange([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="form-group">
      <label htmlFor="tags">Etiquetas</label>
      <input
        type="text"
        id="tags"
        className="form-input"
        placeholder="Presiona Enter para agregar"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <div className="tag-list">
        {tags.map((tag) => (
          <div key={tag} className="tag-item">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="tag-remove"
              aria-label="Eliminar etiqueta"
              disabled={disabled}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsInput;
