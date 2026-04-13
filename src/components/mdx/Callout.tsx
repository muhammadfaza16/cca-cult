import { ReactNode } from "react";

interface CalloutProps {
  type?: "info" | "warning" | "tip" | "important";
  title?: string;
  children: ReactNode;
}

const accents: Record<string, string> = {
  info: "#0C6B7A",
  warning: "#B07D10",
  tip: "#1B6B3A",
  important: "#5B2E91",
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const col = accents[type] || accents.info;

  return (
    <div style={{
      margin: "55px 0",
      padding: "0 0 0 34px",
      borderLeft: `3px solid ${col}`,
      position: "relative",
    }}>
      {/* Large decorative quote mark */}
      <span style={{
        position: "absolute",
        top: -8,
        left: -4,
        fontFamily: "var(--font-display)",
        fontSize: 64,
        lineHeight: 1,
        color: col,
        opacity: 0.12,
        pointerEvents: "none",
        userSelect: "none",
      }}>&ldquo;</span>

      {title && (
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          letterSpacing: 2.5,
          color: col,
          marginBottom: 10,
          textTransform: "uppercase",
        }}>{title}</p>
      )}
      <div style={{
        fontFamily: "var(--font-display)",
        fontSize: 22,
        lineHeight: 1.45,
        color: "var(--ink)",
        fontStyle: "italic",
      }}>
        {children}
      </div>
    </div>
  );
}
