"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import { openPeter } from "@/lib/peter-events";
import { SPRING_PRESS } from "@/lib/ease";

/**
 * Siri-style launcher for Peter. Lives in the nav; ⌘K / Ctrl+K also opens the dock.
 */
export function PeterCommandBar() {
  const reduce = useReducedMotion();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey)) return;
      if (event.key.toLowerCase() !== "k") return;
      if (event.altKey || event.shiftKey) return;
      event.preventDefault();
      openPeter();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <motion.button
      type="button"
      className="peter-cmd"
      aria-label="Ask Peter"
      aria-keyshortcuts="Meta+K Control+K"
      onClick={openPeter}
      whileHover={reduce ? undefined : { y: -1 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={SPRING_PRESS}
    >
      <span className="peter-cmd-glow" aria-hidden="true" />
      <span className="peter-cmd-orb" aria-hidden="true" />
      <span className="peter-cmd-label">Ask Peter</span>
    </motion.button>
  );
}
