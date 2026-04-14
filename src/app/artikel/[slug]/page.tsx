import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getArticleBySlug, getAllArticles } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { ReadingProgress } from "@/components/ReadingProgress";
import { TableOfContents } from "@/components/TableOfContents";
import { BackButton } from "@/components/BackButton";
import { T, PILLAR, CATS, φ } from "@/lib/tokens";
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
    description: article.meta.seo_description || article.meta.subtitle,
    openGraph: {
      title: article.meta.title,
      description: article.meta.seo_description || article.meta.subtitle,
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
  const pillar = PILLAR[meta.topic_pillar] || { color: T.ink, label: meta.topic_pillar };

  // ─── Related articles: same pillar first, then others, exclude self ───
  const allArticles = await getAllArticles();
  let samePillar = allArticles.filter(a => a.topic_pillar === meta.topic_pillar && a.slug !== slug);
  const otherPillar = allArticles.filter(a => a.topic_pillar !== meta.topic_pillar && a.slug !== slug);

  // Reorder logic samePillar specifically
  if (meta.topic_pillar === "logika") {
    samePillar.sort((a, b) => (a.logic_priority || 99) - (b.logic_priority || 99));
  }

  const related = [...samePillar, ...otherPillar].slice(0, 3);

  return (
    <div style={{ minHeight: "100svh", background: T.white, color: T.ink }}>
      <ReadingProgress />
      <TableOfContents />

      {/* ─── Sticky Nav ─── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: T.white,
        borderBottom: `1px solid ${T.border}`,
        padding: `0 ${φ.lg}px`,
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", height: φ.xl,
        }}>
          <BackButton className="link-hover" />
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 2.5,
              color: pillar.color, padding: "3px 10px",
              background: pillar.color + "12",
            }}>{pillar.label}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: T.subtle }}>{meta.reading_time}</span>
          </div>
        </div>
      </nav>

      {/* ─── Pillar Color Hero Strip ─── */}
      <div style={{ height: 4, background: `linear-gradient(90deg, ${pillar.color}, ${pillar.color}88)` }} />

      {/* ─── Article Header ─── */}
      <header style={{ maxWidth: 700, margin: "0 auto", padding: `${φ.xl}px ${φ.lg}px 0` }}>
        <h1 style={{
          fontFamily: "var(--font-display)", fontWeight: 700,
          fontSize: "clamp(34px, 5.5vw, 52px)", lineHeight: 1.06,
          letterSpacing: "-0.03em", color: T.ink, marginBottom: φ.md,
        }}>{meta.title}</h1>

        {meta.subtitle && (
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 19, lineHeight: 1.55,
            color: T.muted, fontStyle: "italic", marginBottom: φ.lg, maxWidth: 600,
          }}>{meta.subtitle}</p>
        )}

        <div style={{
          display: "flex", flexWrap: "wrap", gap: 12,
          alignItems: "center", paddingBottom: φ.lg,
          borderBottom: `1px solid ${T.border}`,
        }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: T.muted, letterSpacing: 1 }}>{meta.author}</span>
          <span style={{ color: T.border, fontSize: 10 }}>·</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: T.subtle, letterSpacing: 1 }}>
            {new Date(meta.published_at).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}
          </span>
          <span style={{ color: T.border, fontSize: 10 }}>·</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: T.subtle, letterSpacing: 1 }}>{meta.reading_time}</span>
        </div>
      </header>

      {/* ─── MDX Body ─── */}
      <article style={{ maxWidth: 700, margin: "0 auto", padding: `${φ.xl}px ${φ.lg}px 0` }}>
        <div className="prose-cca">
          <MDXRemote
            source={content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>

        {/* ─── End Marker ─── */}
        <div style={{
          marginTop: φ.xxl, paddingTop: φ.lg,
          borderTop: `1px solid ${T.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: T.subtle, letterSpacing: 2.5 }}>SELESAI DIBACA</span>
          <BackButton label="KEMBALI ←" style={{
            color: T.bg,
            padding: `${φ.sm}px ${φ.lg}px`,
            background: pillar.color,
          }} />
        </div>
      </article>

      {/* ─── Related Articles ─── */}
      {related.length > 0 && (
        <section style={{ maxWidth: 700, margin: "0 auto", padding: `${φ.xl}px ${φ.lg}px ${φ.xxl}px` }}>
          <div style={{ display: "flex", alignItems: "center", gap: φ.sm, marginBottom: φ.lg }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 2.5, color: T.muted }}>EKSPLORASI LANJUT</span>
            <div style={{ flex: 1, height: 1, background: T.border }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {related.map((r, i) => {
              const rColor = CATS[r.topic_pillar]?.color || T.ink;
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
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 2.5, color: rColor }}>
                        {CATS[r.topic_pillar]?.label.toUpperCase()}
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
  );
}
