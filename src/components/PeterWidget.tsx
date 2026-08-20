"use client";

import { useEffect, useState } from "react";
import { PeterChat } from "@/components/PeterChat";
import { PeterStatus } from "@/components/PeterStatus";

export function PeterWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      const height = window.visualViewport?.height ?? window.innerHeight;
      root.style.setProperty("--peter-vh", `${Math.round(height)}px`);
    };

    sync();
    window.addEventListener("resize", sync);
    window.visualViewport?.addEventListener("resize", sync);
    window.visualViewport?.addEventListener("scroll", sync);

    return () => {
      window.removeEventListener("resize", sync);
      window.visualViewport?.removeEventListener("resize", sync);
      window.visualViewport?.removeEventListener("scroll", sync);
      root.style.removeProperty("--peter-vh");
    };
  }, []);

  return (
    <div className={`peter-dock${open ? " is-open" : ""}`}>
      {open ? (
        <PeterChat variant="widget" onClose={() => setOpen(false)} />
      ) : (
        <button
          type="button"
          className="peter-launch"
          aria-label="Open Peter"
          onClick={() => setOpen(true)}
        >
          <PeterStatus state="listening" />
        </button>
      )}
    </div>
  );
}
