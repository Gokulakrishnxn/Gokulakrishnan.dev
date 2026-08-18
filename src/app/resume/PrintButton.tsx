"use client";

import type { ReactNode } from "react";

export function PrintButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="resume-action-btn"
      onClick={() => window.print()}
    >
      {children}
    </button>
  );
}
