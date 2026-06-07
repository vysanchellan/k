export function CodePoem() {
  const lines = [
    { type: "header", text: "// ═══════════════════════════════════════════" },
    { type: "header", text: "// FILE: kairos.love" },
    { type: "header", text: "// AUTHOR: [your name]" },
    { type: "header", text: "// VERSION: ∞.0.0" },
    { type: "header", text: "// LAST MODIFIED: every day" },
    { type: "header", text: "// ═══════════════════════════════════════════" },
    { type: "empty", text: "" },
    { type: "comment-open", text: "/**" },
    { type: "comment", text: " * @description" },
    { type: "comment", text: " * She arrived like a well-timed function —" },
    { type: "comment", text: " * exactly when the system needed her most." },
    { type: "comment", text: " *" },
    { type: "keyword", text: " * @param {Heart} mine — already hers" },
    { type: "keyword", text: " * @returns {void} — nothing left to give, she has it all" },
    { type: "comment-close", text: " */" },
    { type: "empty", text: "" },
    { type: "keyword", text: "// TODO: find someone better" },
    { type: "comment", text: "// NOTE: search returned 0 results." },
    { type: "empty", text: "" },
    { type: "comment-open", text: "/*" },
    { type: "comment", text: " * I've tried to document this feeling." },
    { type: "comment", text: " * Every attempt compiles, but the output" },
    { type: "comment", text: " * is always the same:" },
    { type: "comment", text: " *" },
    { type: "string", text: ' *   console.log("I love you, Kairos.");' },
    { type: "comment", text: " *" },
    { type: "comment", text: " * No warnings. No errors." },
    { type: "comment", text: " * Just the truth." },
    { type: "comment-close", text: " */" },
    { type: "empty", text: "" },
    { type: "keyword", text: "// KNOWN BUGS: none" },
    { type: "keyword", text: "// KNOWN FEATURES: her laugh, her mind, her chaos" },
    { type: "keyword", text: "// STATUS: in love. permanently. no patch planned." },
  ];

  const colorMap: Record<string, string> = {
    header: "#9b7aa0",
    comment: "#9b7aa0",
    "comment-open": "#9b7aa0",
    "comment-close": "#9b7aa0",
    keyword: "#ea80b0",
    string: "#f5e6f0",
  };

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <span style={{
          color: "#9b7aa0", fontSize: "0.75rem",
          fontFamily: "'JetBrains Mono', monospace",
          textTransform: "uppercase", letterSpacing: 2,
        }}>
          kairos.love
        </span>
      </div>
      <pre
        style={{
          backgroundColor: "#120d1a",
          border: "1px solid #2e1a35",
          borderLeft: "3px solid #ea80b0",
          borderRadius: 12,
          padding: "20px 24px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.8rem",
          lineHeight: 1.7,
          overflowX: "auto",
          maxWidth: 640,
          margin: "0 auto",
          whiteSpace: "pre",
        }}
      >
        {lines.map((line, i) => (
          <div key={i} style={{ color: colorMap[line.type] || "#f5e6f0" }}>
            {line.text}
          </div>
        ))}
      </pre>
    </div>
  );
}
