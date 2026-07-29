import Link from "next/link";
import { getAllArticles } from "@/lib/mdx";
import { T, φ, brandAccent, formatIndonesianDate } from "@/lib/tokens";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { HomepageClient } from "./HomepageClient";
import { ScrollToTop } from "@/components/ScrollToTop";

export default async function HomePage() {
  const allArticles = await getAllArticles();

  const hero = allArticles[0];
  const remainingArticles = allArticles.slice(1);

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

      {/* ════════════════ CLEAN EDITORIAL MASTHEAD ════════════════ */}
      <section style={{
        background: T.white,
        padding: "42px 0 32px 0",
        borderBottom: `1px solid ${T.border}`,
        textAlign: "center",
      }}>
        <div className="cca-container">
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(42px, 6.5vw, 64px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            color: T.ink,
            margin: "0 0 14px 0",
            textTransform: "lowercase",
          }}>
            postulate<span style={{ color: brandAccent }}>.</span>
          </h1>

          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9.5,
            fontWeight: 600,
            letterSpacing: 2.5,
            color: T.muted,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}>
            <span>JURNAL ESAI INDEPENDEN</span>
            <span style={{ color: T.border }}>·</span>
            <span>SAINS, FILSAFAT &amp; ARSITEKTUR KEBUDAYAAN</span>
          </div>
        </div>
      </section>

      {/* ════════════════ FLAGSHIP ESSAY ════════════════ */}
      {hero && (
        <section style={{
          borderBottom: "1px solid var(--border)",
          background: T.white,
          padding: `${φ.xl}px 0`,
        }}>
          <div className="cca-container">
            <div style={{
              display: "grid",
              gridTemplateColumns: hero.og_image ? "repeat(auto-fit, minmax(280px, 1fr))" : "1fr",
              gap: 32,
              alignItems: "center",
            }}>
              {/* Optional Hero Image */}
              {hero.og_image && (
                <div style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 3,
                  maxHeight: 280,
                  aspectRatio: "16 / 10",
                  border: `1px solid ${T.border}`,
                }}>
                  <img
                    src={hero.og_image}
                    alt={hero.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              )}

              {/* Content Column */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", padding: "4px 0" }}>
                <div>
                  {/* Top Kicker Bar */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{
                        fontFamily: "var(--font-mono)", fontSize: 8.5, fontWeight: 700,
                        letterSpacing: 1.5, color: "#FFFFFF",
                        background: brandAccent,
                        padding: "4px 9px", borderRadius: 2,
                        textTransform: "uppercase",
                      }}>
                        {hero.tipe_tulisan || "UTAMA"}
                      </span>
                      <span style={{
                        fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: 1,
                        color: T.subtle, fontWeight: 500,
                      }}>
                        {formatIndonesianDate(hero.published_at)}
                      </span>
                    </div>
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
                    <div style={{ height: 2, width: 24, background: brandAccent }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: brandAccent, letterSpacing: 1.5, fontWeight: 700 }}>
                      BACA BACAAN UTAMA · {hero.reading_time.toUpperCase()}
                    </span>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ════════════════ UNIFIED ARTICLES FEED ════════════════ */}
      <HomepageClient
        articles={remainingArticles.map(a => ({
          slug: a.slug, title: a.title, subtitle: a.subtitle,
          excerpt: a.excerpt,
          kategori: a.kategori,
          tipe_tulisan: a.tipe_tulisan,
          tags: a.tags,
          author: a.author,
          published_at: a.published_at,
          reading_time: a.reading_time,
          og_image: a.og_image,
        }))}
      />

      {/* ════════════════ FOOTER ════════════════ */}
      <Footer />
      <ScrollToTop />
    </div>
  );
}
