"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { φ, T, brandAccent } from "@/lib/tokens";
import { Reveal } from "@/components/Reveal";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

interface Article {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  kategori: "Thoughts" | "Stories" | "Refleksi" | "Satir";
  tipe_tulisan: string;
  tags: string[];
  author: string;
  reading_time: string;
  published_at: string;
  series_order?: number;
}

function HeaderBackButton() {
  const [hov, setHov] = useState(false);
  return (
    <Link
      href="/"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="back-btn-hover"
    >
      <span
        style={{
          display: "inline-block",
          transform: hov ? "translateX(-3px)" : "translateX(0)",
          transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        ←
      </span>
      <span>Beranda</span>
    </Link>
  );
}

const CATEGORIES = [
  { id: "all", label: "SEMUA TULISAN" },
  { id: "Thoughts", label: "THOUGHTS" },
  { id: "Stories", label: "STORIES" },
  { id: "Refleksi", label: "REFLEKSI" },
  { id: "Satir", label: "SATIR" }
];

export function ArtikelClient({ articles }: { articles: Article[] }) {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const [listVisibleCount, setListVisibleCount] = useState(10);

  // Reset limits when filters change
  useEffect(() => {
    setListVisibleCount(10);
  }, [search, activeCat]);

  const filtered = useMemo(() => {
    return articles.filter(a => {
      // Category filter
      if (activeCat !== "all" && a.kategori !== activeCat) {
        return false;
      }
      // Search filter
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          a.title.toLowerCase().includes(q) ||
          a.subtitle.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some(t => t.toLowerCase().includes(q))
        );
      }
      return true;
    }).sort((a, b) => {
      if (a.series_order !== undefined && b.series_order !== undefined) {
        return a.series_order - b.series_order;
      }
      return new Date(a.published_at).getTime() - new Date(b.published_at).getTime();
    });
  }, [articles, search, activeCat]);

  return (
    <div suppressHydrationWarning style={{ minHeight: "100svh", background: T.bg, color: T.ink }}>
      {/* ─── Header ─── */}
      <header className="glass-nav" style={{
        position: "sticky", top: 0, zIndex: 100,
        borderBottom: "1px solid var(--border)",
      }}>
        <div className="cca-container" style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", height: φ.xl,
        }}>
          <Link href="/" style={{
            textDecoration: "none", color: "inherit",
            display: "flex", alignItems: "baseline", gap: φ.xs,
          }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, letterSpacing: "-0.01em" }}>pos·tu·late</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontStyle: "italic", color: T.muted }}>noun.</span>
          </Link>
          <HeaderBackButton />
        </div>
      </header>

      {/* ─── Title + Search ─── */}
      <section className="cca-container section-pt">
        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          flexWrap: "wrap", gap: φ.md, marginBottom: φ.sm,
        }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: φ.md }}>
            <h1 style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: "clamp(38px, 6vw, 64px)", lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}>Arsip</h1>
            <span style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(38px, 6vw, 64px)", fontWeight: 400,
              lineHeight: 1.02, color: T.border, letterSpacing: "-0.03em",
            }}>{filtered.length}</span>
          </div>

          <div style={{ position: "relative", width: "100%", maxWidth: 320 }}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari esai..."
              style={{
                width: "100%",
                padding: "8px 14px 8px 40px",
                fontFamily: "var(--font-body)",
                fontSize: 14,
                border: `1px solid ${T.border}`,
                background: T.white,
                color: T.ink,
                transition: "border-color .2s",
              }}
              onFocus={e => e.target.style.borderColor = brandAccent}
              onBlur={e => e.target.style.borderColor = T.border as string}
            />
            <span style={{
              position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
              fontSize: 20, color: T.subtle,
              pointerEvents: "none",
              lineHeight: 1,
            }}>⌕</span>
          </div>
        </div>

        <p style={{
          fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.6,
          color: T.muted, fontStyle: "italic", maxWidth: 500, marginBottom: φ.lg,
        }}>
          Jelajahi arsip esai personal, opini, kritik kebudayaan, dan cerita pendek secara kronologis.
        </p>

        {/* ─── Category Tab Chips ─── */}
        <div style={{
          display: "flex",
          gap: 6,
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          paddingBottom: φ.sm,
          paddingRight: φ.md,
          marginBottom: φ.md,
          scrollbarWidth: "none", // Firefox
        }}>
          {CATEGORIES.map(c => {
            const active = activeCat === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                style={{
                  background: active ? T.ink : "none",
                  border: `1px solid ${active ? T.ink : "var(--border)"}`,
                  color: active ? T.white : T.muted,
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: 2,
                  padding: "6px 14px",
                  cursor: "pointer",
                  borderRadius: "2px",
                  transition: "all .18s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.borderColor = T.ink as string;
                    e.currentTarget.style.color = T.ink as string;
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = T.muted as string;
                  }
                }}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <div style={{
          marginBottom: φ.lg,
          borderBottom: `1px solid ${T.border}`,
        }} />
      </section>

      {/* ─── Results (Chronological Feed) ─── */}
      <main className="cca-container section-pb">
        {filtered.length === 0 && (
          <div style={{
            textAlign: "center", padding: `${φ.xxl}px 0`,
            color: T.subtle, fontFamily: "var(--font-mono)",
            fontSize: 11, letterSpacing: 3,
          }}>
            TIDAK ADA TULISAN YANG COCOK
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {filtered.slice(0, listVisibleCount).map((article, i) => (
            <Reveal key={article.slug} delay={i * 0.03}>
              <ArticleRow
                article={article}
                index={i}
              />
            </Reveal>
          ))}

          {filtered.length > listVisibleCount && (
            <ShowMoreButton onClick={() => setListVisibleCount(prev => prev + 10)} />
          )}
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

function ArticleRow({ article, index }: { article: Article; index: number }) {
  const [hov, setHov] = useState(false);

  return (
    <Link href={`/artikel/${article.slug}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textDecoration: "none", color: "inherit",
        background: "var(--white)",
        borderTop: `2px solid ${hov ? brandAccent : "var(--border)"}`,
        borderRight: `2px solid ${hov ? brandAccent : "var(--border)"}`,
        borderBottom: `2px solid ${hov ? brandAccent : "var(--border)"}`,
        borderLeft: `5px solid ${brandAccent}`,
        display: "flex", alignItems: "flex-start", gap: φ.md,
        borderRadius: "2px",
        padding: φ.md,
        transition: "all 0.25s ease",
      }}>
      <span style={{
        fontFamily: "var(--font-display)", fontSize: 32,
        fontWeight: 700, color: hov ? brandAccent : T.subtle, lineHeight: 1,
        minWidth: 42, textAlign: "right", flexShrink: 0, marginTop: 2,
        transition: "color 0.25s",
      }}>{String(index + 1).padStart(2, "0")}</span>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", gap: φ.xs, alignItems: "center", marginBottom: 6 }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 8, fontWeight: 700,
            letterSpacing: 2, color: "#FFFFFF",
            background: brandAccent,
            padding: "3px 8px", borderRadius: 2,
            textTransform: "uppercase",
          }}>
            {article.series_order ? `BAGIAN ${article.series_order} DARI 5` : article.tipe_tulisan}
          </span>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {article.tags.slice(0, 3).map(tag => (
              <span key={tag} style={{
                fontFamily: "var(--font-mono)", fontSize: 8, fontWeight: 600,
                letterSpacing: 1.5, color: T.muted, background: T.faint,
                border: `1px solid ${T.border}`,
                padding: "2px 6px", borderRadius: 2
              }}>
                #{tag.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
        
        <h3 style={{
          fontFamily: "var(--font-display)", fontWeight: 700,
          fontSize: 20, lineHeight: 1.2, letterSpacing: "-0.015em",
          marginBottom: 6,
          color: hov ? brandAccent : "var(--ink)",
          transition: "color 0.25s",
        }}>{article.title}</h3>
        
        <p style={{
          fontFamily: "var(--font-body)", fontSize: 13.5,
          lineHeight: 1.5, color: T.muted, fontStyle: "italic",
        }}>{article.subtitle || article.excerpt}</p>
      </div>

      <div style={{
        display: "flex", flexDirection: "column", alignItems: "flex-end",
        gap: 4, flexShrink: 0,
      }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 1.5, color: hov ? brandAccent : T.subtle, fontWeight: hov ? 700 : 500, transition: "color 0.25s" }}>
          {article.reading_time.toUpperCase()}
        </span>
      </div>
    </Link>
  );
}

function ShowMoreButton({ onClick }: { onClick: () => void }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: φ.lg }}>
      <button
        onClick={onClick}
        className="link-hover"
        style={{
          fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 500,
          letterSpacing: 2, padding: `${φ.sm}px ${φ.lg}px`,
          border: `1px solid ${T.border}`,
          background: T.white,
          color: T.muted,
          cursor: "pointer",
          transition: "all .2s",
          textTransform: "uppercase",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = T.ink as string;
          e.currentTarget.style.color = T.ink as string;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = T.border as string;
          e.currentTarget.style.color = T.muted as string;
        }}
      >
        Lihat Lebih Banyak ↓
      </button>
    </div>
  );
}
