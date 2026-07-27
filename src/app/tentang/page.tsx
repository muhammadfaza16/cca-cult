import Link from "next/link";
import { T, φ, brandAccent } from "@/lib/tokens";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Postulate",
  description: "Jurnal esai independen yang memetakan perpotongan sains, filsafat, teknologi, dan arsitektur kebudayaan manusia.",
};

export default function TentangPage() {
  return (
    <div style={{ minHeight: "100svh", background: T.bg, color: T.ink }}>

      {/* ─── Header ─── */}
      <header className="glass-nav" style={{
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div className="cca-container" style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", height: φ.xl,
        }}>
          <Link href="/" style={{
            textDecoration: "none", color: "inherit",
            display: "flex", alignItems: "baseline", gap: φ.xs,
          }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, letterSpacing: "-0.01em" }}>pos·tu·late</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontStyle: "italic", color: T.muted }}>noun.</span>
          </Link>
          <Link href="/" className="back-btn-hover">
            <span>←</span> Beranda
          </Link>
        </div>
      </header>

      {/* ─── Hero Banner (Eagle View) ─── */}
      <div style={{
        background: T.invBg,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          opacity: 0.03,
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,.5) 20px, rgba(255,255,255,.5) 21px)`,
          pointerEvents: "none",
        }} />

        <div className="cca-container" style={{ padding: `${φ.xxl}px 34px`, position: "relative" }}>
          <div style={{ maxWidth: 780 }}>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 3,
              color: T.invMuted, marginBottom: φ.md,
            }}>TENTANG PLATFORM · LANSKAP DISKURSUS</div>

            <h1 style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: "clamp(36px, 6vw, 56px)", lineHeight: 1.08,
              letterSpacing: "-0.03em", color: T.invFg,
              marginBottom: φ.md,
            }}>
              Sadar Sepenuhnya
            </h1>

            <p style={{
              fontFamily: "var(--font-body)", fontSize: 17.5, lineHeight: 1.65,
              color: T.invMuted, fontStyle: "normal",
              maxWidth: 660,
            }}>
              Ada jarak yang aneh antara apa yang telah diketahui manusia dan apa yang benar-benar dipahami manusia.
            </p>
          </div>
        </div>
      </div>

      {/* ─── Eagle View Story ─── */}
      <section className="cca-container" style={{ padding: `${φ.xl}px 34px` }}>
        <div style={{ maxWidth: 780 }} className="prose-cca">
          <p>
            Empat abad terakhir adalah masa paling luar biasa dalam sejarah kesadaran manusia. Kita telah menghitung usia semesta, membaca kode kehidupan dalam sel, dan menelusuri jejak nenek moyang kita hingga ke savana Afrika jutaan tahun silam. Rahasia yang dulu hanya bisa dijawab oleh mitos dan dogma, kini punya jawaban yang bisa diuji, diperiksa ulang, dan dipertanggungjawabkan. Ini bukan pencapaian kecil. Ini adalah salah satu keajaiban terbesar spesies kita.
          </p>
          <p>
            Namun sebagian besar dari kita hidup seolah keajaiban itu tidak pernah terjadi. Kita mewarisi asumsi-asumsi lama tentang diri sendiri, tentang sejarah, tentang bagaimana dunia bekerja, lalu mengulanginya tanpa pernah memeriksanya kembali. Realitas yang sebenarnya sudah tersedia bagi siapa saja yang mau menempuhnya, tetapi kebanyakan orang berhenti di permukaan, puas dengan gambaran dunia yang jauh lebih sempit dan lebih keliru dari yang seharusnya.
          </p>
          <p>
            Ada alasan untuk itu, dan alasan itu bukan kemalasan semata. Ini zaman ketika perhatian dibombardir setiap detik, ketika informasi datang dalam potongan-potongan yang dirancang untuk dikonsumsi cepat lalu dilupakan. Kita membaca lebih banyak dari generasi mana pun sebelumnya, tetapi merenungkan lebih sedikit. Kita mengumpulkan fakta seperti remah-remah, tanpa pernah menyusunnya menjadi pemahaman yang utuh. Kedalaman, yaitu kemampuan untuk duduk diam bersama sebuah gagasan sampai ia benar-benar dimengerti, perlahan menjadi barang langka.
          </p>
          <p>
            Platform ini lahir dari keyakinan bahwa dua persoalan itu saling terkait, dan bahwa keduanya bukan sekadar urusan intelektual. Ketika seseorang benar-benar memahami dari mana ia berasal, bagaimana bintang-bintang menyusun unsur dalam tubuhnya, bagaimana kehidupan menyusun dirinya sendiri dari ketiadaan, hingga bagaimana peradaban dibangun di atas jutaan keputusan kecil manusia biasa, sesuatu yang mendasar berubah dalam cara ia memandang dunia dan dirinya sendiri. Ia menjadi lebih sulit dibodohi, lebih tahan terhadap kepanikan, lebih mampu membedakan yang penting dari yang sekadar ramai.
          </p>
          <p>
            Kami percaya bahwa kekacauan yang kita saksikan di ruang publik seperti kegaduhan, kebencian, dan kedangkalan yang berulang-ulang jarang selesai dengan seruan moral atau slogan politik. Ia berakar pada sesuatu yang lebih dalam: pikiran yang tidak pernah diberi kesempatan untuk benar-benar memahami dunia tempat ia hidup. Membebaskan pikiran itu, memberinya bahan untuk berpikir panjang dan mendalam, adalah langkah pertama yang sering dilewatkan.
          </p>
          <p>
            Di sinilah kami berdiri: mengajak Anda menempuh kembali kisah alam semesta, kehidupan, dan manusia bukan sebagai kumpulan fakta, melainkan satu narasi besar yang layak direnungkan sepenuhnya.
          </p>
        </div>
      </section>

      {/* ─── Section Divider ─── */}
      <div className="cca-container" style={{ padding: `0 34px` }}>
        <div style={{ maxWidth: 780 }}>
          <div style={{ display: "flex", alignItems: "center", gap: φ.sm }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 2.5, color: T.muted }}>HORIZON</span>
            <div style={{ flex: 1, height: 1, background: T.border }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 2.5, color: T.subtle }}>LANSKAP EKSPLORASI</span>
          </div>
        </div>
      </div>

      {/* ─── Broad Horizon Cards ─── */}
      <section className="cca-container" style={{ padding: `${φ.lg}px 34px ${φ.xxl}px` }}>
        <div style={{ maxWidth: 780 }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: φ.lg,
          }}>

            {/* Horizon 1 */}
            <div style={{
              background: T.white, border: `1px solid ${T.border}`,
              padding: `${φ.lg}px`, position: "relative",
            }}>
              <div style={{ height: 3, background: brandAccent, position: "absolute", top: 0, left: 0, right: 0 }} />
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 2.5,
                color: brandAccent, marginBottom: φ.sm, fontWeight: 700,
              }}>01 · KOGNISI & MANUSIA</div>
              <h3 style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: 20, lineHeight: 1.3, letterSpacing: "-0.015em",
                marginBottom: φ.xs,
              }}>Pola Pikir & Alam Bawah Sadar</h3>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: 14.5, lineHeight: 1.6,
                color: T.muted, margin: 0,
              }}>
                Membedah fondasi biologis kognisi, bias persepsi, psikologi evolusioner, dan bagaimana struktur mental memproses realitas.
              </p>
            </div>

            {/* Horizon 2 */}
            <div style={{
              background: T.white, border: `1px solid ${T.border}`,
              padding: `${φ.lg}px`, position: "relative",
            }}>
              <div style={{ height: 3, background: "#2B5876", position: "absolute", top: 0, left: 0, right: 0 }} />
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 2.5,
                color: "#2B5876", marginBottom: φ.sm, fontWeight: 700,
              }}>02 · SISTEM & KEBUDAYAAN</div>
              <h3 style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: 20, lineHeight: 1.3, letterSpacing: "-0.015em",
                marginBottom: φ.xs,
              }}>Institusi, Moralitas & Ideologi</h3>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: 14.5, lineHeight: 1.6,
                color: T.muted, margin: 0,
              }}>
                Menganalisis bagaimana kepercayaan, sistem nilai, norma sosial, dan hierarki kekuasaan tumbuh serta menggerakkan peradaban.
              </p>
            </div>

            {/* Horizon 3 */}
            <div style={{
              background: T.white, border: `1px solid ${T.border}`,
              padding: `${φ.lg}px`, position: "relative",
            }}>
              <div style={{ height: 3, background: "#D4AF37", position: "absolute", top: 0, left: 0, right: 0 }} />
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 2.5,
                color: "#D4AF37", marginBottom: φ.sm, fontWeight: 700,
              }}>03 · TEKNOLOGI & MASA DEPAN</div>
              <h3 style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: 20, lineHeight: 1.3, letterSpacing: "-0.015em",
                marginBottom: φ.xs,
              }}>Era Digital & Kompleksitas</h3>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: 14.5, lineHeight: 1.6,
                color: T.muted, margin: 0,
              }}>
                Mengeksplorasi pergeseran lanskap akibat kecerdasan buatan, media sosial, dan dinamika kebudayaan di era pasca-modern.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Open Horizons Note ─── */}
      <section style={{ background: T.invBg, padding: `${φ.lg}px 0` }}>
        <div className="cca-container" style={{ padding: `0 34px` }}>
          <div style={{ maxWidth: 780 }}>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: 16,
              lineHeight: 1.6, color: T.invFg, margin: 0,
            }}>
              Postulate akan terus memperluas jangkauan diskursusnya, menjadikan setiap publikasi sebagai ruang penjelajahan pemikiran yang segar dan kaya perspektif.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CTA Navigation ─── */}
      <section className="cca-container" style={{ padding: `${φ.xl}px 34px`, textAlign: "left" }}>
        <div style={{ maxWidth: 780 }}>
          <h3 style={{
            fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700,
            marginBottom: φ.xs,
          }}>Mulai Jelajahi</h3>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.6,
            color: T.muted, marginBottom: φ.lg,
          }}>
            Kunjungi arsip esai yang telah terbit atau periksa katalog istilah di glossarium.
          </p>
          <div style={{ display: "flex", gap: φ.md, flexWrap: "wrap" }}>
            <Link href="/artikel" style={{
              fontFamily: "var(--font-mono)", fontSize: 10,
              letterSpacing: 2, color: T.invFg,
              textDecoration: "none", padding: `${φ.sm}px ${φ.lg}px`,
              background: T.invBg,
              transition: "opacity .2s",
            }}>JELAJAHI ARSIP ESAI →</Link>
            <Link href="/glossarium" style={{
              fontFamily: "var(--font-mono)", fontSize: 10,
              letterSpacing: 2, color: T.ink,
              textDecoration: "none", padding: `${φ.sm}px ${φ.lg}px`,
              border: `1px solid ${T.border}`,
              background: T.white,
              transition: "all .2s",
            }}>LIHAT GLOSSARIUM →</Link>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
