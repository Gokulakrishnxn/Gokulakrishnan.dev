"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Settings2, X } from "lucide-react";
import { albumShots } from "@/data/album";

export type BookPage = {
  id: string;
  title: string;
  src: string;
};

export type BookSettings = {
  padding: number;
  imageRadius: number;
  creaseOpacity: number;
  paperColor: string;
  shadowIntensity: number;
};

export const PAGES: BookPage[] = albumShots.map((shot, index) => ({
  id: String(index + 1),
  title: shot.caption ?? shot.place ?? `Photo ${index + 1}`,
  src: shot.src,
}));

type BookProps = {
  pages?: BookPage[];
  currentIndex: number;
  direction: number;
  onFlipComplete?: () => void;
  settings: BookSettings;
  isIntro: boolean;
  onPrevPage: () => void;
  onNextPage: () => void;
};

function Book({
  pages = PAGES,
  currentIndex,
  direction,
  onFlipComplete,
  settings,
  isIntro,
  onPrevPage,
  onNextPage,
}: BookProps) {
  const [localIndex, setLocalIndex] = useState(currentIndex);
  const [flipState, setFlipState] = useState({
    active: false,
    from: 0,
    to: 0,
    dir: 1,
  });

  const animDuration = isIntro ? 0.14 : 0.45;
  const animEase = isIntro
    ? "linear"
    : ([0.33, 1, 0.68, 1] as [number, number, number, number]);

  useEffect(() => {
    if (currentIndex !== localIndex) {
      setFlipState({
        active: true,
        from: localIndex,
        to: currentIndex,
        dir: direction,
      });
    }
  }, [currentIndex, localIndex, direction]);

  const handleAnimationComplete = () => {
    setLocalIndex(flipState.to);
    setFlipState({
      active: false,
      from: flipState.to,
      to: flipState.to,
      dir: 1,
    });
    onFlipComplete?.();
  };

  const getIndex = (index: number) =>
    ((index % pages.length) + pages.length) % pages.length;

  const PaperTexture = () => (
    <div
      className="pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply"
      style={{
        backgroundImage:
          'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
      }}
    />
  );

  const PageContent = ({ index }: { index: number }) => (
    <>
      <div
        className="absolute inset-0"
        style={{ backgroundColor: settings.paperColor }}
      />
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ padding: `${settings.padding}px` }}
      >
        <div
          className="h-full w-full bg-cover bg-center bg-no-repeat shadow-inner"
          style={{
            backgroundImage: `url(${pages[getIndex(index)].src})`,
            borderRadius: `${settings.imageRadius}px`,
            boxShadow: `0 4px ${settings.shadowIntensity}px rgba(0,0,0,0.15)`,
          }}
        />
      </div>
      <PaperTexture />
    </>
  );

  const creaseLeft =
    "pointer-events-none absolute inset-y-0 right-0 z-20 w-12 mix-blend-multiply";
  const creaseRight =
    "pointer-events-none absolute inset-y-0 left-0 z-20 w-12 mix-blend-multiply";

  const creaseLeftStyle = {
    background: `linear-gradient(to left, rgba(0,0,0,${settings.creaseOpacity / 100}), rgba(0,0,0,${settings.creaseOpacity / 400}), transparent)`,
    boxShadow: "inset -4px 0 10px rgba(0,0,0,0.1)",
  };
  const creaseRightStyle = {
    background: `linear-gradient(to right, rgba(0,0,0,${settings.creaseOpacity / 100}), rgba(0,0,0,${settings.creaseOpacity / 400}), transparent)`,
    boxShadow: "inset 4px 0 10px rgba(0,0,0,0.1)",
  };

  const leftIndex = flipState.active
    ? flipState.dir === 1
      ? flipState.from - 1
      : flipState.to - 1
    : localIndex - 1;
  const rightIndex = flipState.active
    ? flipState.dir === 1
      ? flipState.to
      : flipState.from
    : localIndex;

  const frontIndex = flipState.dir === 1 ? flipState.from : flipState.to;
  const backIndex =
    flipState.dir === 1 ? flipState.to - 1 : flipState.from - 1;

  return (
    <div className="relative mx-auto aspect-[16/10] w-full select-none [perspective:2400px]">
      <motion.div
        className="relative h-full w-full rounded-md shadow-xl"
        initial={{ rotateX: 12, rotateY: -10, rotateZ: -2, scale: 0.95 }}
        animate={{ rotateX: 6, rotateY: -4, rotateZ: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="group absolute top-0 left-0 h-full w-1/2 cursor-pointer overflow-hidden rounded-l-md border-y border-l border-r border-black/10 shadow-[2px_0_15px_rgba(0,0,0,0.2)]"
          title="Click to turn page back"
          onClick={onPrevPage}
        >
          <PageContent index={leftIndex} />
          <div className={creaseLeft} style={creaseLeftStyle} />
          <div className="absolute inset-0 flex items-center justify-start bg-black/0 pl-3 transition-colors group-hover:bg-black/5">
            <ChevronLeft className="h-5 w-5 text-black/50 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        </div>

        <div
          className="group absolute top-0 right-0 h-full w-1/2 cursor-pointer overflow-hidden rounded-r-md border-y border-r border-l border-black/10 shadow-[-2px_0_15px_rgba(0,0,0,0.2)]"
          title="Click to turn page forward"
          onClick={onNextPage}
        >
          <PageContent index={rightIndex} />
          <div className={creaseRight} style={creaseRightStyle} />
          <div className="absolute inset-0 flex items-center justify-end bg-black/0 pr-3 transition-colors group-hover:bg-black/5">
            <ChevronRight className="h-5 w-5 text-black/50 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        </div>

        {flipState.active && (
          <motion.div
            className="absolute top-0 z-30 h-full w-1/2 origin-left bg-[#fcfbf9]"
            style={{
              left: "50%",
              transformStyle: "preserve-3d",
            }}
            initial={{ rotateY: flipState.dir === 1 ? 0 : -180 }}
            animate={{ rotateY: flipState.dir === 1 ? -180 : 0 }}
            transition={{ duration: animDuration, ease: animEase }}
            onAnimationComplete={handleAnimationComplete}
          >
            <div
              className="absolute inset-0 overflow-hidden rounded-r-md border-y border-r border-l border-black/10"
              style={{ backfaceVisibility: "hidden" }}
            >
              <PageContent index={frontIndex} />
              <div className={creaseRight} style={creaseRightStyle} />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent to-black"
                initial={{ opacity: flipState.dir === 1 ? 0 : 0.4 }}
                animate={{ opacity: flipState.dir === 1 ? 0.4 : 0 }}
                transition={{ duration: animDuration, ease: animEase }}
              />
            </div>

            <div
              className="absolute inset-0 overflow-hidden rounded-l-md border-y border-l border-r border-black/10"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
              }}
            >
              <PageContent index={backIndex} />
              <div className={creaseLeft} style={creaseLeftStyle} />
              <motion.div
                className="absolute inset-0 bg-gradient-to-l from-transparent to-black"
                initial={{ opacity: flipState.dir === 1 ? 0.4 : 0 }}
                animate={{ opacity: flipState.dir === 1 ? 0 : 0.4 }}
                transition={{ duration: animDuration, ease: animEase }}
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export function DitherBook({
  theme = "light",
  compact = false,
  pages = PAGES,
}: {
  theme?: "dark" | "light";
  compact?: boolean;
  pages?: BookPage[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [introFlips, setIntroFlips] = useState(pages.length);
  const isIntro = introFlips > 0;

  useEffect(() => {
    if (introFlips > 0 && !isFlipping) {
      const timer = setTimeout(
        () => {
          setDirection(1);
          setIsFlipping(true);
          setCurrentIndex((i) => (i + 1) % pages.length);
          setIntroFlips((f) => f - 1);
        },
        introFlips === pages.length ? 300 : 70,
      );
      return () => clearTimeout(timer);
    }
  }, [introFlips, isFlipping, pages.length]);

  const [settings, setSettings] = useState<BookSettings>({
    padding: compact ? 6 : 10,
    imageRadius: compact ? 8 : 20,
    creaseOpacity: 11,
    paperColor: "#fcfbf9",
    shadowIntensity: compact ? 10 : 24,
  });

  const next = () => {
    if (!isFlipping) {
      setDirection(1);
      setIsFlipping(true);
      setCurrentIndex((i) => (i + 1) % pages.length);
    }
  };

  const prev = () => {
    if (!isFlipping) {
      setDirection(-1);
      setIsFlipping(true);
      setCurrentIndex((i) => (i - 1 + pages.length) % pages.length);
    }
  };

  const handleFlipComplete = () => {
    setIsFlipping(false);
  };

  const controlClass =
    theme === "dark"
      ? "bg-white/10 text-white hover:bg-white/20"
      : "bg-neutral-200 text-black hover:bg-neutral-300";

  return (
    <div className="relative flex w-full flex-col items-center justify-center p-1 font-sans sm:p-2">
      <Book
        pages={pages}
        currentIndex={currentIndex}
        direction={direction}
        onFlipComplete={handleFlipComplete}
        settings={settings}
        isIntro={isIntro}
        onPrevPage={prev}
        onNextPage={next}
      />

      <div className="mt-3 flex w-full items-center justify-between px-1">
        <button
          type="button"
          onClick={prev}
          disabled={isFlipping}
          className={`flex cursor-pointer items-center gap-1 rounded-full px-3 py-1 text-[11px] font-medium transition-all ${controlClass}`}
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          <span>Prev</span>
        </button>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className={`cursor-pointer rounded-full p-1.5 transition-all ${controlClass}`}
            title="Book Settings"
          >
            <Settings2 className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={next}
            disabled={isFlipping}
            className={`flex cursor-pointer items-center gap-1 rounded-full px-3 py-1 text-[11px] font-medium transition-all ${controlClass}`}
          >
            <span>Next</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`mt-3 w-full max-w-sm rounded-xl border p-4 shadow-xl ${
              theme === "dark"
                ? "border-white/15 bg-[#1e1e1e] text-white"
                : "border-neutral-200 bg-white text-black"
            }`}
          >
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-[11px] font-bold tracking-wider text-neutral-400 uppercase">
                Book Controls
              </h4>
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="text-neutral-400 hover:text-current"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="space-y-3 text-[11px]">
              <div className="space-y-1">
                <div className="flex justify-between font-medium">
                  <span>Image Padding</span>
                  <span>{settings.padding}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={settings.padding}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      padding: parseInt(e.target.value, 10),
                    })
                  }
                  className="w-full cursor-pointer accent-neutral-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-medium">
                  <span>Image Radius</span>
                  <span>{settings.imageRadius}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={settings.imageRadius}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      imageRadius: parseInt(e.target.value, 10),
                    })
                  }
                  className="w-full cursor-pointer accent-neutral-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-medium">
                  <span>Crease Opacity</span>
                  <span>{settings.creaseOpacity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={settings.creaseOpacity}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      creaseOpacity: parseInt(e.target.value, 10),
                    })
                  }
                  className="w-full cursor-pointer accent-neutral-800"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
