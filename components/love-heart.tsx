"use client";
import { useEffect, useRef } from "react";

export function LoveHeart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 500;
    canvas.height = 500;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2 + 10;

    const text = "kairos ";
    const numPoints = 300;
    const numRings = 12;
    const scale = 9;

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

    function draw() {
      const cvs = canvas;
      const c = ctx;
      if (!cvs || !c) return;

      rotationAngle += 0.006;
      c.clearRect(0, 0, cvs.width, cvs.height);

      for (let ring = 0; ring < numRings; ring++) {
        const rMult = 0.6 + (ring / numRings) * 0.55;
        const ringAngle = (ring / numRings) * Math.PI;
        const zOff = Math.sin(ringAngle) * 80;

        for (let i = 0; i < numPoints; i++) {
          const pt = pts[i];
          const hx = pt.x * scale * rMult;
          const hy = pt.y * scale * rMult;
          const hz = zOff;

          const cosR = Math.cos(rotationAngle);
          const sinR = Math.sin(rotationAngle);
          const cosTX = Math.cos(xTilt);
          const sinTX = Math.sin(xTilt);

          let y1 = hy * cosTX - hz * sinTX;
          let z1 = hy * sinTX + hz * cosTX;

          const rx = hx * cosR - z1 * sinR;
          const rz = hx * sinR + z1 * cosR;

          const perspective = 600 / (600 + rz);
          const sx = cx + rx * perspective;
          const sy = cy + y1 * perspective;

          const alpha = 0.3 + 0.7 * Math.min(1, Math.max(0, perspective));
          c.globalAlpha = alpha;
          c.fillStyle = "#E91E8C";
          c.font = "11px 'Fira Code', monospace";
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
      width={500}
      height={500}
      style={{ maxWidth: "100%", height: "auto", display: "block" }}
    />
  );
}
