"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { T, CATS, φ } from "@/lib/tokens";
import { Footer } from "@/components/Footer";
import type { GlossaryEntry } from "@/lib/glossary";

interface Props {
  entries: GlossaryEntry[];
  letters: string[];
  totalArticles: number;
}

export function GlossariumClient({ entries, letters, totalArticles }: Props) {
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return entries.filter(e => {
      if (activeLetter && e.term[0].toUpperCase() !== activeLetter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return e.term.toLowerCase().includes(q) || e.definition.toLowerCase().includes(q);
      }
      return true;
    });
  }, [entries, activeLetter, search]);

  const grouped = useMemo(() => {
    const g: Record<string, GlossaryEntry[]> = {};
    for (const e of filtered) {
      const letter = e.term[0].toUpperCase();
      if (!g[letter]) g[letter] = [];
      g[letter].push(e);
    }
    return g;
  }, [filtered]);

  const sortedLetters = Object.keys(grouped).sort();

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.ink }}>

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

      {/* ─── Hero ─── */}
      <section className="cca-container section-pt">
        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          flexWrap: "wrap", gap: φ.md, marginBottom: φ.sm,
        }}>
          <div>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 3,
              color: T.muted, marginBottom: φ.xs,
            }}>GLOSSARIUM · KAMUS KONSEP</div>
            <h1 style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: "clamp(38px, 6vw, 64px)", lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}>Glossarium</h1>
          </div>

          {/* Search */}
          <div style={{ position: "relative", width: "clamp(200px, 30vw, 320px)" }}>
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setActiveLetter(null); }}
              placeholder="Cari istilah..."
              style={{
                width: "100%",
                padding: `${φ.sm}px ${φ.md}px ${φ.sm}px 42px`,
                background: T.white,
                border: `1px solid ${T.border}`,
                outline: "none",
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: T.ink,
                transition: "border-color .2s",
              }}
              onFocus={e => e.target.style.borderColor = T.gold}
              onBlur={e => e.target.style.borderColor = T.border as string}
            />
            <span style={{
              position: "absolute", left: φ.sm, top: "50%", transform: "translateY(-50%)",
              fontFamily: "var(--font-mono)", fontSize: 13, color: T.subtle,
              pointerEvents: "none",
            }}>⌕</span>
          </div>
        </div>

        <p style={{
          fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.6,
          color: T.muted, fontStyle: "italic", maxWidth: 520, marginBottom: φ.md,
        }}>
          {filtered.length} istilah dari {totalArticles} artikel. Klik untuk membaca konteks lengkapnya.
        </p>

        {/* ─── Alphabet Nav ─── */}
        <div style={{
          display: "flex", gap: 2, flexWrap: "wrap",
          marginBottom: φ.xl, paddingBottom: φ.md,
          borderBottom: `1px solid ${T.border}`,
        }}>
          <button
            onClick={() => { setActiveLetter(null); setSearch(""); }}
            style={{
              fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 500,
              padding: "6px 10px", cursor: "pointer",
              border: `1px solid ${!activeLetter ? T.ink : T.border}`,
              background: !activeLetter ? T.ink : "none",
              color: !activeLetter ? T.bg : T.muted,
              transition: "all .15s",
            }}
          >SEMUA</button>
          {letters.map(l => {
            const hasEntries = entries.some(e => e.term[0].toUpperCase() === l);
            return (
              <button key={l}
                onClick={() => { setActiveLetter(activeLetter === l ? null : l); setSearch(""); }}
                disabled={!hasEntries}
                style={{
                  fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600,
                  width: 34, height: 34, cursor: hasEntries ? "pointer" : "default",
                  border: `1px solid ${activeLetter === l ? T.ink : T.border}`,
                  background: activeLetter === l ? T.ink : "none",
                  color: activeLetter === l ? T.bg : hasEntries ? T.ink : T.border,
                  transition: "all .15s",
                  opacity: hasEntries ? 1 : 0.4,
                }}
              >{l}</button>
            );
          })}
        </div>
      </section>

      {/* ─── Entries ─── */}
      <main className="cca-container section-pb">
        {filtered.length === 0 && (
          <div style={{
            textAlign: "center", padding: `${φ.xxl}px 0`,
            color: T.subtle, fontFamily: "var(--font-mono)",
            fontSize: 11, letterSpacing: 3,
          }}>
            TIDAK DITEMUKAN
          </div>
        )}

        {sortedLetters.map(letter => (
          <section key={letter} style={{ marginBottom: φ.xl }}>
            {/* Letter header */}
            <div style={{
              display: "flex", alignItems: "center", gap: φ.sm,
              marginBottom: φ.md,
            }}>
              <span style={{
                fontFamily: "var(--font-display)", fontSize: 48,
                fontWeight: 700, color: T.ink, lineHeight: 1,
              }}>{letter}</span>
              <div style={{ flex: 1, height: 1, background: T.border }} />
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 9,
                letterSpacing: 2, color: T.subtle,
              }}>{grouped[letter].length} ISTILAH</span>
            </div>

            {/* Term cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {grouped[letter].map(entry => {
                const pillarColor = CATS[entry.pillar]?.color || T.ink;
                return (
                  <Link key={entry.term} href={`/artikel/${entry.source_slug}`}
                    className="card-hover"
                    style={{
                      textDecoration: "none", color: "inherit",
                      background: T.white, border: `1px solid ${T.border}`,
                      padding: `${φ.md}px ${φ.lg}px`,
                      display: "flex", gap: φ.lg,
                      alignItems: "flex-start",
                    }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", gap: φ.xs, alignItems: "center", marginBottom: 6 }}>
                        <span style={{
                          fontFamily: "var(--font-mono)", fontSize: 9,
                          letterSpacing: 2.5, color: pillarColor,
                        }}>{CATS[entry.pillar]?.label.toUpperCase()}</span>
                      </div>
                      <h3 style={{
                        fontFamily: "var(--font-display)", fontWeight: 600,
                        fontSize: 22, lineHeight: 1.2, letterSpacing: "-0.015em",
                        marginBottom: φ.xs,
                      }}>{entry.term}</h3>
                      <p style={{
                        fontFamily: "var(--font-body)", fontSize: 15,
                        lineHeight: 1.6, color: T.muted,
                      }}>{entry.definition}</p>
                    </div>
                    <div style={{
                      flexShrink: 0, display: "flex", flexDirection: "column",
                      alignItems: "flex-end", gap: 4, paddingTop: 4,
                    }}>
                      <span style={{
                        fontFamily: "var(--font-mono)", fontSize: 8,
                        letterSpacing: 1.5, color: pillarColor,
                      }}>BACA →</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
}
