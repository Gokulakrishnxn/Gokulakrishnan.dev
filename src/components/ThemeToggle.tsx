"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap-client";

function applyTheme(theme: "light" | "dark") {
  document.documentElement.classList.toggle("dark", theme === "dark");
  window.localStorage.setItem("theme", theme);
}

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4.2" />
      <g stroke="currentColor" strokeWidth="2.1" strokeLinecap="round">
        <line x1="12" y1="2.2" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="21.8" />
        <line x1="2.2" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="21.8" y2="12" />
        <line x1="5.1" y1="5.1" x2="7.1" y2="7.1" />
        <line x1="16.9" y1="16.9" x2="18.9" y2="18.9" />
        <line x1="18.9" y1="5.1" x2="16.9" y2="7.1" />
        <line x1="7.1" y1="16.9" x2="5.1" y2="18.9" />
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.2 14.4A8.2 8.2 0 0 1 9.6 3.8 8.4 8.4 0 1 0 20.2 14.4Z" />
    </svg>
  );
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [ready, setReady] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { contextSafe } = useGSAP({ scope: buttonRef });

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    const next =
      stored === "dark" || stored === "light"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    setTheme(next);
    applyTheme(next);
    setReady(true);
  }, []);

  const dark = theme === "dark";

  const toggle = contextSafe(() => {
    const next = dark ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    if (!buttonRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      buttonRef.current,
      { rotate: -14, scale: 0.9 },
      { rotate: 0, scale: 1, duration: 0.52, ease: "power2.out" },
    );
  });

  return (
    <button
      ref={buttonRef}
      type="button"
      className="theme-toggle"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      data-ready={ready ? "true" : "false"}
      onClick={toggle}
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
