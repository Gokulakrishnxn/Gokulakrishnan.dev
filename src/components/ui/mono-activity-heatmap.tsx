"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { GitCommitHorizontal } from "lucide-react";
import { Tooltip } from "@/components/motion/tooltip";

function GitHubIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
    </svg>
  );
}

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

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

type ApiDay = { date: string; count: number; level: number };

type CalendarPayload = {
  contributions: Contribution[];
  lastYear: number;
  overall: number;
};

function toWeeks(contributions: Contribution[]) {
  const weeks: Contribution[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    const week = contributions.slice(i, i + 7);
    if (week.length === 7) weeks.push(week);
  }
  return weeks;
}

function githubMonthLabels(weeks: Contribution[][]) {
  const labels: { name: string; index: number }[] = [];

  const monthAt = (week: Contribution[]) => {
    const firstOfMonth = week.find((day) => day.date.endsWith("-01"));
    return Number((firstOfMonth ?? week[0]).date.slice(5, 7));
  };

  const weekStartsMonth = (week: Contribution[], index: number) => {
    if (week.some((day) => day.date.endsWith("-01"))) return true;
    if (index !== 0) return false;
    return true;
  };

  for (let i = 0; i < weeks.length; i++) {
    if (!weekStartsMonth(weeks[i], i)) continue;

    const month = monthAt(weeks[i]);
    let next = weeks.length;
    for (let j = i + 1; j < weeks.length; j++) {
      if (weeks[j].some((day) => day.date.endsWith("-01"))) {
        next = j;
        break;
      }
    }

    if (next - i < 2 && i !== 0) continue;
    labels.push({ name: MONTH_NAMES[month - 1], index: i });
  }

  return labels;
}

function weeksForWidth(width: number) {
  if (width < 360) return 18;
  if (width < 480) return 26;
  if (width < 640) return 36;
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
  const lastYear =
    typeof totals.lastYear === "number"
      ? totals.lastYear
      : days.slice(-365).reduce((sum, day) => sum + day.count, 0);
  const overall = Object.entries(totals).reduce((sum, [key, value]) => {
    if (key === "lastYear") return sum;
    return sum + (typeof value === "number" ? value : 0);
  }, 0);

  const today = new Date();
  today.setHours(23, 59, 59, 999);

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
    lastYear,
    overall,
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
    return all.slice(-weeksForWidth(width || 520));
  }, [payload, width]);

  const labels = useMemo(
    () => githubMonthLabels(visibleWeeks),
    [visibleWeeks],
  );

  if (!payload) {
    return <div ref={wrapRef} className="github-graph" />;
  }

  return (
    <div ref={wrapRef} className="github-graph">
      <div className="github-graph-layout">
        <div className="github-graph-days" aria-hidden="true">
          {DAY_LABELS.map((label, index) => (
            <span key={index}>{label}</span>
          ))}
        </div>

        <div className="github-graph-main">
          <div className="github-graph-months">
            {labels.map((label) => (
              <span
                key={`${label.name}-${label.index}`}
                style={{
                  left: `${(label.index / visibleWeeks.length) * 100}%`,
                }}
              >
                {label.name}
              </span>
            ))}
          </div>

          <div
            className="github-graph-weeks"
            style={{
              gridTemplateColumns: `repeat(${visibleWeeks.length}, minmax(0, 1fr))`,
            }}
          >
            {visibleWeeks.map((week, wIdx) => (
              <div key={week[0]?.date ?? wIdx} className="github-graph-week">
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
                      data-level={day.level}
                    />
                  </Tooltip>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <a
        className="github-graph-total"
        href={`https://github.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon />
        {payload.lastYear.toLocaleString()} contributions
        <span className="github-graph-sep">·</span>
        <GitCommitHorizontal size={13} strokeWidth={1.75} />
        {payload.overall.toLocaleString()} overall commits
      </a>
    </div>
  );
}
