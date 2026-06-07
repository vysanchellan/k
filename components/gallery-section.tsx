"use client";
import StellarCardGallerySingle from "@/components/ui/3d-image-gallery";

export function GallerySection() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <StellarCardGallerySingle />
    </section>
  );
}
