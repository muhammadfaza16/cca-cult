import { getAllArticles } from "@/lib/mdx";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ArtikelClient } from "./ArtikelClient";

export const metadata: Metadata = {
  title: "Arsip Tulisan",
  description: "Jelajahi seluruh arsip tulisan dan kajian esai dalam Seri Psikologi Evolusi.",
};

export default async function ArtikelPage() {
  const articles = await getAllArticles();

  // Serialize for client component
  const serialized = articles.map(a => ({
    slug: a.slug,
    title: a.title,
    subtitle: a.subtitle,
    excerpt: a.excerpt,
    domain: a.domain || null,
    kategori: a.kategori,
    tipe_tulisan: a.tipe_tulisan,
    tags: a.tags,
    author: a.author,
    reading_time: a.reading_time,
    published_at: a.published_at,
    series_slug: a.series_slug,
    series_order: a.series_order,
    og_image: a.og_image,
  }));

  return (
    <Suspense>
      <ArtikelClient articles={serialized} />
    </Suspense>
  );
}
