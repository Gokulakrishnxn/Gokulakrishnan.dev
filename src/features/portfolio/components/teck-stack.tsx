"use client";

import Image from "next/image";
import { useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { TECH_STACK } from "../data/tech-stack";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

function TechIcon({ tech }: { tech: (typeof TECH_STACK)[number] }) {
  const [imageError, setImageError] = useState(false);
  const [useLocal, setUseLocal] = useState(true);

  const getIconSrc = (suffix = "") => {
    if (useLocal) {
      return `/tech-stack-icons/${tech.key}${suffix}.svg`;
    }
    return `https://assets.chanhdai.com/images/tech-stack-icons/${tech.key}${suffix}.svg`;
  };

  const handleError = () => {
    if (useLocal) {
      setUseLocal(false);
      setImageError(false);
    } else {
      setImageError(true);
    }
  };

  if (imageError) {
    return (
      <div className="flex size-8 items-center justify-center rounded border border-muted-foreground/20 bg-muted text-xs font-medium text-muted-foreground">
        {tech.title.charAt(0).toUpperCase()}
      </div>
    );
  }

  if (tech.theme) {
    return (
      <>
        <Image
          src={getIconSrc("-light")}
          alt={`${tech.title} light icon`}
          width={32}
          height={32}
          className="hidden [html.light_&]:block"
          unoptimized
          onError={handleError}
        />
        <Image
          src={getIconSrc("-dark")}
          alt={`${tech.title} dark icon`}
          width={32}
          height={32}
          className="hidden [html.dark_&]:block"
          unoptimized
          onError={handleError}
        />
      </>
    );
  }

  return (
    <Image
      src={getIconSrc()}
      alt={`${tech.title} icon`}
      width={32}
      height={32}
      unoptimized
      onError={handleError}
    />
  );
}

export function TeckStack() {
  return (
    <Panel id="stack">
      <PanelHeader>
        <PanelTitle>Stack</PanelTitle>
      </PanelHeader>

      <PanelContent
        className={cn(
          "[--pattern-foreground:var(--color-zinc-950)]/5 dark:[--pattern-foreground:var(--color-white)]/5",
          "bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center",
          "bg-zinc-950/0.75 dark:bg-white/0.75"
        )}
      >
        <ul className="flex flex-wrap gap-4 select-none">
          {TECH_STACK.map((tech) => {
            return (
              <li key={tech.key} className="flex">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={tech.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={tech.title}
                    >
                      <TechIcon tech={tech} />
                      <span className="sr-only">{tech.title}</span>
                    </a>
                  </TooltipTrigger>

                  <TooltipContent>
                    <p>{tech.title}</p>
                  </TooltipContent>
                </Tooltip>
              </li>
            );
          })}
        </ul>
      </PanelContent>
    </Panel>
  );
}
