"use client";

import React, { useEffect, useState } from "react";
import { VideoSplash } from "@/components/video-splash";

interface SplashProviderProps {
  children: React.ReactNode;
  storageKey?: string;
  src?: string;
  poster?: string;
}

export function SplashProvider({
  children,
  storageKey = "hasSeenSplashVideo",
  src = "/splash.mp4",
  poster,
}: SplashProviderProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const seen = typeof window !== "undefined" && localStorage.getItem(storageKey);
      if (seen) setShowSplash(false);
    } catch {}
  }, [storageKey]);

  const handleComplete = () => {
    try {
      localStorage.setItem(storageKey, "true");
    } catch {}
    setShowSplash(false);
  };

  if (!mounted) return null;

  return (
    <>
      {showSplash && (
        <VideoSplash src={src} poster={poster} onComplete={handleComplete} />
      )}
      {children}
    </>
  );
}


