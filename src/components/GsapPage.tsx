"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap-client";

export function GsapPage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const node = root.current;
      if (!node) return;

      const q = (selector: string) =>
        gsap.utils.toArray<HTMLElement>(selector, node);

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = q(
          ".article > *, .resume-sheet-header, .writing-nav a, .writing-hero",
        );
        gsap.from(intro, {
          autoAlpha: 0,
          y: 12,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.045,
          overwrite: "auto",
        });

        q(".github-activity, .post-list > h3, .writing-media").forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 18,
            duration: 0.95,
            ease: "power2.out",
            overwrite: "auto",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              once: true,
              invalidateOnRefresh: true,
            },
          });
        });

        const listItems = q(".post-item, .project-folder");
        if (listItems.length) {
          gsap.from(listItems, {
            autoAlpha: 0,
            y: 10,
            duration: 0.75,
            ease: "power2.out",
            stagger: 0.045,
            overwrite: "auto",
            scrollTrigger: {
              trigger: listItems[0],
              start: "top 92%",
              once: true,
              invalidateOnRefresh: true,
            },
          });
        }

        q(".resume-section").forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 16,
            duration: 0.85,
            ease: "power2.out",
            overwrite: "auto",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              once: true,
              invalidateOnRefresh: true,
            },
          });
        });

        const footer = node.querySelector<HTMLElement>(".site-footer");
        if (footer) {
          gsap.from(footer, {
            autoAlpha: 0,
            y: 10,
            duration: 0.85,
            ease: "power2.out",
            overwrite: "auto",
            scrollTrigger: {
              trigger: footer,
              start: "top 96%",
              once: true,
              invalidateOnRefresh: true,
            },
          });

          const rule = footer.querySelector(".rule");
          if (rule) {
            gsap.from(rule, {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 1.05,
              ease: "power2.out",
              overwrite: "auto",
              scrollTrigger: {
                trigger: footer,
                start: "top 96%",
                once: true,
                invalidateOnRefresh: true,
              },
            });
          }
        }
      });

      mm.add(
        "(min-width: 720px) and (prefers-reduced-motion: no-preference)",
        () => {
          const name = node.querySelector<HTMLElement>(".gsap-name");
          if (!name) return;
          const split = SplitText.create(name, {
            type: "chars",
            charsClass: "gsap-char",
          });
          gsap.from(split.chars, {
            yPercent: 108,
            autoAlpha: 0,
            duration: 0.85,
            ease: "power2.out",
            stagger: 0.022,
            overwrite: "auto",
          });
        },
      );

      let timer = 0;
      const refresh = () => {
        window.clearTimeout(timer);
        timer = window.setTimeout(() => ScrollTrigger.refresh(), 140);
      };
      window.addEventListener("resize", refresh);
      window.addEventListener("orientationchange", refresh);

      return () => {
        window.clearTimeout(timer);
        window.removeEventListener("resize", refresh);
        window.removeEventListener("orientationchange", refresh);
        mm.revert();
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
