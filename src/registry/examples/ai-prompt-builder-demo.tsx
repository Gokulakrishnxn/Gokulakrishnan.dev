"use client";

import { AIPromptBuilder } from "@/registry/ai-prompt-builder";

export default function AIPromptBuilderDemo() {
  return (
    <div className="max-w-2xl">
      <AIPromptBuilder
        template="You are a helpful assistant. User question: {{question}}. Context: {{context}}"
        variables={[
          { name: "question", value: "What is React?" },
          { name: "context", value: "Web development framework" },
        ]}
        onCopy={(prompt) => {
          console.log("Copied prompt:", prompt);
        }}
      />
    </div>
  );
}

