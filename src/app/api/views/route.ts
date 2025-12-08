import { NextResponse } from "next/server";

let viewsCount = 0;

function getViews(): number {
  return viewsCount;
}

function incrementViews(): number {
  viewsCount += 1;
  return viewsCount;
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
