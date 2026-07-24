"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Aktifkan mode gelap" : "Aktifkan mode terang"}
      style={{
        width: 38,
        height: 38,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid var(--border)",
        background: "var(--white)",
        color: "var(--ink)",
        cursor: "pointer",
        transition: "transform 0.3s ease, border-color 0.2s ease",
        flexShrink: 0,
        borderRadius: "50%",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "var(--gold)";
        e.currentTarget.style.transform = "scale(1.08)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <div style={{ position: "relative", width: 18, height: 18 }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            position: "absolute",
            inset: 0,
            transform: theme === "dark" ? "rotate(90deg) scale(0)" : "rotate(0) scale(1)",
            opacity: theme === "dark" ? 0 : 1,
            transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease",
            color: "var(--gold)",
          }}
        >
          <circle cx="12" cy="12" r="4" fill="var(--gold)" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="M4.93 4.93l1.41 1.41" />
          <path d="M17.66 17.66l1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="M6.34 17.66l-1.41 1.41" />
          <path d="M19.07 4.93l-1.41 1.41" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            position: "absolute",
            inset: 0,
            transform: theme === "light" ? "rotate(-90deg) scale(0)" : "rotate(0) scale(1)",
            opacity: theme === "light" ? 0 : 1,
            transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease",
            color: "#A5B1C2",
          }}
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="currentColor" />
        </svg>
      </div>
    </button>
  );
}
