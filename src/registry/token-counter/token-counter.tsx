"use client";

import { CopyIcon, FileTextIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface TokenCounterProps {
    defaultText?: string;
    onCopy?: (text: string, tokenCount: number) => void;
    className?: string;
}

// Simple token estimation (approximate)
// For more accurate counting, you'd use tiktoken or similar libraries
function estimateTokens(text: string): number {
    // Rough estimation: ~4 characters per token for English text
    // This is a simplified version - for production, use a proper tokenizer
    const words = text.trim().split(/\s+/).filter((word) => word.length > 0);
    const characters = text.length;

    // Average of word-based and character-based estimation
    const wordEstimate = words.length * 1.3; // Average 1.3 tokens per word
    const charEstimate = characters / 4; // ~4 chars per token

    return Math.round((wordEstimate + charEstimate) / 2);
}

export function TokenCounter({
    defaultText = "",
    onCopy,
    className,
}: TokenCounterProps) {
    const [text, setText] = useState(defaultText);
    const [copied, setCopied] = useState(false);

    const tokenCount = estimateTokens(text);
    const characterCount = text.length;
    const wordCount = text.trim().split(/\s+/).filter((word) => word.length > 0).length;

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        if (onCopy) {
            onCopy(text, tokenCount);
        }
    };

    return (
        <div className={cn("space-y-4", className)}>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FileTextIcon className="size-4 text-muted-foreground" />
                        <label className="text-sm font-medium">Text Input</label>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopy}
                        className="h-7 gap-1.5"
                    >
                        <CopyIcon className="size-3" />
                        {copied ? "Copied!" : "Copy"}
                    </Button>
                </div>
                <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text to count tokens..."
                    className="min-h-32 font-mono text-sm"
                />
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg border border-edge bg-muted p-4">
                    <div className="text-xs text-muted-foreground mb-1">Tokens</div>
                    <div className="text-2xl font-semibold tabular-nums">
                        {tokenCount.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                        Estimated
                    </div>
                </div>

                <div className="rounded-lg border border-edge bg-muted p-4">
                    <div className="text-xs text-muted-foreground mb-1">Characters</div>
                    <div className="text-2xl font-semibold tabular-nums">
                        {characterCount.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                        Including spaces
                    </div>
                </div>

                <div className="rounded-lg border border-edge bg-muted p-4">
                    <div className="text-xs text-muted-foreground mb-1">Words</div>
                    <div className="text-2xl font-semibold tabular-nums">
                        {wordCount.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                        Word count
                    </div>
                </div>
            </div>

            <div className="rounded-lg border border-edge bg-muted/50 p-3">
                <p className="text-xs text-muted-foreground">
                    <strong>Note:</strong> Token count is an estimation. For accurate token counting with specific models (GPT-4, Claude, etc.), use dedicated tokenizer libraries like <code className="rounded bg-muted px-1 py-0.5">tiktoken</code> or <code className="rounded bg-muted px-1 py-0.5">@anthropic-ai/tokenizer</code>.
                </p>
            </div>
        </div>
    );
}

