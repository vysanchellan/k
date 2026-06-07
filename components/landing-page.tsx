"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { StarsBackground } from "@/components/stars-background";
import { ParticleCanvas } from "@/components/ui/particle-canvas";
import { LoveHeart } from "@/components/love-heart";
import { TerminalSection } from "@/components/terminal-section";
import { MiniGameSection } from "@/components/mini-game-section";
import { DisplayCardsSection } from "@/components/display-cards-section";
import { CodePoem } from "@/components/code-poem";
import { CustomCursor } from "@/components/custom-cursor";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
}

export function LandingPage() {
  const [showSubtext, setShowSubtext] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowSubtext(true), 800);
    const t2 = setTimeout(() => setShowScroll(true), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <main style={{ position: "relative", zIndex: 1 }}>
      <CustomCursor />
      <StarsBackground />

      {/* Section 1 — Hero */}
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
          <ParticleCanvas followMouse={true} maxParticles={800} speedScale={1.5} />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ position: "relative", zIndex: 2, textAlign: "center" }}
        >
          <LoveHeart />

          <h1
            className="serif"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              color: "var(--primary)",
              fontStyle: "italic",
              animation: "pulse-glow 3s ease-in-out infinite",
              marginTop: 8,
              lineHeight: 1.2,
            }}
          >
            for kairos.
          </h1>

          {showSubtext && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              style={{
                color: "var(--text-muted)",
                fontSize: "0.85rem",
                marginTop: 8,
              }}
            >
              made with love, written in code
            </motion.p>
          )}
        </motion.div>

        {showScroll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              position: "absolute", bottom: 30,
              color: "var(--text-dim)", fontSize: "0.7rem",
              animation: "float 2s ease-in-out infinite",
            }}
          >
            scroll &darr;
          </motion.div>
        )}
      </section>

      {/* Section 2 — Terminal */}
      <section
        style={{
          padding: "100px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          background: "linear-gradient(180deg, var(--bg), var(--bg-elevated))",
        }}
      >
        <FadeUp>
          <p style={{ color: "var(--primary-dim)", fontSize: "0.75rem", marginBottom: 8, textAlign: "center" }}>
            {"> hello, kairos"}
          </p>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontStyle: "italic",
              color: "var(--text)",
              marginBottom: 32,
              textAlign: "center",
            }}
          >
            talk to me.
          </h2>
          <TerminalSection />
        </FadeUp>
      </section>

      {/* Section 3 — Games Hub */}
      <section
        style={{
          padding: "100px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FadeUp>
          <p style={{ color: "var(--primary-dim)", fontSize: "0.75rem", marginBottom: 8, textAlign: "center" }}>
            {"> entertainment.exe"}
          </p>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontStyle: "italic",
              color: "var(--text)",
              marginBottom: 32,
              textAlign: "center",
            }}
          >
            play something.
          </h2>
          <MiniGameSection />
        </FadeUp>
      </section>

      {/* Section 4 — Her Traits */}
      <section
        style={{
          padding: "100px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "linear-gradient(180deg, var(--bg-elevated), var(--bg))",
        }}
      >
        <FadeUp>
          <p style={{ color: "var(--primary-dim)", fontSize: "0.75rem", marginBottom: 8, textAlign: "center" }}>
            {"> profile.json"}
          </p>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontStyle: "italic",
              color: "var(--text)",
              marginBottom: 32,
              textAlign: "center",
            }}
          >
            who she is.
          </h2>
          <DisplayCardsSection />
        </FadeUp>
      </section>

      {/* Section 5 — Code Poem */}
      <section
        style={{
          padding: "100px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FadeUp>
          <p style={{ color: "var(--primary-dim)", fontSize: "0.75rem", marginBottom: 8, textAlign: "center" }}>
            {"> kairos.ts"}
          </p>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontStyle: "italic",
              color: "var(--text)",
              marginBottom: 32,
              textAlign: "center",
            }}
          >
            in code, as in life.
          </h2>
          <CodePoem />
        </FadeUp>
      </section>

      {/* Section 6 — Sign-off */}
      <section
        style={{
          padding: "120px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <ParticleCanvas
            followMouse={false}
            maxParticles={400}
            speedScale={0.8}
          />
        </div>

        <FadeUp>
          <h1
            className="serif"
            style={{
              fontSize: "clamp(3rem, 10vw, 7rem)",
              color: "var(--primary)",
              animation: "pulse-glow 4s ease-in-out infinite",
              letterSpacing: "-0.03em",
              position: "relative",
              zIndex: 2,
            }}
          >
            kairos
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.85rem",
              marginTop: 16,
              position: "relative",
              zIndex: 2,
            }}
          >
            // end of file
          </p>
        </FadeUp>
      </section>
    </main>
  );
}
