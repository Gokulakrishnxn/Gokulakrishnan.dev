"use client";

import { useEffect } from "react";

const SIZE = 64;
const FPS = 12;
const SIRI = ["#ff5fa2", "#ff8a5b", "#ffd36a", "#5fe3c7", "#5fa2ff", "#b65fff", "#ff5fa2"];

function iconLinks() {
  return Array.from(
    document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"], link[rel="shortcut icon"]'),
  ).filter((link) => !link.rel.includes("apple"));
}

/**
 * Animated tab icon: the GK mark with a slowly rotating Siri-style ring.
 * Browsers cannot animate .ico files, so frames are drawn to a canvas and
 * swapped into <link rel="icon">. Static icon is kept for reduced motion.
 */
export function AnimatedFavicon() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx || typeof ctx.createConicGradient !== "function") return;

    // Our own link, kept last in <head> so it wins over the static icons,
    // which Next/React may re-insert after hydration.
    const own = document.createElement("link");
    own.rel = "icon";
    own.type = "image/png";
    own.sizes.value = "64x64";
    document.head.appendChild(own);

    const original = new Map<HTMLLinkElement, { href: string | null; type: string | null }>();

    const mark = new Image();
    mark.src = "/web.png";

    let angle = 0;
    let timer = 0;
    let stopped = false;

    const draw = () => {
      const c = SIZE / 2;
      ctx.clearRect(0, 0, SIZE, SIZE);

      // Rounded black tile
      ctx.beginPath();
      ctx.roundRect(1, 1, SIZE - 2, SIZE - 2, 15);
      ctx.fillStyle = "#0a0a0a";
      ctx.fill();

      // Rotating gradient ring hugging the tile edge
      const ring = ctx.createConicGradient(angle, c, c);
      SIRI.forEach((color, index) => ring.addColorStop(index / (SIRI.length - 1), color));
      ctx.beginPath();
      ctx.roundRect(2.5, 2.5, SIZE - 5, SIZE - 5, 14);
      ctx.lineWidth = 3;
      ctx.strokeStyle = ring;
      ctx.stroke();

      // Mark (web.png has its own black square; draw it large and clip to
      // the tile so only the GK glyph shows)
      if (mark.complete && mark.naturalWidth > 0) {
        const scale = (SIZE * 0.9) / Math.max(mark.naturalWidth, mark.naturalHeight);
        const w = mark.naturalWidth * scale;
        const h = mark.naturalHeight * scale;
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(4, 4, SIZE - 8, SIZE - 8, 12);
        ctx.clip();
        ctx.drawImage(mark, c - w / 2, c - h / 2, w, h);
        ctx.restore();
      }

      const href = canvas.toDataURL("image/png");
      own.href = href;
      if (own !== document.head.lastElementChild) document.head.appendChild(own);
      for (const link of iconLinks()) {
        if (link === own) continue;
        if (!original.has(link)) {
          original.set(link, {
            href: link.getAttribute("href"),
            type: link.getAttribute("type"),
          });
        }
        link.type = "image/png";
        link.href = href;
      }
    };

    const tick = () => {
      if (stopped) return;
      angle = (angle + (Math.PI * 2) / (FPS * 6)) % (Math.PI * 2); // one turn / 6s
      draw();
    };

    const start = () => {
      if (timer) return;
      timer = window.setInterval(tick, 1000 / FPS);
    };
    const stop = () => {
      if (!timer) return;
      window.clearInterval(timer);
      timer = 0;
    };

    // Background tabs throttle timers to ~1 fps; keep it smooth by pausing
    // there and resuming when the tab is visible again.
    const onVisibility = () => (document.hidden ? stop() : start());

    mark.onload = () => {
      draw();
      if (!document.hidden) start();
    };
    mark.onerror = () => {
      if (!document.hidden) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stopped = true;
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
      own.remove();
      for (const [link, { href, type }] of original) {
        if (href) link.setAttribute("href", href);
        else link.removeAttribute("href");
        if (type) link.setAttribute("type", type);
        else link.removeAttribute("type");
      }
    };
  }, []);

  return null;
}
