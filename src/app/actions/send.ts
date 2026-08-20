"use server";

import { headers } from "next/headers";
import { replyAsPeter, sanitizeHistory } from "@/lib/peter";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 12;
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

export async function send(message: string, history: unknown) {
  const requestHeaders = await headers();
  const forwarded = requestHeaders.get("x-forwarded-for");
  const key =
    forwarded?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "anon";

  if (rateLimited(key)) {
    return {
      text: "Whoa, slow down a bit. Try me again in a minute.",
      state: "listening" as const,
    };
  }

  const text = typeof message === "string" ? message.slice(0, 500) : "";
  return replyAsPeter(text, sanitizeHistory(history));
}
