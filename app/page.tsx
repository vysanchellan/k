"use client";
import { useState } from "react";
import { LoadingScreen } from "@/components/loading-screen";
import { LandingPage } from "@/components/landing-page";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      {loaded && <LandingPage />}
    </>
  );
}
