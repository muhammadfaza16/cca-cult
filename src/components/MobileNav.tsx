"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

interface NavLink {
  href: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { href: "/artikel", label: "ARCHIVE" },
  { href: "/tentang", label: "ABOUT" },
  { href: "/glossarium", label: "GLOSSARY" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {/* ─── Desktop nav (hidden on mobile via CSS) ─── */}
      <nav className="nav-desktop" style={{
        display: "flex", gap: 8, alignItems: "center",
      }}>
        {NAV_LINKS.map(l => (
          <Link key={l.href} href={l.href} className="link-hover" style={{
            fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 2,
            color: "var(--muted)", textDecoration: "none",
            padding: "8px 14px",
            border: "1px solid var(--border)",
          }}>{l.label}</Link>
        ))}
      </nav>

      {/* ─── Burger button (mobile only via CSS) ─── */}
      <button
        className="nav-burger"
        onClick={() => setOpen(!open)}
        aria-label="Menu navigasi"
        style={{
          display: "none",
          alignItems: "center", justifyContent: "center",
          width: 40, height: 40,
          border: "1px solid var(--border)",
          background: "none",
          cursor: "pointer",
          flexDirection: "column",
          gap: open ? 0 : 5,
          padding: 10,
          position: "relative",
          zIndex: 200,
        }}
      >
        <span style={{
          display: "block", width: 18, height: 1.5,
          background: "var(--ink)",
          transition: "all .25s ease",
          transform: open ? "rotate(45deg) translateY(0)" : "none",
          transformOrigin: "center",
          position: open ? "absolute" : "relative",
        }} />
        {!open && <span style={{
          display: "block", width: 18, height: 1.5,
          background: "var(--ink)",
          transition: "all .25s ease",
        }} />}
        <span style={{
          display: "block", width: 18, height: 1.5,
          background: "var(--ink)",
          transition: "all .25s ease",
          transform: open ? "rotate(-45deg) translateY(0)" : "none",
          transformOrigin: "center",
          position: open ? "absolute" : "relative",
        }} />
      </button>

      {/* ─── Mobile dropdown overlay ─── */}
      {open && (
        <div style={{
          position: "fixed",
          inset: 0,
          top: 55,
          zIndex: 150,
          background: "var(--bg)",
          borderTop: "1px solid var(--border)",
          animation: "fadeUp .2s ease",
        }}>
          <div style={{
            display: "flex", flexDirection: "column",
            padding: "34px 21px",
            gap: 4,
          }}>
            {NAV_LINKS.map((l, i) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
                fontFamily: "var(--font-display)", fontSize: 32,
                fontWeight: 600, letterSpacing: "-0.02em",
                color: "var(--ink)", textDecoration: "none",
                padding: "13px 0",
                borderBottom: "1px solid var(--border)",
                display: "flex", justifyContent: "space-between",
                alignItems: "center",
              }}>
                {l.label.charAt(0) + l.label.slice(1).toLowerCase()}
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 9,
                  letterSpacing: 2, color: "var(--subtle)",
                }}>{String(i + 1).padStart(2, "0")}</span>
              </Link>
            ))}

            {/* ─── Addition: Theme Toggle in Menu ─── */}
            <div style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 20,
            }}>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 9,
                letterSpacing: 2.5, color: "var(--muted)",
              }}>THEME MODE</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
