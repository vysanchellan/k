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
            background: "linear-gradient(135deg, #E91E8C, #C2185B)",
            color: "#fff",
            border: "none",
            borderRadius: 16,
            padding: "20px 40px",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
            fontStyle: "italic",
            cursor: "pointer",
            boxShadow: "0 8px 32px rgba(233,30,140,0.3)",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 12px 40px rgba(233,30,140,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(233,30,140,0.3)";
          }}
        >
          <span style={{ display: "block", fontSize: "0.7em", opacity: 0.8, marginBottom: 4 }}>
            ✦ click to open ✦
          </span>
          a little album of you
          <span style={{ display: "block", fontSize: "0.65em", opacity: 0.6, marginTop: 6, fontFamily: "'Fira Code', monospace", fontStyle: "normal" }}>
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
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "50%",
              width: 40,
              height: 40,
              color: "#fff",
              fontSize: "1.2rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(8px)",
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
