"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LoadingScreen } from "@/components/loading-screen";
import { LandingPage } from "@/components/landing-page";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  return (
    <AnimatePresence mode="wait">
      {!loaded ? (
        <motion.div
          key="loading"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <LoadingScreen onComplete={() => setLoaded(true)} />
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <LandingPage />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
