import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

// Types
interface ArticleMeta {
  slug: string;
  title: string;
  subtitle: string;
  domain?: "absurditas-kebijakan" | "uang-rakyat" | "labirin-birokrasi" | "ekologi-eksploitasi" | "demokrasi-suara";
  kategori: "Thoughts" | "Stories" | "Refleksi" | "Satir";
  tipe_tulisan: string;
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
  excerpt: string;
}

interface Article {
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
    domain: data.domain,
    kategori: data.kategori || "Satir",
    tipe_tulisan: data.tipe_tulisan || "Satir / Opini",
    tags: data.tags || [],
    author: data.author || "POSTULATE EDITORIAL",
    published_at: data.published_at || new Date().toISOString(),
    updated_at: data.updated_at,
    prerequisites: data.prerequisites || [],
    series_slug: data.series_slug,
    series_order: data.series_order,
    reading_time: stats.text.replace("read", "baca"),
    reading_time_minutes: Math.ceil(stats.minutes),
    og_image: data.og_image,
    seo_description: data.seo_description,
    excerpt: data.excerpt || getExcerpt(content),
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

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx") && !f.includes(".lama."));

  const articles = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title || "",
      subtitle: data.subtitle || "",
      domain: data.domain,
      kategori: data.kategori || "Satir",
      tipe_tulisan: data.tipe_tulisan || "Satir / Opini",
      tags: data.tags || [],
      author: data.author || "POSTULATE EDITORIAL",
      published_at: data.published_at || new Date().toISOString(),
      updated_at: data.updated_at,
      prerequisites: data.prerequisites || [],
      series_slug: data.series_slug,
      series_order: data.series_order,
      reading_time: stats.text.replace("read", "baca"),
      reading_time_minutes: Math.ceil(stats.minutes),
      og_image: data.og_image,
      seo_description: data.seo_description,
      excerpt: getExcerpt(content),
    } as ArticleMeta;
  });

  // Sort LIFO (newest published_at first)
  return articles.sort((a, b) => {
    return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
  });
}

/**
 * Extracts a clean text excerpt from MDX content.
 * Targets the first paragraph and removes basic markdown/JSX tags.
 */
function getExcerpt(content: string, length = 160): string {
  // 1. Remove JSX/HTML tags (very basic)
  let text = content.replace(/<[^>]*>/g, "");
  
  // 2. Remove markdown symbols
  text = text
    .replace(/^#+ .*/g, "") // remove headings
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // link text
    .replace(/!\[([^\]]*)\]\([^\)]+\)/g, "") // hide images
    .replace(/[*_~`]/g, "") // generic symbols
    .replace(/> .*/g, "") // blockquotes
    .replace(/---/g, ""); // hr

  // 3. Find first non-empty paragraph
  const paragraphs = text.split("\n").map(p => p.trim()).filter(p => p.length > 5);
  const firstPara = paragraphs[0] || "";

  if (firstPara.length <= length) return firstPara;
  return firstPara.substring(0, length).trim() + "...";
}
