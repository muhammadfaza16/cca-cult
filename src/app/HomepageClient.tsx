"use client";

import Link from "next/link";
import { T, CATS, φ, catColor, getDiscColor } from "@/lib/tokens";
import { Reveal } from "@/components/Reveal";

interface ArticleBrief {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  discipline?: string;
  topic_pillar: string;
  reading_time: string;
  difficulty?: string;
}

interface Props {
  secondary: ArticleBrief[];
  rest: ArticleBrief[];
  topicSection?: React.ReactNode;
}

const INITIAL_LIMIT = 6;

export function HomepageClient({ secondary, rest, topicSection }: Props) {
  const visible = rest.slice(0, INITIAL_LIMIT);
  const hasMore = rest.length > INITIAL_LIMIT;

  return (
    <>
      {/* ════════════════ SECONDARY FEATURES ════════════════ */}
      {secondary.length > 0 && (
        <section className="cca-container section-pt">
          <div className="hero-grid">
            {secondary.map((article, i) => {
              const col = catColor(article.topic_pillar);
              return (
                <Reveal key={article.slug} delay={i * 0.08}>
                  <Link href={`/artikel/${article.slug}`}
                    className={`card-hover ${i === 0 ? "hero-grid-item" : "hero-grid-item-small"}`}
                    style={{
                      textDecoration: "none", color: "inherit",
                      background: T.white, border: `1px solid ${T.border}`,
                      display: "flex", flexDirection: "column",
                      justifyContent: "space-between", height: "100%",
                    }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: φ.md }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 500, letterSpacing: 2.5, color: col }}>
                          {CATS[article.topic_pillar]?.label.toUpperCase()}
                          {article.discipline && (
                            <>
                              <span style={{ color: T.border, margin: "0 4px" }}>·</span>
                              <span style={{
                                color: getDiscColor(article.discipline, col),
                                background: getDiscColor(article.discipline, col) + "12",
                                padding: "2px 6px", borderRadius: 2
                              }}>
                                {article.discipline.toUpperCase()}
                              </span>
                            </>
                          )}
                        </span>
                        <span style={{
                          fontFamily: "var(--font-display)", fontSize: 52,
                          fontWeight: 400, lineHeight: 1, color: T.border, marginTop: -φ.sm,
                        }}>{String(i + 2).padStart(2, "0")}</span>
                      </div>
                      <h3 style={{
                        fontFamily: "var(--font-display)", fontWeight: 600,
                        fontSize: "clamp(22px, 3vw, 32px)",
                        lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: φ.sm,
                      }}>{article.title}</h3>
                      <p style={{
                        fontFamily: "var(--font-body)", fontSize: 14,
                        lineHeight: 1.55, color: T.muted, fontStyle: "italic",
                      }}>{article.subtitle || article.excerpt}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: φ.xs, marginTop: φ.md }}>
                      <div style={{ height: 1, width: φ.lg, background: col }} />
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: col, letterSpacing: 1.5 }}>
                        BACA · {article.reading_time}
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      {topicSection}

      {/* ════════════════ REMAINING ARTICLES (limited) ════════════════ */}
      {rest.length > 0 && (
        <section className="cca-container section-pt section-pb">
          <div style={{ display: "flex", alignItems: "center", gap: φ.sm, marginBottom: φ.lg }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 500, letterSpacing: 2.5, color: T.muted }}>EKSPLORASI</span>
            <div style={{ flex: 1, height: 1, background: T.border }} />
            <Link href="/artikel" className="link-hover" style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 500, letterSpacing: 2, color: T.gold, textDecoration: "none" }}>LIHAT ARSIP →</Link>
          </div>

          <div className="asym-grid">
            {visible.map((article, i) => {
              const col = catColor(article.topic_pillar);
              const isWide = i % 3 === 0;
              return (
                <Reveal key={article.slug} delay={i * 0.04}>
                  <Link href={`/artikel/${article.slug}`}
                    className={`card-hover ${isWide ? "asym-grid-wide" : "asym-grid-narrow"}`}
                    style={{
                      textDecoration: "none", color: "inherit",
                      background: T.white, border: `1px solid ${T.border}`,
                      display: "flex", flexDirection: "column",
                      justifyContent: "space-between", height: "100%",
                    }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: φ.sm }}>
                        <div style={{ display: "flex", gap: φ.xs, alignItems: "center", flexWrap: "wrap" }}>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 500, letterSpacing: 2.5, color: col }}>
                            {CATS[article.topic_pillar]?.label.toUpperCase()}
                            {article.discipline && (
                              <>
                                <span style={{ color: T.border, margin: "0 4px" }}>·</span>
                                <span style={{
                                  color: getDiscColor(article.discipline, col),
                                  background: getDiscColor(article.discipline, col) + "12",
                                  padding: "1px 4px", borderRadius: 2
                                }}>
                                  {article.discipline.toUpperCase()}
                                </span>
                              </>
                            )}
                          </span>
                        </div>
                        <span style={{
                          fontFamily: "var(--font-display)", fontSize: isWide ? 47 : 36,
                          fontWeight: 400, lineHeight: 1, color: T.border, marginTop: -φ.xs,
                        }}>{String(i + 4).padStart(2, "0")}</span>
                      </div>
                      <h3 style={{
                        fontFamily: "var(--font-display)", fontWeight: 600,
                        fontSize: "clamp(20px, 2.5vw, 28px)",
                        lineHeight: 1.18, letterSpacing: "-0.02em", marginBottom: φ.xs,
                      }}>{article.title}</h3>
                      <p style={{
                        fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.55,
                        color: T.muted, fontStyle: "italic",
                      }}>{article.subtitle || article.excerpt}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: φ.xs, marginTop: φ.md }}>
                      <div style={{ height: 1, width: φ.md, background: col }} />
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: col, letterSpacing: 1.5 }}>BACA · {article.reading_time}</span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          {/* ─── Archive Redirect CTA ─── */}
          {hasMore && (
            <div style={{ textAlign: "center", marginTop: φ.lg }}>
              <Link href="/artikel" style={{
                display: "inline-block",
                fontFamily: "var(--font-mono)", fontSize: 10,
                letterSpacing: 2.5, color: T.invFg,
                padding: `${φ.sm}px ${φ.lg}px`,
                background: T.invBg,
                textDecoration: "none",
                transition: "opacity .2s",
              }}>TELUSURI ARSIP LENGKAP →</Link>
            </div>
          )}
        </section>
      )}
    </>
  );
}
