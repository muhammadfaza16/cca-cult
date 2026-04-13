"use client";

import { ReactNode, useState } from "react";

interface ThinkAboutProps {
  prompt: string;
  children?: ReactNode;
}

export function ThinkAbout({ prompt, children }: ThinkAboutProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div style={{
      margin: "55px 0",
      background: "var(--white)",
      border: "1px solid var(--border)",
      overflow: "hidden",
    }}>
      {/* Gold top bar */}
      <div style={{ height: 3, background: "#B07D10" }} />

      <div style={{ padding: "21px 34px" }}>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          letterSpacing: 2.5,
          color: "#B07D10",
          marginBottom: 14,
        }}>COBA PIKIRKAN</p>

        <p style={{
          fontFamily: "var(--font-display)",
          fontSize: 22,
          fontWeight: 500,
          lineHeight: 1.35,
          letterSpacing: "-0.01em",
          color: "var(--ink)",
          margin: 0,
        }}>{prompt}</p>
      </div>

      {children && (
        <>
          {!revealed ? (
            <button
              onClick={() => setRevealed(true)}
              style={{
                width: "100%",
                padding: "13px 34px",
                background: "var(--faint)",
                border: "none",
                borderTop: "1px solid var(--border)",
                color: "#B07D10",
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: 2.5,
                cursor: "pointer",
                textAlign: "left",
                transition: "background .15s",
              }}
            >
              TAMPILKAN PEMBAHASAN →
            </button>
          ) : (
            <div style={{
              padding: "21px 34px",
              borderTop: "1px solid var(--border)",
              background: "var(--faint)",
              animation: "fadeIn .3s ease",
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 10, marginBottom: 12,
              }}>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: 2.5,
                  color: "var(--subtle)",
                }}>PEMBAHASAN</span>
                <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
              </div>
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                lineHeight: 1.7,
                color: "var(--muted)",
              }}>
                {children}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
