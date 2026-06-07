export function CodePoem() {
  const lines = [
    { type: "comment", text: "// ╔═══════════════════════════════════════════════╗" },
    { type: "comment", text: '// ║  FILE: kairos.ts                              ║' },
    { type: "comment", text: '// ║  TYPE: portrait                               ║' },
    { type: "comment", text: '// ║  LINES: infinite                              ║' },
    { type: "comment", text: "// ╚═══════════════════════════════════════════════╝" },
    { type: "empty", text: "" },
    { type: "comment-block", text: "/**" },
    { type: "keyword", text: " * @name Kairos" },
    { type: "keyword", text: " * @definition (n.) the perfect, opportune moment." },
    { type: "comment-block", text: " *             the moment when everything clicks." },
    { type: "comment-block", text: " *             when the right thing arrives at exactly the right time." },
    { type: "comment-block", text: " *" },
    { type: "keyword", text: " * @see also: her, specifically." },
    { type: "comment-block", text: " */" },
    { type: "empty", text: "" },
    { type: "keyword", text: "interface Kairos {" },
    { type: "key", text: '  intelligence:  "off the charts";' },
    { type: "key", text: '  curiosity:     "relentless";' },
    { type: "key", text: '  attention:     "she notices everything";' },
    { type: "key", text: '  instinct:      "better than any algorithm";' },
    { type: "key", text: '  presence:      "the kind that changes the air in a room";' },
    { type: "keyword", text: "}" },
    { type: "empty", text: "" },
    { type: "comment", text: "// NOTE: no type errors found." },
    { type: "comment", text: "// NOTE: no edge cases uncovered." },
    { type: "comment", text: "// NOTE: she handles them all." },
    { type: "empty", text: "" },
    { type: "keyword", text: "const kairos: Kairos = {" },
    { type: "key", text: '  intelligence:  "off the charts",' },
    { type: "key", text: '  curiosity:     "relentless",' },
    { type: "key", text: '  attention:     "she notices everything",' },
    { type: "key", text: '  instinct:      "better than any algorithm",' },
    { type: "key", text: '  presence:      "the kind that changes the air in a room",' },
    { type: "keyword", text: "};" },
    { type: "empty", text: "" },
    { type: "keyword", text: "export default kairos;" },
    { type: "comment", text: '// — that\'s it. that\'s the whole file.' },
  ];

  const colorMap: Record<string, string> = {
    comment: "var(--text-muted)",
    "comment-block": "var(--text-muted)",
    keyword: "var(--primary-dim)",
    key: "var(--primary-glow)",
  };

  return (
    <div>
      <pre
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderLeft: "3px solid var(--primary)",
          borderRadius: 12,
          padding: "20px 24px",
          fontFamily: "'Fira Code', monospace",
          fontSize: "0.75rem",
          lineHeight: 1.7,
          overflowX: "auto",
          maxWidth: "min(640px, calc(100vw - 32px))",
          margin: "0 auto",
          whiteSpace: "pre",
        }}
      >
        {lines.map((line, i) => {
          const color = colorMap[line.type] || "var(--text)";
          const isString = line.type === "key";
          return (
            <div key={i} style={{ color, fontStyle: isString ? "italic" : "normal" }}>
              {line.text}
            </div>
          );
        })}
      </pre>
    </div>
  );
}
