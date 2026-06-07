"use client";
import { useEffect, useState } from "react";
import { StarsBackground } from "@/components/stars-background";
import { ParticleCanvas } from "@/components/ui/particle-canvas";
import { SpecialText } from "@/components/ui/special-text";
import { LoveHeart } from "@/components/love-heart";
import { TerminalLove } from "@/components/terminal-love";
import { MemoryVault } from "@/components/memory-vault";
import { CodePoem } from "@/components/code-poem";

export function LandingPage() {
  const [showSubtext, setShowSubtext] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowSubtext(true), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <main style={{ position: "relative", zIndex: 1 }}>
      <StarsBackground />

      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "40px 20px",
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <ParticleCanvas maxParticles={600} speedScale={1.2} />
        </div>

        <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <LoveHeart />

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "clamp(1.5rem, 5vw, 3rem)",
              color: "#ea80b0",
              marginTop: 8,
              marginBottom: 8,
            }}
          >
            <SpecialText text="for kairos." duration={1500} delay={300} />
          </h1>

          {showSubtext && (
            <p
              style={{
                color: "#9b7aa0",
                fontSize: "0.9rem",
                fontFamily: "'JetBrains Mono', monospace",
                animation: "fadeIn 1s ease",
              }}
            >
              made with love, written in code
            </p>
          )}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 30,
            color: "#ea80b080",
            fontSize: "1.5rem",
            animation: "float 2s ease-in-out infinite",
          }}
        >
          ⌄
        </div>

        <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
      </section>

      <section
        style={{
          padding: "80px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400, height: 400,
            borderRadius: "50%",
            backgroundColor: "#ea80b0",
            filter: "blur(120px)",
            opacity: 0.08,
            pointerEvents: "none",
          }}
        />

        <h2
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: "#ea80b0",
            fontSize: "1rem",
            marginBottom: 32,
          }}
        >
          {"> hello, kairos"}
        </h2>

        <TerminalLove />
      </section>

      <section
        style={{
          padding: "80px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#f5e6f0",
            fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
            marginBottom: 32,
            textAlign: "center",
          }}
        >
          our favourite moments
        </h2>

        <MemoryVault />
      </section>

      <section
        style={{
          padding: "80px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: "#b08eea",
            fontSize: "0.9rem",
            marginBottom: 32,
          }}
        >
          // something i wrote for you
        </h2>

        <CodePoem />
      </section>

      <section
        style={{
          padding: "100px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 16,
        }}
      >
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
            color: "#f5e6f0",
            maxWidth: 500,
            lineHeight: 1.5,
          }}
        >
          You are my kairos — my perfect, opportune moment.
        </p>

        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.8rem",
            color: "#9b7aa0",
          }}
        >
          {"> end of file. love never terminates."}
        </p>

        <span
          style={{
            color: "#ea80b0",
            fontSize: "1.5rem",
            animation: "pulse-glow 2s ease-in-out infinite",
            display: "inline-block",
            marginTop: 8,
          }}
        >
          ♡
        </span>
      </section>
    </main>
  );
}
