"use client";
import { useState } from "react";
import DisplayCards from "@/components/ui/display-cards";
import { CipherGame } from "@/components/games/cipher-game";
import { MemoryMatch } from "@/components/games/memory-match";
import { TypeRacer } from "@/components/games/type-racer";
import { Code2, Brain, Zap } from "lucide-react";

const games = [
  {
    id: "cipher",
    title: "Decode Her",
    desc: "Crack the cipher. Reveal the truth.",
    icon: <Code2 size={16} />,
  },
  {
    id: "memory",
    title: "Memory Matrix",
    desc: "Match the symbols. Train your focus.",
    icon: <Brain size={16} />,
  },
  {
    id: "type",
    title: "Compiler Speed Test",
    desc: "Type fast. Think faster.",
    icon: <Zap size={16} />,
  },
];

const cardData = games.map((g, i) => ({
  icon: <div style={{ color: "var(--primary)" }}>{g.icon}</div>,
  title: g.title,
  description: g.desc,
  date: "play",
  iconClassName: "text-[var(--primary)]",
  titleClassName: "text-[var(--text)]",
  className: `[grid-area:stack] ${i === 1 ? "translate-x-16 translate-y-8" : ""} ${i === 2 ? "translate-x-32 translate-y-16" : ""}`,
}));

export function MiniGameSection() {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  return (
    <div>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          setActiveGame(games[0].id);
        }}
      >
        <DisplayCards cards={cardData} />
      </div>

      <div
        style={{
          display: "flex", justifyContent: "center", gap: 12,
          marginTop: 24, flexWrap: "wrap",
        }}
      >
        {games.map((g, i) => (
          <button
            key={g.id}
            onClick={() => setActiveGame(g.id)}
            style={{
              backgroundColor: activeGame === g.id ? "var(--primary)" : "transparent",
              color: activeGame === g.id ? "var(--bg)" : "var(--text-muted)",
              border: `1px solid ${activeGame === g.id ? "var(--primary)" : "var(--border)"}`,
              borderRadius: 8, padding: "0.5rem 1rem",
              fontFamily: "'Fira Code', monospace", fontSize: "0.75rem",
              cursor: "pointer", transition: "all 0.2s ease",
            }}
          >
            {g.title}
          </button>
        ))}
      </div>

      {activeGame && (
        <div
          style={{
            marginTop: 24, maxWidth: 600, width: "100%", marginLeft: "auto", marginRight: "auto",
            backgroundColor: "var(--surface)", border: "1px solid var(--border-bright)",
            borderRadius: 12, boxShadow: "0 0 40px rgba(233,30,140,0.1)",
          }}
        >
          <div
            style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "0.75rem 1rem", borderBottom: "1px solid var(--border)",
            }}
          >
            <span style={{ color: "var(--primary)", fontSize: "0.8rem" }}>
              {"> "}{games.find(g => g.id === activeGame)?.title}
            </span>
            <button
              onClick={() => setActiveGame(null)}
              style={{
                background: "none", border: "none", color: "var(--text-dim)",
                fontSize: "1.2rem", cursor: "pointer",
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
