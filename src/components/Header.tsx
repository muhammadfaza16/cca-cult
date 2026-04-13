"use client";

import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/artikel", label: "Artikel" },
  { href: "/series", label: "Seri" },
];

const pillarLinks = [
  { href: "/topik/filsafat", label: "Filsafat", color: "var(--pillar-filsafat)" },
  { href: "/topik/sains", label: "Sains", color: "var(--pillar-sains)" },
  { href: "/topik/ekonomi", label: "Ekonomi", color: "var(--pillar-ekonomi)" },
  { href: "/topik/psikologi", label: "Psikologi", color: "var(--pillar-psikologi)" },
];

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{
        borderColor: "var(--border-primary)",
        background:
          theme === "dark"
            ? "rgba(12, 10, 9, 0.85)"
            : "rgba(250, 250, 249, 0.85)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            style={{ textDecoration: "none" }}
          >
            <span
              className="text-2xl font-black tracking-tighter"
              style={{ color: "var(--accent)", fontFamily: "var(--font-sans)" }}
            >
              CCA
            </span>
            <span
              className="hidden sm:inline text-xs font-medium tracking-wide uppercase"
              style={{ color: "var(--text-tertiary)" }}
            >
              Cerdas · Cerah · Asik
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color:
                    pathname === item.href
                      ? "var(--accent)"
                      : "var(--text-secondary)",
                  background:
                    pathname === item.href
                      ? "var(--accent-subtle)"
                      : "transparent",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            ))}
            <div
              className="w-px h-5 mx-2"
              style={{ background: "var(--border-primary)" }}
            />
            {pillarLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all hover:scale-105"
                style={{
                  color: item.color,
                  background:
                    pathname === item.href
                      ? `${item.color}18`
                      : "transparent",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors cursor-pointer"
              style={{
                color: "var(--text-secondary)",
                background: "transparent",
                border: "none",
              }}
              aria-label={theme === "dark" ? "Mode terang" : "Mode gelap"}
            >
              {theme === "dark" ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* Auth Button */}
            <Link
              href="/masuk"
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
              style={{
                background: "var(--accent)",
                color: "white",
                textDecoration: "none",
              }}
            >
              Masuk
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
