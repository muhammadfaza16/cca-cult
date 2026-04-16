import Link from "next/link";
import { getAllArticles } from "@/lib/mdx";
import { T, CATS, φ, catColor } from "@/lib/tokens";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { HomepageClient } from "./HomepageClient";

function TopicIcon({ pillar, color }: { pillar: string, color: string }) {
  const fill = color + "26"; // ~15% opacity (Un-shy)
  switch (pillar) {
    case "logika":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 35 Q28 25 38 25 L65 25 Q75 25 75 35 L75 65 Q75 75 65 75 L38 75 Q28 75 25 65 Z" fill={fill} stroke={color} strokeWidth="1.5" />
          <path d="M45 45 Q48 35 58 35 L85 35 Q95 35 95 45 L95 75 Q95 85 85 85 L58 85 Q48 85 45 75 Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "sains":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="12" fill={fill} stroke="currentColor" strokeWidth="2.5" />
          <ellipse cx="50" cy="50" rx="40" ry="15" stroke={color} strokeWidth="1.5" transform="rotate(45 50 50)" />
          <ellipse cx="50" cy="50" rx="40" ry="15" stroke="currentColor" strokeWidth="2.5" transform="rotate(-45 50 50)" />
          <ellipse cx="50" cy="50" rx="15" ry="40" stroke={color} strokeWidth="1.5" />
        </svg>
      );
    case "filsafat":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 50 Q50 10 90 50 Q50 90 10 50" fill={fill} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="50" cy="50" r="15" stroke={color} strokeWidth="1.5" />
          <circle cx="50" cy="50" r="6" fill="currentColor" />
        </svg>
      );
    case "ekonomi":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 30 L80 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M50 30 L50 10" stroke="currentColor" strokeWidth="2" />
          <path d="M25 30 L10 70 L40 70 Z" fill={fill} stroke={color} strokeWidth="1.5" />
          <path d="M75 30 L60 70 L90 70 Z" fill={fill} stroke="currentColor" strokeWidth="2.5" />
        </svg>
      );
    case "psikologi":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="45" r="25" fill={fill} stroke={color} strokeWidth="1.5" />
          <circle cx="65" cy="55" r="25" fill={fill} stroke="currentColor" strokeWidth="2.5" />
          <path d="M45 65 L35 85 L55 75 Z" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

export default async function HomePage() {
  const allArticles = await getAllArticles();
  
  // Restore all articles, sorted by date (desc)
  const curated = allArticles
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

  const hero = curated[0];
  const secondary = curated.slice(1, 4);
  const rest = curated.slice(4);

  // Pillar Stats Map
  const pillarCounts = curated.reduce((acc, a) => {
    acc[a.topic_pillar] = (acc[a.topic_pillar] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div style={{ minHeight: "100svh", background: T.bg, color: T.ink }}>

      {/* ════════════════ HEADER ════════════════ */}
      <header style={{
        background: T.bg, borderBottom: `1px solid ${T.border}`,
        position: "sticky", top: 0, zIndex: 100,
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
              <span style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, letterSpacing: "-0.01em" }}>pos·tu·late</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontStyle: "italic", color: T.muted }}>noun.</span>
            </Link>
            <MobileNav />
          </div>
        </div>
      </header>

      {/* ════════════════ HERO ════════════════ */}
      {hero && (
        <section style={{
          background: catColor(hero.topic_pillar),
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, right: 0,
            width: "38.2%", height: "100%",
            opacity: 0.05,
            backgroundImage: `repeating-linear-gradient(60deg, transparent, transparent 30px, rgba(255,255,255,.5) 30px, rgba(255,255,255,.5) 31px),
              repeating-linear-gradient(-60deg, transparent, transparent 30px, rgba(255,255,255,.5) 30px, rgba(255,255,255,.5) 31px)`,
            pointerEvents: "none",
          }} />

          <div className="cca-container hero-pt" style={{ position: "relative" }}>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 3,
              color: "rgba(255,255,255,.4)", marginBottom: φ.md,
            }}>
              TERBARU · {CATS[hero.topic_pillar]?.label.toUpperCase()}
            </div>

            <Link href={`/artikel/${hero.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
              <h1 className="card-hero-title" style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: "clamp(40px, 7vw, 78px)", lineHeight: 1.02,
                letterSpacing: "-0.03em", color: "#fff",
                marginBottom: φ.md,
              }}>{hero.title}</h1>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: 19, lineHeight: 1.6,
                color: "rgba(255,255,255,.6)", maxWidth: 540,
                marginBottom: φ.lg, fontStyle: "italic",
              }}>{hero.subtitle || hero.excerpt}</p>
            </Link>

            <div style={{ display: "flex", gap: φ.md, alignItems: "center" }}>
              <Link href={`/artikel/${hero.slug}`} className="card-hero-btn" style={{
                fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 2.5,
                color: "#fff", textDecoration: "none",
                border: "1px solid rgba(255,255,255,.3)",
              }}>BACA SEKARANG →</Link>
            </div>
          </div>
        </section>
      )}

      {/* ════════════════ TOPIK UTAMA ════════════════ */}
      <section className="cca-container" style={{ paddingTop: φ.xl }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: φ.md
        }}>
          {Object.keys(CATS).map(p => {
            const data = CATS[p];
            const count = pillarCounts[p] || 0;
            return (
              <Link key={p} href={`/artikel?topic=${p}`} style={{ textDecoration: "none" }} className="card-hover">
                <div className="topic-card">
                  {/* Hand-Drawn SVG Illustration (Styled in globals.css) */}
                  <div className="topic-illustration">
                    <TopicIcon pillar={p} color={data.color} />
                  </div>

                  <div className="topic-text-container">
                    <h2 style={{
                      fontFamily: "var(--font-display)", fontSize: "clamp(20px, 4vw, 26px)",
                      fontWeight: 700, color: T.ink, letterSpacing: "-0.01em",
                      marginBottom: φ.sm
                    }}>{data.label.split(" & ")[0]}</h2>
                    <p style={{
                      fontFamily: "var(--font-body)", fontSize: 13,
                      lineHeight: 1.6, color: T.muted
                    }}>{data.tagline}</p>
                  </div>
                  <div style={{
                    fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
                    color: T.muted, letterSpacing: 1, position: "relative", zIndex: 2
                  }}>
                    {count} TULISAN →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <HomepageClient
        secondary={secondary.map(a => ({
          slug: a.slug, title: a.title, subtitle: a.subtitle,
          excerpt: a.excerpt, discipline: a.discipline,
          topic_pillar: a.topic_pillar, reading_time: a.reading_time,
        }))}
        rest={rest.map(a => ({
          slug: a.slug, title: a.title, subtitle: a.subtitle,
          excerpt: a.excerpt, discipline: a.discipline,
          topic_pillar: a.topic_pillar, difficulty: a.difficulty,
          reading_time: a.reading_time,
        }))}
      />

      {/* ════════════════ FOOTER ════════════════ */}
      <Footer />
    </div>
  );
}
