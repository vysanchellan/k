"use client";
import { useState } from "react";
import { motion } from "motion/react";

interface MemoryCard {
  icon: string;
  label: string;
  message: string;
}

const cards: MemoryCard[] = [
  { icon: "🌙", label: "Late Nights", message: "Every late night studying together was my favourite kind of night." },
  { icon: "💻", label: "Code & Coffee", message: "I love watching you in your element — focused, brilliant, unstoppable." },
  { icon: "🌧️", label: "Rainy Days", message: "Rainy days are better when they're ours." },
  { icon: "📚", label: "Growth", message: "I've grown so much loving you. Thank you for that." },
  { icon: "😂", label: "Laughter", message: "You make everything funnier. The world is better with your laugh in it." },
  { icon: "🔮", label: "Future", message: "I can't wait for everything still ahead of us." },
];

export function MemoryVault() {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  function toggleFlip(index: number) {
    setFlipped(prev => ({ ...prev, [index]: !prev[index] }));
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 16,
        maxWidth: 640,
        width: "100%",
        margin: "0 auto",
      }}
    >
      {cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          viewport={{ once: true }}
          onClick={() => toggleFlip(i)}
          style={{ perspective: 1000, cursor: "pointer", height: 220 }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
              transform: flipped[i] ? "rotateY(180deg)" : "rotateY(0deg)",
              transition: "transform 0.6s ease",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backfaceVisibility: "hidden",
                backgroundColor: "#120d1a",
                border: "1px solid #2e1a35",
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: 16,
              }}
            >
              <span style={{ fontSize: "2rem" }}>{card.icon}</span>
              <span style={{ color: "#f5e6f0", fontSize: "0.9rem", fontWeight: 500 }}>
                {card.label}
              </span>
            </div>

            <div
              style={{
                position: "absolute",
                inset: 0,
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                backgroundColor: "#120d1a",
                border: "1px solid #ea80b060",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
              }}
            >
              <p style={{
                color: "#f5e6f0",
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "0.9rem",
                textAlign: "center",
                lineHeight: 1.5,
                margin: 0,
              }}>
                {card.message}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
