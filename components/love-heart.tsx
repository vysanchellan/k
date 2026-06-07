"use client";
import { useEffect, useRef } from "react";

export function LoveHeart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 420;
    canvas.height = 420;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2 - 20;

    const text = "i love you ";
    const numPoints = 200;
    const numRings = 8;
    const scale = 8;

    function heartX(t: number) {
      return 16 * Math.pow(Math.sin(t), 3);
    }

    function heartY(t: number) {
      return 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    }

    const heartPoints: { x: number; y: number; t: number }[] = [];
    for (let i = 0; i < numPoints; i++) {
      const t = (i / numPoints) * 2 * Math.PI;
      heartPoints.push({ x: heartX(t), y: heartY(t), t });
    }

    let rotationY = 0;
    let animId: number;

    function draw() {
      const cvs = canvas;
      const c = ctx;
      if (!cvs || !c) return;
      rotationY += 0.008;
      c.clearRect(0, 0, cvs.width, cvs.height);

      const xTilt = -15 * (Math.PI / 180);

      for (let ring = 0; ring < numRings; ring++) {
        const radiusMult = 0.8 + (ring / numRings) * 0.4;
        const zOffset = (ring - numRings / 2) * 3;

        for (let i = 0; i < numPoints; i++) {
          const pt = heartPoints[i];
          const hx = pt.x * scale * radiusMult;
          const hy = pt.y * scale * radiusMult;
          const hz = zOffset;

          const cosRY = Math.cos(rotationY);
          const sinRY = Math.sin(rotationY);
          const cosTX = Math.cos(xTilt);
          const sinTX = Math.sin(xTilt);

          let xr = hx * cosRY - hz * sinRY;
          let zr = hx * sinRY + hz * cosRY;
          let yr = hy;

          let xf = xr;
          let yf = yr * cosTX - zr * sinTX;
          let zf = yr * sinTX + zr * cosTX;

          const perspective = 600 / (600 + zf);
          const sx = cx + xf * perspective;
          const sy = cy + yf * perspective;

          const alpha = Math.max(0.3, Math.min(1, (zf + 30) / 60));
          c.globalAlpha = alpha;
          c.fillStyle = "#ea80b0";
          c.font = "0.85rem 'Courier New', monospace";
          c.textAlign = "center";
          c.textBaseline = "middle";

          const char = text[i % text.length];
          c.fillText(char, sx, sy);
        }
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={420}
      height={420}
      style={{ maxWidth: "100%", height: "auto", display: "block" }}
    />
  );
}
