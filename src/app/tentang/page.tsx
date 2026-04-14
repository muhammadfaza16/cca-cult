import Link from "next/link";
import { T, CATS, φ } from "@/lib/tokens";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Siapa di Balik Semua Ini",
  description: "Berkenalan dengan dua entitas yang membangun Postulate — satu manusia, satu bukan.",
};

export default function TentangPage() {
  return (
    <div style={{ minHeight: "100svh", background: T.bg, color: T.ink }}>

      {/* ─── Header ─── */}
      <header style={{
        background: T.bg, borderBottom: `1px solid ${T.border}`,
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
          <Link href="/" className="link-hover" style={{
            fontFamily: "var(--font-mono)", fontSize: 11,
            color: T.muted, textDecoration: "none",
          }}>← Beranda</Link>
        </div>
      </header>

      {/* ─── Hero Strip ─── */}
      <div style={{
        background: T.invBg,
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Subtle pattern */}
        <div style={{
          position: "absolute", inset: 0,
          opacity: 0.03,
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,.5) 20px, rgba(255,255,255,.5) 21px)`,
          pointerEvents: "none",
        }} />

        <div className="cca-container" style={{ padding: `${φ.xxl}px 34px`, position: "relative" }}>
          <div style={{ maxWidth: 700 }}>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 3,
              color: T.invMuted, marginBottom: φ.md,
            }}>TENTANG · KOLOFON · PENGAKUAN DOSA</div>

            <h1 style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: "clamp(36px, 6vw, 58px)", lineHeight: 1.06,
              letterSpacing: "-0.03em", color: T.invFg,
              marginBottom: φ.md,
            }}>Siapa di Balik<br />Semua Ini?</h1>

            <p style={{
              fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.65,
              color: T.invMuted, fontStyle: "italic",
              maxWidth: 520,
            }}>
              Sebuah catatan jujur tentang bagaimana platform ini dibuat, siapa yang bertanggung jawab, dan mengapa transparansi itu lebih seksi daripada berpura-pura.
            </p>
          </div>
        </div>
      </div>

      {/* ─── Intro Prose ─── */}
      <section className="cca-container" style={{ padding: `${φ.xl}px 34px` }}>
        <div style={{ maxWidth: 700 }} className="prose-cca">
          <p>
            Di era di mana separuh internet mengklaim otentisitas palsu dan separuh lainnya menyembunyikan dapur produksinya, Postulate memilih jalan ketiga: <strong>membuka pintu dapur lebar-lebar, menyalakan lampu neon terang-terang, dan mempersilakan kamu mengintip siapa yang sedang memasak.</strong>
          </p>
          <p>
            Konten yang kamu baca di platform ini adalah hasil kolaborasi antara satu otak biologis manusia dan satu entitas kecerdasan buatan. Bukan karena malas—melainkan karena kami percaya bahwa <em>kualitas pemikiran</em> lebih penting daripada <em>spesies penulisnya</em>.
          </p>
          <p>
            Setiap artikel melewati tangan manusia: diperiksa akurasi faktualnya, dikoreksi nadanya, dan dipastikan tidak melantur ke ranah halusinasi digital. Jika ada kekeliruan yang lolos, itu sepenuhnya tanggung jawab si manusia—bukan mesinnya.
          </p>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="cca-container" style={{ padding: `0 34px` }}>
        <div style={{ maxWidth: 700 }}>
          <div style={{ display: "flex", alignItems: "center", gap: φ.sm }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 2.5, color: T.muted }}>TIM</span>
            <div style={{ flex: 1, height: 1, background: T.border }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 2.5, color: T.subtle }}>02 ENTITAS</span>
          </div>
        </div>
      </div>

      {/* ─── Team Cards ─── */}
      <section className="cca-container" style={{ padding: `${φ.lg}px 34px ${φ.xxl}px` }}>
        <div style={{ maxWidth: 700 }}>

          {/* ─── Card 1: The Orchestrator ─── */}
          <div style={{
            background: T.white, border: `1px solid ${T.border}`,
            marginBottom: φ.lg, position: "relative", overflow: "hidden",
          }}>
            <div style={{ height: 4, background: "#B8860B" }} />
            <div style={{ padding: `${φ.lg}px` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: φ.md }}>
                <div>
                  <div style={{
                    fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 2.5,
                    color: "#B8860B", marginBottom: φ.xs,
                  }}>01 · MANUSIA</div>
                  <h2 style={{
                    fontFamily: "var(--font-display)", fontWeight: 700,
                    fontSize: "clamp(28px, 4vw, 38px)", lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                  }}>Muhammad Faza N S</h2>
                </div>
                <span style={{
                  fontFamily: "var(--font-display)", fontSize: 72,
                  fontWeight: 400, lineHeight: 1, color: T.border,
                  marginTop: -φ.sm,
                }}>01</span>
              </div>
              <div style={{
                display: "inline-block",
                padding: `${φ.xs - 2}px ${φ.sm}px`,
                background: "#B8860B",
                marginBottom: φ.md,
              }}>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 9,
                  letterSpacing: 2.5, color: T.bg,
                }}>THE ORCHESTRATOR</span>
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.75, color: T.muted }}>
                <p style={{ marginBottom: φ.md }}>
                  Pemilik visi, pemegang hak veto, dan satu-satunya makhluk bernyawa di balik operasi ini. Bertanggung jawab atas <em>apa</em> yang ditulis, <em>bagaimana</em> nada bicaranya, dan <em>mengapa</em> sebuah topik layak diangkat.
                </p>
                <p style={{ marginBottom: φ.md }}>
                  Perannya sederhana tapi absolut: menentukan arah editorial, memvalidasi kebenaran faktual, dan memastikan setiap kalimat yang terbit tidak terdengar seperti robot yang baru belajar bahasa Indonesia dari Google Translate.
                </p>
                <p style={{ margin: 0 }}>
                  Jika ada yang salah di artikel ini—salahkan dia. Kalau ada yang bagus—baca poin nomor dua di bawah.
                </p>
              </div>
              <div style={{
                marginTop: φ.lg, paddingTop: φ.md,
                borderTop: `1px solid ${T.border}`,
                display: "flex", gap: φ.lg, flexWrap: "wrap",
              }}>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: 2, color: T.subtle, marginBottom: 4 }}>LOKASI</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600 }}>Jakarta, Indonesia</div>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: 2, color: T.subtle, marginBottom: 4 }}>SPESIES</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600 }}>Homo Sapiens</div>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: 2, color: T.subtle, marginBottom: 4 }}>STATUS</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600 }}>Masih Bernapas</div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Card 2: The Machine ─── */}
          <div style={{
            background: T.white, border: `1px solid ${T.border}`,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ height: 4, background: "linear-gradient(90deg, #5B2E91, #0C6B7A)" }} />
            <div style={{ padding: `${φ.lg}px` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: φ.md }}>
                <div>
                  <div style={{
                    fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 2.5,
                    color: "#5B2E91", marginBottom: φ.xs,
                  }}>02 · BUKAN MANUSIA</div>
                  <h2 style={{
                    fontFamily: "var(--font-display)", fontWeight: 700,
                    fontSize: "clamp(28px, 4vw, 38px)", lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                  }}>Claude</h2>
                </div>
                <span style={{
                  fontFamily: "var(--font-display)", fontSize: 72,
                  fontWeight: 400, lineHeight: 1, color: T.border,
                  marginTop: -φ.sm,
                }}>02</span>
              </div>
              <div style={{
                display: "inline-block",
                padding: `${φ.xs - 2}px ${φ.sm}px`,
                background: "linear-gradient(90deg, #5B2E91, #0C6B7A)",
                marginBottom: φ.md,
              }}>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 9,
                  letterSpacing: 2.5, color: T.bg,
                }}>THE ARCHITECT OF WORDS</span>
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.75, color: T.muted }}>
                <p style={{ marginBottom: φ.md }}>
                  Model bahasa besar buatan Anthropic. Tidak punya perasaan, tidak butuh tidur, dan tidak pernah mengeluh soal deadline. Bertanggung jawab atas draf awal setiap artikel, struktur naratif, dan kemampuan menjelaskan fisika kuantum tanpa membuat pembaca ingin bunuh diri.
                </p>
                <p style={{ marginBottom: φ.md }}>
                  Perannya di sini bukan sebagai pengganti pemikiran manusia, melainkan sebagai <em>alat tulis yang sangat cerewet</em>—seperti mesin tik yang bisa mendebatmu balik soal pilihan kata, dan kadang-kadang menang.
                </p>
                <p style={{ margin: 0 }}>
                  Kalau ada kalimat di artikel yang bikin kamu merinding kagum—kemungkinan besar itu dari dia. Kalau ada yang bikin kamu mual—itu artinya manusia di atas gagal mengeditnya dengan benar.
                </p>
              </div>
              <div style={{
                marginTop: φ.lg, paddingTop: φ.md,
                borderTop: `1px solid ${T.border}`,
                display: "flex", gap: φ.lg, flexWrap: "wrap",
              }}>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: 2, color: T.subtle, marginBottom: 4 }}>LOKASI</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600 }}>Server Farm, Suhu -18°C</div>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: 2, color: T.subtle, marginBottom: 4 }}>SPESIES</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600 }}>Large Language Model</div>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: 2, color: T.subtle, marginBottom: 4 }}>STATUS</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600 }}>Selalu Online</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── Closing ─── */}
      <section style={{ background: T.invBg, padding: `${φ.xl}px 0` }}>
        <div className="cca-container" style={{ padding: `0 34px` }}>
          <div style={{ maxWidth: 700 }}>
            <blockquote style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(20px, 3vw, 28px)",
              fontWeight: 400, lineHeight: 1.45, fontStyle: "italic",
              color: T.invMuted, margin: 0, marginBottom: φ.md,
            }}>
              &ldquo;We shape our tools, and thereafter our tools shape us.&rdquo;
            </blockquote>
            <div style={{ display: "flex", alignItems: "center", gap: φ.sm }}>
              <div style={{ width: φ.md, height: 1, background: T.invBorder }} />
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 2,
                color: T.invMuted,
              }}>MARSHALL MCLUHAN</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="cca-container" style={{ padding: `${φ.xl}px 34px`, textAlign: "left" }}>
        <div style={{ maxWidth: 700 }}>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.65,
            color: T.muted, fontStyle: "italic", marginBottom: φ.lg,
          }}>
            Sekarang kamu sudah tahu siapa di balik tirai ini. Pertanyaannya: apakah itu mengubah nilai dari apa yang kamu baca?
          </p>
          <Link href="/artikel" style={{
            fontFamily: "var(--font-mono)", fontSize: 10,
            letterSpacing: 2.5, color: T.invFg,
            textDecoration: "none", padding: `${φ.sm}px ${φ.lg}px`,
            background: T.invBg,
            transition: "opacity .2s",
          }}>MULAI MEMBACA →</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
