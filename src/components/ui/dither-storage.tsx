"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { useSpring } from "motion/react";
import { HardDrive } from "lucide-react";

const smoothstep = (min: number, max: number, value: number) => {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
};

const hash = (x: number, y: number) => {
  const h = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return h - Math.floor(h);
};

export function StorageUsageChart({
  theme = "dark",
  compact = false,
}: {
  theme?: "dark" | "light";
  compact?: boolean;
}) {
  const dark = theme === "dark";
  const [progress, setProgress] = useState(46);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const widthSpring = useSpring(progress, { stiffness: 150, damping: 20 });
  const directionRef = useRef(1);

  useEffect(() => {
    widthSpring.set(progress);
  }, [progress, widthSpring]);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const timer = window.setInterval(() => {
      setProgress((value) => {
        const next = value + directionRef.current * 0.55;
        if (next >= 86) directionRef.current = -1;
        if (next <= 34) directionRef.current = 1;
        return Math.min(86, Math.max(34, next));
      });
    }, 70);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let req = 0;
    let time = 0;
    const draw = () => {
      time += 0.02;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (
        canvas.width !== rect.width * dpr ||
        canvas.height !== rect.height * dpr
      ) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      }
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, rect.width, rect.height);

      const w = rect.width;
      const h = rect.height;
      const fillW = (widthSpring.get() / 100) * w;
      const cell = Math.max(2, Math.round(rect.width / 200));

      ctx.beginPath();
      ctx.rect(0, 0, w, h);
      ctx.fillStyle = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
      ctx.fill();

      if (fillW > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, fillW, h);
        ctx.clip();

        ctx.globalAlpha = 0.85;
        ctx.fillStyle = dark ? "#FFFFFF" : "#111111";

        for (let tx = 0; tx <= Math.ceil(fillW); tx += cell) {
          for (let ty = 0; ty <= h; ty += cell) {
            const jx = tx + cell / 2;
            const jy = ty + cell / 2;
            const jit = hash(jx, jy);
            const waveRaw =
              Math.sin(jx * 0.05 + time) + Math.sin(jy * 0.05 + time * 0.7);
            const mod = smoothstep(-1.5, 1.5, waveRaw);
            const sz = cell * (0.3 + 0.4 * mod) * (0.8 + 0.4 * jit);
            ctx.fillRect(
              tx + (cell - sz) / 2,
              ty + (cell - sz) / 2,
              sz,
              sz,
            );
          }
        }

        ctx.restore();
      }

      ctx.restore();
      req = requestAnimationFrame(draw);
    };
    req = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(req);
  }, [dark, widthSpring]);

  return (
    <div
      className={`flex h-full w-full flex-col justify-center ${
        compact ? "gap-2 p-0" : "gap-3 p-2"
      } ${dark ? "text-white" : "text-neutral-900"}`}
    >
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <HardDrive className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="text-[11px] font-medium tracking-wide uppercase">
            Projects
          </span>
        </div>
        <span
          className={`text-[11px] ${dark ? "text-white/55" : "text-neutral-500"}`}
        >
          Update soon
        </span>
      </div>
      <div
        className={`relative flex w-full items-center justify-center ${
          compact ? "h-4" : "h-8"
        }`}
      >
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>
    </div>
  );
}
