export const CONTACT_EMAIL = "Gokulakrishnxn@gmail.com";

export const PROJECT_TYPES = [
  "Website",
  "AI agent or automation",
  "Mobile app",
  "SaaS or web app",
  "Something else",
] as const;

export const CURRENCIES = ["USD", "INR"] as const;

export type Currency = (typeof CURRENCIES)[number];

export const TIMELINES = ["As soon as possible", "In 1–3 months", "Flexible"] as const;

export type ContactInput = {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  currency: Currency | string;
  budget: string;
  timeline: string;
  details: string;
  /** Honeypot — must stay empty. */
  website?: string;
};

export type ContactFieldErrors = Partial<Record<keyof ContactInput, string>>;

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors: ContactFieldErrors }
  | { ok: false; error: string; mailto?: string };
