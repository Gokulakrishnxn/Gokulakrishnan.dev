"use client";

import { motion, useReducedMotion } from "motion/react";
import { writingItems } from "@/data/writing";
import { fadeUp } from "@/components/motion/reveal";
import { HoverPreview, PostPeek } from "@/components/motion/hover-preview";
import { AriaAppIcon } from "./AriaAppIcon";
import { LiveDot } from "./LiveDot";
import { NewBadge } from "./NewBadge";
import { EASE_OUT } from "@/lib/ease";

export function BlogIndex() {
  const reduce = useReducedMotion();

  return (
    <motion.section
      className="blog-list"
      aria-label="Blog posts"
      initial={reduce ? false : "hidden"}
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.1, delayChildren: 0.08 },
        },
      }}
    >
      {writingItems.map((item) => {
        const card = (
          <a
            className="blog-card"
            href={item.href}
            {...(item.href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : undefined)}
          >
            <div className="blog-card-kicker">
              {item.title === "ARIA" ? (
                <AriaAppIcon className="aria-app-icon--inline" />
              ) : item.icon ? (
                <img
                  src={item.icon}
                  alt=""
                  width={18}
                  height={18}
                  className={`app-icon app-icon--inline${item.icon === "/web.png" ? " app-icon--web" : ""}`}
                />
              ) : null}
              <h2>
                {item.title}
                {item.isLive ? <LiveDot /> : null}
                {item.isNew ? <NewBadge /> : null}
              </h2>
            </div>
            <p>{item.excerpt}</p>
            <time dateTime={item.datetime}>{item.published}</time>
          </a>
        );
        const peek =
          item.href === "/writing/finlio" || item.href === "/writing/aria" ? (
            <PostPeek item={item} />
          ) : null;

        return (
          <motion.div
            key={item.href}
            variants={reduce ? undefined : fadeUp}
            whileHover={reduce ? undefined : { y: -3 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          >
            {peek ? <HoverPreview content={peek}>{card}</HoverPreview> : card}
          </motion.div>
        );
      })}
    </motion.section>
  );
}
