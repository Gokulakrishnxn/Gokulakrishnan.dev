import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { NextResponse } from "next/server";
import { join } from "path";

const VIEWS_FILE = join(process.cwd(), "data", "views.json");

function ensureDataDir() {
  const dataDir = join(process.cwd(), "data");
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }
}

function getViews(): number {
  try {
    ensureDataDir();
    if (existsSync(VIEWS_FILE)) {
      const data = readFileSync(VIEWS_FILE, "utf-8");
      const json = JSON.parse(data);
      return json.views || 0;
    }
    return 0;
  } catch {
    return 0;
  }
}

function incrementViews(): number {
  const views = getViews();
  const newViews = views + 1;

  try {
    ensureDataDir();
    writeFileSync(VIEWS_FILE, JSON.stringify({ views: newViews }), "utf-8");
  } catch (error) {
    console.error("Failed to write views file:", error);
  }

  return newViews;
}

export const dynamic = "force-dynamic";

export async function GET() {
  const views = getViews();
  return NextResponse.json({ views });
}

export async function POST() {
  const views = incrementViews();
  return NextResponse.json({ views });
}
