"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { brandAccent, T } from "@/lib/tokens";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface ArticleSidebarProps {
  currentSlug: string;
  seriesArticles: Array<{
    slug: string;
    title: string;
    series_order?: number;
    reading_time: string;
  }>;
}

export function ArticleSidebar({ currentSlug, seriesArticles }: ArticleSidebarProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const prose = document.querySelector(".prose-cca");
    if (!prose) return;

    const els = prose.querySelectorAll("h2, h3");
    const items: TocItem[] = [];

    els.forEach((el, i) => {
      if (!el.id) {
        el.id = `section-${i + 1}`;
      }
      items.push({
        id: el.id,
        text: el.textContent || "",
        level: el.tagName === "H2" ? 2 : 3,
      });
    });

    setHeadings(items);
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-90px 0px -50% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ─── DESKTOP STICKY SIDEBAR ─── */}
      <div
        className="desktop-sidebar-container"
        style={{
          position: "sticky",
          top: 96,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          background: T.white,
          border: `1px solid ${T.border}`,
          padding: 24,
          borderRadius: 2,
        }}
      >
        {/* Table of Contents Section */}
        {headings.length > 0 && (
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: 2.5,
                color: brandAccent,
                marginBottom: 14,
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span>DAFTAR ISI ARTIKEL</span>
              <div style={{ flex: 1, height: 1, background: T.border }} />
            </div>

            <nav style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {headings.map((h) => {
                const isActive = activeId === h.id;
                return (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    style={{
                      fontFamily: h.level === 2 ? "var(--font-display)" : "var(--font-body)",
                      fontSize: h.level === 2 ? 13.5 : 12.5,
                      fontWeight: isActive ? 700 : h.level === 2 ? 600 : 400,
                      lineHeight: 1.35,
                      color: isActive ? brandAccent : T.muted,
                      textDecoration: "none",
                      paddingLeft: h.level === 3 ? 16 : 8,
                      paddingTop: 4,
                      paddingBottom: 4,
                      borderLeft: isActive
                        ? `3px solid ${brandAccent}`
                        : `2px solid ${T.border}`,
                      transition: "all .15s ease",
                    }}
                  >
                    {h.text}
                  </a>
                );
              })}
            </nav>
          </div>
        )}

        {/* Chronological Articles Index Section */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: 2.5,
              color: T.muted,
              marginBottom: 14,
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>DAFTAR TULISAN</span>
            <div style={{ flex: 1, height: 1, background: T.border }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {seriesArticles.map((art) => {
              const isCurrent = art.slug === currentSlug;
              return (
                <Link
                  key={art.slug}
                  href={`/artikel/${art.slug}`}
                  style={{
                    textDecoration: "none",
                    padding: "8px 10px",
                    background: isCurrent ? T.faint : "transparent",
                    borderLeft: `3px solid ${isCurrent ? brandAccent : "transparent"}`,
                    borderTop: `1px solid ${isCurrent ? T.border : "transparent"}`,
                    borderRight: `1px solid ${isCurrent ? T.border : "transparent"}`,
                    borderBottom: `1px solid ${isCurrent ? T.border : "transparent"}`,
                    transition: "all .15s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 2,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 8,
                        fontWeight: 700,
                        letterSpacing: 1.5,
                        color: isCurrent ? "#FFFFFF" : T.muted,
                        background: isCurrent ? brandAccent : T.faint,
                        padding: "2px 6px",
                        borderRadius: 2,
                      }}
                    >
                      ESAI
                    </span>
                    {isCurrent && (
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 8,
                          fontWeight: 700,
                          color: brandAccent,
                          letterSpacing: 1,
                        }}
                      >
                        (DIBACA SEKARANG)
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 13,
                      fontWeight: isCurrent ? 700 : 600,
                      color: isCurrent ? T.ink : T.ink,
                      lineHeight: 1.3,
                    }}
                  >
                    {art.title}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ─── End Desktop Sidebar Content ─── */}
      </div>

      {/* ─── Mobile Drawer Floating Toggle Button ─── */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileOpen(true)}
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 999,
            background: brandAccent,
            color: T.white,
            border: "none",
            borderRadius: 28,
            padding: "10px 18px",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 2,
            boxShadow: "0 8px 24px rgba(179, 45, 45, 0.4)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span>☰</span> NAVIGASI BACAAN
        </button>

        {isMobileOpen && (
          <>
            <div
              onClick={() => setIsMobileOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(4px)",
                zIndex: 1000,
              }}
            />
            <nav
              style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                maxHeight: "80vh",
                overflowY: "auto",
                background: T.white,
                borderTop: `3px solid ${brandAccent}`,
                borderRadius: "16px 16px 0 0",
                padding: "24px 20px 36px 20px",
                zIndex: 1001,
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: `1px solid ${T.border}`,
                  paddingBottom: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: 2.5,
                    color: brandAccent,
                  }}
                >
                  NAVIGASI ARSIP
                </span>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: 20,
                    color: T.muted,
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: 2,
                    color: T.muted,
                    marginBottom: 10,
                  }}
                >
                  DAFTAR ARSIP TULISAN
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {seriesArticles.map((art) => (
                    <Link
                      key={art.slug}
                      href={`/artikel/${art.slug}`}
                      onClick={() => setIsMobileOpen(false)}
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 13,
                        fontWeight: art.slug === currentSlug ? 700 : 500,
                        color: art.slug === currentSlug ? brandAccent : T.ink,
                        textDecoration: "none",
                      }}
                    >
                      {art.title}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </>
        )}
      </div>
    </>
  );
}
