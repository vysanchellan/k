import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface DisplayCardProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  className?: string;
}

function DisplayCard({
  icon,
  title,
  description,
  date,
  iconClassName = "text-[var(--primary)]",
  titleClassName = "text-[var(--text)]",
  className,
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] flex-col justify-between overflow-hidden rounded-xl border p-4 shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(233,30,140,0.3)] cursor-pointer",
        "bg-[var(--surface)] border-[var(--border-bright)] hover:border-[var(--primary)]",
        className
      )}
      style={{ gridArea: "stack" }}
    >
      <header className="flex flex-row items-center gap-3">
        <div className={cn("flex size-10 items-center justify-center rounded-lg bg-[var(--bg-elevated)]", iconClassName)}>
          {icon}
        </div>
        <div className="flex flex-col">
          <span className={cn("font-medium text-sm leading-none", titleClassName)}>{title}</span>
          {date && <p className="text-xs text-[var(--text-dim)] mt-1">{date}</p>}
        </div>
      </header>
      <p className="text-xs text-[var(--text-muted)] leading-5">{description}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  if (!cards || cards.length === 0) return null;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {cards.map((card, index) => (
        <DisplayCard key={index} {...card} />
      ))}
    </div>
  );
}
