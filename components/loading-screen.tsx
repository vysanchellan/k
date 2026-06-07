"use client";
import { useEffect, useState } from "react";
import { SpecialText } from "@/components/ui/special-text";
import { ShaderAnimation } from "@/components/ui/shader-animation";
import { AnimatedText } from "@/components/ui/animated-shiny-text";

interface Props { onComplete: () => void }

export function LoadingScreen({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 400);
    const t2 = setTimeout(() => setStep(2), 1600);
    const t3 = setTimeout(() => setStep(3), 2800);
    const t4 = setTimeout(() => setStep(4), 3800);
    const t5 = setTimeout(() => setStep(5), 4800);
    const t6 = setTimeout(() => setFadeOut(true), 5800);
    const t7 = setTimeout(() => onComplete(), 6400);
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
      <ShaderAnimation />

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
          <p style={{ color: "var(--primary-glow)", fontSize: "0.85rem", opacity: 0.7, marginBottom: "1.5rem" }}>
            <SpecialText text="> done. rendering..." duration={600} />
          </p>
        )}
        {step >= 5 && (
          <AnimatedText
            text="kairos govender"
            textClassName="text-[clamp(2.5rem,8vw,5.5rem)] font-bold font-futura"
            gradientColors="linear-gradient(90deg, #E91E8C, #FF1493, #C2185B, #FF1493, #E91E8C)"
            gradientAnimationDuration={3}
          />
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
