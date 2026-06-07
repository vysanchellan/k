"use client";
import { useEffect, useState } from "react";
import { StarsBackground } from "@/components/stars-background";
import { ParticleCanvas } from "@/components/ui/particle-canvas";
import { LoveHeart } from "@/components/love-heart";
import { TerminalSection } from "@/components/terminal-section";
import { MiniGameSection } from "@/components/mini-game-section";
import { DisplayCardsSection } from "@/components/display-cards-section";
import { CodePoem } from "@/components/code-poem";
import { CustomCursor } from "@/components/custom-cursor";
import { BalloonsPopBackground } from "@/components/ui/balloons-pop-background";
import { ErrorBoundary } from "@/components/error-boundary";
import { AnimatedText } from "@/components/ui/animated-shiny-text";
import { GallerySection } from "@/components/gallery-section";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div
      style={{
        opacity: 0,
        animation: "fadeInUp 0.7s ease-out forwards",
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
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
    <ErrorBoundary>
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

        <div
          style={{
            position: "relative", zIndex: 2, textAlign: "center",
            animation: "heart-zoom-in 1s ease-out 0.2s forwards",
            opacity: 0,
          }}
        >
          <LoveHeart />

          <AnimatedText
            text="for kairos."
            textClassName="text-[clamp(2.5rem,6vw,4.5rem)] font-bold italic"
            gradientColors="linear-gradient(90deg, #E91E8C, #FF1493, #C2185B, #FF1493, #E91E8C)"
            gradientAnimationDuration={3}
          />

          {showSubtext && (
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.85rem",
                marginTop: 8,
              }}
            >
              made with love, written in code
            </p>
          )}
        </div>

        {showScroll && (
          <div
            style={{
              position: "absolute", bottom: 30,
              color: "var(--text-dim)",
              animation: "float 2s ease-in-out infinite",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              opacity: 0.5,
              fontFamily: "'Fira Code', monospace",
            }}
          >
            <span style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>scroll</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity: 0.7 }}>
              <path d="M7 1v10M3 7l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
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

      {/* Section 6 — Album */}
      <GallerySection />

      {/* Section 7 — Sign-off */}
      <section
        style={{
          padding: "120px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          minHeight: "80vh",
        }}
      >
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <BalloonsPopBackground />
        </div>

        <FadeUp>
          <AnimatedText
            text="kairos"
            textClassName="text-[clamp(3rem,10vw,7rem)] font-bold"
            gradientColors="linear-gradient(90deg, #E91E8C, #FF1493, #C2185B, #FF1493, #E91E8C)"
            gradientAnimationDuration={3}
          />
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
    </ErrorBoundary>
  );
}
