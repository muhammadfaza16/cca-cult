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
    default: "postulate. — Jurnal Esai & Dialektika Evolusi Kebudayaan",
    template: "%s | postulate.",
  },
  description:
    "Esai naratif, sains kognitif, dan analisis kritis biologi evolusi serta kebudayaan manusia.",
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                const _set = Element.prototype.setAttribute;
                Element.prototype.setAttribute = function(name, val) {
                  if (name === 'bis_skin_checked') return;
                  return _set.call(this, name, val);
                };
              }
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning><ThemeProvider>{children}</ThemeProvider></body>
    </html>
  );
}
