"use client";

import Link from "next/link";
import { T, φ } from "@/lib/tokens";

export function Footer() {
  return (
    <footer style={{
      background: T.invBg,
      color: T.invMuted,
      padding: `${φ.xl}px ${φ.lg}px`,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-start", flexWrap: "wrap", gap: φ.lg,
        }}>
          {/* Brand block */}
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
              <span style={{
                fontFamily: "var(--font-display)", fontSize: 32,
                fontWeight: 700, color: T.invFg, letterSpacing: "-0.01em",
              }}>pos·tu·late</span>
              <span style={{
                fontFamily: "var(--font-body)", fontSize: 15,
                fontStyle: "italic", color: T.invMuted,
              }}>noun.</span>
            </div>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 9,
              letterSpacing: 2, color: T.invMuted,
            }}>/ˈPÄSCHƏˌLĀT/</div>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: 13,
              fontStyle: "italic", marginTop: 16, color: T.invMuted,
            }}>A starting point for a doubting mind.</p>
          </div>

          {/* Navigation */}
          <div style={{ display: "flex", gap: φ.md, alignItems: "center", flexWrap: "wrap" }}>
            {[
              { href: "/artikel", label: "ARCHIVE" },
              { href: "/tentang", label: "ABOUT" },
              { href: "/glossarium", label: "GLOSSARY" },
            ].map(l => (
              <Link key={l.href} href={l.href} className="link-hover" style={{
                fontFamily: "var(--font-mono)", fontSize: 9,
                letterSpacing: 2,
                color: T.invMuted,
                textDecoration: "none",
              }}>{l.label}</Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          marginTop: φ.lg, paddingTop: φ.md,
          borderTop: `1px solid ${T.invBorder}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 1.5,
            color: T.invMuted,
          }}>© {new Date().getFullYear()} POSTULATE · JAKARTA, INDONESIA</span>
        </div>
      </div>
    </footer>
  );
}
