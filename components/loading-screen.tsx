"use client";
import { useEffect, useState } from "react";
import { SpecialText } from "@/components/ui/special-text";
import { ParticleCanvas } from "@/components/ui/particle-canvas";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [step, setStep] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 400);
    const t2 = setTimeout(() => setStep(2), 1500);
    const t3 = setTimeout(() => setStep(3), 2600);
    const t4 = setTimeout(() => setStep(4), 3400);
    const t5 = setTimeout(() => setFadeOut(true), 3500);
    const t6 = setTimeout(() => onComplete(), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); clearTimeout(t6); };
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        backgroundColor: "#0a0a0f", zIndex: 9999,
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center",
        opacity: fadeOut ? 0 : 1,
        transform: fadeOut ? "scale(1.05)" : "scale(1)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <ParticleCanvas maxParticles={300} speedScale={1} />

      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        {step >= 1 && (
          <p style={{ color: "#ea80b0", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem", opacity: 0.7, marginBottom: "0.5rem" }}>
            <SpecialText text="> initializing kairos.exe" duration={800} />
          </p>
        )}
        {step >= 2 && (
          <p style={{ color: "#ea80b0", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem", opacity: 0.7, marginBottom: "0.5rem" }}>
            <SpecialText text="> loading something beautiful..." duration={800} />
          </p>
        )}
        {step >= 3 && (
          <p style={{ color: "#b08eea", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem", opacity: 0.7, marginBottom: "1.5rem" }}>
            <SpecialText text="> compiling love..." duration={800} />
          </p>
        )}
        {step >= 4 && (
          <h1
            style={{
              fontFamily: "'Playfair Display', serif", fontSize: "5rem",
              color: "#ea80b0", textShadow: "0 0 40px #ea80b080",
              margin: 0, animation: "pulse-glow 2s ease-in-out infinite",
            }}
          >
            K
          </h1>
        )}
      </div>

      <div
        style={{
          position: "absolute", bottom: 0, left: 0, width: "100%", height: 3,
          backgroundColor: "#2e1a35",
        }}
      >
        <div
          style={{
            height: "100%", width: "100%", backgroundColor: "#ea80b0",
            animation: "progress-fill 3s ease-in-out forwards",
            transformOrigin: "left center",
          }}
        />
      </div>

      <style>{`
        @keyframes progress-fill {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
