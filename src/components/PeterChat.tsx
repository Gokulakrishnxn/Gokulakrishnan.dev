"use client";

import { send } from "@/app/actions/send";
import { useEffect, useRef, useState } from "react";
import { ThinkingOrb, type OrbState } from "thinking-orbs";
import { PeterStatus } from "@/components/PeterStatus";

type ChatMessage = {
  id: string;
  role: "peter" | "you";
  text: string;
};

const THINKING_CYCLE: OrbState[] = [
  "searching",
  "solving",
  "composing",
  "weaving",
];

export function PeterChat({
  variant = "page",
  onClose,
}: {
  variant?: "page" | "widget";
  onClose?: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const [orbState, setOrbState] = useState<OrbState>("listening");
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = scroller.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages, thinking]);

  useEffect(() => {
    if (!thinking) {
      setOrbState("listening");
      return;
    }

    let index = 0;
    setOrbState(THINKING_CYCLE[0]);
    const timer = window.setInterval(() => {
      index = (index + 1) % THINKING_CYCLE.length;
      setOrbState(THINKING_CYCLE[index]);
    }, 850);

    return () => window.clearInterval(timer);
  }, [thinking]);

  async function ask(text: string) {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;

    setDraft("");
    const history = messages.slice(-10)
      .map((item) => ({
        role: item.role === "you" ? "user" : "assistant",
        text: item.text,
      }));
    setMessages((current) => [
      ...current,
      { id: `you-${Date.now()}`, role: "you", text: trimmed },
    ]);
    setThinking(true);

    try {
      const data = await send(trimmed, history);
      const reply = data.text ?? "I blanked for a second. Ask me again?";
      if (data.state) setOrbState(data.state);
      await new Promise((resolve) => window.setTimeout(resolve, 700));
      setMessages((current) => [
        ...current,
        { id: `peter-${Date.now()}`, role: "peter", text: reply },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: `peter-${Date.now()}`,
          role: "peter",
          text: "Couldn’t reach myself just then. Try me again in a sec.",
        },
      ]);
    } finally {
      setThinking(false);
    }
  }

  return (
    <section
      className={`peter${variant === "widget" ? " peter--widget" : ""}`}
      aria-label="Peter, Gokulakrishnan’s personal AI assistant"
    >
      <header className="peter-head">
        <ThinkingOrb
          state={thinking ? orbState : "listening"}
          size={64}
          theme="auto"
          aria-label={thinking ? `Peter is ${orbState}` : "Peter is listening"}
        />
        <div className="peter-identity">
          <h2>Peter</h2>
          <p>{thinking ? `${orbState}…` : "Personal AI assistant"}</p>
        </div>
        {onClose ? (
          <button
            type="button"
            className="peter-close"
            aria-label="Close Peter"
            onClick={onClose}
          >
            ×
          </button>
        ) : null}
      </header>

      <div className="peter-log" ref={scroller} role="log" aria-live="polite">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`peter-bubble peter-bubble--${message.role}`}
          >
            <p>{message.text}</p>
          </div>
        ))}
        {thinking ? (
          <div className="peter-thinking">
            <PeterStatus state={orbState} />
          </div>
        ) : null}
      </div>

      <form
        className="peter-composer"
        onSubmit={(event) => {
          event.preventDefault();
          void ask(draft);
        }}
      >
        <label className="sr-only" htmlFor="peter-input">
          Message Peter
        </label>
        <input
          id="peter-input"
          className="peter-input"
          value={draft}
          maxLength={500}
          disabled={thinking}
          placeholder="Ask away…"
          autoComplete="off"
          onChange={(event) => setDraft(event.target.value)}
        />
        <button
          className="peter-send"
          type="submit"
          disabled={thinking || !draft.trim()}
        >
          Send
        </button>
      </form>
    </section>
  );
}
