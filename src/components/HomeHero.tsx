"use client";

import { FileText } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/ease";
import { HoverPreview, ResumePeek, XPeek } from "@/components/motion/hover-preview";

function VerifiedMark() {
  return (
    <svg
      className="home-hero-verified"
      width="18"
      height="18"
      viewBox="0 0 22 22"
      aria-label="Verified"
    >
      <circle cx="11" cy="11" r="11" fill="#1d9bf0" />
      <path
        d="M6.4 11.2 9.3 14.1 15.6 7.8"
        fill="none"
        stroke="#fff"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const NAME = "Gokulakrishnan";

export function HomeHero({
  updated,
}: {
  updated: { label: string; datetime: string };
}) {
  const reduce = useReducedMotion();

  return (
    <section className="home-hero" aria-label="Profile">
      <div className="home-hero-banner">
        <motion.img
          className="home-hero-scribble"
          src="/hero-banner.png"
          alt=""
          width={1024}
          height={341}
          initial={reduce ? false : { opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.05, ease: EASE_OUT }}
        />
      </div>

      <div className="home-hero-body">
        <div className="home-hero-top">
          <motion.img
            className="home-hero-photo"
            src="/gokul.jpg"
            alt="Gokulakrishnan"
            width={160}
            height={160}
            initial={reduce ? false : { opacity: 0, scale: 0.86, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={reduce ? undefined : { scale: 1.04 }}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE_OUT }}
          />
          <HoverPreview content={<ResumePeek />}>
            <motion.a
              className="home-hero-resume"
              href="/resume"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={reduce ? undefined : { y: -2, scale: 1.03 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              transition={{ duration: 0.5, delay: 0.22, ease: EASE_OUT }}
            >
              <FileText size={14} />
              Resume
            </motion.a>
          </HoverPreview>
        </div>

        <div className="home-hero-identity">
          <div className="home-hero-name">
            <h1 className="gsap-name">
              {NAME.split("").map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  className="gsap-char"
                  initial={reduce ? false : { y: "108%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    delay: 0.2 + index * 0.022,
                    duration: 0.55,
                    ease: EASE_OUT,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>
            <motion.span
              initial={reduce ? false : { opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55, duration: 0.4, ease: EASE_OUT }}
            >
              <VerifiedMark />
            </motion.span>
          </div>
          <HoverPreview content={<XPeek />}>
            <motion.a
              className="home-hero-handle"
              href="https://x.com/Gokulakrishnxn"
              target="_blank"
              rel="noopener noreferrer"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.5, ease: EASE_OUT }}
            >
              @Gokulakrishnxn
            </motion.a>
          </HoverPreview>
          <motion.p
            className="home-hero-bio"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: EASE_OUT }}
          >
            AI Enthusiast 🚀 · Exploring AI safety, trends &amp; tools ·
            Building in public
          </motion.p>
          <motion.time
            dateTime={updated.datetime}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.5, ease: EASE_OUT }}
          >
            {updated.label}
          </motion.time>
        </div>
      </div>
    </section>
  );
}
