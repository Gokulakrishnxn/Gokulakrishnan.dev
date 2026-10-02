import type { ReactNode, SVGProps } from "react";

/**
 * Decorative illustrations for laptop and desktop viewports only.
 * Monoline art on three layers (faint corner shapes, mid objects, accents).
 * Pure SVG + CSS, no JS. Hidden below 1100px and in print (see globals.css).
 */

type ArtProps = SVGProps<SVGSVGElement> & { children: ReactNode };

function Art({ children, className, ...rest }: ArtProps) {
  return (
    <svg
      className={`backdrop-art ${className ?? ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {children}
    </svg>
  );
}

function Plus({ className }: { className: string }) {
  return (
    <Art className={`backdrop-accent ${className}`} viewBox="0 0 16 16">
      <path d="M8 2 V14 M2 8 H14" />
    </Art>
  );
}

function Spark({ className }: { className: string }) {
  return (
    <Art className={`backdrop-accent ${className}`} viewBox="0 0 48 48">
      <path d="M24 6 C25 18 30 23 42 24 C30 25 25 30 24 42 C23 30 18 25 6 24 C18 23 23 18 24 6 Z" />
      <circle cx="38" cy="10" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="9" cy="38" r="1.1" fill="currentColor" stroke="none" />
    </Art>
  );
}

function Dots({ className }: { className: string }) {
  return (
    <Art className={`backdrop-accent ${className}`} viewBox="0 0 60 20">
      <circle cx="6" cy="10" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="22" cy="10" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="38" cy="10" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="54" cy="10" r="1.6" fill="currentColor" stroke="none" />
    </Art>
  );
}

export function SiteBackdrop() {
  return (
    <div className="site-backdrop" aria-hidden="true">
      <div className="backdrop-grid" />

      {/* ------------------------------------------------------------ left */}
      <div className="backdrop-side backdrop-side--left">
        {/* faint layer: topographic contours in the corner */}
        <Art className="backdrop-faint backdrop-contours" viewBox="0 0 420 420">
          {[1, 0.82, 0.64, 0.47, 0.31, 0.16].map((s) => (
            <path
              key={s}
              vectorEffect="non-scaling-stroke"
              transform={`translate(210 210) scale(${s}) translate(-210 -210)`}
              d="M210 30 C290 22 372 72 388 150 C404 228 366 318 290 364 C214 410 110 392 60 330 C10 268 20 170 70 106 C110 54 160 36 210 30 Z"
            />
          ))}
        </Art>

        {/* the thread, drawn on load */}
        <Art className="backdrop-thread" viewBox="0 0 160 1400" preserveAspectRatio="xMidYMin meet">
          <path
            className="backdrop-draw"
            pathLength="1"
            d="M80 0 C80 90 40 110 54 160 C72 220 128 180 118 240 C108 300 32 280 44 350 C54 410 130 390 122 460 C114 530 30 520 44 600 C58 680 134 650 124 730 C114 810 30 800 46 880 C62 960 136 940 124 1020 C112 1100 32 1090 46 1170 C58 1250 128 1240 118 1310 C112 1360 80 1370 80 1400"
          />
        </Art>

        <Art className="backdrop-braces backdrop-float--slow" viewBox="0 0 120 90" strokeWidth="1.5">
          <path d="M34 14 C24 14 22 18 22 26 L22 36 C22 42 18 45 12 45 C18 45 22 48 22 54 L22 64 C22 72 24 76 34 76" />
          <path d="M86 14 C96 14 98 18 98 26 L98 36 C98 42 102 45 108 45 C102 45 98 48 98 54 L98 64 C98 72 96 76 86 76" />
          <path className="backdrop-blink" d="M58 32 L58 58" strokeWidth="2" />
          <circle cx="66" cy="58" r="1.3" fill="currentColor" stroke="none" />
        </Art>

        {/* laptop with code */}
        <Art className="backdrop-laptop backdrop-float" viewBox="0 0 200 140">
          <rect x="22" y="10" width="156" height="100" rx="8" />
          <rect x="32" y="20" width="136" height="80" rx="4" />
          <circle cx="100" cy="15" r="1.4" fill="currentColor" stroke="none" />
          <path d="M8 118 H192 L186 130 H14 Z" />
          <path d="M84 124 H116" />
          <path d="M46 40 H86" strokeWidth="2" />
          <path d="M46 54 H114" opacity="0.6" />
          <path d="M58 68 H102" opacity="0.6" />
          <path d="M58 82 H90" opacity="0.6" />
          <rect className="backdrop-blink" x="96" y="78" width="6" height="9" fill="currentColor" stroke="none" />
        </Art>

        {/* coffee with steam */}
        <Art className="backdrop-mug backdrop-float--slow" viewBox="0 0 100 112">
          <path d="M20 42 L26 98 C26.5 102 29 104 34 104 H66 C71 104 73.5 102 74 98 L80 42" />
          <ellipse cx="50" cy="42" rx="30" ry="6.5" />
          <path d="M80 54 C98 54 98 86 78 86" />
          <path d="M34 70 H66" opacity="0.45" />
          <g className="backdrop-steam">
            <path d="M38 30 C32 22 44 16 38 6" />
            <path d="M50 28 C44 20 56 14 50 4" />
            <path d="M62 30 C56 22 68 16 62 6" />
          </g>
        </Art>

        {/* sticky notes with a check */}
        <Art className="backdrop-notes backdrop-float" viewBox="0 0 140 130">
          <rect x="22" y="26" width="90" height="90" rx="6" transform="rotate(-7 67 71)" opacity="0.55" />
          <rect x="28" y="18" width="90" height="90" rx="6" transform="rotate(4 73 63)" fill="var(--body-bg)" />
          <path d="M56 64 L68 76 L94 48" strokeWidth="2" />
          <path d="M48 92 H96" opacity="0.5" />
        </Art>

        {/* paper plane with trajectory */}
        <Art className="backdrop-plane backdrop-float" viewBox="0 0 160 110">
          <path d="M6 72 C30 70 50 56 78 36" strokeDasharray="3 6" />
          <path d="M78 36 L150 12 L120 92 L98 60 Z" />
          <path d="M78 36 L98 60 L150 12" />
          <path d="M98 60 L94 86" />
        </Art>

        {/* pencil */}
        <Art className="backdrop-pencil backdrop-float--slow" viewBox="0 0 170 60">
          <path d="M34 20 H126 V40 H34 Z" />
          <path d="M34 20 L10 30 L34 40" />
          <path d="M10 30 L17 27.2 V32.8 Z" fill="currentColor" stroke="none" />
          <path d="M126 20 H134 V40 H126" />
          <rect x="134" y="18" width="20" height="24" rx="4" />
          <path d="M60 20 V40 M100 20 V40" opacity="0.4" />
        </Art>

        {/* accents */}
        <Spark className="backdrop-spark-a" />
        <Plus className="backdrop-plus-a" />
        <Plus className="backdrop-plus-b" />
        <Dots className="backdrop-dots-a" />
        <Art className="backdrop-accent backdrop-arc-a" viewBox="0 0 80 80">
          <path d="M8 72 A64 64 0 0 1 72 8" strokeDasharray="2 6" />
        </Art>
      </div>

      {/* ----------------------------------------------------------- right */}
      <div className="backdrop-side backdrop-side--right">
        {/* faint layer: orbit system in the corner */}
        <Art className="backdrop-faint backdrop-orbits" viewBox="0 0 400 400" strokeWidth="1.2">
          <circle cx="220" cy="180" r="170" strokeDasharray="2 8" />
          <circle cx="220" cy="180" r="118" />
          <ellipse cx="220" cy="180" rx="170" ry="54" transform="rotate(-28 220 180)" opacity="0.7" />
          <circle cx="220" cy="180" r="4" fill="currentColor" stroke="none" />
          <g className="backdrop-orbit-dot">
            <circle cx="220" cy="62" r="5" fill="currentColor" stroke="none" />
          </g>
          <g className="backdrop-orbit-dot backdrop-orbit-dot--inner">
            <circle cx="220" cy="10" r="3" fill="currentColor" stroke="none" />
          </g>
        </Art>

        {/* faint layer: globe in the lower corner */}
        <Art className="backdrop-faint backdrop-globe" viewBox="0 0 240 240" strokeWidth="1.2">
          <circle cx="120" cy="120" r="100" />
          <ellipse cx="120" cy="120" rx="38" ry="100" />
          <ellipse cx="120" cy="120" rx="74" ry="100" />
          <path d="M20 120 H220" />
          <path d="M36 70 Q120 96 204 70" />
          <path d="M36 170 Q120 144 204 170" />
          <circle cx="152" cy="86" r="3" fill="currentColor" stroke="none" />
          <circle cx="92" cy="146" r="3" fill="currentColor" stroke="none" />
          <path d="M152 86 C130 112 112 126 92 146" strokeDasharray="2 5" />
        </Art>

        {/* the knot that resolves into an arrow */}
        <Art className="backdrop-knot backdrop-float--slow" viewBox="0 0 280 90">
          <path
            className="backdrop-draw backdrop-draw--late"
            pathLength="1"
            d="M4 46 C30 46 36 20 54 22 C76 24 60 66 42 60 C26 54 44 26 64 32 C86 38 70 70 56 58 C44 48 72 28 92 38 C112 48 100 70 112 60 C128 46 140 24 160 30 C180 36 170 64 156 56 C142 48 166 30 184 38 C204 48 196 60 212 50 C230 38 246 46 272 46"
          />
          <path d="M262 38 L272 46 L262 54" />
        </Art>

        {/* browser window with a chart */}
        <Art className="backdrop-window backdrop-float" viewBox="0 0 200 150">
          <rect x="8" y="10" width="184" height="130" rx="12" fill="var(--body-bg)" />
          <path d="M8 36 H192" />
          <circle cx="24" cy="23" r="2.4" fill="currentColor" stroke="none" />
          <circle cx="34" cy="23" r="2.4" fill="currentColor" stroke="none" />
          <circle cx="44" cy="23" r="2.4" fill="currentColor" stroke="none" />
          <path d="M34 122 V58 M34 122 H172" opacity="0.6" />
          <rect x="50" y="94" width="14" height="28" rx="2" opacity="0.6" />
          <rect x="76" y="80" width="14" height="42" rx="2" opacity="0.6" />
          <rect x="102" y="100" width="14" height="22" rx="2" opacity="0.6" />
          <rect x="128" y="66" width="14" height="56" rx="2" opacity="0.6" />
          <path className="backdrop-draw backdrop-draw--late" pathLength="1" d="M50 90 L84 72 L110 94 L136 56 L166 62" strokeWidth="1.8" />
          <path d="M158 54 L166 62 L158 70" strokeWidth="1.8" />
        </Art>

        {/* neural network */}
        <Art className="backdrop-net backdrop-float--slow" viewBox="0 0 200 160">
          <g opacity="0.5">
            {[40, 80, 120].map((y1) =>
              [25, 60, 100, 135].map((y2) => (
                <path key={`a${y1}${y2}`} d={`M30 ${y1} L100 ${y2}`} />
              )),
            )}
            {[25, 60, 100, 135].map((y1) =>
              [55, 105].map((y2) => (
                <path key={`b${y1}${y2}`} d={`M100 ${y1} L170 ${y2}`} />
              )),
            )}
          </g>
          {[40, 80, 120].map((y) => (
            <circle key={`l${y}`} cx="30" cy={y} r="6" fill="var(--body-bg)" />
          ))}
          {[25, 60, 100, 135].map((y) => (
            <circle key={`m${y}`} cx="100" cy={y} r="6" fill="var(--body-bg)" />
          ))}
          {[55, 105].map((y) => (
            <circle key={`r${y}`} cx="170" cy={y} r="6" fill="var(--body-bg)" />
          ))}
          <circle cx="100" cy="60" r="2.4" fill="currentColor" stroke="none" />
          <circle cx="170" cy="55" r="2.4" fill="currentColor" stroke="none" />
        </Art>

        {/* rocket */}
        <Art className="backdrop-rocket backdrop-float" viewBox="0 0 200 180">
          <path d="M8 170 C40 160 70 140 96 118" strokeDasharray="3 6" />
          <g transform="rotate(42 128 78)">
            <path d="M128 10 C146 36 150 80 144 124 H112 C106 80 110 36 128 10 Z" fill="var(--body-bg)" />
            <circle cx="128" cy="66" r="11" />
            <path d="M112 100 L92 136 L112 124" />
            <path d="M144 100 L164 136 L144 124" />
            <path d="M116 124 L114 140 H142 L140 124" />
            <path className="backdrop-flame" d="M120 142 C124 160 132 160 136 142" strokeDasharray="3 4" />
          </g>
        </Art>

        {/* terminal */}
        <Art className="backdrop-terminal backdrop-float--slow" viewBox="0 0 180 120">
          <rect x="6" y="8" width="168" height="104" rx="10" fill="var(--body-bg)" />
          <path d="M6 30 H174" />
          <circle cx="22" cy="19" r="2.2" fill="currentColor" stroke="none" />
          <circle cx="32" cy="19" r="2.2" fill="currentColor" stroke="none" />
          <circle cx="42" cy="19" r="2.2" fill="currentColor" stroke="none" />
          <path d="M22 52 L32 60 L22 68" strokeWidth="1.8" />
          <path d="M40 60 H84" strokeWidth="1.8" />
          <rect className="backdrop-blink" x="90" y="54" width="7" height="12" fill="currentColor" stroke="none" />
          <path d="M22 84 H118" opacity="0.5" />
          <path d="M22 96 H72" opacity="0.5" />
        </Art>

        {/* cloud syncing */}
        <Art className="backdrop-cloud backdrop-float" viewBox="0 0 160 120">
          <path d="M36 84 H124 C142 84 146 60 128 58 C130 36 100 26 88 42 C78 20 44 26 44 50 C22 48 16 84 36 84 Z" fill="var(--body-bg)" />
          <path d="M80 100 V116 M60 98 V108 M100 98 V108" strokeDasharray="2 4" />
          <path d="M72 66 L80 58 L88 66 M80 58 V78" />
        </Art>

        {/* constellation */}
        <Art className="backdrop-stars" viewBox="0 0 200 140" strokeWidth="1.2">
          <path d="M18 108 L58 44 L104 72 L150 18 L184 60" />
          <path d="M58 44 L104 20" opacity="0.6" />
          {[
            [18, 108, 2.6],
            [58, 44, 3],
            [104, 72, 2.4],
            [150, 18, 3.2],
            [184, 60, 2.4],
            [104, 20, 1.8],
          ].map(([cx, cy, r]) => (
            <circle key={`${cx}${cy}`} cx={cx} cy={cy} r={r} fill="currentColor" stroke="none" />
          ))}
          <circle cx="150" cy="18" r="8" className="backdrop-pulse" />
        </Art>

        {/* wave */}
        <Art className="backdrop-wave" viewBox="0 0 260 60" strokeWidth="1.3">
          <path d="M0 30 C20 6 40 6 60 30 C80 54 100 54 120 30 C140 6 160 6 180 30 C200 54 220 54 240 30 C250 18 255 16 260 16" />
          <path d="M0 42 C20 18 40 18 60 42 C80 66 100 66 120 42 C140 18 160 18 180 42 C200 66 220 66 240 42" opacity="0.45" />
        </Art>

        {/* accents */}
        <Spark className="backdrop-spark-b" />
        <Plus className="backdrop-plus-c" />
        <Plus className="backdrop-plus-d" />
        <Dots className="backdrop-dots-b" />
        <Art className="backdrop-accent backdrop-arc-b" viewBox="0 0 80 80">
          <path d="M72 72 A64 64 0 0 0 8 8" strokeDasharray="2 6" />
        </Art>
      </div>
    </div>
  );
}
