"use client";

import { motion } from "motion/react";
import { useRef } from "react";

import { registryConfig } from "@/config/registry";
import { FlipSentences } from "@/registry/flip-sentences";
import { components } from "@/registry/registry-components";

import { CopyButton } from "./copy-button";

const registryItemNames = components
  .map((component) => component.name)
  .sort((a, b) =>
    a.localeCompare(b, "en", {
      sensitivity: "base",
    })
  );

export function RegistryCommandAnimated() {
  const currentItemRef = useRef("");

  return (
    <div className="relative overflow-hidden">
      <pre className="-translate-y-px p-4">
        <code
          data-language="bash"
          className="block font-mono text-sm text-muted-foreground max-sm:leading-6"
        >
          <span>{registryConfig.namespace}/</span>

          <FlipSentences
            className="text-foreground"
            as={motion.span}
            variants={{
              initial: { y: -12, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              exit: { y: 12, opacity: 0 },
            }}
            onIndexChange={(index: number) => {
              currentItemRef.current = registryItemNames[index];
            }}
          >
            {registryItemNames}
          </FlipSentences>
        </code>
      </pre>

      <CopyButton
        className="absolute top-1.5 right-1.5 size-7 rounded-lg [&_svg]:size-3.5"
        getValue={() => {
          return `${registryConfig.namespace}/${currentItemRef.current}`;
        }}
        event="copy_npm_command"
      />
    </div>
  );
}
