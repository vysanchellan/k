"use client";
import { useState } from "react";
import StellarCardGallerySingle from "@/components/ui/3d-image-gallery";

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
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(135deg, rgba(233,30,140,0.25), rgba(194,24,91,0.15))",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 20,
            padding: "24px 48px",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
            fontStyle: "italic",
            cursor: "pointer",
            boxShadow: "0 8px 40px rgba(233,30,140,0.15), inset 0 1px 0 rgba(255,255,255,0.15)",
            transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px) scale(1.02)";
            e.currentTarget.style.boxShadow = "0 16px 60px rgba(233,30,140,0.3), inset 0 1px 0 rgba(255,255,255,0.2)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 40px rgba(233,30,140,0.15), inset 0 1px 0 rgba(255,255,255,0.15)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 0,
              left: "-60%",
              width: "220%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
              transform: "skewX(-25deg)",
              animation: "shimmer 4s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />
          <span style={{ display: "block", fontSize: "0.65em", opacity: 0.7, marginBottom: 6, fontFamily: "'Fira Code', monospace", fontStyle: "normal", letterSpacing: "0.1em", position: "relative" }}>
            ✦ click to open ✦
          </span>
          <span style={{ position: "relative" }}>
            a little album of you
          </span>
          <span style={{ display: "block", fontSize: "0.6em", opacity: 0.45, marginTop: 6, fontFamily: "'Fira Code', monospace", fontStyle: "normal", letterSpacing: "0.05em", position: "relative" }}>
            drag &bull; scroll &bull; click
          </span>
        </button>
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
