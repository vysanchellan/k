"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import StellarCardGallerySingle from "@/components/ui/3d-image-gallery";

const animationProps = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop" as const,
    repeatDelay: 1,
    type: "spring" as const,
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring" as const,
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
} as const;

export function GallerySection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section
        style={{
          padding: "80px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.button
          {...animationProps}
          onClick={() => setOpen(true)}
          style={{
            position: "relative",
            borderRadius: 20,
            padding: "20px 44px",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
            fontStyle: "italic",
            cursor: "pointer",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            background: "radial-gradient(circle at 50% 0%, rgba(139,0,0,0.25) 0%, transparent 60%)",
            border: "1px solid rgba(139,0,0,0.2)",
            color: "rgba(255,255,255,0.9)",
            boxShadow: "0 8px 40px rgba(139,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
            transition: "box-shadow 0.3s ease",
          }}
          whileHover={{
            boxShadow: "0 16px 60px rgba(139,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 0,
              left: "-60%",
              width: "220%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
              transform: "skewX(-25deg)",
              animation: "shimmer 4s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />
          <span
            className="relative block"
            style={{
              maskImage: "linear-gradient(-75deg, rgb(139,0,0) calc(var(--x) + 20%), transparent calc(var(--x) + 30%), rgb(139,0,0) calc(var(--x) + 100%))",
            }}
          >
            <span style={{ display: "block", fontSize: "0.65em", opacity: 0.7, marginBottom: 6, fontFamily: "'Fira Code', monospace", fontStyle: "normal", letterSpacing: "0.1em" }}>
              ✦ click to open ✦
            </span>
            a little album of you
            <span style={{ display: "block", fontSize: "0.6em", opacity: 0.45, marginTop: 6, fontFamily: "'Fira Code', monospace", fontStyle: "normal", letterSpacing: "0.05em" }}>
              drag &bull; scroll &bull; click
            </span>
          </span>
        </motion.button>
      </section>

      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#000",
          }}
        >
          <button
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",
              top: 20,
              right: 24,
              zIndex: 10000,
              background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50%",
              width: 44,
              height: 44,
              color: "#fff",
              fontSize: "1.3rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(233,30,140,0.3), rgba(194,24,91,0.2))";
              e.currentTarget.style.borderColor = "rgba(233,30,140,0.4)";
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            ✕
          </button>
          <StellarCardGallerySingle />
        </div>
      )}
    </>
  );
}
