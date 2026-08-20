"use client";

import { ThinkingOrb, type OrbState } from "thinking-orbs";

const LABELS: Record<OrbState, string> = {
  working: "Working",
  searching: "Searching",
  solving: "Solving",
  listening: "Peter",
  connecting: "Connecting",
  weaving: "Weaving",
  composing: "Composing",
  breathing: "Thinking",
  shaping: "Shaping",
};

export function PeterStatus({
  state,
  label,
  shimmer = true,
}: {
  state: OrbState;
  label?: string;
  shimmer?: boolean;
}) {
  const text = `${label ?? LABELS[state]}....`;

  return (
    <div className="peter-status">
      <ThinkingOrb
        state={state}
        size={20}
        theme="auto"
        aria-label={text}
      />
      <span
        className={`peter-status-label${shimmer ? " is-shimmer" : ""}`}
      >
        {text}
      </span>
    </div>
  );
}
