"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { T, φ, brandAccent } from "@/lib/tokens";
import { Reveal } from "@/components/Reveal";

interface ArticleBrief {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  kategori: "Thoughts" | "Stories" | "Refleksi" | "Satir";
  tipe_tulisan: string;
  tags: string[];
  author: string;
  published_at: string;
  reading_time: string;
  og_image?: string;
  series_order?: number;
}

interface Props {
  articles: ArticleBrief[];
}

const CATEGORIES = [
  { id: "all", label: "SEMUA TULISAN" },
  { id: "Thoughts", label: "THOUGHTS" },
  { id: "Stories", label: "STORIES" },
  { id: "Refleksi", label: "REFLEKSI" },
  { id: "Satir", label: "SATIR" }
];

export function HomepageClient({ articles }: Props) {
  const [activeCat, setActiveCat] = useState("all");

  const filteredArticles = useMemo(() => {
    if (activeCat === "all") return articles;
    return articles.filter(a => a.kategori === activeCat);
  }, [articles, activeCat]);

  return (
    <div suppressHydrationWarning>
      {/* ─── Category Selection Tabs ─── */}
      <section className="cca-container" style={{ paddingTop: φ.lg }}>
        <div style={{
          display: "flex",
          gap: 6,
          overflowX: "auto",
          paddingBottom: φ.xs,
          borderBottom: "1px solid var(--border)",
          scrollbarWidth: "none",
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
                  padding: "8px 16px",
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
      </section>

      {/* ════════════════ UNIFIED SERIES GRID ════════════════ */}
      {filteredArticles.length > 0 && (
        <section className="cca-container section-pt section-pb">
          <div style={{ display: "flex", alignItems: "center", gap: φ.sm, marginBottom: φ.lg }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700, letterSpacing: 2.5, color: T.muted }}>
              KELANJUTAN SERI · BAGIAN 2 - 5
            </span>
            <div style={{ flex: 1, height: 1, background: T.border }} />
            <Link href="/artikel" className="link-hover" style={{
              fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600,
              letterSpacing: 2, color: brandAccent, textDecoration: "none"
            }}>LIHAT SELURUH ARSIP →</Link>
          </div>

          <div className="hero-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: φ.lg,
          }}>
            {filteredArticles.map((article, i) => (
              <Reveal key={article.slug} delay={i * 0.06}>
                <CardWrapper article={article} index={i} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

/* ─── Secondary Grid Card ─── */
function CardWrapper({ article, index }: { article: ArticleBrief; index: number }) {
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
        display: "flex", flexDirection: "column",
        justifyContent: "space-between", height: "100%",
        padding: article.og_image ? 0 : φ.lg,
        borderRadius: "2px",
        transition: "all 0.3s ease",
      }}>
      {article.og_image && (
        <div style={{
          width: "100%",
          aspectRatio: "16 / 10",
          overflow: "hidden",
          borderBottom: "1px solid var(--border)",
          position: "relative",
        }}>
          <img
            src={article.og_image}
            alt={article.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s ease",
              transform: hov ? "scale(1.03)" : "scale(1)",
            }}
          />
        </div>
      )}
      <div style={{
        padding: article.og_image ? φ.lg : 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flex: 1,
      }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: φ.md }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 8, fontWeight: 700,
                letterSpacing: 1.5, color: "#FFFFFF",
                background: brandAccent,
                padding: "3px 8px", borderRadius: 2,
                textTransform: "uppercase",
              }}>
                {article.series_order ? `BAGIAN ${article.series_order} DARI 5` : article.tipe_tulisan}
              </span>
              {article.tags.slice(0, 2).map(tag => (
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
            <span style={{
              fontFamily: "var(--font-display)", fontSize: 40,
              fontWeight: 700, lineHeight: 1, color: hov ? brandAccent : T.subtle, marginTop: -φ.xs,
              transition: "color 0.3s ease",
            }}>{String(index + 2).padStart(2, "0")}</span>
          </div>

          <h3 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: 23,
            lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: φ.sm,
            color: hov ? brandAccent : "var(--ink)",
            transition: "color 0.3s ease",
          }}>{article.title}</h3>
          
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 14.5,
            lineHeight: 1.6, color: T.muted, fontStyle: "italic",
          }}>{article.subtitle || article.excerpt}</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: φ.xs, marginTop: φ.md }}>
          <div style={{ height: 2, width: hov ? φ.lg + 10 : φ.lg, background: brandAccent, transition: "width 0.3s ease" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: brandAccent, letterSpacing: 2, fontWeight: 700 }}>
            BACA · {article.reading_time.toUpperCase()}
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Stream List Card ─── */
function ListCardWrapper({ article, index }: { article: ArticleBrief; index: number }) {
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
        display: "flex", flexDirection: "column",
        justifyContent: "space-between", height: "100%",
        padding: article.og_image ? 0 : φ.lg,
        borderRadius: "2px",
        transition: "all 0.3s ease",
      }}>
      {article.og_image && (
        <div style={{
          width: "100%",
          aspectRatio: "16 / 10",
          overflow: "hidden",
          borderBottom: "1px solid var(--border)",
          position: "relative",
        }}>
          <img
            src={article.og_image}
            alt={article.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s ease",
              transform: hov ? "scale(1.03)" : "scale(1)",
            }}
          />
        </div>
      )}
      <div style={{
        padding: article.og_image ? φ.lg : 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flex: 1,
      }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: φ.sm }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 8, fontWeight: 700,
                letterSpacing: 1.5, color: "#FFFFFF",
                background: brandAccent,
                padding: "3px 8px", borderRadius: 2,
                textTransform: "uppercase",
              }}>
                {article.series_order ? `BAGIAN ${article.series_order} DARI 5` : article.tipe_tulisan}
              </span>
              {article.tags.slice(0, 2).map(tag => (
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
            <span style={{
              fontFamily: "var(--font-display)", fontSize: 36,
              fontWeight: 700, lineHeight: 1, color: hov ? brandAccent : T.subtle, marginTop: -φ.xs,
              transition: "color 0.3s ease",
            }}>{String(index + 5).padStart(2, "0")}</span>
          </div>

          <h3 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: 21,
            lineHeight: 1.25, letterSpacing: "-0.02em", marginBottom: φ.xs,
            color: hov ? brandAccent : "var(--ink)",
            transition: "color 0.3s ease",
          }}>{article.title}</h3>
          
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.55,
            color: T.muted, fontStyle: "italic",
          }}>{article.subtitle || article.excerpt}</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: φ.xs, marginTop: φ.md }}>
          <div style={{ height: 2, width: hov ? φ.md + 10 : φ.md, background: brandAccent, transition: "width 0.3s ease" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: brandAccent, letterSpacing: 2, fontWeight: 700 }}>
            BACA · {article.reading_time.toUpperCase()}
          </span>
        </div>
      </div>
    </Link>
  );
}
