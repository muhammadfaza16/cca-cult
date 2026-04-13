"use client";

import { ReactNode, useState, useRef, useEffect } from "react";

interface InlineDefinitionProps {
  term: string;
  children: ReactNode;
}

export function InlineDefinition({ term, children }: InlineDefinitionProps) {
  const [shown, setShown] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <span ref={ref} className="relative inline-block">
      <button
        onClick={() => setShown(!shown)}
        className="cursor-pointer font-semibold transition-colors"
        style={{
          color: "var(--accent)",
          background: "none",
          border: "none",
          borderBottom: "1px dashed var(--accent)",
          padding: 0,
          fontFamily: "inherit",
          fontSize: "inherit",
          lineHeight: "inherit",
        }}
        aria-label={`Definisi: ${term}`}
      >
        {term}
      </button>
      {shown && (
        <span
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 rounded-lg px-4 py-3 text-sm z-50 animate-slide-down"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-primary)",
            boxShadow: "var(--shadow-lg)",
            color: "var(--text-secondary)",
            fontFamily: "var(--font-sans)",
            fontWeight: "normal",
            fontStyle: "normal",
            lineHeight: "1.5",
          }}
        >
          <span
            className="block text-xs font-bold uppercase tracking-wider mb-1"
            style={{ color: "var(--accent)" }}
          >
            {term}
          </span>
          {children}
          {/* Arrow */}
          <span
            className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0"
            style={{
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid var(--border-primary)",
            }}
          />
        </span>
      )}
    </span>
  );
}
