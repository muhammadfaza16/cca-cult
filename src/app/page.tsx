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

      {/* ════════════════ MAJESTIC EDITORIAL MASTHEAD ════════════════ */}
      <section style={{
        background: T.white,
        padding: `${φ.xl}px 0 ${φ.lg}px 0`,
        textAlign: "center",
      }}>
        <div className="cca-container">
          {/* Masthead Volume Info */}
          <div className="masthead-sub-bar" style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: 2,
            color: T.muted,
            paddingBottom: φ.xs,
            marginBottom: φ.sm,
          }}>
            <span>JURNAL ESENSIAL</span>
            <span style={{ fontWeight: 700, color: brandAccent }}>SERI KAJIAN: PSIKOLOGI EVOLUSI</span>
            <span>EDISI 2026</span>
          </div>

          {/* Majestic lowercased Logo */}
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(48px, 8.5vw, 96px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            color: T.ink,
            margin: `${φ.sm}px 0`,
            textTransform: "lowercase",
          }}>
            postulate<span style={{ color: brandAccent }}>.</span>
          </h1>

          {/* Subtitle / Slogan */}
          <div style={{
            paddingTop: φ.xs,
            marginTop: φ.xs,
          }}>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: 16.5,
              lineHeight: 1.6,
              color: T.muted,
              fontStyle: "italic",
              maxWidth: 720,
              margin: "0 auto",
            }}>
              &quot;Membongkar arsitektur perilaku, evolusi pemikiran, dan mekanisme tersembunyi kebudayaan manusia.&quot; Esai naratif &amp; analisis kritis.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════ HERO FEATURED ARTICLE (BAGIAN 1) ════════════════ */}
      {hero && (
        <section style={{
          background: T.white,
          position: "relative", overflow: "hidden",
        }}>
          <div className="cca-container hero-pt" style={{ position: "relative", paddingBottom: φ.xl }}>
            <div className={hero.og_image ? "hero-split-layout" : ""}>

              {/* Image Column (Left on Desktop / Top on Mobile) */}
              {hero.og_image && (
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
              )}
              
              {/* Content Column */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: φ.xs }}>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 2,
                    color: "#FFFFFF",
                    background: brandAccent,
                    padding: "3px 8px",
                    borderRadius: 2,
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}>
                    {hero.series_order ? `BAGIAN ${hero.series_order} DARI 5` : hero.tipe_tulisan}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 1.5,
                    color: T.subtle,
                    fontWeight: 500,
                  }}>
                    · {formatIndonesianDate(hero.published_at)}
                  </span>
                </div>

                <Link href={`/artikel/${hero.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <h2 style={{
                    fontFamily: "var(--font-display)", fontWeight: 700,
                    fontSize: "clamp(26px, 3.8vw, 48px)", lineHeight: 1.1,
                    letterSpacing: "-0.03em", color: T.ink,
                    marginTop: φ.xs,
                    marginBottom: φ.xs,
                    transition: "color 0.2s ease",
                  }}>{hero.title}</h2>
                  
                  <p style={{
                    fontFamily: "var(--font-body)", fontSize: 16.5, lineHeight: 1.55,
                    color: T.muted,
                    marginBottom: φ.md,
                  }}>{hero.subtitle || hero.excerpt}</p>
                </Link>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: φ.md }}>
                  {hero.tags.slice(0, 3).map(tag => (
                    <span key={tag} style={{
                      fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: 1.5,
                      color: T.muted, background: T.faint, border: `1px solid ${T.border}`, padding: "2px 6px", borderRadius: 2,
                    }}>
                      #{tag.toUpperCase()}
                    </span>
                  ))}
                </div>

                <div style={{ display: "flex", gap: φ.md, alignItems: "center" }}>
                  <Link
                    href={`/artikel/${hero.slug}`}
                    className="card-hero-btn"
                    style={{
                      background: brandAccent,
                      color: "#FFFFFF",
                      padding: "10px 22px",
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: 1.5,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 3,
                      boxShadow: "0 2px 8px rgba(179,45,45,0.2)",
                      transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    BACA MULAI DARI SINI
                  </Link>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: T.subtle, letterSpacing: 1.5 }}>
                    {hero.reading_time.toUpperCase()} WAKTU BACA
                  </span>
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
      />

      {/* ════════════════ FOOTER ════════════════ */}
      <Footer />
      <ScrollToTop />
    </div>
  );
}
