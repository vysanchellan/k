"use client";
import { useEffect, useRef } from "react";

export function LoveHeart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 500;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + "px";
    canvas.style.height = size + "px";
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2 + 15;

    const text = "i love you ";
    const numPoints = 140;
    const numRings = 8;
    const scale = 11;

    function heartX(t: number) {
      return 16 * Math.pow(Math.sin(t), 3);
    }

    function heartY(t: number) {
      return -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    }

    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i < numPoints; i++) {
      const t = (i / numPoints) * 2 * Math.PI;
      pts.push({ x: heartX(t), y: heartY(t) });
    }

    let rotationAngle = 0;
    let animId: number;
    const xTilt = -0.15;
    const fontSize = 20;

    function draw() {
      try {
        const c = ctx;
        if (!c) return;
        rotationAngle += 0.006;
        c.clearRect(0, 0, size, size);

        const cosTX = Math.cos(xTilt);
        const sinTX = Math.sin(xTilt);

        for (let ring = 0; ring < numRings; ring++) {
          const rMult = 0.6 + (ring / numRings) * 0.5;
          const zOff = Math.sin((ring / numRings) * Math.PI) * 70;

          for (let i = 0; i < numPoints; i++) {
            const pt = pts[i];
            const hx = pt.x * scale * rMult;
            const hy = pt.y * scale * rMult;

            let y1 = hy * cosTX - zOff * sinTX;
            let z1 = hy * sinTX + zOff * cosTX;

            const cosR = Math.cos(rotationAngle);
            const sinR = Math.sin(rotationAngle);
            const rx = hx * cosR - z1 * sinR;
            const rz = hx * sinR + z1 * cosR;

            const perspective = 500 / (500 + rz);
            const sx = cx + rx * perspective;
            const sy = cy + y1 * perspective;

            if (isNaN(sx) || isNaN(sy)) continue;

            const alpha = 0.3 + 0.7 * Math.min(1, Math.max(0, perspective));
            c.globalAlpha = alpha;
            c.fillStyle = "#E91E8C";
            c.font = `${fontSize}px "Fira Code", monospace`;
            c.textAlign = "center";
            c.textBaseline = "middle";

            const char = text[i % text.length];
            c.fillText(char, sx, sy);
          }
        }

        animId = requestAnimationFrame(draw);
      } catch (e) {
        console.error("Heart error:", e);
      }
    }

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ maxWidth: "100%", height: "auto", display: "block", margin: "0 auto" }}
    />
  );
}
