import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

// Types
export interface ArticleMeta {
  slug: string;
  title: string;
  subtitle: string;
  topic_pillar: "logika" | "filsafat" | "sains" | "ekonomi" | "psikologi";
  difficulty: "pemula" | "menengah" | "dalam";
  tags: string[];
  author: string;
  published_at: string;
  updated_at?: string;
  prerequisites: string[];
  series_slug?: string;
  series_order?: number;
  reading_time: string;
  reading_time_minutes: number;
  og_image?: string;
  seo_description?: string;
}

export interface Article {
  meta: ArticleMeta;
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "articles");

/**
 * Get a single article by slug.
 * Reads the MDX file, parses frontmatter, calculates reading time.
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  const meta: ArticleMeta = {
    slug,
    title: data.title || "",
    subtitle: data.subtitle || "",
    topic_pillar: data.topic_pillar || "filsafat",
    difficulty: data.difficulty || "pemula",
    tags: data.tags || [],
    author: data.author || "Tim Postulate",
    published_at: data.published_at || new Date().toISOString(),
    updated_at: data.updated_at,
    prerequisites: data.prerequisites || [],
    series_slug: data.series_slug,
    series_order: data.series_order,
    reading_time: stats.text.replace("read", "baca"),
    reading_time_minutes: Math.ceil(stats.minutes),
    og_image: data.og_image,
    seo_description: data.seo_description,
  };

  return { meta, content };
}

/**
 * Get all articles, sorted by published_at descending.
 */
export async function getAllArticles(): Promise<ArticleMeta[]> {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const articles = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title || "",
      subtitle: data.subtitle || "",
      topic_pillar: data.topic_pillar || "filsafat",
      difficulty: data.difficulty || "pemula",
      tags: data.tags || [],
      author: data.author || "Tim Postulate",
      published_at: data.published_at || new Date().toISOString(),
      updated_at: data.updated_at,
      prerequisites: data.prerequisites || [],
      series_slug: data.series_slug,
      series_order: data.series_order,
      reading_time: stats.text.replace("read", "baca"),
      reading_time_minutes: Math.ceil(stats.minutes),
      og_image: data.og_image,
      seo_description: data.seo_description,
    } as ArticleMeta;
  });

  // Sort by published_at descending
  return articles.sort(
    (a, b) =>
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
}

/**
 * Get articles filtered by topic pillar.
 */
export async function getArticlesByPillar(
  pillar: string
): Promise<ArticleMeta[]> {
  const all = await getAllArticles();
  return all.filter((a) => a.topic_pillar === pillar);
}

/**
 * Get articles in a series, ordered by series_order.
 */
export async function getArticlesBySeries(
  seriesSlug: string
): Promise<ArticleMeta[]> {
  const all = await getAllArticles();
  return all
    .filter((a) => a.series_slug === seriesSlug)
    .sort((a, b) => (a.series_order || 0) - (b.series_order || 0));
}

/**
 * Pillar display names
 */
export const PILLAR_NAMES: Record<string, string> = {
  logika: "Logika & Pikir",
  filsafat: "Filsafat",
  sains: "Sains & Teknologi",
  ekonomi: "Ekonomi & Politik",
  psikologi: "Psikologi & Sosial",
};

export const PILLAR_DESCRIPTIONS: Record<string, string> = {
  logika: "Berpikir kritis, sesat pikir, dan cara menalar dengan jernih.",
  filsafat: "Epistemologi, ontologi, dan pertanyaan-pertanyaan fundamental.",
  sains: "Fisika, biologi, intuisi matematika, dan teknologi yang mengubah dunia.",
  ekonomi: "Berpikir sistem, insentif, kebijakan, dan sejarah gagasan.",
  psikologi: "Bias kognitif, perilaku, dan dinamika sosial yang membentuk kita.",
};

export const DIFFICULTY_LABELS: Record<string, string> = {
  pemula: "Pemula",
  menengah: "Menengah",
  dalam: "Dalam",
};
