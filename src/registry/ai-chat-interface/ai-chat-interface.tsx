"use client";

import { SendIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIChatInterfaceProps {
  onSendMessage?: (message: string) => void | Promise<void>;
  messages?: Message[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function AIChatInterface({
  onSendMessage,
  messages: externalMessages,
  placeholder = "Type your message...",
  className,
  disabled = false,
}: AIChatInterfaceProps) {
  const [input, setInput] = useState("");
  const [internalMessages, setInternalMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const messages = externalMessages ?? internalMessages;

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading || disabled) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmedInput,
      timestamp: new Date(),
    };

    if (!externalMessages) {
      setInternalMessages((prev) => [...prev, userMessage]);
    }

    setInput("");
    setIsLoading(true);

    try {
      if (onSendMessage) {
        await onSendMessage(trimmedInput);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            Start a conversation...
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-lg px-4 py-2 text-sm",
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              )}
            >
              <p className="whitespace-pre-wrap break-words">
                {message.content}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-lg bg-muted px-4 py-2 text-sm">
              <div className="flex gap-1">
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-edge p-4">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="min-h-12 resize-none"
            disabled={isLoading || disabled}
            rows={1}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading || disabled}
            size="icon"
            className="shrink-0"
          >
            <SendIcon className="size-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

