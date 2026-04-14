import Link from "next/link";
import { getAllArticles } from "@/lib/mdx";
import { T, CATS, φ, catColor } from "@/lib/tokens";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { HomepageClient } from "./HomepageClient";

export default async function HomePage() {
  const articles = await getAllArticles();
  const hero = articles[0];
  const secondary = articles.slice(1, 3);
  const rest = articles.slice(3);

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

      {/* ════════════════ HERO — featured article ════════════════ */}
      {hero && (
        <section style={{
          background: catColor(hero.topic_pillar),
          position: "relative", overflow: "hidden",
        }}>
          {/* Batik-inspired geometric motif */}
          <div style={{
            position: "absolute", top: 0, right: 0,
            width: "38.2%", height: "100%",
            opacity: 0.06,
            backgroundImage: `repeating-linear-gradient(60deg, transparent, transparent 30px, rgba(255,255,255,.5) 30px, rgba(255,255,255,.5) 31px),
              repeating-linear-gradient(-60deg, transparent, transparent 30px, rgba(255,255,255,.5) 30px, rgba(255,255,255,.5) 31px)`,
            pointerEvents: "none",
          }} />

          <div className="cca-container hero-pt" style={{ position: "relative" }}>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 3,
              color: "rgba(255,255,255,.4)", marginBottom: φ.md,
            }}>
              PILIHAN EDITOR · {CATS[hero.topic_pillar]?.label.toUpperCase() || hero.topic_pillar.toUpperCase()}
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
              }}>{hero.subtitle}</p>
            </Link>

            <div style={{ display: "flex", gap: φ.md, alignItems: "center" }}>
              <Link href={`/artikel/${hero.slug}`} className="card-hero-btn" style={{
                fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 2.5,
                color: "#fff", textDecoration: "none",
                border: "1px solid rgba(255,255,255,.3)",
                transition: "background .2s, border-color .2s",
              }}>BACA SEKARANG →</Link>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(255,255,255,.35)" }}>{hero.reading_time}</span>
            </div>
          </div>
        </section>
      )}

      {/* ════════════════ NERDY STATS ════════════════ */}
      {(() => {
        const totalMinutes = articles.reduce((sum, a) => sum + a.reading_time_minutes, 0);
        const totalWords = Math.round(totalMinutes * 200);
        const hours = (totalMinutes / 60).toFixed(1);
        const stats = [
          { label: "ARTIKEL", value: String(articles.length) },
          { label: "KATA", value: totalWords.toLocaleString("id-ID") },
          { label: "JAM BACAAN", value: `~${hours}` },
          { label: "TOPIK", value: String(Object.keys(CATS).length) },
        ];
        return (
          <div style={{ background: T.surface, borderBottom: `1px solid ${T.border}` }}>
            <div className="cca-container" style={{
              display: "flex", justifyContent: "space-between",
              paddingTop: φ.md, paddingBottom: φ.md,
              flexWrap: "wrap", gap: φ.sm,
            }}>
              {stats.map(s => (
                <div key={s.label} style={{ display: "flex", alignItems: "baseline", gap: φ.xs }}>
                  <span style={{
                    fontFamily: "var(--font-display)", fontSize: 28,
                    fontWeight: 700, letterSpacing: "-0.02em", color: T.ink,
                  }}>{s.value}</span>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 8,
                    letterSpacing: 2, color: T.subtle,
                  }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* ════════════════ CLIENT INTERACTIVE SECTIONS ════════════════ */}
      <HomepageClient
        secondary={secondary.map(a => ({
          slug: a.slug, title: a.title, subtitle: a.subtitle,
          topic_pillar: a.topic_pillar, reading_time: a.reading_time,
        }))}
        rest={rest.map(a => ({
          slug: a.slug, title: a.title, subtitle: a.subtitle,
          topic_pillar: a.topic_pillar, difficulty: a.difficulty,
          reading_time: a.reading_time,
        }))}
      />

      {/* ════════════════ FOOTER ════════════════ */}
      <Footer />
    </div>
  );
}
