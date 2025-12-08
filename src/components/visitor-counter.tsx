"use client";

import { EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function VisitorCounter() {
  const [views, setViews] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await fetch("/api/views", {
          method: "GET",
          cache: "no-store",
        });
        const data = await response.json();
        setViews(data.views || 0);
      } catch (error) {
        console.error("Failed to fetch views:", error);
        setViews(0);
      } finally {
        setIsLoading(false);
      }
    };

    const trackView = async () => {
      try {
        await fetch("/api/views", {
          method: "POST",
          cache: "no-store",
        });
      } catch (error) {
        console.error("Failed to track view:", error);
      }
    };

    fetchViews();
    trackView();
  }, []);

  if (isLoading || views === null) {
    return (
      <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
        <EyeIcon className="size-3.5" />
        <span>--</span>
      </span>
    );
  }

  return (
    <span
      className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground"
      aria-label={`Total portfolio views: ${views.toLocaleString()}`}
    >
      <EyeIcon className="size-3.5" />
      <span>{views.toLocaleString()}</span>
    </span>
  );
}
