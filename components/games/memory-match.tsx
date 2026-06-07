"use client";
import { useState, useEffect, useCallback } from "react";

const symbols = ["{}", "</>", "&&", "||", "fn()", "//", "[]", "=>"];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateTiles(): { id: number; symbol: string; paired: number }[] {
  const pairs = shuffle([...symbols]);
  const tiles: { id: number; symbol: string; paired: number }[] = [];
  pairs.forEach((sym, idx) => {
    tiles.push({ id: idx * 2, symbol: sym, paired: idx });
    tiles.push({ id: idx * 2 + 1, symbol: sym, paired: idx });
  });
  return shuffle(tiles.map(t => ({ ...t, sortKey: Math.random() })));
}

export function MemoryMatch() {
  const [tiles, setTiles] = useState(() => generateTiles());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [timer, setTimer] = useState(0);
  const [started, setStarted] = useState(false);
  const [best, setBest] = useState<number | null>(null);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (!started || won) return;
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [started, won]);

  const handleTileClick = useCallback((id: number, paired: number) => {
    if (!started) setStarted(true);
    if (flipped.length >= 2 || matched.includes(paired) || flipped.includes(id)) return;

    const next = [...flipped, id];
    setFlipped(next);

    if (next.length === 2) {
      const t1 = tiles.find(t => t.id === next[0])!;
      const t2 = tiles.find(t => t.id === next[1])!;
      if (t1.paired === t2.paired) {
        setTimeout(() => {
          setMatched(prev => [...prev, t1.paired]);
          setFlipped([]);
        }, 400);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  }, [flipped, matched, tiles, started]);

  useEffect(() => {
    if (matched.length === symbols.length && started) {
      setWon(true);
      if (best === null || timer < best) setBest(timer);
    }
  }, [matched, started, timer, best]);

  function restart() {
    setTiles(generateTiles());
    setFlipped([]);
    setMatched([]);
    setTimer(0);
    setStarted(false);
    setWon(false);
  }

  if (won) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "var(--primary-glow)", marginBottom: "0.5rem" }}>
          Memory Matrix — Solved
        </h3>
        <p style={{ color: "var(--text)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
          Time: {timer}s
        </p>
        {best !== null && (
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1rem" }}>
            Best: {best}s
          </p>
        )}
        <button
          onClick={restart}
          style={{
            backgroundColor: "var(--primary)", color: "var(--bg)",
            border: "none", padding: "0.5rem 1.5rem", borderRadius: 6,
            fontFamily: "'Fira Code', monospace", fontSize: "0.8rem",
            cursor: "pointer",
          }}
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
          Timer: {timer}s
        </span>
        {best !== null && (
          <span style={{ color: "var(--text-dim)", fontSize: "0.8rem" }}>
            Best: {best}s
          </span>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, maxWidth: 400, margin: "0 auto" }}>
        {tiles.map(tile => {
          const isFlipped = flipped.includes(tile.id) || matched.includes(tile.paired);
          return (
            <div
              key={tile.id}
              onClick={() => handleTileClick(tile.id, tile.paired)}
              style={{
                aspectRatio: "1",
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                backgroundColor: isFlipped ? "var(--surface)" : "var(--bg-elevated)",
                border: `1px solid ${isFlipped ? "var(--primary)" : "var(--border)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "all 0.3s ease",
                boxShadow: isFlipped ? "0 0 15px rgba(233,30,140,0.2)" : "none",
                fontSize: isFlipped ? "1.3rem" : "0",
                color: "var(--primary)", fontFamily: "'Fira Code', monospace",
                fontWeight: 500,
              }}
            >
              {isFlipped ? tile.symbol : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}
