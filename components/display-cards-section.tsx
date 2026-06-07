"use client";
import DisplayCards from "@/components/ui/display-cards";
import { Code2, Brain, Zap } from "lucide-react";

const cards = [
  {
    icon: <Code2 className="size-4" style={{ color: 'var(--primary)' }} />,
    title: "Engineer",
    description: "Systems thinker. Pattern finder. Builder of things that matter.",
    date: "full stack",
    iconClassName: "text-[var(--primary)]",
    titleClassName: "text-[var(--text)]",
    className: "[grid-area:stack] hover:-translate-y-10 transition-all duration-300",
  },
  {
    icon: <Brain className="size-4" style={{ color: 'var(--primary)' }} />,
    title: "Analyst",
    description: "Sees what others miss. Connects dots that don't look connected.",
    date: "always",
    iconClassName: "text-[var(--primary)]",
    titleClassName: "text-[var(--text)]",
    className: "[grid-area:stack] translate-x-16 translate-y-10 transition-all duration-300",
  },
  {
    icon: <Zap className="size-4" style={{ color: 'var(--primary-glow)' }} />,
    title: "Exceptional",
    description: "Not just good at things. Incomparable. In everything she does.",
    date: "consistently",
    iconClassName: "text-[var(--primary-glow)]",
    titleClassName: "text-[var(--text)]",
    className: "[grid-area:stack] translate-x-32 translate-y-20 transition-all duration-300",
  },
];

export function DisplayCardsSection() {
  return <DisplayCards cards={cards} />;
}
