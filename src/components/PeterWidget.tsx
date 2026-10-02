"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { PeterChat } from "@/components/PeterChat";
import { PETER_CLOSE_EVENT, PETER_OPEN_EVENT } from "@/lib/peter-events";

export function PeterWidget() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const show = () => setOpen(true);
    const hide = () => setOpen(false);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener(PETER_OPEN_EVENT, show);
    window.addEventListener(PETER_CLOSE_EVENT, hide);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(PETER_OPEN_EVENT, show);
      window.removeEventListener(PETER_CLOSE_EVENT, hide);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const { style } = document.documentElement;
    const previous = style.overflow;
    style.overflow = "hidden";
    return () => {
      style.overflow = previous;
    };
  }, [open]);

  // Peter is opened from the Ask Peter button in the nav (or ⌘K / Ctrl+K).
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="peter"
          className="peter-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <motion.div
            className="peter-siri"
            initial={reduce ? false : { opacity: 0, y: -14, scale: 0.96, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.97, filter: "blur(4px)" }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
          >
            <PeterChat onClose={() => setOpen(false)} />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
