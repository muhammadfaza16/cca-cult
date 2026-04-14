"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { T, CATS, φ, DIFFS, LOGIC_STAGE_LABELS, LOGIC_STAGE_ORDER } from "@/lib/tokens";
import { Reveal } from "@/components/Reveal";
import { Footer } from "@/components/Footer";

interface Article {
  slug: string;
  title: string;
  subtitle: string;
  topic_pillar: string;
  difficulty: string;
  tags: string[];
  author: string;
  reading_time: string;
  published_at: string;
  logic_stage?: string;
  logic_priority?: number;
}

export function ArtikelClient({ articles }: { articles: Article[] }) {
  const [search, setSearch] = useState("");
  const [activePillar, setActivePillar] = useState("semua");

  const filtered = useMemo(() => {
    return articles.filter(a => {
      if (activePillar !== "semua" && a.topic_pillar !== activePillar) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          a.title.toLowerCase().includes(q) ||
          a.subtitle.toLowerCase().includes(q) ||
          a.tags.some(t => t.toLowerCase().includes(q))
        );
      }
      return true;
    }).sort((a, b) => {
      if (activePillar === "logika") {
        return (a.logic_priority || 99) - (b.logic_priority || 99);
      }
      return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
    });
  }, [articles, activePillar, search]);

  const grouped = useMemo(() => {
    const g: Record<string, Article[]> = {};
    
    if (activePillar === "logika") {
      // Group by Stage
      for (const a of filtered) {
        const stage = a.logic_stage || "lanjutan";
        if (!g[stage]) g[stage] = [];
        g[stage].push(a);
      }
    } else {
      // Group by Pillar
      for (const a of filtered) {
        if (!g[a.topic_pillar]) g[a.topic_pillar] = [];
        g[a.topic_pillar].push(a);
      }
      // Reorder logic specifically even in "semua" view
      if (g["logika"]) {
        g["logika"].sort((a, b) => (a.logic_priority || 99) - (b.logic_priority || 99));
      }
    }
    return g;
  }, [filtered, activePillar]);

  const showGrouped = (activePillar === "semua" || activePillar === "logika") && !search.trim();

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.ink }}>
      {/* ─── Header — unified 55px ─── */}
      <header style={{
        background: T.bg, borderBottom: `1px solid ${T.border}`,
        position: "sticky", top: 0, zIndex: 100,
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
          <Link href="/" className="link-hover" style={{
            fontFamily: "var(--font-mono)", fontSize: 11,
            color: T.muted, textDecoration: "none",
          }}>← Beranda</Link>
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

          <div style={{ position: "relative", width: "clamp(200px, 30vw, 320px)" }}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari artikel..."
              style={{
                width: "100%",
                padding: `${φ.sm}px ${φ.md}px ${φ.sm}px 42px`,
                background: T.white,
                border: `1px solid ${T.border}`,
                outline: "none",
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: T.ink,
                transition: "border-color .2s",
              }}
              onFocus={e => e.target.style.borderColor = T.gold}
              onBlur={e => e.target.style.borderColor = T.border as string}
            />
            <span style={{
              position: "absolute", left: φ.sm, top: "50%", transform: "translateY(-50%)",
              fontFamily: "var(--font-mono)", fontSize: 13, color: T.subtle,
              pointerEvents: "none",
            }}>⌕</span>
          </div>
        </div>

        <p style={{
          fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.6,
          color: T.muted, fontStyle: "italic", maxWidth: 480, marginBottom: φ.lg,
        }}>
          Cari, filter, jelajahi. Urutan tidak penting — baca yang menarik.
        </p>

        {/* ─── Filter Bar ─── */}
        <div style={{
          display: "flex", gap: φ.lg, alignItems: "flex-start",
          flexWrap: "wrap", marginBottom: φ.xl,
          paddingBottom: φ.md, borderBottom: `1px solid ${T.border}`,
        }}>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <button
              onClick={() => setActivePillar("semua")}
              style={{
                fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 500,
                letterSpacing: 2, padding: `6px ${φ.sm}px`,
                border: `1px solid ${activePillar === "semua" ? T.ink : T.border}`,
                background: activePillar === "semua" ? T.ink : "none",
                color: activePillar === "semua" ? T.bg : T.muted,
                cursor: "pointer", transition: "all .15s",
              }}
            >SEMUA TOPIK</button>
            {Object.entries(CATS).map(([id, c]) => (
              <button key={id}
                onClick={() => setActivePillar(activePillar === id ? "semua" : id)}
                style={{
                  fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 500,
                  letterSpacing: 2, padding: `6px ${φ.sm}px`,
                  border: `1px solid ${activePillar === id ? c.color : T.border}`,
                  background: activePillar === id ? c.color : "none",
                  color: activePillar === id ? T.bg : T.muted,
                  cursor: "pointer", transition: "all .15s",
                }}
              >{c.label.toUpperCase()}</button>
            ))}
          </div>

        </div>
      </section>

      {/* ─── Results ─── */}
      <main className="cca-container section-pb">
        {filtered.length === 0 && (
          <div style={{
            textAlign: "center", padding: `${φ.xxl}px 0`,
            color: T.subtle, fontFamily: "var(--font-mono)",
            fontSize: 11, letterSpacing: 3,
          }}>
            TIDAK ADA ARTIKEL YANG COCOK
          </div>
        )}

        {showGrouped ? (() => {
          let globalIndex = 0;
          return (activePillar === "logika" ? LOGIC_STAGE_ORDER : Object.keys(CATS)).map((groupId) => {
            const groupArticles = grouped[groupId];
            if (!groupArticles || groupArticles.length === 0) return null;

            const label = activePillar === "logika" ? LOGIC_STAGE_LABELS[groupId] : CATS[groupId]?.label;
            const color = activePillar === "logika" ? CATS.logika.color : CATS[groupId]?.color;
            const groupType = activePillar === "logika" ? "TAHAPAN" : "TOPIK";

            return (
              <section key={groupId} style={{ marginBottom: φ.xl }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: φ.sm,
                  marginBottom: φ.md, paddingBottom: φ.sm,
                  borderBottom: `2px solid ${color}`,
                }}>
                  <span style={{
                    fontFamily: "var(--font-display)", fontSize: φ.lg,
                    fontWeight: 400, color: color, lineHeight: 1,
                  }}>{groupArticles.length}</span>
                  <span style={{
                    fontFamily: "var(--font-display)", fontSize: φ.md,
                    fontWeight: 600, letterSpacing: "-0.01em",
                  }}>{label}</span>
                  <div style={{ flex: 1 }} />
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 9,
                    letterSpacing: 2, color: T.muted,
                  }}>{groupType}</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {groupArticles.map((article) => {
                    const currentIndex = globalIndex++;
                    return (
                      <Reveal key={article.slug} delay={Math.min(currentIndex * 0.04, 0.4)}>
                        <ArticleRow article={article} index={currentIndex} color={color} />
                      </Reveal>
                    );
                  })}
                </div>
              </section>
            );
          });
        })() : (
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {filtered.map((article, i) => (
              <Reveal key={article.slug} delay={i * 0.03}>
                <ArticleRow
                  article={article}
                  index={i}
                  color={CATS[article.topic_pillar]?.color || T.ink}
                />
              </Reveal>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function ArticleRow({ article, index, color }: { article: Article; index: number; color: string }) {
  return (
    <Link href={`/artikel/${article.slug}`} className="card-hover archive-row"
      style={{
        textDecoration: "none", color: "inherit",
        background: T.white, border: `1px solid ${T.border}`,
        display: "flex", alignItems: "flex-start", gap: φ.md,
      }}>
      <span style={{
        fontFamily: "var(--font-display)", fontSize: 36,
        fontWeight: 400, color: T.border, lineHeight: 1,
        minWidth: 42, textAlign: "right", flexShrink: 0, marginTop: 2,
      }}>{String(index + 1).padStart(2, "0")}</span>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", gap: φ.xs, alignItems: "center", marginBottom: 6 }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 500,
            letterSpacing: 2.5, color,
          }}>{CATS[article.topic_pillar]?.label.toUpperCase()}</span>
        </div>
        <h3 style={{
          fontFamily: "var(--font-display)", fontWeight: 600,
          fontSize: 20, lineHeight: 1.2, letterSpacing: "-0.015em",
          marginBottom: 6,
        }}>{article.title}</h3>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: 13,
          lineHeight: 1.5, color: T.muted, fontStyle: "italic",
        }}>{article.subtitle}</p>
      </div>

      <div style={{
        display: "flex", flexDirection: "column", alignItems: "flex-end",
        gap: 4, flexShrink: 0,
      }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 1.5, color: T.subtle }}>{article.reading_time}</span>
      </div>
    </Link>
  );
}
