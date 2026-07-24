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
  series_slug?: string;
  series_order?: number;
  og_image?: string;
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

  const filtered = useMemo(() => {
    return articles.filter(a => {
      if (activeCat !== "all" && a.kategori !== activeCat) {
        return false;
      }
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
    });
  }, [articles, search, activeCat]);

  // Group articles into Series Packages and Standalone Essays
  const seriesMap = useMemo(() => {
    const map: Record<string, Article[]> = {};
    const standalone: Article[] = [];

    filtered.forEach(a => {
      if (a.series_slug) {
        if (!map[a.series_slug]) map[a.series_slug] = [];
        map[a.series_slug].push(a);
      } else {
        standalone.push(a);
      }
    });

    // Sort series chapters by series_order
    Object.keys(map).forEach(key => {
      map[key].sort((a, b) => (a.series_order || 0) - (b.series_order || 0));
    });

    // Enforce preferred series order: Evolution Series ALWAYS first!
    const preferredOrder = ["psikologi-evolusi", "psikologi-agama"];
    const orderedSeriesPackages: Record<string, Article[]> = {};
    const sortedKeys = Object.keys(map).sort((a, b) => {
      const idxA = preferredOrder.indexOf(a);
      const idxB = preferredOrder.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });

    sortedKeys.forEach(k => {
      orderedSeriesPackages[k] = map[k];
    });

    // Sort standalone chronologically
    standalone.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

    return { seriesPackages: orderedSeriesPackages, standalone };
  }, [filtered]);

  return (
    <div suppressHydrationWarning style={{ minHeight: "100svh", background: T.bg, color: T.ink }}>
      {/* ─── Sticky Header ─── */}
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
            <span style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, letterSpacing: "-0.01em" }}>postulate.</span>
          </Link>
          <HeaderBackButton />
        </div>
      </header>

      {/* ─── Page Title & Search Bar ─── */}
      <section className="cca-container section-pt">
        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          flexWrap: "wrap", gap: φ.md, marginBottom: φ.sm,
        }}>
          <div>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700,
              letterSpacing: 2.5, color: brandAccent, textTransform: "uppercase"
            }}>KATALOG ARSIP</span>
            <h1 style={{
              fontFamily: "var(--font-display)", fontWeight: 800,
              fontSize: "clamp(36px, 5.5vw, 60px)", lineHeight: 1.05,
              letterSpacing: "-0.03em", marginTop: 4,
            }}>Seri Kajian &amp; Esai</h1>
          </div>

          <div style={{ position: "relative", width: "100%", maxWidth: 320 }}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari dalam arsip..."
              style={{
                width: "100%",
                padding: "8px 14px 8px 40px",
                fontFamily: "var(--font-body)",
                fontSize: 14,
                border: `1px solid ${T.border}`,
                background: T.white,
                color: T.ink,
                borderRadius: "2px",
                transition: "border-color .2s",
              }}
              onFocus={e => e.target.style.borderColor = brandAccent}
              onBlur={e => e.target.style.borderColor = T.border as string}
            />
            <span style={{
              position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
              fontSize: 18, color: T.subtle,
              pointerEvents: "none",
              lineHeight: 1,
            }}>⌕</span>
          </div>
        </div>

        <p style={{
          fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.6,
          color: T.muted, fontStyle: "italic", maxWidth: 640, marginBottom: φ.lg,
        }}>
          Kumpulan esai naratif yang dikemas sebagai paket seri kajian tematis serta katalog esai mandiri.
        </p>

        {/* ─── Category Tab Chips ─── */}
        <div style={{
          display: "flex",
          gap: 6,
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          paddingBottom: φ.sm,
          marginBottom: φ.md,
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
                  padding: "6px 14px",
                  cursor: "pointer",
                  borderRadius: "2px",
                  transition: "all .18s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* ─── Main Content Area ─── */}
      <main className="cca-container section-pb">
        {filtered.length === 0 ? (
          <div style={{
            textAlign: "center", padding: `${φ.xxl}px 0`,
            color: T.subtle, fontFamily: "var(--font-mono)",
            fontSize: 11, letterSpacing: 3,
          }}>
            TIDAK ADA TULISAN YANG COCOK
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: φ.xxl }}>

            {/* ════════════════ SERIES PACKAGES SECTION ════════════════ */}
            {Object.keys(seriesMap.seriesPackages).length > 0 && (
              <div>
                <div style={{
                  display: "flex", alignItems: "center", gap: φ.sm,
                  marginBottom: φ.lg,
                }}>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700,
                    letterSpacing: 2.5, color: T.ink, textTransform: "uppercase"
                  }}>
                    PAKET SERI KAJIAN UTAMA
                  </span>
                  <div style={{ flex: 1, height: 1, background: T.border }} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: φ.xl }}>
                  {Object.entries(seriesMap.seriesPackages).map(([seriesSlug, seriesArticles]) => (
                    <Reveal key={seriesSlug}>
                      <SeriesPackageCard seriesSlug={seriesSlug} chapters={seriesArticles} />
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

            {/* ════════════════ STANDALONE ESSAYS SECTION ════════════════ */}
            {seriesMap.standalone.length > 0 && (
              <div>
                <div style={{
                  display: "flex", alignItems: "center", gap: φ.sm,
                  marginBottom: φ.lg,
                }}>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700,
                    letterSpacing: 2.5, color: T.muted, textTransform: "uppercase"
                  }}>
                    ESAI MANDIRI &amp; KATALOG TULISAN
                  </span>
                  <div style={{ flex: 1, height: 1, background: T.border }} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {seriesMap.standalone.map((article, i) => (
                    <Reveal key={article.slug} delay={i * 0.04}>
                      <StandaloneArticleRow article={article} index={i} />
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

/* ─── Encapsulated Series Package Card Component ─── */
function SeriesPackageCard({ seriesSlug, chapters }: { seriesSlug: string; chapters: Article[] }) {
  const firstChapter = chapters[0];

  const seriesInfo = useMemo(() => {
    if (seriesSlug === "psikologi-agama") {
      return {
        number: "SERI #02 · PSIKOLOGI AGAMA",
        title: "Seri Kajian: Arsitektur Otak & Asal-Usul Kepercayaan Supernatural",
        desc: "Kajian kognitif dan antropologi evolusi yang membedah mengapa arsitektur pikiran manusia membuat kepercayaan supernatural hampir tak terhindarkan.",
        status: chapters.length >= 5 ? "100% LENGKAP" : `TERSEDIA BAB 1 (${chapters.length}/5)`,
      };
    }
    return {
      number: "SERI #01 · PSIKOLOGI EVOLUSI",
      title: "Seri Kajian: Psikologi Evolusi & Perilaku Manusia",
      desc: "Rangkaian esai naratif yang membedah arsitektur perilaku, evolusi pemikiran, dan mekanisme tersembunyi kebudayaan manusia dalam satu paket kajian utuh.",
      status: chapters.length >= 5 ? "100% LENGKAP" : `TERSEDIA ${chapters.length} BAB`,
    };
  }, [seriesSlug, chapters.length]);

  return (
    <div
      style={{
        background: T.white,
        borderTop: `1px solid ${T.border}`,
        borderRight: `1px solid ${T.border}`,
        borderBottom: `1px solid ${T.border}`,
        borderLeft: `6px solid ${brandAccent}`,
        borderRadius: "3px",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
      }}
    >
      {/* ─── Package Banner Header ─── */}
      <div style={{ padding: `${φ.lg}px ${φ.lg}px ${φ.md}px ${φ.lg}px` }}>
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: 10,
          marginBottom: φ.sm,
        }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700,
              letterSpacing: 2, color: "#FFFFFF", background: brandAccent,
              padding: "4px 10px", borderRadius: 2, textTransform: "uppercase",
            }}>
              PAKET SERI KAJIAN · {chapters.length} BAB
            </span>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600,
              letterSpacing: 1.5, color: T.muted, background: T.faint,
              border: `1px solid ${T.border}`, padding: "3px 8px", borderRadius: 2,
            }}>
              {seriesInfo.status}
            </span>
          </div>

          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 9.5, fontWeight: 600,
            letterSpacing: 1.5, color: T.subtle,
          }}>
            {seriesInfo.number}
          </span>
        </div>

        {/* Series Title */}
        <h2 style={{
          fontFamily: "var(--font-display)", fontWeight: 800,
          fontSize: "clamp(24px, 3.5vw, 36px)", lineHeight: 1.15,
          letterSpacing: "-0.03em", color: T.ink,
          marginBottom: φ.xs,
        }}>
          {seriesInfo.title}
        </h2>

        {/* Series Description */}
        <p style={{
          fontFamily: "var(--font-body)", fontSize: 15.5, lineHeight: 1.6,
          color: T.muted, fontStyle: "italic", maxWidth: 760,
          marginBottom: φ.md,
        }}>
          {seriesInfo.desc}
        </p>

        {/* Action Button */}
        {firstChapter && (
          <div style={{ display: "flex", gap: φ.md, alignItems: "center" }}>
            <Link
              href={`/artikel/${firstChapter.slug}`}
              className="card-hero-btn"
              style={{
                background: brandAccent,
                color: "#FFFFFF",
                padding: "10px 22px",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1.5,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(179,45,45,0.2)",
              }}
            >
              <span>MULAI MEMBACA SERI (BAB 1)</span>
              <span>→</span>
            </Link>
          </div>
        )}
      </div>

      {/* ─── Encapsulated Chapter List Container ─── */}
      <div style={{
        background: T.bg,
        borderTop: `1px solid ${T.border}`,
        padding: φ.lg,
      }}>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700,
          letterSpacing: 2, color: T.subtle, marginBottom: φ.md,
          textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8,
        }}>
          <span>DAFTAR BAB DALAM PAKET SERI INI</span>
          <div style={{ flex: 1, height: 1, background: T.border }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {chapters.map((ch, idx) => (
            <ChapterRow key={ch.slug} chapter={ch} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Chapter Row Component inside Series Package ─── */
function ChapterRow({ chapter, index }: { chapter: Article; index: number }) {
  const [hov, setHov] = useState(false);

  return (
    <Link
      href={`/artikel/${chapter.slug}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textDecoration: "none",
        color: "inherit",
        background: T.white,
        borderTop: `1px solid ${hov ? brandAccent : T.border}`,
        borderRight: `1px solid ${hov ? brandAccent : T.border}`,
        borderBottom: `1px solid ${hov ? brandAccent : T.border}`,
        borderLeft: `4px solid ${hov ? brandAccent : T.ink}`,
        padding: "14px 18px",
        borderRadius: "2px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: φ.md,
        transition: "all 0.2s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: φ.md, minWidth: 0, flex: 1 }}>
        {/* Chapter Index Badge */}
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700,
          letterSpacing: 1.5, color: hov ? brandAccent : T.muted,
          background: T.faint, padding: "4px 8px", borderRadius: 2,
          flexShrink: 0, transition: "color 0.2s",
        }}>
          BAB {String(index + 1).padStart(2, "0")}
        </span>

        <div style={{ minWidth: 0, flex: 1 }}>
          <h3 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: 16.5, lineHeight: 1.25, letterSpacing: "-0.015em",
            color: hov ? brandAccent : T.ink,
            margin: 0, transition: "color 0.2s",
          }}>
            {chapter.title}
          </h3>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 13,
            color: T.muted, fontStyle: "italic", margin: "2px 0 0 0",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {chapter.subtitle || chapter.excerpt}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: 1.5,
          color: T.subtle, fontWeight: 500,
        }}>
          {chapter.reading_time.toUpperCase()}
        </span>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 12, color: hov ? brandAccent : T.subtle,
          transform: hov ? "translateX(3px)" : "translateX(0)", transition: "transform 0.2s, color 0.2s",
        }}>
          →
        </span>
      </div>
    </Link>
  );
}

/* ─── Standalone Article Row Component ─── */
function StandaloneArticleRow({ article, index }: { article: Article; index: number }) {
  const [hov, setHov] = useState(false);

  return (
    <Link href={`/artikel/${article.slug}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textDecoration: "none", color: "inherit",
        background: T.white,
        borderTop: `1px solid ${hov ? brandAccent : T.border}`,
        borderRight: `1px solid ${hov ? brandAccent : T.border}`,
        borderBottom: `1px solid ${hov ? brandAccent : T.border}`,
        borderLeft: `4px solid ${hov ? brandAccent : T.muted}`,
        display: "flex", alignItems: "center", gap: φ.md,
        borderRadius: "2px",
        padding: φ.md,
        transition: "all 0.2s ease",
      }}>
      <span style={{
        fontFamily: "var(--font-display)", fontSize: 24,
        fontWeight: 700, color: hov ? brandAccent : T.subtle, lineHeight: 1,
        minWidth: 32, textAlign: "right", flexShrink: 0,
        transition: "color 0.2s",
      }}>{String(index + 1).padStart(2, "0")}</span>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4 }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 8, fontWeight: 700,
            letterSpacing: 1.5, color: T.muted, background: T.faint,
            padding: "2px 6px", borderRadius: 2, textTransform: "uppercase",
          }}>
            {article.tipe_tulisan}
          </span>
        </div>
        
        <h3 style={{
          fontFamily: "var(--font-display)", fontWeight: 700,
          fontSize: 18, lineHeight: 1.25, letterSpacing: "-0.015em",
          color: hov ? brandAccent : T.ink,
          margin: 0, transition: "color 0.2s",
        }}>{article.title}</h3>
      </div>

      <span style={{
        fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: 1.5,
        color: T.subtle, flexShrink: 0,
      }}>
        {article.reading_time.toUpperCase()}
      </span>
    </Link>
  );
}

