"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const prose = document.querySelector(".prose-cca");
    if (!prose) return;

    const els = prose.querySelectorAll("h2, h3");
    const items: TocItem[] = [];

    els.forEach((el, i) => {
      if (!el.id) {
        el.id = `heading-${i}`;
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
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length < 3) return null;

  return (
    <>
      {/* ─── Floating Toggle Button ─── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Daftar Isi"
        style={{
          position: "fixed",
          bottom: 34,
          right: 34,
          width: 44,
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--ink)",
          color: "var(--bg)",
          border: "none",
          cursor: "pointer",
          zIndex: 90,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          transition: "transform .2s, opacity .2s",
          boxShadow: "0 4px 20px rgba(0,0,0,.15)",
        }}
      >
        {isOpen ? "✕" : "≡"}
      </button>

      {/* ─── ToC Panel ─── */}
      {isOpen && (
        <nav
          style={{
            position: "fixed",
            bottom: 89,
            right: 34,
            width: 280,
            maxHeight: "60vh",
            overflowY: "auto",
            background: "var(--white)",
            border: "1px solid var(--border)",
            boxShadow: "0 8px 40px rgba(0,0,0,.12)",
            zIndex: 90,
            padding: "21px",
            animation: "fadeUp .2s ease",
          }}
        >
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: 2.5,
            color: "var(--muted)",
            marginBottom: 13,
          }}>DAFTAR ISI</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {headings.map((h) => (
              <a
                key={h.id}
                href={`#${h.id}`}
                onClick={() => setIsOpen(false)}
                style={{
                  fontFamily: h.level === 2 ? "var(--font-display)" : "var(--font-body)",
                  fontSize: h.level === 2 ? 14 : 12.5,
                  fontWeight: h.level === 2 ? 600 : 400,
                  lineHeight: 1.35,
                  color: activeId === h.id ? "var(--ink)" : "var(--muted)",
                  textDecoration: "none",
                  paddingLeft: h.level === 3 ? 13 : 0,
                  padding: "6px 8px",
                  borderLeft: activeId === h.id 
                    ? "2px solid var(--gold)" 
                    : "2px solid transparent",
                  transition: "all .15s",
                  fontStyle: h.level === 3 ? "italic" : "normal",
                }}
              >
                {h.text}
              </a>
            ))}
          </div>
        </nav>
      )}
    </>
  );
}
