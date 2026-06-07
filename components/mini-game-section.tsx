"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CipherGame } from "@/components/games/cipher-game";
import { MemoryMatch } from "@/components/games/memory-match";
import { TypeRacer } from "@/components/games/type-racer";
import { Code2, Brain, Zap } from "lucide-react";

const games = [
  {
    id: "cipher",
    title: "Decode Her",
    desc: "Crack the cipher. Reveal the truth.",
    icon: <Code2 size={22} />,
  },
  {
    id: "memory",
    title: "Memory Matrix",
    desc: "Match the symbols. Train your focus.",
    icon: <Brain size={22} />,
  },
  {
    id: "type",
    title: "Compiler Speed Test",
    desc: "Type fast. Think faster.",
    icon: <Zap size={22} />,
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
            <motion.button
              key={g.id}
              onClick={() => setActiveGame(g.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              whileHover={{
                scale: 1.02,
                borderColor: "rgba(233,30,140,0.4)",
                boxShadow: "0 20px 50px -10px rgba(0,0,0,0.6)",
              }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: "rgba(10,10,20,0.7)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 20,
                padding: "28px 16px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
                textAlign: "center",
                color: "var(--text-muted)",
                fontFamily: "'Fira Code', monospace",
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.4)",
                transition: "box-shadow 0.3s ease, border-color 0.3s ease",
              }}
            >
              <motion.div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, rgba(233,30,140,0.15), rgba(194,24,91,0.08))",
                  border: "1px solid rgba(233,30,140,0.15)",
                  color: "var(--primary)",
                }}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(233,30,140,0.25)" }}
              >
                {g.icon}
              </motion.div>
              <span
                style={{
                  color: "var(--text)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                }}
              >
                {g.title}
              </span>
              <span
                style={{
                  fontSize: "0.65rem",
                  lineHeight: 1.5,
                  opacity: 0.6,
                }}
              >
                {g.desc}
              </span>
            </motion.button>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            background: "rgba(10,10,20,0.7)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 20,
            boxShadow: "0 20px 50px -10px rgba(0,0,0,0.5)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.75rem 1rem",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <span style={{ color: "var(--primary)", fontSize: "0.8rem", fontFamily: "'Fira Code', monospace" }}>
              {"> "}{games.find(g => g.id === activeGame)?.title}
            </span>
            <button
              onClick={() => setActiveGame(null)}
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "50%",
                width: 32,
                height: 32,
                color: "var(--text-dim)",
                fontSize: "0.9rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(233,30,140,0.2)";
                e.currentTarget.style.borderColor = "rgba(233,30,140,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              }}
            >
              ✕
            </button>
          </div>

          <div style={{ padding: "0.5rem" }}>
            {activeGame === "cipher" && <CipherGame />}
            {activeGame === "memory" && <MemoryMatch />}
            {activeGame === "type" && <TypeRacer />}
          </div>
        </motion.div>
      )}
    </div>
  );
}
