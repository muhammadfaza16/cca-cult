import Link from "next/link";
import { getAllArticles } from "@/lib/mdx";
import { T, φ, brandAccent, formatIndonesianDate } from "@/lib/tokens";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { HomepageClient } from "./HomepageClient";
import { ScrollToTop } from "@/components/ScrollToTop";

export default async function HomePage() {
  const allArticles = await getAllArticles();

  // Always showcase the flagship Evolution Series as the starter etalase
  const evolutionArticles = allArticles
    .filter(a => a.series_slug === "psikologi-evolusi" || !a.series_slug)
    .sort((a, b) => (a.series_order || 99) - (b.series_order || 99));

  const hero = evolutionArticles.find(a => a.series_order === 1) || evolutionArticles[0];
  const seriesArticles = evolutionArticles.filter(a => a.slug !== hero.slug);

  // Dedicated standalone articles (including Bunga di Atas Kuburan and other standalone essays)
  const standaloneArticles = allArticles
    .filter(a => a.series_slug !== "psikologi-evolusi")
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

  return (
    <div suppressHydrationWarning style={{ minHeight: "100svh", background: T.bg, color: T.ink }}>

      {/* ════════════════ STICKY UTILITY NAV ════════════════ */}
      <header className="glass-nav" style={{
        position: "sticky", top: 0, zIndex: 100,
        borderBottom: "1px solid var(--border)",
      }}>
        <div className="cca-container">
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", height: φ.xl,
          }}>
            <Link href="/" style={{
              textDecoration: "none", color: "inherit",
              display: "flex", alignItems: "baseline", gap: φ.xs,
            }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, letterSpacing: "-0.01em" }}>postulate.</span>
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: φ.lg }}>
              <Link href="/artikel" style={{
                fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600,
                letterSpacing: 2, color: T.muted, textDecoration: "none"
              }} className="link-hover">ARSIP</Link>
              <Link href="/glossarium" style={{
                fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600,
                letterSpacing: 2, color: T.muted, textDecoration: "none"
              }} className="link-hover">GLOSARIUM</Link>
              <MobileNav />
            </div>
          </div>
        </div>
      </header>

      {/* ════════════════ COMPACT EDITORIAL MASTHEAD ════════════════ */}
      <section style={{
        background: T.white,
        padding: "24px 0 16px 0",
        borderBottom: `1px solid ${T.faint}`,
        textAlign: "center",
      }}>
        <div className="cca-container">
          {/* Sleek Logo */}
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            color: T.ink,
            margin: "0 0 6px 0",
            textTransform: "lowercase",
          }}>
            postulate<span style={{ color: brandAccent }}>.</span>
          </h1>

          {/* Compact Platform Meta Info */}
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: 8.5,
            letterSpacing: 2,
            color: T.muted,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 10,
          }}>
            <span>PUBLIKASI ESAI &amp; KAJIAN BEBAS</span>
            <span style={{ color: T.border }}>|</span>
            <span style={{ fontWeight: 700, color: brandAccent }}>JURNAL INDEPENDEN</span>
            <span style={{ color: T.border }}>|</span>
            <span>EDISI DIGITAL 2026</span>
          </div>
        </div>
      </section>

      {/* ════════════════ HERO FEATURED ARTICLE (BAGIAN 1) ════════════════ */}
      {hero && (
        <section style={{
          background: T.white,
          position: "relative", overflow: "hidden",
          padding: "24px 0 32px 0",
        }}>
          <div className="cca-container" style={{ position: "relative" }}>
            <div className={hero.og_image ? "hero-split-layout" : ""}>

              {/* Image Column (Left on Desktop / Top on Mobile) */}
              {hero.og_image && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: 2,
                      color: brandAccent,
                      textTransform: "uppercase",
                      display: "inline-block",
                    }}>
                      SERI #01 · PSIKOLOGI EVOLUSI
                    </span>
                  </div>

                  <Link href={`/artikel/${hero.slug}`} className="hero-image-wrapper" style={{ display: "block" }}>
                    <img
                      src={hero.og_image}
                      alt={hero.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Link>
                </div>
              )}
              
              {/* Content Column */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", padding: "4px 0" }}>
                <div>
                  {/* Top Kicker Bar */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: 8.5, fontWeight: 700,
                      letterSpacing: 1.5, color: "#FFFFFF",
                      background: brandAccent,
                      padding: "4px 9px", borderRadius: 2,
                      textTransform: "uppercase",
                    }}>
                      {hero.series_order ? `BAGIAN ${hero.series_order} DARI 5` : hero.tipe_tulisan}
                    </span>

                    <span style={{
                      fontFamily: "var(--font-display)", fontSize: 28,
                      fontWeight: 800, lineHeight: 1, color: T.border,
                    }}>01</span>
                  </div>

                  {/* Title & Subtitle/Excerpt */}
                  <Link href={`/artikel/${hero.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <h2 style={{
                      fontFamily: "var(--font-display)", fontWeight: 800,
                      fontSize: "clamp(26px, 3.8vw, 42px)", lineHeight: 1.15,
                      letterSpacing: "-0.03em", color: T.ink,
                      marginBottom: 10,
                      transition: "color 0.2s ease",
                    }}>{hero.title}</h2>
                    
                    <p style={{
                      fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.6,
                      color: T.muted, fontStyle: "italic", margin: 0,
                    }}>{hero.subtitle || hero.excerpt}</p>
                  </Link>
                </div>

                {/* Unified Footer Action Bar */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 20 }}>
                  <Link
                    href={`/artikel/${hero.slug}`}
                    style={{
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <div style={{ height: 2, width: 28, background: brandAccent }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: brandAccent, letterSpacing: 2, fontWeight: 700 }}>
                      BACA BAB 01 · {hero.reading_time.toUpperCase()} WAKTU BACA →
                    </span>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ════════════════ UNIFIED SERIES FEED ════════════════ */}
      <HomepageClient
        articles={seriesArticles.map(a => ({
          slug: a.slug, title: a.title, subtitle: a.subtitle,
          excerpt: a.excerpt,
          kategori: a.kategori,
          tipe_tulisan: a.tipe_tulisan,
          tags: a.tags,
          author: a.author,
          published_at: a.published_at,
          reading_time: a.reading_time,
          og_image: a.og_image,
          series_order: a.series_order,
        }))}
        standaloneArticles={standaloneArticles.map(a => ({
          slug: a.slug, title: a.title, subtitle: a.subtitle,
          excerpt: a.excerpt,
          kategori: a.kategori,
          tipe_tulisan: a.tipe_tulisan,
          tags: a.tags,
          author: a.author,
          published_at: a.published_at,
          reading_time: a.reading_time,
          og_image: a.og_image,
          series_order: a.series_order,
        }))}
      />

      {/* ════════════════ FOOTER ════════════════ */}
      <Footer />
      <ScrollToTop />
    </div>
  );
}
