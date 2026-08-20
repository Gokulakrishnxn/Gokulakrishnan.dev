const COUNTER_KEY = "gokulakrishnan-dev-site-views";
const COUNTER_URL = `https://countapi.mileshilliard.com/api/v1`;
const BASE_VIEWS = 200;

function displayViews(count: number | null) {
  if (count === null) return null;
  return BASE_VIEWS + count;
}

function parseCount(data: unknown) {
  if (!data || typeof data !== "object") return null;
  const value = (data as { value?: unknown }).value;
  const count = typeof value === "number" ? value : Number(value);
  return Number.isFinite(count) ? count : null;
}

async function readCounter() {
  const res = await fetch(`${COUNTER_URL}/get/${COUNTER_KEY}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return parseCount(await res.json());
}

async function hitCounter() {
  const res = await fetch(`${COUNTER_URL}/hit/${COUNTER_KEY}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return parseCount(await res.json());
}

export async function GET() {
  const views = displayViews(await readCounter());
  if (views === null) {
    return Response.json({ views: null }, { status: 502 });
  }
  return Response.json({ views });
}

export async function POST() {
  const views = displayViews((await hitCounter()) ?? (await readCounter()));
  if (views === null) {
    return Response.json({ views: null }, { status: 502 });
  }
  return Response.json({ views });
}
