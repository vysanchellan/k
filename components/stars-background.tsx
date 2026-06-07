"use client";
import { useMemo } from "react";

export function StarsBackground() {
  const stars = useMemo(() => {
    const items = [];
    for (let i = 0; i < 150; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = 1 + Math.random() * 2;
      const opacity = 0.2 + Math.random() * 0.6;
      const delay = Math.random() * 5;
      const isPink = Math.random() > 0.7;
      items.push({ x, y, size, opacity, delay, isPink });
    }
    return items;
  }, []);

  const shootingStars = useMemo(() => {
    const items = [];
    for (let i = 0; i < 10; i++) {
      const top = Math.random() * 50;
      const left = Math.random() * 70;
      const delay = 5 + Math.random() * 20;
      const duration = 1.5 + Math.random() * 2;
      items.push({ top, left, delay, duration });
    }
    return items;
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      {stars.map((star, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${star.y}%`,
            left: `${star.x}%`,
            width: star.size,
            height: star.size,
            borderRadius: "50%",
            backgroundColor: star.isPink ? "#fde8f0" : "#ffffff",
            opacity: star.opacity,
            animation: `twinkle 3s ease-in-out infinite alternate`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
      {shootingStars.map((ss, i) => (
        <div
          key={`ss-${i}`}
          style={{
            position: "absolute",
            top: `${ss.top}%`,
            left: `${ss.left}%`,
            width: 2,
            height: 2,
            borderRadius: "50%",
            backgroundColor: "#fde8f0",
            boxShadow: "0 0 4px 2px rgba(234, 128, 176, 0.3)",
            animation: `shooting-star ${ss.duration}s ease-in-out infinite`,
            animationDelay: `${ss.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
