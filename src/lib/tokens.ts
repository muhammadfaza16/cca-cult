/* ═══════════════════════════════════════════════════════════════════════════
   Postulate Design Tokens — Single Source of Truth
   ═══════════════════════════════════════════════════════════════════════════ */

/** Golden Ratio spacing scale (Fibonacci-adjacent) */
export const φ = {
  xs: 8,
  sm: 13,
  md: 21,
  lg: 34,
  xl: 55,
  xxl: 89,
} as const;

/** Core color palette — references CSS vars for dark mode support */
export const T = {
  bg: "var(--bg)",
  ink: "var(--ink)",
  muted: "var(--muted)",
  subtle: "var(--subtle)",
  faint: "var(--faint)",
  border: "var(--border)",
  white: "var(--white)",
  gold: "var(--gold)",
  /* Inverted surfaces — always dark (footer, identity strip) */
  invBg: "var(--inv-bg)",
  invFg: "var(--inv-fg)",
  invMuted: "var(--inv-muted)",
  invBorder: "var(--inv-border)",
  /* Elevated surface — slight lift from bg (stats strip) */
  surface: "var(--surface)",
} as const;

/** 5-Topic category system */
export const CATS: Record<string, { label: string; color: string; tagline: string }> = {
  logika:    { label: "Logika & Kerangka Berpikir", color: "#B8860B", tagline: "Fondasi penalaran dan cara kita menyimpulkan kebenaran" },
  filsafat:  { label: "Filsafat",         color: "#5B2E91", tagline: "Eksplorasi mendalam tentang eksistensi dan makna" },
  sains:     { label: "Sains",            color: "#0C6B7A", tagline: "Metode empiris untuk membedah realitas alam semesta" },
  ekonomi:   { label: "Ekonomi",          color: "#1B6B3A", tagline: "Memahami sistem, insentif, dan perilaku manusia dalam skala besar" },
  psikologi: { label: "Psikologi",        color: "#B07D10", tagline: "Menelusuri labirin pikiran dan perilaku individu" },
};

/** Topic label lookup (for article detail pages) */
export const PILLAR: Record<string, { color: string; label: string }> = {
  logika:    { color: "#B8860B", label: "LOGIKA & KERANGKA BERPIKIR" },
  filsafat:  { color: "#5B2E91", label: "FILSAFAT" },
  sains:     { color: "#0C6B7A", label: "SAINS" },
  ekonomi:   { color: "#1B6B3A", label: "EKONOMI" },
  psikologi: { color: "#B07D10", label: "PSIKOLOGI" },
};

/** Get pillar color or fallback to ink */
export function catColor(pillar: string): string {
  return CATS[pillar]?.color || T.ink;
}

/** Difficulty labels */
export const DIFFS = ["semua", "pemula", "menengah", "dalam"] as const;

export const LOGIC_STAGE_LABELS: Record<string, string> = {
  pondasi: "PONDASI",
  "cacat-pikir": "CACAT PIKIR",
  alat: "ALAT BERPIKIR",
  lanjutan: "LOGIKA LANJUTAN",
};

export const LOGIC_STAGE_ORDER = ["pondasi", "cacat-pikir", "alat", "lanjutan"];
