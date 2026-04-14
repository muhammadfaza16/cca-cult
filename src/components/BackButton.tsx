"use client";

import { useRouter } from "next/navigation";
import { T } from "@/lib/tokens";

interface BackButtonProps {
  label?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function BackButton({ label = "← Back", style, className }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={className || "link-hover"}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        margin: 0,
        cursor: "pointer",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: T.muted,
        display: "flex",
        alignItems: "center",
        gap: 6,
        ...style,
      }}
    >
      {label}
    </button>
  );
}
