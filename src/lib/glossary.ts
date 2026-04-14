/* ═══════════════════════════════════════════════════════════════════════════
   Glossarium — Postulate Concept Dictionary
   
   Each entry maps a key term to its short definition and source article.
   This is the single source for the /glossarium page and future
   inline-definition tooltips.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface GlossaryEntry {
  term: string;
  definition: string;
  source_slug: string;
  source_title: string;
  pillar: string;
}

export const glossary: GlossaryEntry[] = [
  // ─── Logika & Pikir ───
  {
    term: "Berpikir Kritis",
    definition: "Kemampuan menganalisis informasi secara objektif dan membuat penilaian beralasan, bukan menerima klaim begitu saja.",
    source_slug: "apa-itu-berpikir-kritis",
    source_title: "Apa Itu Berpikir Kritis?",
    pillar: "logika",
  },
  {
    term: "Heuristik",
    definition: "Jalan pintas mental yang digunakan otak untuk memproses informasi dengan cepat — efisien, tapi rentan menghasilkan bias sistematis.",
    source_slug: "heuristik-dan-bias",
    source_title: "Heuristik dan Bias",
    pillar: "logika",
  },
  {
    term: "Bias Kognitif",
    definition: "Pola penyimpangan sistematis dalam cara otak memproses informasi, yang menyebabkan penilaian tidak rasional secara konsisten.",
    source_slug: "heuristik-dan-bias",
    source_title: "Heuristik dan Bias",
    pillar: "logika",
  },
  {
    term: "Pisau Cukur Occam",
    definition: "Prinsip bahwa di antara penjelasan-penjelasan yang bersaing, yang paling sederhana — dengan asumsi paling sedikit — biasanya yang benar.",
    source_slug: "pisau-cukur-occam",
    source_title: "Pisau Cukur Occam",
    pillar: "logika",
  },
  {
    term: "Logical Fallacy",
    definition: "Kesalahan dalam struktur penalaran yang membuat argumen terdengar meyakinkan padahal secara logis cacat.",
    source_slug: "sesat-pikir-panduan-logical-fallacies",
    source_title: "Sesat Pikir: Logical Fallacies",
    pillar: "logika",
  },
  {
    term: "Ad Hominem",
    definition: "Sesat pikir yang menyerang karakter atau pribadi lawan debat alih-alih membantah argumennya.",
    source_slug: "sesat-pikir-panduan-logical-fallacies",
    source_title: "Sesat Pikir: Logical Fallacies",
    pillar: "logika",
  },
  {
    term: "Straw Man",
    definition: "Sesat pikir di mana seseorang mendistorsi argumen lawan menjadi versi yang lebih lemah, lalu menyerang versi lemah tersebut.",
    source_slug: "sesat-pikir-panduan-logical-fallacies",
    source_title: "Sesat Pikir: Logical Fallacies",
    pillar: "logika",
  },
  {
    term: "First Principles Thinking",
    definition: "Metode berpikir yang membongkar masalah sampai ke komponen paling fundamental, lalu membangun solusi dari nol tanpa asumsi.",
    source_slug: "first-principles-thinking",
    source_title: "First Principles Thinking",
    pillar: "logika",
  },
  {
    term: "Postulate",
    definition: "Pernyataan atau asumsi yang dianggap benar tanpa perlu dibuktikan, yang berfungsi sebagai dasar atau titik awal untuk penalaran lebih lanjut.",
    source_slug: "first-principles-thinking",
    source_title: "First Principles Thinking",
    pillar: "logika",
  },
  {
    term: "Pisau Cukur Hanlon",
    definition: "Prinsip yang menyatakan: jangan pernah menganggap niat jahat untuk hal yang bisa dijelaskan oleh kebodohan atau ketidaktahuan.",
    source_slug: "pisau-cukur-hanlon",
    source_title: "Pisau Cukur Hanlon",
    pillar: "logika",
  },
  {
    term: "Bayesian Thinking",
    definition: "Kerangka berpikir probabilistik yang memperbarui tingkat keyakinan secara proporsional berdasarkan bukti baru yang masuk.",
    source_slug: "berpikir-ala-bayesian",
    source_title: "Berpikir ala Bayesian",
    pillar: "logika",
  },
  {
    term: "Peta Bukanlah Wilayah",
    definition: "Prinsip Alfred Korzybski: representasi mental kita tentang realitas bukanlah realitas itu sendiri — model selalu lebih sederhana dari kenyataan.",
    source_slug: "peta-bukanlah-wilayah",
    source_title: "Peta Bukanlah Wilayah",
    pillar: "logika",
  },
  {
    term: "Paradoks Sorites",
    definition: "Paradoks tumpukan: jika satu butir pasir bukan tumpukan, dan menambah satu butir tidak mengubahnya jadi tumpukan, kapan persisnya ia menjadi tumpukan?",
    source_slug: "paradoks-sorites",
    source_title: "Paradoks Sorites",
    pillar: "logika",
  },
  {
    term: "Hukum Brandolini",
    definition: "Energi yang dibutuhkan untuk membantah omong kosong jauh lebih besar secara eksponensial daripada energi untuk memproduksinya.",
    source_slug: "hukum-brandolini",
    source_title: "Hukum Brandolini",
    pillar: "logika",
  },

  // ─── Psikologi ───
  {
    term: "Efek Dunning-Kruger",
    definition: "Bias kognitif di mana orang dengan kemampuan rendah melebih-lebihkan kompetensinya, sementara yang sangat ahli justru meremehkan dirinya.",
    source_slug: "efek-dunning-kruger",
    source_title: "Efek Dunning-Kruger",
    pillar: "psikologi",
  },
  {
    term: "Bias Konfirmasi",
    definition: "Kecenderungan otak untuk mencari, mengingat, dan menafsirkan informasi dengan cara yang mengonfirmasi keyakinan yang sudah ada.",
    source_slug: "bias-konfirmasi",
    source_title: "Bias Konfirmasi",
    pillar: "psikologi",
  },
  {
    term: "Groupthink",
    definition: "Fenomena psikologi sosial di mana tekanan untuk konsensus kelompok menindas pemikiran kritis dan menghasilkan keputusan irasional.",
    source_slug: "groupthink",
    source_title: "Groupthink",
    pillar: "psikologi",
  },

  // ─── Sains ───
  {
    term: "Entropi",
    definition: "Ukuran ketidakteraturan dalam sebuah sistem. Hukum Kedua Termodinamika menjamin entropi selalu meningkat — semesta bergerak menuju kekacauan.",
    source_slug: "entropi-mengapa-berantakan",
    source_title: "Entropi: Mengapa Segala Sesuatu Berantakan",
    pillar: "sains",
  },
  {
    term: "Hukum Kedua Termodinamika",
    definition: "Dalam sistem tertutup, entropi selalu meningkat atau tetap — tidak pernah menurun secara spontan. Energi mengalir dari terstruktur ke tak terstruktur.",
    source_slug: "entropi-mengapa-berantakan",
    source_title: "Entropi: Mengapa Segala Sesuatu Berantakan",
    pillar: "sains",
  },
  {
    term: "Hamburan Rayleigh",
    definition: "Fenomena fisika di mana cahaya berpanjang gelombang pendek (biru) tersebar jauh lebih kuat oleh partikel kecil atmosfer, menghasilkan ilusi langit biru.",
    source_slug: "mengapa-langit-biru",
    source_title: "Mengapa Langit Biru?",
    pillar: "sains",
  },
  {
    term: "Paradoks Fermi",
    definition: "Kontradiksi antara tingginya probabilitas peradaban alien dan tidak adanya bukti kontak — 'Di mana semua orang?'",
    source_slug: "paradoks-fermi-the-great-filter",
    source_title: "Paradoks Fermi & The Great Filter",
    pillar: "sains",
  },
  {
    term: "The Great Filter",
    definition: "Hipotesis Robin Hanson bahwa ada satu tahap evolusi yang hampir mustahil dilewati, menjelaskan mengapa alam semesta sepi dari peradaban maju.",
    source_slug: "paradoks-fermi-the-great-filter",
    source_title: "Paradoks Fermi & The Great Filter",
    pillar: "sains",
  },
  {
    term: "Kalender Kosmik",
    definition: "Skala visualisasi Carl Sagan yang memampatkan 13,8 miliar tahun usia semesta ke dalam 12 bulan kalender — peradaban manusia hanya berdurasi 14 detik terakhir.",
    source_slug: "kalender-kosmik-carl-sagan",
    source_title: "Kalender Kosmik Carl Sagan",
    pillar: "sains",
  },
  {
    term: "Epigenetika",
    definition: "Cabang biologi yang mempelajari bagaimana molekul di atas DNA bisa menyalakan atau mematikan gen tanpa mengubah kode genetik itu sendiri.",
    source_slug: "epigenetika-papan-ketik-dna",
    source_title: "Epigenetika: DNA Bukan Takdir",
    pillar: "sains",
  },
  {
    term: "Quantum Entanglement",
    definition: "Fenomena kuantum di mana dua partikel yang terpisah jarak apapun merespons satu sama lain secara instan — melanggar batas kecepatan cahaya.",
    source_slug: "quantum-entanglement-aksi-berhantu",
    source_title: "Quantum Entanglement",
    pillar: "sains",
  },
  {
    term: "Nash Equilibrium",
    definition: "Kondisi dalam teori permainan di mana tidak ada pemain yang bisa memperbaiki posisinya dengan mengubah strategi sendirian.",
    source_slug: "teori-permainan-matematika-keputusan",
    source_title: "Teori Permainan",
    pillar: "sains",
  },
  {
    term: "Dilema Tahanan",
    definition: "Skenario teori permainan klasik yang menunjukkan bagaimana rasionalitas individu bisa menghasilkan kebodohan kolektif.",
    source_slug: "teori-permainan-matematika-keputusan",
    source_title: "Teori Permainan",
    pillar: "sains",
  },
  {
    term: "Tit for Tat",
    definition: "Strategi pemenang turnamen Axelrod: mulai dengan kerja sama, lalu tiru langkah lawan sebelumnya. Baik hati, tegas, pemaaf.",
    source_slug: "teori-permainan-matematika-keputusan",
    source_title: "Teori Permainan",
    pillar: "sains",
  },

  // ─── Filsafat ───
  {
    term: "Epistemologi",
    definition: "Cabang filsafat yang mempelajari sifat, sumber, dan batas-batas pengetahuan manusia — bagaimana kita tahu bahwa kita tahu?",
    source_slug: "epistemologi-bagaimana-kita-tahu",
    source_title: "Epistemologi: Bagaimana Kita Tahu?",
    pillar: "filsafat",
  },
].sort((a, b) => a.term.localeCompare(b.term, "id"));

/** Get all unique first letters for alphabetical navigation */
export function getGlossaryLetters(): string[] {
  const letters = new Set(glossary.map(e => e.term[0].toUpperCase()));
  return Array.from(letters).sort();
}
