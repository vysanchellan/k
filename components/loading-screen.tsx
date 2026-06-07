"use client";
import { useEffect, useState } from "react";
import { SpecialText } from "@/components/ui/special-text";
import { ParticleCanvas } from "@/components/ui/particle-canvas";

interface Props { onComplete: () => void }

export function LoadingScreen({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 200);
    const t2 = setTimeout(() => setStep(2), 1000);
    const t3 = setTimeout(() => setStep(3), 1800);
    const t4 = setTimeout(() => setStep(4), 2600);
    const t5 = setTimeout(() => setStep(5), 3000);
    const t6 = setTimeout(() => setFadeOut(true), 3500);
    const t7 = setTimeout(() => onComplete(), 4100);
    return () => { [t1,t2,t3,t4,t5,t6,t7].forEach(clearTimeout); };
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        backgroundColor: "#050508", zIndex: 9999,
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center",
        opacity: fadeOut ? 0 : 1,
        transform: fadeOut ? "translateY(-20px)" : "translateY(0)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <ParticleCanvas followMouse={true} maxParticles={1200} speedScale={2.5} />

      <div
        style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
          pointerEvents: "none", zIndex: 1,
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 5px)",
        }}
      />

      <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        {step >= 1 && (
          <p style={{ color: "var(--primary-dim)", fontSize: "0.85rem", opacity: 0.7, marginBottom: "0.5rem" }}>
            <SpecialText text="> booting kairos.exe" duration={600} />
          </p>
        )}
        {step >= 2 && (
          <p style={{ color: "var(--primary-dim)", fontSize: "0.85rem", opacity: 0.7, marginBottom: "0.5rem" }}>
            <SpecialText text="> scanning for exceptional humans..." duration={600} />
          </p>
        )}
        {step >= 3 && (
          <p style={{ color: "var(--primary)", fontSize: "0.85rem", opacity: 0.7, marginBottom: "0.5rem" }}>
            <SpecialText text="> one found. compiling her story." duration={600} />
          </p>
        )}
        {step >= 4 && (
          <p style={{ color: "var(--primary-glow)", fontSize: "0.85rem", opacity: 0.7, marginBottom: "1.5rem" }}>
            <SpecialText text="> done." duration={400} />
          </p>
        )}
        {step >= 5 && (
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "12.5rem",
              color: "var(--primary)", textShadow: "0 0 40px var(--primary-dim)",
              margin: 0, lineHeight: 1, animation: "pulse-glow 2s ease-in-out infinite",
              letterSpacing: "-0.05em",
            }}
          >
            K
          </h1>
        )}
      </div>

      <div
        style={{
          position: "absolute", bottom: 0, left: 0, width: "100%", height: 2,
          backgroundColor: "var(--border)", zIndex: 2,
        }}
      >
        <div
          style={{
            height: "100%", width: "100%",
            background: "linear-gradient(90deg, var(--crimson), var(--primary-glow))",
            animation: "progress-fill 3.2s ease-in-out forwards",
            transformOrigin: "left center",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
          pointerEvents: "none", zIndex: 1,
          background: "linear-gradient(180deg, rgba(233,30,140,0.06) 0%, transparent 100%)",
          animation: "scan-line 3s ease-in-out infinite",
        }}
      />

      <style>{`
        @keyframes progress-fill {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
