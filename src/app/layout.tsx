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
              (function() {
                if (typeof window === 'undefined') return;

                // 1. Intercept setAttribute
                var origSet = Element.prototype.setAttribute;
                Element.prototype.setAttribute = function(name, value) {
                  if (name && (name === 'bis_skin_checked' || name.indexOf('bis_') === 0)) return;
                  return origSet.apply(this, arguments);
                };

                // 2. Intercept setAttributeNS
                var origSetNS = Element.prototype.setAttributeNS;
                Element.prototype.setAttributeNS = function(ns, name, value) {
                  if (name && (name === 'bis_skin_checked' || name.indexOf('bis_') === 0)) return;
                  return origSetNS.apply(this, arguments);
                };

                // 3. Define property trap on Element prototype
                try {
                  Object.defineProperty(Element.prototype, 'bis_skin_checked', {
                    get: function() { return undefined; },
                    set: function() { return true; },
                    configurable: true
                  });
                } catch(e) {}

                // 4. Remove any pre-injected bis_skin_checked attributes synchronously
                function cleanBis() {
                  try {
                    var els = document.querySelectorAll('[bis_skin_checked]');
                    for (var i = 0; i < els.length; i++) {
                      els[i].removeAttribute('bis_skin_checked');
                    }
                  } catch(e) {}
                }
                cleanBis();

                // 5. MutationObserver to strip bis_skin_checked dynamically
                try {
                  var obs = new MutationObserver(function(mutations) {
                    for (var i = 0; i < mutations.length; i++) {
                      var m = mutations[i];
                      if (m.type === 'attributes' && m.attributeName && m.attributeName.indexOf('bis_') === 0) {
                        m.target.removeAttribute(m.attributeName);
                      }
                    }
                  });
                  obs.observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: ['bis_skin_checked'] });
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
