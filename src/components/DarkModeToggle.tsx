"use client";

import { useThemeStore } from "@/store/themeStore";
export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useThemeStore();
  return <button onClick={toggleDarkMode}>{darkMode ? "Dark" : "Light"} Mode</button>;
}
