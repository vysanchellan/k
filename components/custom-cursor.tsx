"use client";
import { useEffect, useRef } from "react";

export function CustomCursor() {
  const innerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const outerPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    try {
      const inner = innerRef.current;
      const outer = outerRef.current;
      if (!inner || !outer) return;

      const onMove = (e: MouseEvent) => {
        posRef.current = { x: e.clientX, y: e.clientY };
        inner.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      };

      const onDown = () => {
        if (!inner || !outer) return;
        outer.style.transform = `translate(${outerPosRef.current.x - 10}px, ${outerPosRef.current.y - 10}px) scale(0.6)`;
        inner.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px) scale(0.5)`;
      };

      const onUp = () => {
        if (!inner || !outer) return;
        outer.style.transform = `translate(${outerPosRef.current.x - 16}px, ${outerPosRef.current.y - 16}px) scale(1)`;
        inner.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px) scale(1)`;
      };

      function lerp() {
        try {
          const o = outerRef.current;
          if (!o) { raf = requestAnimationFrame(lerp); return; }
          outerPosRef.current.x += (posRef.current.x - outerPosRef.current.x) * 0.12;
          outerPosRef.current.y += (posRef.current.y - outerPosRef.current.y) * 0.12;
          o.style.transform = `translate(${outerPosRef.current.x - 16}px, ${outerPosRef.current.y - 16}px)`;
          raf = requestAnimationFrame(lerp);
        } catch (e) {
          console.error("Cursor lerp error:", e);
        }
      }

      let raf = requestAnimationFrame(lerp);

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mousedown', onDown);
      document.addEventListener('mouseup', onUp);

      return () => {
        cancelAnimationFrame(raf);
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mousedown', onDown);
        document.removeEventListener('mouseup', onUp);
      };
    } catch (e) {
      console.error("Cursor effect error:", e);
    }
  }, []);

  return (
    <>
      <div
        ref={innerRef}
        style={{
          position: 'fixed', top: 0, left: 0, width: 8, height: 8,
          borderRadius: '50%', backgroundColor: 'var(--primary-glow)',
          pointerEvents: 'none', zIndex: 99999, transition: 'transform 0.08s ease',
          transform: 'translate(0, 0)',
        }}
      />
      <div
        ref={outerRef}
        style={{
          position: 'fixed', top: 0, left: 0, width: 32, height: 32,
          borderRadius: '50%', border: '1px solid var(--primary)',
          pointerEvents: 'none', zIndex: 99998, opacity: 0.5,
          transform: 'translate(0, 0)',
        }}
      />
    </>
  );
}
