/* ═══════════════════════════════════════════════════════════════════════════
   Postulate Design Tokens — Single Source of Truth
   Editorial Bible v2.0 — Evolutionary Psychology & Cultural System
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

/** 5-Domain system — organized around Evolutionary Psychology & Culture Dialectics */
export const DOMAINS: Record<string, {
  label: string;
  color: string;
  question: string;
  tagline: string;
}> = {
  "biologi-evolusi": {
    label: "Biologi Evolusi & Replikator",
    color: "#B32D2D",
    question: "Bagaimana logika gen egois membangun kendaraan biologis untuk melestarikan informasi genetik?",
    tagline: "Gen egois, replikator biologis, seleksi alam, dan kalkulasi kepunahan",
  },
  "psikologi-kognitif": {
    label: "Arsitektur Kognitif & Otak",
    color: "#2B5876",
    question: "Mengapa otak manusia bukan kertas kosong melainkan pisau Swiss kognitif yang kaya perangkat adaptif?",
    tagline: "Modularitas otak, kritik tabula rasa, EEA, dan fondasi psikologi evolusi",
  },
  "perilaku-sosial": {
    label: "Pasangan, Hierarki & Status",
    color: "#D4AF37",
    question: "Bagaimana seleksi seksual memetakan arsitektur dorongan asmara, gosip, dan perburuan status sosial?",
    tagline: "Handicap principle, signaling theory, persaingan intraseksual, dan dominasi",
  },
  "moralitas-budaya": {
    label: "Moralitas, Agama & Memetika",
    color: "#1A5F35",
    question: "Dari mana asal-usul rasa bersalah, intuisi keadilan, dan dorongan kohesi supranatural manusia?",
    tagline: "Altruisme resiprokal, evolusi moralitas, kohesi kelompok, dan penularan meme",
  },
  "mismatch-modern": {
    label: "Evolutionary Mismatch & Digital",
    color: "#C93B2B",
    question: "Apa yang terjadi ketika otak pemburu Pleistosen terperangkap dalam algoritma rangsangan supernormal?",
    tagline: "Ketidakcocokan evolusioner, pembajakan dopamin, dan navigasi eksistensial era modern",
  },
};

/** Domain label lookup (for article detail pages / nav bars) */
export const DOMAIN_HEADER: Record<string, { color: string; label: string }> = Object.fromEntries(
  Object.entries(DOMAINS).map(([id, d]) => [id, { color: d.color, label: d.label.toUpperCase() }])
);

export const brandAccent = "#B32D2D";

/** Get domain color or fallback to accent */
export function domainColor(domain: string): string {
  return DOMAINS[domain]?.color || brandAccent;
}

/** Deterministic Indonesian date formatter (prevents hydration mismatch) */
export function formatIndonesianDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
