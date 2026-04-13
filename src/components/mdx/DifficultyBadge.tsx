interface DifficultyBadgeProps {
  level: "pemula" | "menengah" | "dalam";
}

export function DifficultyBadge({ level }: DifficultyBadgeProps) {
  return (
    <span
      style={{
        fontFamily: "monospace",
        fontSize: 9,
        color: "var(--subtle)",
        letterSpacing: 1,
      }}
    >
      {level}
    </span>
  );
}
