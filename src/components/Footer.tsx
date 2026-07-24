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
      padding: "28px 0 20px 0",
      borderTop: `1px solid ${T.invBorder}`,
    }}>
      <div className="cca-container">
        
        {/* Footer Top Grid - 2 Columns */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 36,
          paddingBottom: 16,
        }}>
          
          {/* Column 1: Brand & Newsletter */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{
                fontFamily: "var(--font-display)", fontSize: 24,
                fontWeight: 700, color: T.invFg, letterSpacing: "-0.01em",
              }}>pos·tu·late</span>
              <span style={{
                fontFamily: "var(--font-body)", fontSize: 13,
                fontStyle: "italic", color: T.invMuted,
              }}>noun.</span>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 8,
                letterSpacing: 1.5, color: T.invMuted, marginLeft: 4,
              }}>/ˈPÄSCHƏˌLĀT/</span>
            </div>
            
            <p style={{
              fontFamily: "var(--font-body)", fontSize: 12.5,
              color: T.invMuted,
              lineHeight: 1.45,
              maxWidth: 420,
            }}>
              Esai naratif dan analisis kritis membongkar biologi evolusi, sains kognitif, serta arsitektur kebudayaan manusia.
            </p>

            {/* Newsletter inline */}
            <div style={{ marginTop: 4, maxWidth: 360 }}>
              {subscribed ? (
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: 9,
                  color: "var(--gold)", letterSpacing: 1,
                }}>
                  ✓ Terima kasih! Kamu telah terdaftar dalam buletin Postulat.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    type="email"
                    placeholder="Langganan buletin email..."
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{
                      flex: 1,
                      background: "none",
                      border: "none",
                      borderBottom: `1px solid ${T.invBorder}`,
                      color: T.invFg,
                      fontFamily: "var(--font-body)",
                      fontSize: 12,
                      outline: "none",
                      padding: "4px 0",
                    }}
                  />
                  <button type="submit" style={{
                    background: "var(--crimson)",
                    border: "none",
                    borderRadius: 2,
                    color: "#FFFFFF",
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                    fontSize: 8.5,
                    fontWeight: 700,
                    letterSpacing: 1.5,
                    padding: "4px 10px",
                  }}>
                    GABUNG
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Navigation & Topics Side-by-Side */}
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "space-between" }}>
            {/* Sub-Col 1: Topics */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, minWidth: 160 }}>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 8.5,
                letterSpacing: 2, color: T.invFg,
                fontWeight: 600,
              }}>TOPIK UTAMA</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {[
                  { href: "/artikel?search=evolusi", label: "Biologi Evolusi" },
                  { href: "/artikel?search=otak", label: "Arsitektur Kognisi" },
                  { href: "/artikel?search=pasangan", label: "Seleksi Pasangan" },
                  { href: "/artikel?search=moralitas", label: "Moralitas & Budaya" },
                  { href: "/artikel?search=modern", label: "Manusia Modern" },
                ].map(t => (
                  <Link key={t.href} href={t.href}
                    style={{
                      fontFamily: "var(--font-body)", fontSize: 12,
                      color: T.invMuted, textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = T.invFg}
                    onMouseLeave={e => e.currentTarget.style.color = T.invMuted}
                  >
                    {t.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Sub-Col 2: Navigation */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, minWidth: 140 }}>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 8.5,
                letterSpacing: 2, color: T.invFg,
                fontWeight: 600,
              }}>NAVIGASI</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {[
                  { href: "/artikel", label: "ARSIP TULISAN" },
                  { href: "/tentang", label: "TENTANG PUBLIKASI" },
                  { href: "/glossarium", label: "GLOSSARIUM ISTILAH" },
                ].map(l => (
                  <Link key={l.href} href={l.href}
                    style={{
                      fontFamily: "var(--font-mono)", fontSize: 9,
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
          </div>

        </div>

        {/* Footer Bottom / Copyright */}
        <div style={{
          marginTop: 12,
          paddingTop: 10,
          borderTop: `1px solid ${T.invBorder}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
        }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: 1.5,
            color: T.invMuted,
          }}>
            © {new Date().getFullYear()} POSTULATE · ARSIP PEMIKIRAN & DIALEKTIKA EVOLUSI.
          </span>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: 1.5,
            color: T.invMuted,
          }}>
            JAKARTA, INDONESIA
          </span>
        </div>
      </div>
    </footer>
  );
}
