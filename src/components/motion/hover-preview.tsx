"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import {
  cloneElement,
  isValidElement,
  type PointerEvent,
  type ReactElement,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { EASE_OUT } from "@/lib/ease";
import { useHoverGesture } from "@/lib/hooks/use-hover-gesture";
import { writingItems, type WritingItem } from "@/data/writing";

const PEEK_WIDTH = 216;
const PEEK_HEIGHT = 196;
const OFFSET = 18;
const PAD = 12;

let lastHiddenAt = 0;
const WARM_WINDOW_MS = 280;

function placePoint(clientX: number, clientY: number) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  let left = clientX + OFFSET;
  let top = clientY + OFFSET;

  if (left + PEEK_WIDTH > vw - PAD) left = clientX - PEEK_WIDTH - 12;
  if (top + PEEK_HEIGHT > vh - PAD) top = clientY - PEEK_HEIGHT - 12;

  return {
    left: Math.max(PAD, Math.min(left, vw - PEEK_WIDTH - PAD)),
    top: Math.max(PAD, Math.min(top, vh - PEEK_HEIGHT - PAD)),
  };
}

function PeekShell({ children }: { children: ReactNode }) {
  return (
    <div className="hover-peek" aria-hidden="true">
      {children}
    </div>
  );
}

export function ResumePeek() {
  return (
    <PeekShell>
      <div className="hover-peek-media hover-peek-media--site hover-peek-media--resume">
        <img src="/resume-preview.png" alt="" />
      </div>
      <div className="hover-peek-body">
        <p className="hover-peek-kicker">Resume</p>
        <p className="hover-peek-title">Gokulakrishnan</p>
        <p className="hover-peek-copy">AI Engineer · View or download PDF</p>
      </div>
    </PeekShell>
  );
}

export function QuarixPeek() {
  return (
    <PeekShell>
      <div className="hover-peek-media hover-peek-media--site">
        <img src="/quarix-preview.png" alt="" />
      </div>
      <div className="hover-peek-body">
        <p className="hover-peek-kicker">quarix.one</p>
        <p className="hover-peek-title">Quarix</p>
        <p className="hover-peek-copy">
          We design and build digital products for businesses and founders.
        </p>
      </div>
    </PeekShell>
  );
}

export function XPeek() {
  return (
    <PeekShell>
      <div className="hover-peek-media hover-peek-media--site hover-peek-media--x">
        <img src="/x-preview.png" alt="" />
      </div>
      <div className="hover-peek-body">
        <p className="hover-peek-kicker">X</p>
        <p className="hover-peek-title">@Gokulakrishnxn</p>
        <p className="hover-peek-copy">
          AI Engineer · AI Enthusiast · Full stack Developer
        </p>
      </div>
    </PeekShell>
  );
}

export function PostPeek({ item }: { item: WritingItem }) {
  const src = item.preview ?? item.icon;
  const contain =
    item.previewFit === "contain" || src === "/web.png" || src === "/aria-logo.svg";

  return (
    <PeekShell>
      {src ? (
        <div
          className={`hover-peek-media${contain ? " hover-peek-media--plain" : ""}`}
        >
          <img
            src={src}
            alt=""
            className={contain ? "hover-peek-media-contain" : undefined}
          />
        </div>
      ) : null}
      <div className="hover-peek-body">
        <p className="hover-peek-kicker">
          {item.href.includes("finlio") ? "finlio.app" : "ARIA"}
        </p>
        <p className="hover-peek-title">{item.title}</p>
        <p className="hover-peek-copy">{item.excerpt}</p>
      </div>
    </PeekShell>
  );
}

export type PeekKind = "resume" | "quarix" | "finlio" | "aria" | "x";

function peekFor(kind: PeekKind) {
  if (kind === "resume") return <ResumePeek />;
  if (kind === "quarix") return <QuarixPeek />;
  if (kind === "x") return <XPeek />;
  if (kind === "finlio") {
    const item = writingItems.find((entry) => entry.href.includes("finlio"));
    return item ? <PostPeek item={item} /> : null;
  }
  const item = writingItems.find((entry) => entry.href.includes("aria"));
  return item ? <PostPeek item={item} /> : null;
}

export function PeekLink({
  kind,
  href,
  className = "basic-link",
  children,
}: {
  kind: PeekKind;
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const external = href.startsWith("http");

  return (
    <HoverPreview content={peekFor(kind)}>
      <a
        className={className}
        href={href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : undefined)}
      >
        {children}
      </a>
    </HoverPreview>
  );
}

export function HoverPreview({
  children,
  content,
  delay = 160,
}: {
  children: ReactElement;
  content: ReactNode;
  delay?: number;
}) {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const id = useId();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hover = useHoverGesture();
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    setReady(true);
  }, []);

  const moveTo = useCallback(
    (clientX: number, clientY: number) => {
      const next = placePoint(clientX, clientY);
      x.set(next.left);
      y.set(next.top);
    },
    [x, y],
  );

  const show = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    const warm = Date.now() - lastHiddenAt < WARM_WINDOW_MS;
    const wait = warm ? 0 : delay;
    timer.current = setTimeout(() => {
      setOpen(true);
    }, wait);
  }, [delay]);

  const hide = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    if (open) lastHiddenAt = Date.now();
    setOpen(false);
  }, [open]);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  if (!isValidElement(children)) return children;

  const child = children as ReactElement<Record<string, unknown>>;
  const trigger = cloneElement(child, {
    "aria-describedby": open ? id : undefined,
    onPointerEnter: (event: PointerEvent) => {
      const prev = child.props.onPointerEnter;
      if (typeof prev === "function") prev(event);
      if (hover.enter(event)) {
        moveTo(event.clientX, event.clientY);
        show();
      }
    },
    onPointerMove: (event: PointerEvent) => {
      const prev = child.props.onPointerMove;
      if (typeof prev === "function") prev(event);
      if (event.pointerType === "touch") return;
      moveTo(event.clientX, event.clientY);
    },
    onPointerLeave: (event: PointerEvent) => {
      const prev = child.props.onPointerLeave;
      if (typeof prev === "function") prev(event);
      if (hover.leave(event)) hide();
    },
  });

  return (
    <>
      {trigger}
      {ready
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <motion.div
                  id={id}
                  role="tooltip"
                  className="hover-peek-float"
                  initial={
                    reduce
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.92, filter: "blur(8px)" }
                  }
                  animate={
                    reduce
                      ? { opacity: 1 }
                      : { opacity: 1, scale: 1, filter: "blur(0px)" }
                  }
                  exit={
                    reduce
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          scale: 0.96,
                          filter: "blur(4px)",
                          transition: { duration: 0.12, ease: EASE_OUT },
                        }
                  }
                  transition={
                    reduce
                      ? { duration: 0.12, ease: EASE_OUT }
                      : {
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                          mass: 0.7,
                          opacity: { duration: 0.14, ease: EASE_OUT },
                          filter: { duration: 0.16, ease: EASE_OUT },
                        }
                  }
                  style={{ x, y }}
                >
                  {content}
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
