"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { AppleHelloEnglishEffect } from "@/registry/apple-hello-effect";

const VISITED_KEY = "has-visited-site";

export function SplashScreen() {
  const [showSplash, setShowSplash] = useState<boolean | null>(null);

  useEffect(() => {
    const hasVisited = localStorage.getItem(VISITED_KEY);

    if (!hasVisited) {
      localStorage.setItem(VISITED_KEY, "true");
      setTimeout(() => {
        setShowSplash(true);
      }, 0);
    } else {
      setTimeout(() => {
        setShowSplash(false);
      }, 0);
    }
  }, []);

  const handleAnimationComplete = () => {
    setTimeout(() => {
      setShowSplash(false);
    }, 500);
  };

  if (showSplash === null) {
    return null;
  }

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          <AppleHelloEnglishEffect
            className="h-24 sm:h-32 md:h-40"
            onAnimationComplete={handleAnimationComplete}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
