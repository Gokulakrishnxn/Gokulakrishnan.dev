"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface VideoSplashProps {
  src?: string;
  poster?: string;
  autoHide?: boolean;
  allowSkip?: boolean;
  className?: string;
  onComplete?: () => void;
}

export function VideoSplash({
  src = "/splash.mp4",
  poster,
  autoHide = true,
  allowSkip = true,
  className,
  onComplete,
}: VideoSplashProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onEnded = () => {
      if (autoHide) hideSplash();
    };
    v.addEventListener("ended", onEnded);
    return () => v.removeEventListener("ended", onEnded);
  }, [autoHide]);

  const hideSplash = () => {
    setHidden(true);
    onComplete?.();
  };

  if (hidden) return null;

  return (
    <div className={cn("fixed inset-0 z-[100] bg-black flex items-center justify-center", className)}>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={src}
        poster={poster}
        autoPlay
        muted
        playsInline
      />

      {allowSkip && (
        <button
          onClick={hideSplash}
          className="absolute top-4 right-4 rounded-md bg-white/10 px-3 py-1.5 text-sm text-white backdrop-blur hover:bg-white/20 transition"
          aria-label="Skip splash"
        >
          Skip
        </button>
      )}
    </div>
  );
}


