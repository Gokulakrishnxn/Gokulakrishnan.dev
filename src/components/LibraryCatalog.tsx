"use client";

import { motion, useReducedMotion } from "motion/react";
import { libraryItems, type LibraryItem } from "@/data/library";
import { Stagger } from "@/components/motion/reveal";
import { EASE_OUT } from "@/lib/ease";

function ShadcnLogo() {
  return (
    <svg viewBox="0 0 256 256" fill="none" aria-hidden="true">
      <path
        d="M208 128 128 208"
        stroke="currentColor"
        strokeWidth="32"
        strokeLinecap="round"
      />
      <path
        d="M192 40 40 192"
        stroke="currentColor"
        strokeWidth="32"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LibraryIcon({ icon }: { icon?: LibraryItem["icon"] }) {
  if (icon === "shadcn") return <ShadcnLogo />;
  return null;
}

function LibrarySlot({ item }: { item: LibraryItem }) {
  const reduce = useReducedMotion();
  const inner = (
    <>
      <span className="library-item-icon">
        <LibraryIcon icon={item.icon} />
        {item.isNew ? (
          <span className="library-item-dot" aria-hidden="true" />
        ) : null}
      </span>
      <span className="library-item-title">{item.title}</span>
    </>
  );

  if (!item.href) {
    return <div className="library-item">{inner}</div>;
  }

  return (
    <motion.a
      className="library-item"
      href={item.href}
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={reduce ? undefined : { x: 4 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
      {...(item.external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
    >
      {inner}
    </motion.a>
  );
}

export function LibraryCatalog() {
  const few = libraryItems.length < 3;

  return (
    <Stagger
      className={`library-catalog${few ? " library-catalog--few" : ""}`}
      aria-label="Library"
      delay={0.06}
      stagger={0.08}
    >
      {libraryItems.map((item) => (
        <LibrarySlot key={item.title} item={item} />
      ))}
    </Stagger>
  );
}
