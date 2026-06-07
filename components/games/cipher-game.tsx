"use client";
import { useState } from "react";

const messages = [
  { encoded: "Nbi rb ftq nzbxxradyc beuzyd", shift: 8, decoded: "Her mind works differently" },
  { encoded: "Bpmz ivz xziwt iwt tdbg", shift: 8, decoded: "She has grace under pressure" },
  { encoded: "Vjg dguv gpikpggtu fqpqv ytkvg eqfg", shift: 2, decoded: "The best engineers dont write code" },
  { encoded: "Zwj rjxxflj htsfhnsl wtsl nx jwtj", shift: 5, decoded: "Her mental capacity is immense" },
  { encoded: "Fvb hyl aol ilza hspnfuvy puzpnoa", shift: 7, decoded: "You are the best analyst insight" },
  { encoded: "Xli jmvsx mr lvi iacw mepsx", shift: 4, decoded: "The fire in her eyes burns bright" },
  { encoded: "Cqn cbxaxob uhjbqnw mnwpq xk na", shift: 9, decoded: "She solves everything with style" },
];

export function CipherGame() {
  const [msgIdx, setMsgIdx] = useState(0);
  const [shift, setShift] = useState(0);
  const [solved, setSolved] = useState<boolean[]>(messages.map(() => false));
  const [showFinal, setShowFinal] = useState(false);

  function decode(text: string, s: number): string {
    return text.split("").map(ch => {
      if (ch.match(/[a-z]/i)) {
        const code = ch.charCodeAt(0);
        const base = code >= 97 ? 97 : 65;
        return String.fromCharCode(((code - base - s + 26) % 26) + base);
      }
      return ch;
    }).join("");
  }

  function handleShiftChange(newShift: number) {
    setShift(newShift);
    if (newShift === messages[msgIdx].shift && !solved[msgIdx]) {
      const next = [...solved];
      next[msgIdx] = true;
      setSolved(next);
    }
  }

  function nextMsg() {
    if (msgIdx < messages.length - 1) {
      setMsgIdx(i => i + 1);
      setShift(0);
    } else {
      setShowFinal(true);
    }
  }

  const current = messages[msgIdx];
  const decoded = decode(current.encoded, shift);
  const isCorrect = shift === current.shift;

  if (showFinal) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "var(--primary)", marginBottom: "0.5rem" }}>
          All Messages Decoded
        </h3>
        <p style={{ color: "var(--text)", fontStyle: "italic" }}>
          She sees through every layer. Every time.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
          Message {msgIdx + 1} / {messages.length}
        </span>
        <span style={{ color: solved.filter(Boolean).length === messages.length ? "var(--primary)" : "var(--text-dim)", fontSize: "0.8rem" }}>
          {solved.filter(Boolean).length} / {messages.length} decoded
        </span>
      </div>

      <div
        style={{
          backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border)",
          borderRadius: 8, padding: "1rem", marginBottom: "1rem",
          fontFamily: "'Fira Code', monospace", fontSize: "0.9rem",
          color: isCorrect ? "var(--primary)" : "var(--text-muted)",
          transition: "all 0.3s ease",
          boxShadow: isCorrect ? "0 0 20px rgba(233,30,140,0.2)" : "none",
        }}
      >
        {current.encoded}
      </div>

      <div
        style={{
          backgroundColor: "var(--bg)", border: "1px solid var(--border-bright)",
          borderRadius: 8, padding: "1rem", marginBottom: "1rem",
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
          fontSize: "1.1rem", color: isCorrect ? "var(--primary)" : "var(--text-dim)",
          transition: "all 0.3s ease",
        }}
      >
        {decoded}
      </div>

      {isCorrect && (
        <div style={{ color: "var(--primary)", fontSize: "0.8rem", marginBottom: "0.75rem" }}>
          ✓ decoded (shift: {shift})
        </div>
      )}

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ color: "var(--text-muted)", fontSize: "0.8rem", display: "block", marginBottom: "0.5rem" }}>
          Shift: {shift}
        </label>
        <input
          type="range"
          min={0}
          max={25}
          value={shift}
          onChange={e => handleShiftChange(parseInt(e.target.value))}
          style={{ width: "100%", accentColor: "var(--primary)" }}
        />
      </div>

      {isCorrect && (
        <button
          onClick={nextMsg}
          style={{
            backgroundColor: "var(--primary)", color: "var(--bg)",
            border: "none", padding: "0.5rem 1.5rem", borderRadius: 6,
            fontFamily: "'Fira Code', monospace", fontSize: "0.8rem",
            cursor: "pointer",
          }}
        >
          {msgIdx < messages.length - 1 ? "Next Message \u2192" : "Show Final"}
        </button>
      )}
    </div>
  );
}
