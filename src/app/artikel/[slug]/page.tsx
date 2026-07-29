import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getArticleBySlug, getAllArticles } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ArticleSidebar } from "@/components/ArticleSidebar";
import { BackButton } from "@/components/BackButton";
import { ScrollToTop } from "@/components/ScrollToTop";
import { φ, T, brandAccent, formatIndonesianDate } from "@/lib/tokens";
import type { Metadata } from "next";
import remarkGfm from "remark-gfm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Artikel tidak ditemukan" };

  return {
    title: article.meta.title,
    description: article.meta.seo_description || article.meta.subtitle || article.meta.excerpt,
    openGraph: {
      title: article.meta.title,
      description: article.meta.seo_description || article.meta.subtitle || article.meta.excerpt,
      type: "article",
      locale: "id_ID",
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const { meta, content } = article;

  // ─── Chronological Series Navigation & Related ───
  const allArticles = await getAllArticles();
  const currentIndex = allArticles.findIndex(a => a.slug === slug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;
  const related = allArticles.filter(a => a.slug !== slug).slice(0, 3);

  const primaryTag = meta.tags[0] || "editorial";

  const seriesArticles = allArticles.map((a) => ({
    slug: a.slug,
    title: a.title,
    series_order: a.series_order,
    reading_time: a.reading_time,
  }));

  return (
    <div suppressHydrationWarning style={{ minHeight: "100svh", background: T.white, color: T.ink }}>
      <ReadingProgress color={brandAccent} />

      {/* ─── Sticky Nav ─── */}
      <nav className="glass-nav" style={{
        position: "sticky", top: 0, zIndex: 100,
        padding: `0 ${φ.lg}px`,
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", height: φ.xl,
        }}>
          <BackButton className="link-hover" />
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 9,
              letterSpacing: 2.5, color: brandAccent,
              fontWeight: 600,
            }}>
              #{primaryTag.toUpperCase()}
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: T.subtle }}>{meta.reading_time}</span>
          </div>
        </div>
      </nav>

      {/* ─── brandAccent Hero Strip ─── */}
      <div style={{ height: 4, background: brandAccent }} />

      {/* ─── Desktop 2-Column Responsive Layout Grid ─── */}
      <main className="article-desktop-grid" style={{ paddingTop: φ.xl, paddingBottom: φ.xxl }}>
        {/* Main Article Reading Column */}
        <div style={{ width: "100%", minWidth: 0 }}>
          <header style={{ marginBottom: φ.xl }}>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600,
              letterSpacing: 2.5, color: brandAccent, marginBottom: φ.sm,
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span>#{primaryTag.toUpperCase()}</span>
            </div>

            <h1 style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: "clamp(28px, 5.5vw, 52px)", lineHeight: 1.15,
              letterSpacing: "-0.03em", color: T.ink, marginBottom: φ.md,
            }}>{meta.title}</h1>

            <div style={{
              display: "flex", flexWrap: "wrap", gap: 12,
              alignItems: "center", paddingBottom: φ.lg,
              borderBottom: `1px solid ${T.border}`,
            }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: T.muted, letterSpacing: 1 }}>{meta.author}</span>
              <span style={{ color: T.border, fontSize: 10 }}>·</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: T.subtle, letterSpacing: 1 }}>
                {formatIndonesianDate(meta.published_at)}
              </span>
              <span style={{ color: T.border, fontSize: 10 }}>·</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: T.subtle, letterSpacing: 1 }}>{meta.reading_time}</span>
            </div>
          </header>

          <article>
            <div className="prose-cca">
              <MDXRemote
                source={content}
                components={mdxComponents}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
            </div>

            {/* ─── Series Chronological Navigation ─── */}
            <div style={{
              marginTop: φ.xl,
              display: "grid",
              gridTemplateColumns: prevArticle && nextArticle ? "1fr 1fr" : "1fr",
              gap: φ.md,
            }}>
              {prevArticle && (
                <Link href={`/artikel/${prevArticle.slug}`} style={{
                  textDecoration: "none", color: "inherit",
                  padding: φ.md, background: T.faint, border: `2px solid ${T.border}`,
                  borderRadius: 2,
                }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: T.subtle, letterSpacing: 1.5, marginBottom: 4, fontWeight: 600 }}>
                    ← TULISAN SEBELUMNYA
                  </div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: T.ink, lineHeight: 1.25 }}>
                    {prevArticle.title}
                  </div>
                </Link>
              )}
              {nextArticle && (
                <Link href={`/artikel/${nextArticle.slug}`} style={{
                  textDecoration: "none", color: "inherit",
                  padding: φ.md, background: T.faint, border: `2px solid ${brandAccent}`,
                  borderRadius: 2, textAlign: prevArticle ? "right" : "left",
                }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: brandAccent, fontWeight: 700, letterSpacing: 1.5, marginBottom: 4 }}>
                    TULISAN SELANJUTNYA →
                  </div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: T.ink, lineHeight: 1.25 }}>
                    {nextArticle.title}
                  </div>
                </Link>
              )}
            </div>

            {/* ─── End Marker ─── */}
            <div style={{
              marginTop: φ.xl, paddingTop: φ.lg,
              borderTop: `1px solid ${T.border}`,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: T.subtle, letterSpacing: 2.5 }}>SELESAI DIBACA</span>
              <Link href="/artikel" style={{
                textDecoration: "none", color: "#FFFFFF",
                padding: `${φ.sm}px ${φ.lg}px`,
                background: brandAccent,
                fontFamily: "var(--font-mono)", fontSize: 10,
                fontWeight: 700, letterSpacing: 2,
                borderRadius: 2,
                transition: "background-color 0.2s ease",
              }} className="link-hover">
                LIHAT SELURUH ARSIP →
              </Link>
            </div>
          </article>

          {/* ─── Related Articles ─── */}
          {related.length > 0 && (
            <section style={{ marginTop: φ.xxl }}>
              <div style={{ display: "flex", alignItems: "center", gap: φ.sm, marginBottom: φ.lg }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 2.5, color: T.muted, fontWeight: 700 }}>EKSPLORASI LANJUT</span>
                <div style={{ flex: 1, height: 1, background: T.border }} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {related.map((r, i) => {
                  const rTag = r.tags[0] || "editorial";
                  return (
                    <Link key={r.slug} href={`/artikel/${r.slug}`} className="card-hover"
                      style={{
                        textDecoration: "none", color: "inherit",
                        background: T.bg, border: `1px solid ${T.border}`,
                        padding: `${φ.md}px ${φ.lg}px`,
                        display: "flex", alignItems: "flex-start", gap: φ.md,
                      }}>
                      <span style={{
                        fontFamily: "var(--font-display)", fontSize: 32,
                        fontWeight: 400, color: T.border, lineHeight: 1,
                        minWidth: 34, marginTop: 2,
                      }}>{String(i + 1).padStart(2, "0")}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", gap: φ.xs, alignItems: "center", marginBottom: 4 }}>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 2.5, color: brandAccent, fontWeight: 600 }}>
                            #{rTag.toUpperCase()}
                          </span>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: T.subtle }}>· {r.reading_time}</span>
                        </div>
                        <h4 style={{
                          fontFamily: "var(--font-display)", fontWeight: 600,
                          fontSize: 18, lineHeight: 1.25, letterSpacing: "-0.01em", marginBottom: 4,
                        }}>{r.title}</h4>
                        <p style={{
                          fontFamily: "var(--font-body)", fontSize: 13,
                          lineHeight: 1.5, color: T.muted, fontStyle: "italic",
                        }}>{r.subtitle}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* Desktop Sticky Reading Sidebar & Mobile Drawer */}
        <aside>
          <ArticleSidebar currentSlug={slug} seriesArticles={seriesArticles} />
        </aside>
      </main>

      <ScrollToTop />
    </div>
  );
}
