import { glossary, getGlossaryLetters } from "@/lib/glossary";
import { getAllArticles } from "@/lib/mdx";
import { GlossariumClient } from "./GlossariumClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glossarium — Kamus Konsep",
  description: "Kamus istilah dan konsep kunci dari seluruh artikel Postulate. Dari Entropi hingga Quantum Entanglement.",
};

export default async function GlossariumPage() {
  const articles = await getAllArticles();
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <GlossariumClient
      entries={glossary}
      letters={letters}
      totalArticles={articles.length}
    />
  );
}
