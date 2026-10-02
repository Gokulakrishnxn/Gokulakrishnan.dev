"use client";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
  Select,
  Spinner,
  TextArea,
  TextField,
} from "@heroui/react";
import { ArrowUpRight, Check, Mail } from "lucide-react";
import { motion } from "motion/react";
import { useState, useTransition } from "react";
import { sendContact } from "@/app/actions/contact";
import { EASE_OUT, SPRING_PRESS } from "@/lib/ease";
import {
  CONTACT_EMAIL,
  CURRENCIES,
  PROJECT_TYPES,
  TIMELINES,
  type ContactFieldErrors,
  type Currency,
} from "@/lib/contact-options";

const BURST = [
  { type: "heart", x: -58, y: -86, s: 1, r: -18, d: 0, fill: "#ff6b81" },
  { type: "heart", x: 50, y: -98, s: 0.82, r: 16, d: 0.05, fill: "#ff8fa3" },
  { type: "heart", x: -8, y: -118, s: 0.58, r: 8, d: 0.1, fill: "#ff4d6d" },
  { type: "heart", x: 78, y: -48, s: 0.64, r: 22, d: 0.12, fill: "#ffb3c1" },
  { type: "heart", x: -76, y: -36, s: 0.5, r: -24, d: 0.16, fill: "#ff758f" },
  { type: "plane", x: 36, y: -82, s: 1, r: 18, d: 0.06 },
  { type: "mail", x: -46, y: -62, s: 0.92, r: -12, d: 0.08 },
  { type: "spark", x: 14, y: -124, s: 0.9, r: 0, d: 0.14 },
  { type: "spark", x: -68, y: -70, s: 0.7, r: 20, d: 0.18 },
  { type: "star", x: 62, y: -70, s: 0.78, r: 12, d: 0.11 },
  { type: "dot", x: -28, y: -102, s: 1, r: 0, d: 0.2 },
  { type: "dot", x: 28, y: -54, s: 0.8, r: 0, d: 0.22 },
] as const;

function BurstMark({
  type,
  fill,
}: {
  type: (typeof BURST)[number]["type"];
  fill?: string;
}) {
  if (type === "heart") {
    return (
      <svg width="22" height="20" viewBox="0 0 24 22" fill={fill ?? "currentColor"} aria-hidden="true">
        <path d="M12 20.4s-7.2-4.5-9.6-8.4C.4 8.8 1.1 5 4.2 3.7c2.1-.9 4.2.1 5.1 1.8.3.6.6 1.1.7 1.1.1 0 .4-.5.7-1.1.9-1.7 3-2.7 5.1-1.8 3.1 1.3 3.8 5.1 1.8 8.3-2.4 3.9-9.6 8.4-9.6 8.4z" />
      </svg>
    );
  }
  if (type === "plane") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M21.5 2.5 2.8 10.4c-.7.3-.6 1.3.1 1.5l6.6 1.9 1.9 6.6c.2.7 1.2.8 1.5.1L21.5 2.5Z"
          fill="currentColor"
        />
        <path d="M10 13.5 21.5 2.5" stroke="var(--body-bg)" strokeWidth="1.2" />
      </svg>
    );
  }
  if (type === "mail") {
    return (
      <svg width="20" height="16" viewBox="0 0 24 20" fill="none" aria-hidden="true">
        <rect x="1.5" y="2" width="21" height="16" rx="2.4" stroke="currentColor" strokeWidth="1.7" />
        <path d="M3 5.2 12 11l9-5.8" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "star") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 0.8 9.7 6.3 15.2 8 9.7 9.7 8 15.2 6.3 9.7.8 8 6.3 6.3 8 0.8z" />
      </svg>
    );
  }
  if (type === "spark") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
        <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  return <span className="contact-burst-dot" />;
}

function SendBurst({ play }: { play: boolean }) {
  if (!play) return null;

  return (
    <div className="contact-burst" aria-hidden="true">
      {BURST.map((piece, index) => (
        <motion.span
          key={`${piece.type}-${index}`}
          className="contact-burst-piece"
          initial={{ opacity: 0, x: 0, y: 8, scale: 0.35, rotate: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: piece.x,
            y: piece.y,
            scale: [0.35, piece.s, piece.s * 0.92],
            rotate: piece.r,
          }}
          transition={{
            duration: 1.15,
            delay: piece.d,
            ease: EASE_OUT,
          }}
        >
          <BurstMark type={piece.type} fill={"fill" in piece ? piece.fill : undefined} />
        </motion.span>
      ))}
    </div>
  );
}

type Status =
  | { kind: "idle" }
  | { kind: "sent" }
  | { kind: "error"; message: string; mailto?: string };

export function ContactForm() {
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [projectType, setProjectType] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [budget, setBudget] = useState("");
  const [burst, setBurst] = useState(false);

  if (status.kind === "sent") {
    return (
      <div className="contact-ui">
        <motion.div
          className="contact-sent"
          role="status"
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
        >
          <span className="contact-sent-orbit" aria-hidden="true">
            <SendBurst play />
          </span>
          <motion.span
            className="contact-sent-mark"
            aria-hidden="true"
            initial={{ scale: 0.4 }}
            animate={{ scale: [0.4, 1.12, 1] }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
          >
            <Check size={18} strokeWidth={2.4} />
          </motion.span>
          <h2>Sent.</h2>
          <p>
            I’ll write back from {CONTACT_EMAIL}, usually within a couple of
            days.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="contact-ui">
      <Form
        className="contact-form"
        validationErrors={fieldErrors}
        onSubmit={(event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          const payload = {
            name: String(form.get("name") ?? ""),
            email: String(form.get("email") ?? ""),
            company: String(form.get("company") ?? ""),
            projectType: projectType ?? "",
            currency,
            budget,
            timeline: timeline ?? "",
            details: String(form.get("details") ?? ""),
            website: String(form.get("website") ?? ""),
          };

          setStatus({ kind: "idle" });
          setFieldErrors({});
          setBurst(true);
          startTransition(async () => {
            const result = await sendContact(payload);
            if (result.ok) {
              setStatus({ kind: "sent" });
              return;
            }
            setBurst(false);
            if ("fieldErrors" in result) setFieldErrors(result.fieldErrors);
            setStatus({
              kind: "error",
              message: result.error,
              mailto: "mailto" in result ? result.mailto : undefined,
            });
          });
        }}
      >
        <section className="contact-group">
          <h2 className="contact-group-caption">You</h2>
          <div className="contact-group-sheet">
            <div className="contact-cell">
              <TextField name="name" isRequired fullWidth autoComplete="name">
                <Label>Name</Label>
                <Input placeholder="Your name" />
                <FieldError />
              </TextField>
            </div>
            <div className="contact-cell">
              <TextField
                name="email"
                type="email"
                isRequired
                fullWidth
                autoComplete="email"
              >
                <Label>Email</Label>
                <Input placeholder="name@company.com" />
                <FieldError />
              </TextField>
            </div>
            <div className="contact-cell">
              <TextField name="company" fullWidth autoComplete="organization">
                <Label>Company</Label>
                <Input placeholder="Optional" />
              </TextField>
            </div>
          </div>
        </section>

        <section className="contact-group">
          <h2 className="contact-group-caption">Project</h2>
          <div className="contact-group-sheet">
            <div className="contact-cell">
              <Select
                name="projectType"
                isRequired
                fullWidth
                placeholder="Choose"
                selectedKey={projectType}
                onSelectionChange={(key) =>
                  setProjectType(key == null ? null : String(key))
                }
              >
                <Label>Need</Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <FieldError />
                <Select.Popover>
                  <ListBox>
                    {PROJECT_TYPES.map((item) => (
                      <ListBox.Item key={item} id={item} textValue={item}>
                        {item}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>
            <div className="contact-cell">
              <Select
                name="timeline"
                isRequired
                fullWidth
                placeholder="Choose"
                selectedKey={timeline}
                onSelectionChange={(key) =>
                  setTimeline(key == null ? null : String(key))
                }
              >
                <Label>When</Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <FieldError />
                <Select.Popover>
                  <ListBox>
                    {TIMELINES.map((item) => (
                      <ListBox.Item key={item} id={item} textValue={item}>
                        {item}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>
            <div className="contact-cell contact-cell--budget">
              <TextField name="budget" isRequired fullWidth>
                <Label>Budget</Label>
                <div className="contact-budget-row">
                  <div
                    className="contact-currency"
                    role="group"
                    aria-label="Currency"
                  >
                    {CURRENCIES.map((code) => (
                      <button
                        key={code}
                        type="button"
                        className={`contact-currency-btn${currency === code ? " is-active" : ""}`}
                        aria-pressed={currency === code}
                        onClick={() => setCurrency(code)}
                      >
                        {code}
                      </button>
                    ))}
                  </div>
                  <Input
                    inputMode="decimal"
                    placeholder={currency === "INR" ? "6,50,000" : "8,000"}
                    value={budget}
                    onChange={(event) => setBudget(event.target.value)}
                  />
                </div>
                <FieldError />
              </TextField>
            </div>
          </div>
        </section>

        <section className="contact-group">
          <h2 className="contact-group-caption">Note</h2>
          <div className="contact-group-sheet">
            <div className="contact-cell contact-cell--note">
              <TextField name="details" isRequired fullWidth>
                <Label>What are you building?</Label>
                <TextArea
                  rows={5}
                  placeholder="Who it’s for, what exists already, and any links."
                />
                <Description>
                  A short brief is enough. I’ll ask the rest.
                </Description>
                <FieldError />
              </TextField>
            </div>
          </div>
        </section>

        <div className="contact-hp" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {status.kind === "error" ? (
          <div className="contact-alert" role="alert">
            <p>{status.message}</p>
            {status.mailto ? (
              <a className="contact-alert-link" href={status.mailto}>
                <Mail size={14} aria-hidden="true" />
                Open in Mail
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ) : null}
          </div>
        ) : null}

        <div className="contact-actions">
          <motion.div
            className="contact-send-stage"
            whileTap={{ scale: 0.96 }}
            animate={pending ? { scale: [1, 1.03, 1] } : { scale: 1 }}
            transition={
              pending
                ? { duration: 0.9, repeat: Infinity, ease: EASE_OUT }
                : SPRING_PRESS
            }
          >
            <SendBurst play={burst || pending} />
            <Button type="submit" variant="primary" isDisabled={pending}>
              <span className="contact-send-label">
                {pending ? <Spinner size="sm" color="current" /> : null}
                {pending ? "Sending" : "Send"}
              </span>
            </Button>
          </motion.div>
        </div>
      </Form>
    </div>
  );
}
