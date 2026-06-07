"use client";

const cards = [
  {
    icon: "01",
    title: "Engineer",
    description: "Systems thinker. Pattern finder. Builder of things that matter.",
  },
  {
    icon: "02",
    title: "Analyst",
    description: "Sees what others miss. Connects dots that don't look connected.",
  },
  {
    icon: "03",
    title: "Brilliant",
    description: "Not just good at things. Incomparable. In everything she does.",
  },
  {
    icon: "04",
    title: "Pretty",
    description: "Effortlessly. The kind that stops conversations.",
  },
  {
    icon: "05",
    title: "Funny",
    description: "Sharp wit, quick comebacks, zero filter. Devastatingly charming.",
  },
  {
    icon: "06",
    title: "Data Scientist",
    description: "Python, R, SQL, ML — she speaks fluent data.",
  },
  {
    icon: "07",
    title: "Yapper",
    description: "Energetic, animated, impossible to ignore. In the best way.",
  },
  {
    icon: "08",
    title: "Intuitive",
    description: "Her instinct is faster than any algorithm. Always right.",
  },
  {
    icon: "09",
    title: "Unstoppable",
    description: "Sets a goal. Destroys it. Moves to the next. Relentless.",
  },
];

export function DisplayCardsSection() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16,
        maxWidth: 700,
        width: "100%",
        margin: "0 auto",
      }}
    >
      {cards.map((card, i) => (
        <div
          key={i}
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border-bright)",
            borderRadius: 12,
            padding: "20px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            transition: "all 0.25s ease",
            cursor: "default",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.borderColor = "var(--primary)";
            e.currentTarget.style.boxShadow = "0 0 30px rgba(233,30,140,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.borderColor = "var(--border-bright)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <span
            style={{
              fontFamily: "'Fira Code', monospace",
              fontSize: "0.65rem",
              color: "var(--primary-dim)",
              opacity: 0.6,
            }}
          >
            {card.icon}
          </span>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.1rem",
              color: "var(--text)",
              fontStyle: "italic",
            }}
          >
            {card.title}
          </span>
          <span
            style={{
              fontFamily: "'Fira Code', monospace",
              fontSize: "0.7rem",
              color: "var(--text-muted)",
              lineHeight: 1.5,
            }}
          >
            {card.description}
          </span>
        </div>
      ))}
    </div>
  );
}
