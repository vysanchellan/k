"use client";
import { useState } from "react";
import { CipherGame } from "@/components/games/cipher-game";
import { MemoryMatch } from "@/components/games/memory-match";
import { TypeRacer } from "@/components/games/type-racer";
import { Code2, Brain, Zap } from "lucide-react";

const games = [
  {
    id: "cipher",
    title: "Decode Her",
    desc: "Crack the cipher. Reveal the truth.",
    icon: <Code2 size={20} />,
  },
  {
    id: "memory",
    title: "Memory Matrix",
    desc: "Match the symbols. Train your focus.",
    icon: <Brain size={20} />,
  },
  {
    id: "type",
    title: "Compiler Speed Test",
    desc: "Type fast. Think faster.",
    icon: <Zap size={20} />,
  },
];

export function MiniGameSection() {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  return (
    <div style={{ maxWidth: 700, width: "100%", margin: "0 auto" }}>
      {!activeGame ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {games.map((g) => (
            <button
              key={g.id}
              onClick={() => setActiveGame(g.id)}
              style={{
                background: "none",
                border: "1px solid var(--border-bright)",
                borderRadius: 12,
                padding: "24px 16px",
                cursor: "pointer",
                transition: "all 0.25s ease",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                textAlign: "center",
                color: "var(--text-muted)",
                fontFamily: "'Fira Code', monospace",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--primary)";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(233,30,140,0.15)";
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.backgroundColor = "var(--surface)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-bright)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <div style={{ color: "var(--primary)", width: 20, height: 20 }}>
                {g.icon}
              </div>
              <span style={{ color: "var(--text)", fontSize: "0.85rem", fontWeight: 600 }}>
                {g.title}
              </span>
              <span style={{ fontSize: "0.7rem", lineHeight: 1.4 }}>
                {g.desc}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border-bright)",
            borderRadius: 12,
            boxShadow: "0 0 40px rgba(233,30,140,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.75rem 1rem",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <span style={{ color: "var(--primary)", fontSize: "0.8rem" }}>
              {"> "}{games.find(g => g.id === activeGame)?.title}
            </span>
            <button
              onClick={() => setActiveGame(null)}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-dim)",
                fontSize: "1.2rem",
                cursor: "pointer",
              }}
            >
              {"\u2715"}
            </button>
          </div>

          {activeGame === "cipher" && <CipherGame />}
          {activeGame === "memory" && <MemoryMatch />}
          {activeGame === "type" && <TypeRacer />}
        </div>
      )}
    </div>
  );
}
