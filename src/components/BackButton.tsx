"use client";

import { useRouter } from "next/navigation";
import { T } from "@/lib/tokens";
import { useState } from "react";

interface BackButtonProps {
  label?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function BackButton({ label = "Kembali", style, className }: BackButtonProps) {
  const router = useRouter();
  const [hov, setHov] = useState(false);

  return (
    <button
      onClick={() => router.back()}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={className}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        margin: 0,
        cursor: "pointer",
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: 2,
        color: hov ? "var(--ink)" : "var(--muted)",
        display: "flex",
        alignItems: "center",
        gap: 8,
        transition: "color 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        textTransform: "uppercase",
        ...style,
      }}
    >
      <span
        style={{
          display: "inline-block",
          transform: hov ? "translateX(-4px)" : "translateX(0)",
          transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        ←
      </span>
      <span>{label}</span>
    </button>
  );
}
