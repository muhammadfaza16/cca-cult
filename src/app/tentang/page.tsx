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
              Katalog Pemikiran &<br />
              Dialektika Kebudayaan.
            </h1>

            <p style={{
              fontFamily: "var(--font-body)", fontSize: 17.5, lineHeight: 1.65,
              color: T.invMuted, fontStyle: "normal",
              maxWidth: 660,
            }}>
              Postulate adalah jurnal esai independen yang memetakan perpotongan antara sains, filsafat, teknologi, dan arsitektur peradaban manusia, sebuah eksplorasi terbuka yang terus berkembang melampaui sekat-sekat disiplin ilmu.
            </p>
          </div>
        </div>
      </div>

      {/* ─── Eagle View Story ─── */}
      <section className="cca-container" style={{ padding: `${φ.xl}px 34px` }}>
        <div style={{ maxWidth: 780 }} className="prose-cca">
          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "clamp(24px, 3.5vw, 32px)", lineHeight: 1.2,
            letterSpacing: "-0.02em", marginBottom: φ.md,
          }}>
            Ruang Diskursus Tanpa Sekat
          </h2>
          <p>
            Kebudayaan manusia adalah sebuah sistem kompleks yang terus bermutasi. Di dalamnya, naluri biologis, perkembangan teknologi, norma sosial, dan struktur kekuasaan saling bertabrakan dan membentuk dinamika kehidupan.
          </p>
          <p>
            Artikel dan serial yang ada saat ini hanyalah irisan awal dari peta eksplorasi yang jauh lebih luas. Postulate hadir bukan untuk mengurung diri dalam satu topik tunggal atau menjadi ruang gema bagi gagasan tertentu. Pengetahuan diposisikan sebagai lanskap terbuka di mana sains kognitif, analisis sosio-politik, teori kebudayaan, hingga dampak masa depan teknologi dapat diperbincangkan secara kritis.
          </p>
          <p>
            Setiap tulisan di platform ini berfungsi sebagai satu pilar hipotesis, sebuah postulat awal yang mengundang pembaca untuk melihat kembali realitas dengan sudut pandang yang lebih jernih, tajam, dan kaya perspektif.
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
