"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface AnimatedShinyTextProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedShinyText({ children, className }: AnimatedShinyTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement) return;

    let animationFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      
      animationFrame = requestAnimationFrame(() => {
        const rect = textElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        textElement.style.setProperty('--mouse-x', `${x}px`);
        textElement.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    const handleMouseLeave = () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      textElement.style.setProperty('--mouse-x', '50%');
      textElement.style.setProperty('--mouse-y', '50%');
    };

    textElement.addEventListener('mousemove', handleMouseMove, { passive: true });
    textElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      textElement.removeEventListener('mousemove', handleMouseMove);
      textElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <span
      ref={textRef}
      className={cn(
        "relative inline-block overflow-hidden bg-gradient-to-r from-neutral-900 via-neutral-100 to-neutral-900 bg-clip-text text-transparent",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent before:opacity-0 before:transition-opacity before:duration-500",
        "hover:before:opacity-100",
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:opacity-0 after:transition-opacity after:duration-300",
        "hover:after:opacity-100",
        className
      )}
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%',
      } as React.CSSProperties}
    >
      {children}
    </span>
  );
}
