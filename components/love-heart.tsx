"use client";
import { useEffect, useRef } from "react";

export function LoveHeart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = Math.min(800, window.innerWidth - 40);
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + "px";
    canvas.style.height = size + "px";
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2 + 12;

    const text = "i love you ";
    const numPoints = 500;
    const numRings = 16;
    const scale = size / 55;

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
    const fontSize = Math.max(14, size / 45);

    function draw() {
      try {
        const cvs = canvas;
        const c = ctx;
        if (!cvs || !c) return;

        rotationAngle += 0.006;
        c.clearRect(0, 0, size, size);

        for (let ring = 0; ring < numRings; ring++) {
          const rMult = 0.5 + (ring / numRings) * 0.65;
          const ringAngle = (ring / numRings) * Math.PI;
          const zOff = Math.sin(ringAngle) * size * 0.16;

          const cosR = Math.cos(rotationAngle);
          const sinR = Math.sin(rotationAngle);
          const cosTX = Math.cos(xTilt);
          const sinTX = Math.sin(xTilt);

          for (let i = 0; i < numPoints; i++) {
            const pt = pts[i];
            const hx = pt.x * scale * rMult;
            const hy = pt.y * scale * rMult;
            const hz = zOff;

            let y1 = hy * cosTX - hz * sinTX;
            let z1 = hy * sinTX + hz * cosTX;

            const rx = hx * cosR - z1 * sinR;
            const rz = hx * sinR + z1 * cosR;

            const perspective = 600 / (600 + rz);
            const sx = cx + rx * perspective;
            const sy = cy + y1 * perspective;

            if (isNaN(sx) || isNaN(sy)) continue;

            const alpha = 0.35 + 0.65 * Math.min(1, Math.max(0, perspective));
            c.globalAlpha = alpha;
            c.fillStyle = "#E91E8C";
            c.font = `${fontSize}px 'Fira Code', monospace`;
            c.textAlign = "center";
            c.textBaseline = "middle";

            const char = text[i % text.length];
            c.fillText(char, sx, sy);
          }
        }

        animId = requestAnimationFrame(draw);
      } catch (e) {
        console.error("LoveHeart draw error:", e);
      }
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ maxWidth: "100%", height: "auto", display: "block", margin: "0 auto" }}
    />
  );
}
