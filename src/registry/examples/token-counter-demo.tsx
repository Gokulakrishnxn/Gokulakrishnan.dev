"use client";

import { TokenCounter } from "@/registry/token-counter";

export default function TokenCounterDemo() {
  return (
    <div className="max-w-2xl">
      <TokenCounter
        defaultText="This is a sample text to demonstrate the token counter. It counts tokens, characters, and words in real-time as you type. Perfect for AI developers working with LLMs!"
        onCopy={(text, tokenCount) => {
          console.log(`Copied text with ${tokenCount} tokens`);
        }}
      />
    </div>
  );
}

