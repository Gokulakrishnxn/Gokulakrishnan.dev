"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState, type MouseEvent } from "react";

const closedFolderPath =
  "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z";

// Lucide "folder-open" path — used as the opened state.
const openFolderPath =
  "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2";

const springBounce = { duration: 0.22, ease: [0.34, 1.56, 0.64, 1] as const };

export function ProjectsFolderLink() {
  const router = useRouter();
  const [opened, setOpened] = useState(false);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    if (opened) return;
    setOpened(true);
    window.setTimeout(() => router.push("/projects"), 420);
  }

  return (
    <a
      className="folder-link"
      href="/projects"
      aria-label="See my projects"
      onClick={handleClick}
    >
      <span className="folder-link-icon">
        <motion.svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{ position: "absolute", inset: 0 }}
          animate={
            opened
              ? { opacity: 0, scale: 0.6, rotate: -14 }
              : { opacity: 1, scale: 1, rotate: 0 }
          }
          whileHover={!opened ? { scale: 1.2, rotate: -8 } : undefined}
          transition={springBounce}
        >
          <path d={closedFolderPath} />
        </motion.svg>
        <motion.svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{ position: "absolute", inset: 0 }}
          initial={{ opacity: 0, scale: 0.6, rotate: 10 }}
          animate={
            opened
              ? { opacity: 1, scale: 1.15, rotate: 0 }
              : { opacity: 0, scale: 0.6, rotate: 10 }
          }
          transition={{ ...springBounce, delay: opened ? 0.08 : 0 }}
        >
          <path d={openFolderPath} />
        </motion.svg>
      </span>
    </a>
  );
}
