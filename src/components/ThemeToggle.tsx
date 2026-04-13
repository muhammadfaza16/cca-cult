"use client";

import { useTheme } from "./ThemeProvider";
import { φ } from "@/lib/tokens";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Aktifkan mode gelap" : "Aktifkan mode terang"}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        width: 34,
        height: 34,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid var(--border)",
        background: "none",
        color: "var(--muted)",
        cursor: "pointer",
        transition: "all .2s",
        flexShrink: 0,
      }}
    >
      {theme === "light" ? "☾" : "☀"}
    </button>
  );
}
