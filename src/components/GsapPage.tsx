"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SiteNav } from "@/components/SiteNav";
import { WritingIndexLink } from "@/components/WritingIndexLink";
import { EASE_OUT } from "@/lib/ease";

export function GsapPage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const isWriting = className?.includes("page--writing");
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE_OUT }}
    >
      <SiteNav />
      {isWriting ? <WritingIndexLink /> : null}
      {children}
    </motion.div>
  );
}
