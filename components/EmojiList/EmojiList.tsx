import React from "react";
import "./EmojiList.scss";

export interface EmojiItem {
  emoji: string;
  name: string;
}

interface EmojiListProps {
  emojis: EmojiItem[];
  selectedIndex: number;
  onSelectEmoji: (emoji: string) => void;
  onMouseEnter: (index: number) => void;
}

const EmojiList: React.FC<EmojiListProps> = ({
  emojis,
  selectedIndex,
  onSelectEmoji,
  onMouseEnter,
}) => {
  return (
    <div className="emoji-list">
      {emojis.length > 0 ? (
        emojis.map((emoji, index) => (
          <button
            key={`${emoji.emoji}-${index}`} 
            className={`emoji-item ${
              selectedIndex === index ? "selected" : ""
            }`}
            title={emoji.name}
            onClick={() => onSelectEmoji(emoji.emoji)}
            onMouseEnter={() => onMouseEnter(index)}
          >
            {emoji.emoji}
          </button>
        ))
      ) : (
        <div className="emoji-no-results">No emojis found</div>
      )}
    </div>
  );
};

export default EmojiList;
