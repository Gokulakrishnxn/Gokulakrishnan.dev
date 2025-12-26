"use client";

import { Figma, Github, Vercel } from "@lobehub/icons";
import Image from "next/image";
import type { ComponentType } from "react";
import { useState } from "react";
import StackIcon from "tech-stack-icons";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { TECH_STACK } from "../data/tech-stack";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

// Mapping tech stack keys to tech-stack-icons names
const techStackIconMap: Record<string, string> = {
  typescript: "typescript",
  js: "javascript",
  javascript: "javascript",
  python: "python",
  r: "r",
  nodejs: "nodejs",
  react: "react",
  nextjs2: "nextjs",
  tailwindcss: "tailwindcss",
  "shadcn-ui": "shadcn",
  radixui: "radix",
  "react-router": "reactrouter",
  git: "git",
  docker: "docker",
  mysql: "mysql",
  mongodb: "mongodb",
  supabase: "supabase",
  tensorflow: "tensorflow",
  pytorch: "pytorch",
  "scikit-learn": "scikitlearn",
  numpy: "numpy",
  pandas: "pandas",
  gcp: "gcp",
  vercel: "vercel",
  redis: "redis",
  figma: "figma",
  ps: "photoshop",
  chatgpt: "openai",
  gemini: "gemini",
  claude: "anthropic",
  overleaf: "overleaf",
  cursor: "cursor",
  // google-antigravity: not available in tech-stack-icons, will use fallback
};

// Mapping tech stack keys to LobeHub icon components (only for available icons)
const lobeHubIconMap: Record<string, ComponentType<{ size?: number }>> = {
  vercel: Vercel,
  figma: Figma,
  // Add more LobeHub icons as they become available
};

function TechIcon({ tech }: { tech: (typeof TECH_STACK)[number] }) {
  const [imageError, setImageError] = useState(false);
  const [useLocal, setUseLocal] = useState(true);

  // Try tech-stack-icons first
  const techStackIconName = techStackIconMap[tech.key];

  // Try LobeHub icon as secondary option
  const LobeHubIcon = lobeHubIconMap[tech.key];

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

  // Use tech-stack-icons if available
  if (techStackIconName) {
    return (
      <>
        {tech.theme ? (
          <>
            <div className="flex hidden size-8 items-center justify-center [html.light_&]:flex">
              <StackIcon
                name={techStackIconName}
                variant="light"
                style={{ width: 32, height: 32 }}
              />
            </div>
            <div className="flex hidden size-8 items-center justify-center [html.dark_&]:flex">
              <StackIcon
                name={techStackIconName}
                variant="dark"
                style={{ width: 32, height: 32 }}
              />
            </div>
          </>
        ) : (
          <div className="flex size-8 items-center justify-center">
            <StackIcon
              name={techStackIconName}
              variant="light"
              style={{ width: 32, height: 32 }}
            />
          </div>
        )}
      </>
    );
  }

  // Use LobeHub icon if available
  if (LobeHubIcon) {
    return (
      <div className="flex size-8 items-center justify-center">
        <LobeHubIcon size={32} />
      </div>
    );
  }

  // Fallback to image-based icons
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
        <ul className="flex flex-wrap gap-3 select-none sm:gap-4">
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
