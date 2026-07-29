"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { T, φ, brandAccent, formatIndonesianDate } from "@/lib/tokens";
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
  standaloneArticles?: ArticleBrief[];
}

const CATEGORIES = [
  { id: "all", label: "SEMUA TULISAN" },
  { id: "Thoughts", label: "THOUGHTS" },
  { id: "Stories", label: "STORIES" },
  { id: "Refleksi", label: "REFLEKSI" },
  { id: "Satir", label: "SATIR" }
];

export function HomepageClient({ articles, standaloneArticles }: Props) {
  const [activeCat, setActiveCat] = useState("all");

  const filteredArticles = useMemo(() => {
    if (activeCat === "all") return articles;
    return articles.filter(a => a.kategori === activeCat);
  }, [articles, activeCat]);

  return (
    <div suppressHydrationWarning>
      {/* ─── Category Selection Tabs ─── */}
      <section className="cca-container" style={{ paddingTop: 48, paddingBottom: 12 }}>
        <div style={{
          display: "flex",
          gap: 10,
          overflowX: "auto",
          paddingBottom: φ.xs,
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
                  fontSize: 9.5,
                  fontWeight: 600,
                  letterSpacing: 2,
                  padding: "9px 18px",
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

      {/* ════════════════ UNIFIED ARTICLES GRID ════════════════ */}
      {filteredArticles.length > 0 && (
        <section className="cca-container section-pt section-pb">
          <div style={{ display: "flex", alignItems: "center", gap: φ.sm, marginBottom: 32 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, fontWeight: 700, letterSpacing: 2.5, color: T.muted }}>
              ARSIP TULISAN &amp; KAJIAN
            </span>
            <div style={{ flex: 1, height: 1, background: T.border }} />
            <Link href="/artikel" className="link-hover" style={{
              fontFamily: "var(--font-mono)", fontSize: 9.5, fontWeight: 600,
              letterSpacing: 2, color: brandAccent, textDecoration: "none"
            }}>LIHAT SELURUH ARSIP →</Link>
          </div>

          <div className="hero-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 36,
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

/* ─── Homepage Standalone Article Card (Consistent Editorial Grid Layout) ─── */
function HomepageStandaloneCard({ article }: { article: ArticleBrief }) {
  const [hov, setHov] = useState(false);

  return (
    <Link
      href={`/artikel/${article.slug}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textDecoration: "none",
        color: "inherit",
        background: T.white,
        borderTop: `1px solid ${hov ? brandAccent : T.border}`,
        borderRight: `1px solid ${hov ? brandAccent : T.border}`,
        borderBottom: `1px solid ${hov ? brandAccent : T.border}`,
        borderLeft: `5px solid ${brandAccent}`,
        borderRadius: "3px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        boxShadow: hov ? "0 8px 24px rgba(0,0,0,0.06)" : "0 2px 10px rgba(0,0,0,0.02)",
        transition: "all 0.3s ease",
      }}
    >
      {article.og_image && (
        <div style={{
          width: "100%",
          aspectRatio: "16 / 10",
          overflow: "hidden",
          borderBottom: `1px solid ${T.border}`,
          position: "relative",
        }}>
          <img
            src={article.og_image}
            alt={article.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: hov ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.4s ease",
            }}
          />
        </div>
      )}

      <div style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flex: 1,
      }}>
        <div>
          {/* Top Kicker Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 8.5, fontWeight: 700,
              letterSpacing: 1.5, color: "#FFFFFF", background: brandAccent,
              padding: "4px 9px", borderRadius: 2, textTransform: "uppercase",
            }}>
              ESAI MANDIRI
            </span>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: 1, color: T.subtle, fontWeight: 500,
              }}>
                {formatIndonesianDate(article.published_at)}
              </span>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: 1.5, color: T.muted, fontWeight: 600,
              }}>
                {article.kategori.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Title & Excerpt */}
          <h3 style={{
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "clamp(20px, 2.2vw, 24px)", lineHeight: 1.25,
            letterSpacing: "-0.02em", color: hov ? brandAccent : T.ink,
            marginBottom: 10, transition: "color 0.25s ease",
          }}>
            {article.title}
          </h3>

          <p style={{
            fontFamily: "var(--font-body)", fontSize: 14.5, lineHeight: 1.6,
            color: T.muted, fontStyle: "italic", margin: 0,
          }}>
            {article.subtitle || article.excerpt}
          </p>
        </div>

        {/* Footer Action Bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 24 }}>
          <div style={{ height: 2, width: hov ? 28 : 18, background: brandAccent, transition: "width 0.3s ease" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 8.5, color: brandAccent, letterSpacing: 2, fontWeight: 700 }}>
            BACA ESAI · {article.reading_time.toUpperCase()}
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Secondary Grid Card (Original Rich Design) ─── */
function CardWrapper({ article, index }: { article: ArticleBrief; index: number }) {
  const [hov, setHov] = useState(false);

  return (
    <Link href={`/artikel/${article.slug}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textDecoration: "none", color: "inherit",
        background: "var(--white)",
        borderTop: `1px solid ${hov ? brandAccent : T.border}`,
        borderRight: `1px solid ${hov ? brandAccent : T.border}`,
        borderBottom: `1px solid ${hov ? brandAccent : T.border}`,
        borderLeft: `5px solid ${brandAccent}`,
        display: "flex", flexDirection: "column",
        justifyContent: "space-between", height: "100%",
        padding: article.og_image ? 0 : "16px 18px",
        borderRadius: "2px",
        transition: "all 0.3s ease",
      }}>
      {article.og_image && (
        <div style={{
          width: "100%",
          aspectRatio: "16 / 10",
          overflow: "hidden",
          borderBottom: `1px solid ${T.border}`,
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
        padding: article.og_image ? "16px 18px" : 0,
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
                {article.tipe_tulisan || "ESAI"}
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

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: φ.md }}>
          <div style={{ display: "flex", alignItems: "center", gap: φ.xs }}>
            <div style={{ height: 2, width: hov ? φ.lg + 10 : φ.lg, background: brandAccent, transition: "width 0.3s ease" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: brandAccent, letterSpacing: 2, fontWeight: 700 }}>
              BACA · {article.reading_time.toUpperCase()}
            </span>
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: T.subtle, letterSpacing: 1, fontWeight: 500 }}>
            {formatIndonesianDate(article.published_at)}
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
        padding: article.og_image ? 0 : "16px 18px",
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
        padding: article.og_image ? "16px 18px" : 0,
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
