"use client"

import { useThemeStore } from "@/store/themeStore";

export const ThemeToggle = () => {
  const { theme, setTheme } = useThemeStore();

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
    >
      {theme === "light" && "🌞"}
      {theme === "dark" && "🌙"}
      {theme === "system" && "💻"}
    </button>
  );
};
