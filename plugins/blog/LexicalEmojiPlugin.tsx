import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useState, useRef, JSX } from "react";
import { createPortal } from "react-dom";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_UP_COMMAND,
  KEY_ENTER_COMMAND,
  KEY_ESCAPE_COMMAND,
  KEY_TAB_COMMAND,
} from "lexical";
import EmojiList, { EmojiItem } from "@/components/EmojiList/EmojiList";

export const EMOJI_LIST: EmojiItem[] = [
  // Faces
  { emoji: "😀", name: "grinning face" },
  { emoji: "😃", name: "smiling face with big eyes" },
  { emoji: "😄", name: "smiling face with smiling eyes" },
  { emoji: "😁", name: "beaming face with smiling eyes" },
  { emoji: "😆", name: "grinning squinting face" },
  { emoji: "😅", name: "grinning face with sweat" },
  { emoji: "🤣", name: "rolling on the floor laughing" },
  { emoji: "😂", name: "face with tears of joy" },
  { emoji: "🙂", name: "slightly smiling face" },
  { emoji: "🙃", name: "upside-down face" },
  { emoji: "😉", name: "winking face" },
  { emoji: "😊", name: "smiling face with smiling eyes" },
  { emoji: "😇", name: "smiling face with halo" },

  // Love and Heart
  { emoji: "❤️", name: "red heart" },
  { emoji: "🧡", name: "orange heart" },
  { emoji: "💛", name: "yellow heart" },
  { emoji: "💚", name: "green heart" },
  { emoji: "💙", name: "blue heart" },
  { emoji: "💜", name: "purple heart" },
  { emoji: "🤍", name: "white heart" },
  { emoji: "🤎", name: "brown heart" },
  { emoji: "💘", name: "heart with arrow" },
  { emoji: "💖", name: "sparkling heart" },

  // Sad and Emotional
  { emoji: "😢", name: "crying face" },
  { emoji: "😭", name: "loudly crying face" },
  { emoji: "😩", name: "weary face" },
  { emoji: "🥺", name: "pleading face" },
  { emoji: "😞", name: "disappointed face" },
  { emoji: "😔", name: "pensive face" },

  // Cool and Confident
  { emoji: "😎", name: "smiling face with sunglasses" },
  { emoji: "🤓", name: "nerd face" },
  { emoji: "🧐", name: "face with monocle" },

  // Thinking and Confused
  { emoji: "🤔", name: "thinking face" },
  { emoji: "🤨", name: "face with raised eyebrow" },
  { emoji: "😕", name: "confused face" },

  // Surprised
  { emoji: "😮", name: "face with open mouth" },
  { emoji: "😲", name: "astonished face" },
  { emoji: "🤯", name: "exploding head" },

  // Hand Gestures
  { emoji: "👍", name: "thumbs up" },
  { emoji: "👎", name: "thumbs down" },
  { emoji: "👏", name: "clapping hands" },
  { emoji: "🙌", name: "raising hands" },
  { emoji: "👋", name: "waving hand" },
  { emoji: "🤝", name: "handshake" },

  // Body and Emotions
  { emoji: "💪", name: "flexed biceps" },
  { emoji: "🤞", name: "crossed fingers" },
  { emoji: "🙏", name: "folded hands" },

  // Party and Celebration
  { emoji: "🎉", name: "party popper" },
  { emoji: "🎊", name: "confetti ball" },
  { emoji: "🥳", name: "partying face" },

  // Food
  { emoji: "🍕", name: "pizza" },
  { emoji: "🍔", name: "hamburger" },
  { emoji: "🍦", name: "soft ice cream" },
  { emoji: "🍣", name: "sushi" },
  { emoji: "🍺", name: "beer mug" },
  { emoji: "☕", name: "hot beverage" },

  // Weather and Nature
  { emoji: "🌞", name: "sun with face" },
  { emoji: "⭐", name: "star" },
  { emoji: "🌈", name: "rainbow" },
  { emoji: "🌙", name: "crescent moon" },
  { emoji: "❄️", name: "snowflake" },

  // Misc
  { emoji: "🔥", name: "fire" },
  { emoji: "💡", name: "light bulb" },
  { emoji: "🚀", name: "rocket" },
  { emoji: "🌟", name: "glowing star" },
  { emoji: "🎁", name: "wrapped gift" },
];

function EmojiPicker({
  anchorElem,
  onSelectEmoji,
  onClose,
}: {
  anchorElem: HTMLElement | null;
  onClose: () => void;
  onSelectEmoji: (emoji: string) => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredEmojis, setFilteredEmojis] = useState(EMOJI_LIST);
  const [filterText, setFilterText] = useState("");
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = filterText
      ? EMOJI_LIST.filter((emoji) =>
          emoji.name.toLowerCase().includes(filterText.toLowerCase())
        )
      : EMOJI_LIST;
    setFilteredEmojis(filtered);
    setSelectedIndex(0);
  }, [filterText]);

  useEffect(() => {
    // Event listener for clicks outside the picker
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Position the emoji picker near the cursor
  const position = anchorElem
    ? anchorElem.getBoundingClientRect()
    : { top: 0, left: 0 };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredEmojis.length - 1
        );
        break;
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredEmojis.length - 1 ? prev + 1 : 0
        );
        break;
      case "Enter":
        e.preventDefault();
        if (filteredEmojis[selectedIndex]) {
          onSelectEmoji(filteredEmojis[selectedIndex].emoji);
        }
        break;
      case "Escape":
        e.preventDefault();
        onClose();
        break;
    }
  };

  return createPortal(
    <div ref={pickerRef} className="emoji-picker" onKeyDown={handleKeyDown}>
      <div className="emoji-search">
        <input
          type="text"
          placeholder="Search emojis..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          autoFocus
        />
      </div>
      <EmojiList
        emojis={filteredEmojis}
        selectedIndex={selectedIndex}
        onSelectEmoji={onSelectEmoji}
        onMouseEnter={setSelectedIndex}
      />
    </div>,
    document.body
  );
}

export default function LexicalEmojiPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [anchorElem, setAnchorElem] = useState<HTMLElement | null>(null);
  const [emojiMatch, setEmojiMatch] = useState<{
    text: string;
    start: number;
    end: number;
  } | null>(null);

  // Function to clean up multiple event listeners
  const mergeRegister = (...listeners: Array<() => void>) => {
    return () => {
      listeners.forEach((listener) => listener());
    };
  };

  // Register command to intercept key presses
  useEffect(() => {
    // Cleanup function when the plugin unmounts
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const text = editorState.read(() =>
            editor.getEditorState().read(() => {
              const selection = $getSelection();
              if ($isRangeSelection(selection)) {
                return selection.getTextContent();
              }
              return "";
            })
          );

          // Check for emoji trigger pattern (:emoji_name)
          const match = /:(\w+)$/.exec(text);
          if (match) {
            const start = match.index;
            const end = start + match[0].length;
            setEmojiMatch({ text: match[1], start, end });

            // Position the emoji picker near the cursor
            const domSelection = window.getSelection();
            if (domSelection && domSelection.rangeCount > 0) {
              const range = domSelection.getRangeAt(0);
              const rect = range.getBoundingClientRect();

              // Create a temporary anchor element for positioning
              const tempAnchor = document.createElement("span");
              tempAnchor.style.position = "absolute";
              tempAnchor.style.left = `${rect.left}px`;
              tempAnchor.style.top = `${rect.top}px`;
              document.body.appendChild(tempAnchor);

              setAnchorElem(tempAnchor);
              setShowEmojiPicker(true);
            }
          } else {
            setEmojiMatch(null);
            setShowEmojiPicker(false);
            if (anchorElem && anchorElem.parentNode) {
              anchorElem.parentNode.removeChild(anchorElem);
              setAnchorElem(null);
            }
          }
        });
      }),

      editor.registerCommand(
        KEY_ESCAPE_COMMAND,
        () => {
          if (showEmojiPicker) {
            setShowEmojiPicker(false);
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_ENTER_COMMAND,
        () => {
          if (showEmojiPicker) {
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_TAB_COMMAND,
        () => {
          if (showEmojiPicker) {
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_ARROW_DOWN_COMMAND,
        () => {
          if (showEmojiPicker) {
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_ARROW_UP_COMMAND,
        () => {
          if (showEmojiPicker) {
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor, showEmojiPicker, anchorElem]);

  const handleSelectEmoji = useCallback(
    (emoji: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection) && emojiMatch) {
          // Calculate how many characters to delete (the :emoji part)
          const textToDelete = `:${emojiMatch.text}`;

          // Delete that many characters backward
          // Replace the :emoji text with the selected emoji
          selection.insertText(emoji);
        }
      });

      setShowEmojiPicker(false);
      setEmojiMatch(null);

      // Clean up the anchor element
      if (anchorElem && anchorElem.parentNode) {
        anchorElem.parentNode.removeChild(anchorElem);
        setAnchorElem(null);
      }
    },
    [editor, emojiMatch, anchorElem]
  );

  const handleClose = useCallback(() => {
    setShowEmojiPicker(false);
    setEmojiMatch(null);

    // Clean up the anchor element
    if (anchorElem && anchorElem.parentNode) {
      anchorElem.parentNode.removeChild(anchorElem);
      setAnchorElem(null);
    }
  }, [anchorElem]);

  // Only render the emoji picker when it should be shown
  return showEmojiPicker && anchorElem ? (
    <EmojiPicker
      anchorElem={anchorElem}
      onSelectEmoji={handleSelectEmoji}
      onClose={handleClose}
    />
  ) : null;
}
