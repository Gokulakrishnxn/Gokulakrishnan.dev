"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { Tooltip } from "@/components/motion/tooltip";

const SESSION_KEY = "gokulakrishnan-counted-view";

export function PageViews() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let active = true;

    const counted = window.sessionStorage.getItem(SESSION_KEY) === "1";

    fetch("/api/views", { method: counted ? "GET" : "POST", cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { views?: number } | null) => {
        if (!active) return;
        if (typeof data?.views === "number") {
          setViews(data.views);
          if (!counted) window.sessionStorage.setItem(SESSION_KEY, "1");
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  if (views === null) return null;

  return (
    <Tooltip content="Page views" side="top" delay={80}>
      <span className="page-views" aria-label={`${views.toLocaleString()} page views`}>
        <Eye size={15} strokeWidth={1.75} aria-hidden="true" />
        {views.toLocaleString()}
      </span>
    </Tooltip>
  );
}
