"use client";
import { useMemo } from "react";

export function StarsBackground() {
  const stars = useMemo(() => {
    const items: any[] = [];
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() < 0.6 ? 1 : Math.random() < 0.85 ? 2 : 3;
      const isPaleRose = Math.random() < 0.2;
      const isPrimary = !isPaleRose && Math.random() < 0.125;
      const color = isPrimary ? "var(--primary-dim)" : isPaleRose ? "#fde0ec" : "#ffffff";
      const opacity = 0.15 + Math.random() * 0.6;
      const delay = Math.random() * 5;
      const dur = 2 + Math.random() * 4;
      items.push({ x, y, size, color, opacity, delay, dur });
    }
    return items;
  }, []);

  const shootingStars = useMemo(() => {
    const items: any[] = [];
    for (let i = 0; i < 5; i++) {
      items.push({
        top: Math.random() * 40,
        left: Math.random() * 60,
        delay: 3 + Math.random() * 12,
        dur: 1.2 + Math.random() * 1.5,
      });
    }
    return items;
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      {stars.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute", top: `${s.y}%`, left: `${s.x}%`,
            width: s.size, height: s.size, borderRadius: "50%",
            backgroundColor: s.color, opacity: s.opacity,
            animation: `twinkle ${s.dur}s ease-in-out infinite alternate`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
      {shootingStars.map((s, i) => (
        <div
          key={`ss-${i}`}
          style={{
            position: "absolute", top: `${s.top}%`, left: `${s.left}%`,
            width: 2, height: 2, borderRadius: "50%",
            backgroundColor: "#fff",
            boxShadow: "0 0 4px 2px rgba(233,30,140,0.2)",
            animation: `shooting-star ${s.dur}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
