"use client";

import Link from "next/link";
import { T, φ, DOMAINS } from "@/lib/tokens";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  }

  return (
    <footer style={{
      background: T.invBg,
      color: T.invMuted,
      padding: `${φ.xl}px ${φ.lg}px`,
      borderTop: `1px solid ${T.invBorder}`,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        
        {/* Footer Top Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: φ.lg,
          paddingBottom: φ.lg,
        }}>
          
          {/* Column 1: Brand & Tagline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
              <span style={{
                fontFamily: "var(--font-display)", fontSize: 32,
                fontWeight: 700, color: T.invFg, letterSpacing: "-0.01em",
              }}>pos·tu·late</span>
              <span style={{
                fontFamily: "var(--font-body)", fontSize: 15,
                fontStyle: "italic", color: T.invMuted,
              }}>noun.</span>
            </div>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 9,
              letterSpacing: 2, color: T.invMuted,
            }}>/ˈPÄSCHƏˌLĀT/</div>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: 13,
              fontStyle: "italic", color: T.invMuted,
              lineHeight: 1.6,
              maxWidth: 240,
              marginTop: 12,
            }}>
              Esai naratif dan analisis kritis membongkar biologi evolusi, sains kognitif, serta arsitektur kebudayaan manusia.
            </p>
          </div>

          {/* Column 2: Key Topics */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 9,
              letterSpacing: 2.5, color: T.invFg,
              fontWeight: 600,
            }}>TOPIK UTAMA</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { href: "/artikel?search=evolusi", label: "Sains & Biologi Evolusi" },
                { href: "/artikel?search=otak", label: "Kognisi & Arsitektur Otak" },
                { href: "/artikel?search=pasangan", label: "Perilaku & Seleksi Pasangan" },
                { href: "/artikel?search=moralitas", label: "Moralitas, Agama, & Budaya" },
                { href: "/artikel?search=modern", label: "Manusia di Era Modern" },
              ].map(t => (
                <Link key={t.href} href={t.href}
                  style={{
                    fontFamily: "var(--font-body)", fontSize: 13,
                    color: T.invMuted, textDecoration: "none",
                    transition: "color 0.2s, padding-left 0.2s",
                    display: "inline-block",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "var(--gold)";
                    e.currentTarget.style.paddingLeft = "4px";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = T.invMuted;
                    e.currentTarget.style.paddingLeft = "0px";
                  }}
                >
                  {t.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 9,
              letterSpacing: 2.5, color: T.invFg,
              fontWeight: 600,
            }}>NAVIGASI CEPAT</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { href: "/artikel", label: "ARSIP TULISAN" },
                { href: "/tentang", label: "TENTANG KAMI" },
                { href: "/glossarium", label: "GLOSSARIUM ISTILAH" },
              ].map(l => (
                <Link key={l.href} href={l.href}
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: 10,
                    letterSpacing: 1.5, color: T.invMuted, textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = T.invFg}
                  onMouseLeave={e => e.currentTarget.style.color = T.invMuted}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Newsletter signup */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 9,
              letterSpacing: 2.5, color: T.invFg,
              fontWeight: 600,
            }}>BULETIN POSTULAT</span>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: 13,
              color: T.invMuted, lineHeight: 1.5,
            }}>
              Dapatkan satu pemikiran mendalam langsung di inbox kamu setiap akhir pekan.
            </p>
            {subscribed ? (
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 10,
                color: "var(--gold)", letterSpacing: 1,
                padding: "8px 0",
              }}>
                ✓ Terima kasih! Kamu telah terdaftar.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: "flex", gap: 0, borderBottom: `1px solid ${T.invBorder}`, paddingBottom: 4 }}>
                <input
                  type="text"
                  placeholder="Alamat email..."
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    background: "none",
                    border: "none",
                    color: T.invFg,
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    outline: "none",
                    padding: "4px 0",
                  }}
                />
                <button type="submit" style={{
                  background: "none",
                  border: "none",
                  color: "var(--gold)",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  padding: "0 6px",
                }}>
                  →
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bottom / Copyright */}
        <div style={{
          marginTop: φ.lg,
          paddingTop: φ.md,
          borderTop: `1px solid ${T.invBorder}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 1.5,
            color: T.invMuted,
          }}>
            © {new Date().getFullYear()} POSTULATE · ARSIP PEMIKIRAN & DIALEKTIKA EVOLUSI.
          </span>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: 2,
            color: T.invMuted,
          }}>
            JAKARTA, INDONESIA · DIKEMBANGKAN OLEH MANUSIA
          </span>
        </div>
      </div>
    </footer>
  );
}
