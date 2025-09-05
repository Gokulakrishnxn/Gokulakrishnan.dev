"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface HighlighterProps {
  children: React.ReactNode;
  className?: string;
  action?: "highlight" | "underline" | "strikethrough";
  color?: string;
  size?: "sm" | "md" | "lg";
  delay?: number;
  duration?: number;
}

export function Highlighter({
  children,
  className,
  action = "highlight",
  color = "#FFD700",
  size = "md",
  delay = 0,
  duration = 0.6,
}: HighlighterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 1000);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  const actionClasses = {
    highlight: "bottom-0",
    underline: "bottom-0",
    strikethrough: "top-1/2 -translate-y-1/2",
  };

  return (
    <span
      ref={ref}
      className={cn("relative inline-block", className)}
    >
      {children}
      <motion.div
        className={cn(
          "absolute left-0 w-full bg-current opacity-20",
          sizeClasses[size],
          actionClasses[action]
        )}
        style={{ backgroundColor: color }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isVisible ? 1 : 0 }}
        transition={{
          duration,
          ease: "easeOut",
        }}
        transformOrigin="left"
      />
    </span>
  );
}
