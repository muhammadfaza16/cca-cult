import { ReactNode } from "react";

interface KeyConceptProps {
  title: string;
  children: ReactNode;
}

export function KeyConcept({ title, children }: KeyConceptProps) {
  return (
    <div style={{
      margin: "55px 0",
      background: "var(--white)",
      border: "1px solid var(--border)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Top accent bar */}
      <div style={{
        height: 3,
        background: "linear-gradient(90deg, #5B2E91, #0C6B7A)",
      }} />

      <div style={{ padding: "21px 34px" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 13,
          marginBottom: 13,
        }}>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: 2.5,
            color: "var(--muted)",
          }}>KONSEP KUNCI</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        <h4 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: 24,
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
          color: "var(--ink)",
          marginBottom: 12,
        }}>{title}</h4>

        <div style={{
          fontFamily: "var(--font-body)",
          fontSize: 15,
          lineHeight: 1.7,
          color: "var(--muted)",
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}
