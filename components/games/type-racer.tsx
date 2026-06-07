"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const passages = [
  "She debugs life the same way she debugs code \u2014 methodically, brilliantly, without panic.",
  "The best engineers don't just write code. They think in systems. They see patterns. She does both.",
  "Intelligence is knowing the answer. Wisdom is knowing which question to ask. She has both.",
  "She doesn't just solve problems. She redefines them. Then solves them better than anyone else could.",
  "Some people write code. Others craft it. Every line she touches becomes more than instructions.",
];

export function TypeRacer() {
  const [passageIdx, setPassageIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const passage = passages[passageIdx];

  const getStats = useCallback((text: string) => {
    if (!startTime) return { wpm: 0, acc: 100 };
    const elapsed = (Date.now() - startTime) / 1000 / 60;
    const words = text.length / 5;
    const w = elapsed > 0 ? Math.round(words / elapsed) : 0;
    let correct = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === passage[i]) correct++;
    }
    const acc = text.length > 0 ? Math.round((correct / text.length) * 100) : 100;
    return { wpm: w, acc };
  }, [passage, startTime]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (!startTime && val.length > 0) setStartTime(Date.now());
    setTyped(val);

    const stats = getStats(val);
    setWpm(stats.wpm);
    setAccuracy(stats.acc);

    if (val === passage) {
      setDone(true);
    }
  }

  function restart() {
    if (passageIdx < passages.length - 1) {
      setPassageIdx(i => i + 1);
    } else {
      setPassageIdx(0);
    }
    setTyped("");
    setWpm(0);
    setAccuracy(100);
    setStartTime(null);
    setDone(false);
  }

  const gotWpm = wpm;

  return (
    <div style={{ padding: "1.5rem" }}>
      {done ? (
        <div style={{ textAlign: "center", padding: "1rem" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "var(--primary)", marginBottom: "0.5rem" }}>
            Passage Complete
          </h3>
          <p style={{ color: "var(--text)", fontSize: "1.2rem", marginBottom: "0.25rem" }}>
            {gotWpm} WPM
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1rem" }}>
            Accuracy: {accuracy}%
          </p>
          <p style={{ color: "var(--primary-dim)", fontSize: "0.9rem", fontStyle: "italic", marginBottom: "1rem" }}>
            {gotWpm >= 100
              ? "elite tier. as expected."
              : gotWpm >= 80
              ? "faster than most. impressive."
              : "solid. she can do better."}
          </p>
          <button
            onClick={restart}
            style={{
              backgroundColor: "var(--primary)", color: "var(--bg)",
              border: "none", padding: "0.5rem 1.5rem", borderRadius: 6,
              fontFamily: "'Fira Code', monospace", fontSize: "0.8rem",
              cursor: "pointer",
            }}
          >
            {passageIdx < passages.length - 1 ? "Next Passage \u2192" : "Start Over"}
          </button>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <span style={{ color: "var(--primary)", fontSize: "0.85rem" }}>
              {gotWpm} WPM
            </span>
            <span style={{ color: accuracy >= 90 ? "var(--primary)" : "var(--crimson)", fontSize: "0.85rem" }}>
              {accuracy}%
            </span>
          </div>

          <div
            style={{
              backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border)",
              borderRadius: 8, padding: "1rem", marginBottom: "1rem",
              fontFamily: "'Fira Code', monospace", fontSize: "0.9rem",
              lineHeight: 1.7, color: "var(--text-muted)",
            }}
          >
            {passage.split("").map((ch, i) => {
              let color = "var(--text-muted)";
              if (i < typed.length) {
                color = typed[i] === ch ? "var(--primary)" : "var(--crimson)";
              }
              if (i === typed.length) {
                return (
                  <span key={i}>
                    <span style={{
                      backgroundColor: "var(--primary)", color: "var(--bg)",
                      animation: "blink 1s step-end infinite",
                    }}>
                      {ch}
                    </span>
                  </span>
                );
              }
              return <span key={i} style={{ color }}>{ch}</span>;
            })}
          </div>

          <input
            ref={inputRef}
            value={typed}
            onChange={handleChange}
            autoFocus
            style={{
              width: "100%", backgroundColor: "var(--bg)", border: "1px solid var(--border-bright)",
              borderRadius: 8, padding: "0.75rem 1rem", color: "var(--text)",
              fontFamily: "'Fira Code', monospace", fontSize: "0.9rem",
              outline: "none", caretColor: "var(--primary)",
            }}
            placeholder="Type here..."
          />
        </>
      )}
    </div>
  );
}
