"use client";
import { useState, useEffect, useRef } from "react";

const bootLines = [
  { text: "> WHO ARE YOU?", delay: 300 },
  { text: "$ You are the most important person in my world.", delay: 1200 },
  { text: "", delay: 200 },
  { text: "> DESCRIBE HER", delay: 600 },
  { text: "$ Brilliant. Beautiful. Patient. Chaotic in the best way.", delay: 1400 },
  { text: "$ Also: excellent taste in partners. 😌", delay: 800 },
  { text: "", delay: 200 },
  { text: "> WHAT IS KAIROS?", delay: 600 },
  { text: "$ The perfect, opportune moment.", delay: 1200 },
  { text: "$ Also: you. Always you.", delay: 800 },
];

interface CommandResult {
  text: string;
  isSystem?: boolean;
}

const memories = [
  "first-date/", "rainy-mornings/", "code-sessions/", "laugh-track/",
  "deep-talks/", "future-plans/"
];

const reasons = [
  "1. The way you light up when you talk about what you love.",
  "2. Your laugh — it could debug any broken day.",
  "3. How patient you are with me, always.",
  "4. The way you scrunch your nose when you're thinking.",
  "5. You make me want to be a better person.",
  "6. Your chaos matches my chaos perfectly.",
  "7. You're the smartest person I know (and I'm not biased).",
  "8. You remember the small things I forget.",
  "9. You feel like home.",
  "10. You chose me."
];

export function TerminalLove() {
  const [bootDone, setBootDone] = useState(false);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [cmdHistory, setCmdHistory] = useState<CommandResult[]>([]);
  const [input, setInput] = useState("");
  const [bootIndex, setBootIndex] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bootIndex >= bootLines.length) {
      setBootDone(true);
      return;
    }
    const line = bootLines[bootIndex];
    const timer = setTimeout(() => {
      setDisplayedLines(prev => [...prev, line.text]);
      setBootIndex(i => i + 1);
    }, line.delay);
    return () => clearTimeout(timer);
  }, [bootIndex]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedLines, cmdHistory]);

  useEffect(() => {
    if (bootDone && inputRef.current) {
      inputRef.current.focus();
    }
  }, [bootDone]);

  function processCommand(cmd: string): CommandResult[] {
    const results: CommandResult[] = [];
    const trimmed = cmd.trim().toLowerCase();

    results.push({ text: `$ ${cmd}`, isSystem: true });

    if (trimmed === "help") {
      results.push({ text: "Available commands:", isSystem: true });
      results.push({ text: "  help            — show this message", isSystem: true });
      results.push({ text: "  love --status   — check love status", isSystem: true });
      results.push({ text: "  ping heart      — ping the heart", isSystem: true });
      results.push({ text: "  ls memories/    — list memory folders", isSystem: true });
      results.push({ text: "  cat reasons.txt — read reasons", isSystem: true });
      results.push({ text: "  sudo make me happy — instant happiness", isSystem: true });
      results.push({ text: "  clear           — clear terminal", isSystem: true });
      results.push({ text: "  whoami          — who you are", isSystem: true });
    } else if (trimmed === "love --status" || trimmed === "love--status") {
      const days = Math.floor((Date.now() - new Date("2024-01-15").getTime()) / (1000 * 60 * 60 * 24));
      results.push({ text: `STATUS: ACTIVE | uptime: ${days} days together | packets lost: 0 ♡`, isSystem: true });
    } else if (trimmed.startsWith("ping")) {
      results.push({ text: "PING heart (♥.♥.♥.♥) 56(84) bytes of data.", isSystem: true });
      for (let i = 1; i <= 4; i++) {
        results.push({ text: `64 bytes from heart: icmp_seq=${i} ttl=64 time=♡ ms`, isSystem: true });
      }
      results.push({ text: "--- heart ping statistics ---", isSystem: true });
      results.push({ text: "4 packets transmitted, 4 received, 0% packet loss", isSystem: true });
    } else if (trimmed === "ls memories/" || trimmed === "ls" || trimmed === "ls memories") {
      results.push({ text: "memories/:", isSystem: true });
      memories.forEach(m => results.push({ text: `  ${m}`, isSystem: true }));
    } else if (trimmed.startsWith("cat reasons.txt") || trimmed === "cat reasons") {
      reasons.forEach(r => results.push({ text: r, isSystem: true }));
    } else if (trimmed === "sudo make me happy" || trimmed === "sudo make me happy") {
      results.push({ text: "[sudo] password for kairos:", isSystem: true });
      results.push({ text: "Already done. ✓", isSystem: true });
    } else if (trimmed === "clear") {
      return [];
    } else if (trimmed === "whoami") {
      results.push({ text: "kairos — the best thing that ever happened to this system", isSystem: true });
    } else {
      results.push({ text: `command not found: ${cmd}`, isSystem: true });
      results.push({ text: "but you are always found. 💕", isSystem: true });
    }

    return results;
  }

  function handleSubmit(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const results = processCommand(input);
      setCmdHistory(prev => [...prev, ...results]);
      setInput("");
    }
  }

  return (
    <div
      className="rounded-lg border"
      style={{
        borderColor: "#2e1a35", backgroundColor: "#0a0a0f",
        boxShadow: "0 0 20px #ea80b020", overflow: "hidden",
        maxWidth: 640, width: "100%",
      }}
    >
      <div
        style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "10px 14px", backgroundColor: "#120d1a",
          borderBottom: "1px solid #2e1a35",
        }}
      >
        <span style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#febc2e" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#28c840" }} />
        <span style={{ color: "#9b7aa0", fontSize: "0.75rem", marginLeft: 8 }}>
          kairos@love:~$
        </span>
      </div>

      <div
        ref={terminalRef}
        style={{
          padding: "14px 16px", maxHeight: 400, overflowY: "auto",
          fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem",
          lineHeight: 1.6,
        }}
      >
        {displayedLines.map((line, i) => (
          <div key={`boot-${i}`}>{line}</div>
        ))}

        {cmdHistory.map((entry, i) => (
          <div
            key={`cmd-${i}`}
            style={{ color: entry.text.startsWith("$") ? "#ea80b0" : "#f5e6f0", whiteSpace: "pre-wrap" }}
          >
            {entry.text}
          </div>
        ))}

        {bootDone && (
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ color: "#ea80b0" }}>$</span>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleSubmit}
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                color: "#f5e6f0", fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.8rem", resize: "none", overflow: "hidden",
                caretColor: "#ea80b0",
              }}
              rows={1}
            />
            <span style={{
              width: 8, height: 14, backgroundColor: "#ea80b0",
              animation: "blink 1s step-end infinite",
            }} />
          </div>
        )}
      </div>
    </div>
  );
}
