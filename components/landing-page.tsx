"use client";
import { useEffect, useState } from "react";
import { Starfield3DBg } from "@/components/starfield-3d-bg";
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
      <Starfield3DBg />

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
                marginTop: 4,
              }}
            >
              made with love, written in code
            </p>
          )}
        </div>

        {showScroll && (
          <div
            style={{
              position: "absolute", bottom: 28,
              animation: "float 2s ease-in-out infinite",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              opacity: 0.35,
            }}
          >
            <svg width="20" height="28" viewBox="0 0 20 28" fill="none" style={{ opacity: 0.6 }}>
              <rect x="1.5" y="1.5" width="17" height="25" rx="8.5" stroke="#E91E8C" strokeWidth="1.5" />
              <circle cx="10" cy="9" r="2.5" fill="#E91E8C">
                <animate attributeName="cy" values="9;16;9" dur="2s" repeatCount="indefinite" />
              </circle>
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

      {/* Heart Divider */}
      <section
        style={{
          padding: "40px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            animation: "heart-zoom-in 1s ease-out 0.2s forwards",
            opacity: 0,
          }}
        >
          <LoveHeart />
        </div>
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
          padding: "80px 20px 120px",
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
