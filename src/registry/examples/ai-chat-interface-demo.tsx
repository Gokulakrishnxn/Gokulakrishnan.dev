"use client";

import { useState } from "react";

import { AIChatInterface, type Message } from "@/registry/ai-chat-interface";

export default function AIChatInterfaceDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm an AI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = async (message: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: `You said: "${message}". This is a demo response!`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
  };

  return (
    <div className="h-[500px] rounded-lg border border-edge">
      <AIChatInterface
        messages={messages}
        onSendMessage={handleSendMessage}
        placeholder="Type your message..."
      />
    </div>
  );
}
