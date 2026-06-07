"use client";
import { useEffect, useState } from "react";
import { SpecialText } from "@/components/ui/special-text";
import { NeuralNoise } from "@/components/ui/neural-noise";

interface Props { onComplete: () => void }

export function LoadingScreen({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 500);
    const t2 = setTimeout(() => setStep(2), 2000);
    const t3 = setTimeout(() => setStep(3), 3500);
    const t4 = setTimeout(() => setStep(4), 5000);
    const t5 = setTimeout(() => setStep(5), 6500);
    const t6 = setTimeout(() => setFadeOut(true), 9500);
    const t7 = setTimeout(() => onComplete(), 10200);
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
      <NeuralNoise color={[0.9, 0.2, 0.4]} opacity={0.8} speed={0.0008} />

      <div
        style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
          pointerEvents: "none", zIndex: 1,
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 5px)",
        }}
      />

      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 20px" }}>
        {step >= 1 && (
          <p style={{ color: "var(--primary-dim)", fontSize: "0.85rem", opacity: 0.7, marginBottom: "0.5rem" }}>
            <SpecialText text="> booting kairos.exe" duration={800} />
          </p>
        )}
        {step >= 2 && (
          <p style={{ color: "var(--primary-dim)", fontSize: "0.85rem", opacity: 0.7, marginBottom: "0.5rem" }}>
            <SpecialText text="> loading shaders..." duration={800} />
          </p>
        )}
        {step >= 3 && (
          <p style={{ color: "var(--primary)", fontSize: "0.85rem", opacity: 0.7, marginBottom: "0.5rem" }}>
            <SpecialText text="> one found. compiling her story." duration={800} />
          </p>
        )}
        {step >= 4 && (
          <p style={{ color: "var(--primary-glow)", fontSize: "0.85rem", opacity: 0.7, marginBottom: "0.5rem" }}>
            <SpecialText text="> done. rendering..." duration={600} />
          </p>
        )}
      </div>

      {step >= 5 && (
        <div
          style={{
            position: "relative", zIndex: 2, textAlign: "center", padding: "0 20px",
            marginTop: 40,
          }}
        >
          <p
            style={{
              fontSize: "0.8rem", lineHeight: 1.8, opacity: 0.6,
              color: "var(--text-muted)",
            }}
          >
            <SpecialText
              text="developed by vysan chellan, for kairos govender."
              duration={1200}
            />
          </p>
          <p
            style={{
              fontSize: "0.8rem", lineHeight: 1.8, opacity: 0.6,
              color: "var(--text-muted)", marginTop: 8,
            }}
          >
            <SpecialText
              text="you're annoying, troublesome, and childish, but you mean everything to me."
              duration={1500}
            />
          </p>
        </div>
      )}

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
            animation: "progress-fill 4.8s ease-in-out forwards",
            transformOrigin: "left center",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
          pointerEvents: "none", zIndex: 1,
          background: "linear-gradient(180deg, rgba(233,30,140,0.04) 0%, transparent 100%)",
          animation: "scan-line 3s ease-in-out infinite",
        }}
      />

      <style>{`
        @keyframes progress-fill {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
