interface PillarBadgeProps {
  pillar: "logika" | "filsafat" | "sains" | "ekonomi" | "psikologi";
}

const config: Record<string, { label: string; color: string }> = {
  logika:    { label: "LOGIKA & PIKIR", color: "#B8860B" },
  filsafat:  { label: "FILSAFAT",       color: "#5B2E91" },
  sains:     { label: "SAINS",          color: "#0C6B7A" },
  ekonomi:   { label: "EKONOMI",        color: "#1B6B3A" },
  psikologi: { label: "PSIKOLOGI",      color: "#B07D10" },
};

export function PillarBadge({ pillar }: PillarBadgeProps) {
  const c = config[pillar] || config.logika;

  return (
    <span
      style={{
        background: c.color + "12",
        color: c.color,
        fontFamily: "var(--font-mono)",
        fontSize: 9,
        fontWeight: 500,
        letterSpacing: 2.5,
        padding: "3px 10px",
      }}
    >
      {c.label}
    </span>
  );
}
