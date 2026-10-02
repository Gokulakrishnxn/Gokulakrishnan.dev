"use client";

import { send } from "@/app/actions/send";
import { ArrowUp } from "lucide-react";
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

const SUGGESTIONS = [
  "What does Gokul build?",
  "Tell me about Quarix",
  "What's his tech stack?",
  "How can I reach him?",
];

export function PeterChat({ onClose }: { onClose?: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const [cycleState, setCycleState] = useState<OrbState>(THINKING_CYCLE[0]);
  const scroller = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const orbState: OrbState = thinking ? cycleState : "listening";

  useEffect(() => {
    const node = scroller.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages, thinking]);

  useEffect(() => {
    if (!thinking) return;
    let index = 0;
    const timer = window.setInterval(() => {
      index = (index + 1) % THINKING_CYCLE.length;
      setCycleState(THINKING_CYCLE[index]);
    }, 850);
    return () => window.clearInterval(timer);
  }, [thinking]);

  useEffect(() => {
    if (!thinking) input.current?.focus();
  }, [thinking]);

  async function ask(text: string) {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;

    setDraft("");
    const history = messages.slice(-10).map((item) => ({
      role: item.role === "you" ? "user" : "assistant",
      text: item.text,
    }));
    setMessages((current) => [
      ...current,
      { id: `you-${Date.now()}`, role: "you", text: trimmed },
    ]);
    setCycleState(THINKING_CYCLE[0]);
    setThinking(true);

    try {
      const data = await send(trimmed, history);
      const reply = data.text ?? "I blanked for a second. Ask me again?";
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

  const empty = messages.length === 0 && !thinking;

  return (
    <section
      className="peter"
      role="dialog"
      aria-modal="true"
      aria-label="Peter, Gokulakrishnan’s personal AI assistant"
    >
      <form
        className="peter-composer"
        onSubmit={(event) => {
          event.preventDefault();
          void ask(draft);
        }}
      >
        <span className="peter-orb">
          <ThinkingOrb
            state={orbState}
            size={64}
            theme="auto"
            aria-label={thinking ? `Peter is ${orbState}` : "Peter is listening"}
          />
        </span>
        <label className="sr-only" htmlFor="peter-input">
          Message Peter
        </label>
        <input
          ref={input}
          id="peter-input"
          className="peter-input"
          value={draft}
          maxLength={500}
          disabled={thinking}
          placeholder={thinking ? `${orbState}…` : "Ask Peter anything…"}
          autoComplete="off"
          autoFocus
          onChange={(event) => setDraft(event.target.value)}
        />
        <button
          className="peter-send"
          type="submit"
          aria-label="Send"
          disabled={thinking || !draft.trim()}
        >
          <ArrowUp size={16} strokeWidth={2.25} aria-hidden="true" />
        </button>
      </form>

      {empty ? (
        <div className="peter-suggest">
          <p className="peter-suggest-title">Try asking</p>
          <div className="peter-chips">
            {SUGGESTIONS.map((text) => (
              <button
                key={text}
                type="button"
                className="peter-chip"
                onClick={() => void ask(text)}
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      ) : (
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
      )}

      <footer className="peter-foot">
        <span>Peter · Gokulakrishnan’s AI assistant</span>
        {onClose ? (
          <button type="button" className="peter-close" onClick={onClose}>
            <kbd>esc</kbd> to close
          </button>
        ) : null}
      </footer>
    </section>
  );
}
