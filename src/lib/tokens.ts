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
  logika:    { label: "Logic & Reasoning", color: "#B8860B", tagline: "Foundations of reasoning and how we conclude truth" },
  filsafat:  { label: "Philosophy",        color: "#5B2E91", tagline: "Deep exploration of existence and meaning" },
  sains:     { label: "Science",           color: "#0C6B7A", tagline: "Empirical methods for dissecting universal reality" },
  ekonomi:   { label: "Economics",         color: "#1B6B3A", tagline: "Understanding systems, incentives, and human behavior at scale" },
  psikologi: { label: "Psychology",        color: "#B07D10", tagline: "Navigating the labyrinth of individual mind and behavior" },
};

/** Topic label lookup (for article detail pages) */
export const PILLAR: Record<string, { color: string; label: string }> = {
  logika:    { color: "#B8860B", label: "LOGIC & REASONING" },
  filsafat:  { color: "#5B2E91", label: "PHILOSOPHY" },
  sains:     { color: "#0C6B7A", label: "SCIENCE" },
  ekonomi:   { color: "#1B6B3A", label: "ECONOMICS" },
  psikologi: { color: "#B07D10", label: "PSYCHOLOGY" },
};

/** Get pillar color or fallback to ink */
export function catColor(pillar: string): string {
  return CATS[pillar]?.color || T.ink;
}

/** Difficulty labels (kept for metadata but hidden from UI) */
const DIFFS = ["semua", "pemula", "menengah", "dalam"] as const;
