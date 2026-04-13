import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

/* ─── Display Serif: Cormorant Garamond ──────────────────────────────────
   High-contrast Didone-style. Think Vogue/Harper's. Dramatic at large sizes,
   unmistakably "editorial" — not a default browser font. */
const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* ─── Body Serif: Source Serif 4 ─────────────────────────────────────────
   Designed for extended reading. More personality than Georgia,
   better spacing for Indonesian diacritics. */
const sourceSerif = Source_Serif_4({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

/* ─── Mono: JetBrains Mono ───────────────────────────────────────────────
   For labels, metadata, category tags. Better than system monospace. */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Postulate — Titik awal untuk akal yang meragu.",
    template: "%s | Postulate",
  },
  description:
    "Ilmu yang dalam. Bahasa yang manusia. Logika, sains, filsafat, ekonomi, psikologi — dikemas untuk dibaca, dipahami, dan dipikirkan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${cormorant.variable} ${sourceSerif.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body><ThemeProvider>{children}</ThemeProvider></body>
    </html>
  );
}
