/* ═══════════════════════════════════════════════════════════════════════════
   Glossarium — Postulate Concept Dictionary
   Editorial Bible v2.0 — Evolutionary Psychology & Culture System
   ═══════════════════════════════════════════════════════════════════════════ */

export interface GlossaryEntry {
  term: string;
  definition: string;
  source_slug: string;
  source_title: string;
  domain: "biologi-evolusi" | "psikologi-kognitif" | "perilaku-sosial" | "moralitas-budaya" | "mismatch-modern";
}

export const glossary: GlossaryEntry[] = [
  {
    term: "Altruisme Resiprokal (Reciprocal Altruism)",
    definition: "Mekanisme evolusi di mana individu memberikan pertolongan kepada individu lain tanpa hubungan kekerabatan genetik langsung, berlandaskan ekspektasi intuitif bahwa bantuan tersebut akan dibalas di masa depan.",
    source_slug: "akar-evolusi-moralitas-agama-budaya",
    source_title: "Akar Evolusi Moralitas, Agama, dan Budaya",
    domain: "moralitas-budaya" as const,
  },
  {
    term: "EEA (Environment of Evolutionary Adaptedness)",
    definition: "Lingkungan Adaptasi Evolusioner; kondisi lingkungan fisik, sosial, dan demografis era Pleistosen di mana perangkat kognitif dan naluri manusia dibentuk melalui tekanan seleksi alam.",
    source_slug: "otak-bukan-kertas-kosong",
    source_title: "Otak Bukan Kertas Kosong: Mendekonstruksi Mitos Tabula Rasa",
    domain: "psikologi-kognitif" as const,
  },
  {
    term: "Evolutionary Mismatch",
    definition: "Ketidakcocokan Evolusioner; fenomena ketika naluri dan strategi adaptif yang berevolusi untuk lingkungan purba beroperasi dalam lingkungan modern yang berubah secara eksponensial.",
    source_slug: "menjadi-manusia-di-era-modern",
    source_title: "Menjadi Manusia di Era Modern",
    domain: "mismatch-modern" as const,
  },
  {
    term: "Gen Egois (Selfish Gene)",
    definition: "Konsep mendasar evolusi molekuler bahwa gen merupakan unit dasar seleksi alam, sedangkan tubuh individu hanyalah kendaraan sementara (vehicle) yang dibangun untuk mereplikasi gen.",
    source_slug: "mesin-evolusi-cetak-biru-kehidupan",
    source_title: "Mesin Evolusi: Rahasia Tersembunyi di Balik Cetak Biru Kehidupan",
    domain: "biologi-evolusi" as const,
  },
  {
    term: "Hamilton's Rule (r · B > C)",
    definition: "Formulasi matematika seleksi kekerabatan yang menyatakan bahwa perilaku altruistik akan disleksi jika rasio kekerabatan genetik (r) dikalikan manfaat bagi penerima (B) lebih besar daripada biaya biologis bagi pemberi (C).",
    source_slug: "mesin-evolusi-cetak-biru-kehidupan",
    source_title: "Mesin Evolusi: Rahasia Tersembunyi di Balik Cetak Biru Kehidupan",
    domain: "biologi-evolusi" as const,
  },
  {
    term: "Handicap Principle",
    definition: "Prinsip Beban Seleksi Seksual; teori bahwa sinyal biologis atau perilaku mahal yang membawa risiko tinggi bertindak sebagai jaminan jujur (honest signal) atas kualitas genetik dan kebugaran individu.",
    source_slug: "dekode-perilaku-manusia-pasangan-dan-status",
    source_title: "Dekode Perilaku Manusia: Pasangan, Hierarki, dan Status",
    domain: "perilaku-sosial" as const,
  },
  {
    term: "Inclusive Fitness",
    definition: "Kebugaran Inklusif; ukuran total keberhasilan genetik individu yang dihitung dari jumlah keturunan biologis langsung ditambah dampaknya terhadap reproduksi kerabat yang berbagi gen sejenis.",
    source_slug: "mesin-evolusi-cetak-biru-kehidupan",
    source_title: "Mesin Evolusi: Rahasia Tersembunyi di Balik Cetak Biru Kehidupan",
    domain: "biologi-evolusi" as const,
  },
  {
    term: "Memetika (Memetics)",
    definition: "Studi ilmiah mengenai meme sebagai unit penularan budaya (seperti ide, norma, ritual, dan kepercayaan) yang mereplikasi dirinya dari otak ke otak melalui proses peniruan sosial.",
    source_slug: "akar-evolusi-moralitas-agama-budaya",
    source_title: "Akar Evolusi Moralitas, Agama, dan Budaya",
    domain: "moralitas-budaya" as const,
  },
  {
    term: "Modularitas Otak (Domain-Specific Modules)",
    definition: "Arsitektur kognitif di mana otak manusia tersusun atas seperangkat program mental spesifik yang dirancang khusus untuk memproses masalah adaptif tertentu, bukan pemroses serbaguna.",
    source_slug: "otak-bukan-kertas-kosong",
    source_title: "Otak Bukan Kertas Kosong: Mendekonstruksi Mitos Tabula Rasa",
    domain: "psikologi-kognitif" as const,
  },
  {
    term: "Seleksi Kekerabatan (Kin Selection)",
    definition: "Bentuk seleksi alam yang melestarikan perilaku altruistik atau dorongan pengorbanan yang diarahkan khusus kepada kerabat biologis demi mempertahankan gen bersama.",
    source_slug: "mesin-evolusi-cetak-biru-kehidupan",
    source_title: "Mesin Evolusi: Rahasia Tersembunyi di Balik Cetak Biru Kehidupan",
    domain: "biologi-evolusi" as const,
  },
  {
    term: "Seleksi Seksual (Sexual Selection)",
    definition: "Proses evolusi biologis yang didorong oleh kompetisi memperebutkan pasangan (intrasexual) dan preferensi pemulihan pasangan (intersexual), melahirkan ornamen dan sinyal status fisik.",
    source_slug: "dekode-perilaku-manusia-pasangan-dan-status",
    source_title: "Dekode Perilaku Manusia: Pasangan, Hierarki, dan Status",
    domain: "perilaku-sosial" as const,
  },
  {
    term: "Signaling Theory",
    definition: "Teori Sinyal; analisis ilmiah mengenai cara organisme mengomunikasikan kualitas internal tersembunyi (seperti kesehatan, status, atau komitmen) melalui indikator yang sulit dipalsukan.",
    source_slug: "dekode-perilaku-manusia-pasangan-dan-status",
    source_title: "Dekode Perilaku Manusia: Pasangan, Hierarki, dan Status",
    domain: "perilaku-sosial" as const,
  },
  {
    term: "Supernormal Stimulus",
    definition: "Stimulus Supernormal; rangsangan buatan yang lebih pekat dan memikat daripada apa pun yang ada di lingkungan alami, yang mampu membajak sirkuit dorongan dopamin bawaan manusia.",
    source_slug: "menjadi-manusia-di-era-modern",
    source_title: "Menjadi Manusia di Era Modern",
    domain: "mismatch-modern" as const,
  },
  {
    term: "Tabula Rasa",
    definition: "Doktrin klasik keliru yang menganggap kognisi dan mentalitas manusia lahir sebagai kertas kosong tanpa bawaan pola atau naluri biologis terstruktur.",
    source_slug: "otak-bukan-kertas-kosong",
    source_title: "Otak Bukan Kertas Kosong: Mendekonstruksi Mitos Tabula Rasa",
    domain: "psikologi-kognitif" as const,
  },
].sort((a, b) => a.term.localeCompare(b.term, "id"));

/** Get all unique first letters for alphabetical navigation */
export function getGlossaryLetters(): string[] {
  const letters = new Set(glossary.map(e => e.term[0].toUpperCase()));
  return Array.from(letters).sort();
}
