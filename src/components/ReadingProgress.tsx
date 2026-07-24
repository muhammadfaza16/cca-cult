"use client";

import { useState, useEffect } from "react";

interface ReadingProgressProps {
  color?: string;
}

export function ReadingProgress({ color = "#C49B1A" }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const top = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (height > 0) setProgress(Math.min((top / height) * 100, 100));
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className="reading-progress"
      style={{ 
        width: `${progress}%`, 
        background: color,
        height: 3,
      }}
    />
  );
}
