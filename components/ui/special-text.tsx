"use client";
import { useEffect, useState, useCallback } from "react";

const CHARS = "!@#$%^&*()_+-=[]{}|;':\",./<>?~`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

interface SpecialTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  onComplete?: () => void;
}

export function SpecialText({ text, className = "", delay = 0, duration = 1200, onComplete }: SpecialTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [started, setStarted] = useState(false);

  const scramble = useCallback(() => {
    const startTime = Date.now();
    const len = text.length;

    function update() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const revealCount = Math.floor(progress * len);

      let result = "";
      for (let i = 0; i < len; i++) {
        if (i < revealCount) {
          result += text[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplayText(result);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else if (onComplete) {
        onComplete();
      }
    }

    requestAnimationFrame(update);
  }, [text, duration, onComplete]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true);
      scramble();
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, scramble]);

  return (
    <span className={className}>
      {started ? displayText : ""}
    </span>
  );
}
