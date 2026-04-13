import { ReactNode } from "react";

interface AnalogyBlockProps {
  children: ReactNode;
}

export function AnalogyBlock({ children }: AnalogyBlockProps) {
  return (
    <div style={{
      margin: "55px 0",
      padding: "34px 34px 34px 34px",
      background: "#0C6B7A08",
      borderLeft: "4px solid #0C6B7A",
      position: "relative",
    }}>
      {/* Icon */}
      <div style={{
        position: "absolute",
        top: 20,
        right: 24,
        fontFamily: "var(--font-display)",
        fontSize: 42,
        color: "#0C6B7A",
        opacity: 0.08,
        lineHeight: 1,
        pointerEvents: "none",
      }}>↻</div>

      <p style={{
        fontFamily: "var(--font-mono)",
        fontSize: 9,
        letterSpacing: 2.5,
        color: "#0C6B7A",
        marginBottom: 12,
      }}>BAYANGKAN SEPERTI INI</p>

      <div style={{
        fontFamily: "var(--font-body)",
        fontSize: 16.5,
        lineHeight: 1.75,
        fontStyle: "italic",
        color: "var(--ink)",
      }}>
        {children}
      </div>
    </div>
  );
}
