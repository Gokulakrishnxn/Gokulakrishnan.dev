"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Tooltip } from "@/components/motion/tooltip";

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type Contribution = {
  date: string;
  count: number;
  level: ContributionLevel;
};

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const GITHUB_GREEN: Record<ContributionLevel, string> = {
  0: "#ebedf0",
  1: "#9be9a8",
  2: "#40c463",
  3: "#30a14e",
  4: "#216e39",
};

type ApiDay = { date: string; count: number; level: number };

type CalendarPayload = {
  contributions: Contribution[];
  total: number;
};

function toWeeks(contributions: Contribution[]) {
  const weeks: Contribution[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }
  return weeks;
}

function monthLabels(weeks: Contribution[][]) {
  const labels: (string | null)[] = weeks.map(() => null);
  let last = "";

  weeks.forEach((week, index) => {
    const month = week[0]?.date.slice(5, 7);
    if (month && month !== last) {
      labels[index] = MONTH_NAMES[Number(month) - 1] ?? null;
      last = month;
    }
  });

  return labels;
}

function weeksForWidth(width: number) {
  if (width < 360) return 16;
  if (width < 480) return 22;
  if (width < 640) return 32;
  return 53;
}

async function fetchCalendar(login: string): Promise<CalendarPayload | null> {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${login}`,
    { cache: "no-store" },
  );
  if (!res.ok) return null;

  const json = await res.json();
  const days: ApiDay[] = json?.contributions ?? [];
  if (!days.length) return null;

  const totals = json?.total ?? {};
  const total = Object.entries(totals).reduce((sum, [key, value]) => {
    if (key === "lastYear") return sum;
    return sum + (typeof value === "number" ? value : 0);
  }, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const recent = days
    .filter((day) => new Date(`${day.date}T00:00:00`) <= today)
    .slice(-371)
    .map<Contribution>((day) => ({
      date: day.date,
      count: day.count,
      level: Math.min(4, Math.max(0, day.level)) as ContributionLevel,
    }));

  const start = recent.findIndex(
    (day) => new Date(`${day.date}T00:00:00`).getDay() === 0,
  );

  return {
    contributions: recent.slice(start < 0 ? 0 : start),
    total,
  };
}

export function MonoActivityHeatmap({ username }: { username: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [payload, setPayload] = useState<CalendarPayload | null>(null);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;

    const update = () => setWidth(node.clientWidth);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let active = true;

    fetchCalendar(username)
      .then((data) => {
        if (active && data) setPayload(data);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [username]);

  const visibleWeeks = useMemo(() => {
    if (!payload) return [];
    const all = toWeeks(payload.contributions);
    const count = weeksForWidth(width || 520);
    return all.slice(-count);
  }, [payload, width]);

  const labels = useMemo(() => monthLabels(visibleWeeks), [visibleWeeks]);
  const gap = width < 400 ? 2 : 2.5;

  if (!payload) {
    return <div ref={wrapRef} className="github-graph" />;
  }

  return (
    <div ref={wrapRef} className="github-graph">
      <div
        className="github-graph-months"
        style={{
          gridTemplateColumns: `repeat(${visibleWeeks.length}, minmax(0, 1fr))`,
          gap,
        }}
      >
        {labels.map((label, index) => (
          <span key={`m-${index}`}>{label ?? ""}</span>
        ))}
      </div>

      <div
        className="github-graph-weeks"
        style={{
          gridTemplateColumns: `repeat(${visibleWeeks.length}, minmax(0, 1fr))`,
          gap,
        }}
      >
        {visibleWeeks.map((week, wIdx) => (
          <div key={wIdx} className="github-graph-week" style={{ gap }}>
            {week.map((day) => (
              <Tooltip
                key={day.date}
                side="top"
                delay={40}
                content={`${day.count} ${day.count === 1 ? "contribution" : "contributions"} on ${DATE_FORMAT.format(new Date(`${day.date}T00:00:00`))}`}
                wrapperClassName="github-graph-cell-wrap"
              >
                <span
                  className="github-graph-cell"
                  style={{ backgroundColor: GITHUB_GREEN[day.level] }}
                />
              </Tooltip>
            ))}
          </div>
        ))}
      </div>

      <p className="github-graph-total">
        {payload.total.toLocaleString()} contributions
      </p>
    </div>
  );
}
