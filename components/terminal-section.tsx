"use client";
import { useState, useEffect, useRef } from "react";

const bootLines = [
  "$ whoami",
  "\u2192 kairos",
  "",
  "$ describe --self",
  "\u2192 software engineer | problem solver | chaos coordinator",
  "",
  "$ cat personality.json",
  "\u2192 {",
  '\u2192   "intelligence": "exceptional",',
  '\u2192   "adaptability": "high",',
  '\u2192   "coffee_dependency": true,',
  '\u2192   "bug_tolerance": "low (in code only)",',
  '\u2192   "vibe": "dark academia meets cyberpunk"',
  "\u2192 }",
  "",
  "$ ls skills/",
  "\u2192 python/    javascript/    networking/    systems/    problem-solving/    coffee-making/",
  "",
];

const memories = [
  "late-night-debugging-sessions/",
  "first-pull-request/",
  "that-time-she-solved-it-first/",
  "rainy-conference-calls/",
  "architecture-diagrams/",
  "coffee-break-epiphanies/",
];

const gitCommits = [
  "a1b2c3d feat: be brilliant",
  "e4f5g6h refactor: improve everything",
  "i7j8k9l fix: make the world better",
  "m0n1o2p chore: exist gracefully",
  "q3r4s5t docs: add wisdom",
  "u6v7w8x style: impeccable as always",
  "y9z0a1b test: pass all of life's tests",
];

interface CommandResult {
  text: string;
  isCmd?: boolean;
}

export function TerminalSection() {
  const [bootDone, setBootDone] = useState(false);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [cmdHistory, setCmdHistory] = useState<CommandResult[]>([]);
  const [input, setInput] = useState("");
  const [bootIdx, setBootIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bootIdx >= bootLines.length) {
      setBootDone(true);
      return;
    }
    const line = bootLines[bootIdx];
    if (charIdx < line.length) {
      const t = setTimeout(() => {
        setDisplayedLines(prev => {
          const next = [...prev];
          while (next.length <= bootIdx) next.push("");
          next[bootIdx] = line.slice(0, charIdx + 1);
          return next;
        });
        setCharIdx(i => i + 1);
      }, 25);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayedLines(prev => {
          const next = [...prev];
          while (next.length <= bootIdx) next.push("");
          return next;
        });
        setBootIdx(i => i + 1);
        setCharIdx(0);
      }, 200);
      return () => clearTimeout(t);
    }
  }, [bootIdx, charIdx]);

  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [displayedLines, cmdHistory]);

  useEffect(() => {
    if (bootDone && inputRef.current) inputRef.current.focus();
  }, [bootDone]);

  function processCmd(cmd: string): CommandResult[] {
    const r: CommandResult[] = [];
    const t = cmd.trim();

    r.push({ text: `$ ${t}`, isCmd: true });

    const lower = t.toLowerCase();

    if (lower === "help") {
      r.push({ text: "╔══════════════════════════════════════════╗" });
      r.push({ text: "║            AVAILABLE COMMANDS            ║" });
      r.push({ text: "╠══════════════════════════════════════════╣" });
      r.push({ text: "║ help              this list              ║" });
      r.push({ text: "║ nmap -sV heart    scan the heart         ║" });
      r.push({ text: "║ git log --oneline her commits            ║" });
      r.push({ text: "║ cat readme.txt    read about her         ║" });
      r.push({ text: "║ python genius.py  run analysis           ║" });
      r.push({ text: "║ sudo access       gain root              ║" });
      r.push({ text: "║ ls memories/      list memories          ║" });
      r.push({ text: "║ ping              ping heart             ║" });
      r.push({ text: "║ clear             clear terminal         ║" });
      r.push({ text: "║ whoami            who is she             ║" });
      r.push({ text: "║ exit              try to leave           ║" });
      r.push({ text: "╚══════════════════════════════════════════╝" });
    } else if (lower === "nmap -sv heart" || lower === "nmap -sv heart") {
      r.push({ text: "Starting Nmap scan on heart..." });
      r.push({ text: "PORT     STATE    SERVICE" });
      r.push({ text: "443/tcp  open     love" });
      r.push({ text: "80/tcp   open     admiration" });
      r.push({ text: "22/tcp   filtered respect" });
      r.push({ text: "Nmap done: 1 IP address scanned" });
    } else if (lower === "git log --oneline" || lower === "git log") {
      gitCommits.forEach(c => r.push({ text: c }));
    } else if (lower === "cat readme.txt" || lower === "cat readme") {
      r.push({ text: "KAIROS — A Study in Excellence" });
      r.push({ text: "" });
      r.push({ text: "A software engineer who thinks in systems." });
      r.push({ text: "Problem solver by trade, chaos coordinator by nature." });
      r.push({ text: "Dark academia aesthetic meets cyberpunk energy." });
      r.push({ text: "" });
      r.push({ text: "Notable traits: exceptional intelligence, relentless" });
      r.push({ text: "curiosity, and an instinct better than any algorithm." });
      r.push({ text: "" });
      r.push({ text: "Handles edge cases. Handles life. Handles it all." });
    } else if (lower.startsWith("python") && lower.includes("genius")) {
      r.push({ text: "running analysis..." });
      r.push({ text: "loading modules..." });
      r.push({ text: "processing intelligence metrics..." });
      r.push({ text: "result: off the charts" });
      r.push({ text: "Error: cannot compute — value exceeds maximum scale" });
    } else if (lower === "sudo access" || lower === "sudo access granted") {
      r.push({ text: "[sudo] password for kairos: ********" });
      r.push({ text: "root access to this entire experience. welcome." });
    } else if (lower === "ls memories/" || lower === "ls memories" || lower === "ls") {
      r.push({ text: "memories/:" });
      memories.forEach(m => r.push({ text: `  ${m}` }));
    } else if (lower === "ping") {
      r.push({ text: "PING heart (♥.♥.♥.♥) 56(84) bytes of data." });
      for (let i = 1; i <= 4; i++) {
        r.push({ text: `64 bytes from heart: icmp_seq=${i} ttl=forever time=instant ms` });
      }
      r.push({ text: "--- heart ping statistics ---" });
      r.push({ text: "4 packets transmitted, 4 received, 0% packet loss" });
      r.push({ text: "rtt min/avg/max/mdev = instant/instant/instant/0.000 ms" });
    } else if (lower === "clear") {
      return [];
    } else if (lower === "whoami") {
      r.push({ text: "kairos — the most interesting process running" });
    } else if (lower === "exit") {
      r.push({ text: "you can't exit. you are the program." });
    } else {
      r.push({ text: `bash: ${t}: command not found — but she would figure it out` });
    }

    return r;
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const results = processCmd(input);
      setCmdHistory(prev => [...prev, ...results]);
      setHistory(prev => [input.trim(), ...prev]);
      setHistIdx(-1);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const next = Math.min(histIdx + 1, history.length - 1);
        setHistIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx > 0) {
        const next = histIdx - 1;
        setHistIdx(next);
        setInput(history[next]);
      } else {
        setHistIdx(-1);
        setInput("");
      }
    }
  }

  return (
    <div
      className="rounded-xl border"
      style={{
        borderColor: "var(--border-bright)", backgroundColor: "var(--surface)",
        boxShadow: "0 0 60px rgba(233,30,140,0.15), inset 0 0 30px rgba(139,0,0,0.1)",
        overflow: "hidden", maxWidth: 700, width: "100%",
      }}
    >
      <div
        style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "10px 14px", backgroundColor: "var(--bg-elevated)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <span style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#febc2e" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#28c840" }} />
        <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginLeft: 8 }}>
          kairos@universe:~$
        </span>
      </div>

      <div
        ref={termRef}
        style={{
          padding: "14px 16px", maxHeight: 420, overflowY: "auto",
          fontFamily: "'Fira Code', monospace", fontSize: "0.8rem",
          lineHeight: 1.6, position: "relative",
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 5px)",
        }}
      >
        {displayedLines.map((line, i) => (
          <div key={`boot-${i}`} style={{ color: line?.startsWith("$") ? "var(--primary-dim)" : "var(--text)" }}>
            {line}
          </div>
        ))}

        {cmdHistory.map((entry, i) => (
          <div
            key={`cmd-${i}`}
            style={{
              color: entry.isCmd ? "var(--primary-dim)" : "var(--text)",
              whiteSpace: "pre-wrap",
            }}
          >
            {entry.text}
          </div>
        ))}

        {bootDone && (
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
            <span style={{ color: "var(--primary-dim)" }}>$</span>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                color: "var(--text)", fontFamily: "'Fira Code', monospace",
                fontSize: "0.8rem", resize: "none", overflow: "hidden",
                caretColor: "var(--primary)", padding: 0, lineHeight: 1.6,
              }}
              rows={1}
            />
            <span style={{
              width: 8, height: 14, backgroundColor: "var(--primary)",
              animation: "blink 1s step-end infinite",
            }} />
          </div>
        )}
      </div>
    </div>
  );
}
