"use server";

import { headers } from "next/headers";
import {
  CONTACT_EMAIL as TO,
  CURRENCIES,
  PROJECT_TYPES,
  TIMELINES,
  type ContactFieldErrors,
  type ContactInput,
  type ContactResult,
} from "@/lib/contact-options";

const WINDOW_MS = 10 * 60_000;
const MAX_REQUESTS = 20;
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validate(raw: ContactInput) {
  const data = {
    name: clean(raw.name, 120),
    email: clean(raw.email, 200),
    company: clean(raw.company, 200),
    projectType: clean(raw.projectType, 60),
    currency: clean(raw.currency, 8).toUpperCase(),
    budget: clean(raw.budget, 80),
    timeline: clean(raw.timeline, 40),
    details: clean(raw.details, 4000),
    website: clean(raw.website, 200),
  };

  const fieldErrors: ContactFieldErrors = {};
  if (data.name.length < 2) fieldErrors.name = "Please tell me your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    fieldErrors.email = "That email doesn’t look right.";
  }
  if (!(PROJECT_TYPES as readonly string[]).includes(data.projectType)) {
    fieldErrors.projectType = "Pick what you need.";
  }
  if (!(CURRENCIES as readonly string[]).includes(data.currency)) {
    fieldErrors.currency = "Choose USD or INR.";
  }
  if (data.budget.length < 1) {
    fieldErrors.budget = "Add a budget, even a rough one.";
  }
  if (!(TIMELINES as readonly string[]).includes(data.timeline)) {
    fieldErrors.timeline = "Pick a timeline.";
  }
  if (data.details.length < 20) {
    fieldErrors.details = "A few sentences helps — what is it, who is it for, what exists already?";
  }

  return { data, fieldErrors };
}

function buildMessage(data: ReturnType<typeof validate>["data"]) {
  const subject = `Freelance inquiry — ${data.projectType} from ${data.name}`;
  const body = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Company / site: ${data.company}` : null,
    `Project: ${data.projectType}`,
    `Budget: ${data.currency} ${data.budget}`,
    `Timeline: ${data.timeline}`,
    "",
    data.details,
  ]
    .filter((line) => line !== null)
    .join("\n");
  return { subject, body };
}

async function sendWithResend(subject: string, body: string, replyTo: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;

  const from = process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      from,
      to: [TO.toLowerCase()],
      reply_to: replyTo,
      subject,
      text: body,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend ${response.status} ${detail}`);
  }
  return true;
}

export async function sendContact(raw: ContactInput): Promise<ContactResult> {
  const { data, fieldErrors } = validate(raw);

  // Bots fill every field; humans never see this one.
  if (data.website) return { ok: true };

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, error: "Please check the highlighted fields.", fieldErrors };
  }

  const requestHeaders = await headers();
  const forwarded = requestHeaders.get("x-forwarded-for");
  const key =
    forwarded?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "anon";
  if (rateLimited(key)) {
    return { ok: false, error: "That’s a few messages in a row. Try again in a bit." };
  }

  const { subject, body } = buildMessage(data);
  const mailto = `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  try {
    const sent = await sendWithResend(subject, body, data.email);
    if (sent) return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Couldn’t send that just now. You can email me directly instead.",
      mailto,
    };
  }

  return {
    ok: false,
    error: "Email delivery isn’t set up on this deployment yet. Send it straight to my inbox:",
    mailto,
  };
}
