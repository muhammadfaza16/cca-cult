import { getAllArticles } from "@/lib/mdx";
import type { Metadata } from "next";
import { ArtikelClient } from "./ArtikelClient";

export const metadata: Metadata = {
  title: "Arsip Artikel",
  description: "Jelajahi seluruh koleksi artikel Postulate — cari, filter, dan temukan yang kamu mau.",
};

export default async function ArtikelPage() {
  const articles = await getAllArticles();

  // Serialize for client component
  const serialized = articles.map(a => ({
    slug: a.slug,
    title: a.title,
    subtitle: a.subtitle,
    topic_pillar: a.topic_pillar,
    difficulty: a.difficulty,
    tags: a.tags,
    author: a.author,
    reading_time: a.reading_time,
    published_at: a.published_at,
    logic_stage: a.logic_stage,
    logic_priority: a.logic_priority,
  }));

  return <ArtikelClient articles={serialized} />;
}
