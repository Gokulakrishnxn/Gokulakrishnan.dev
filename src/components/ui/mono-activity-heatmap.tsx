"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Tooltip } from "@/components/motion/tooltip";
import { cn } from "@/lib/utils";

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

interface MonoActivityHeatmapProps {
  theme?: "dark" | "light";
  accentColor?: "green" | "blue" | "purple" | "mono";
  compact?: boolean;
  username?: string;
  contributions?: Contribution[];
}

type ApiDay = { date: string; count: number; level: number };

function generateDemoContributions(weeks: number): Contribution[] {
  const today = new Date();
  return Array.from({ length: weeks * 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (weeks * 7 - 1 - i));
    const rand = Math.random();
    let level: ContributionLevel = 0;
    let count = 0;

    if (rand > 0.35) {
      level = Math.floor(Math.random() * 4 + 1) as ContributionLevel;
      count = level * 3 + Math.floor(Math.random() * 4);
    }

    return {
      date: date.toISOString().slice(0, 10),
      count,
      level,
    };
  });
}

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

async function fetchCalendar(login: string) {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${login}?y=last`,
  );
  if (!res.ok) return null;

  const days: ApiDay[] = (await res.json())?.contributions ?? [];
  if (!days.length) return null;

  const start = days.findIndex(
    (day) => new Date(`${day.date}T00:00:00Z`).getUTCDay() === 0,
  );

  return days.slice(start < 0 ? 0 : start).map<Contribution>((day) => ({
    date: day.date,
    count: day.count,
    level: Math.min(4, Math.max(0, day.level)) as ContributionLevel,
  }));
}

export function MonoActivityHeatmap({
  theme = "light",
  accentColor = "blue",
  compact = false,
  username,
  contributions,
}: MonoActivityHeatmapProps) {
  const isDark = theme === "dark";
  const [remoteData, setRemoteData] = useState<Contribution[] | null>(null);

  useEffect(() => {
    if (!username || contributions) return;
    let active = true;

    fetchCalendar(username)
      .then((days) => {
        if (active && days) setRemoteData(days);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [username, contributions]);

  const demoData = useMemo(() => generateDemoContributions(26), []);
  const data = contributions ?? remoteData ?? demoData;
  const weeks = useMemo(() => toWeeks(data), [data]);
  const labels = useMemo(() => monthLabels(weeks), [weeks]);

  const totalContributions = useMemo(
    () => data.reduce((sum, day) => sum + day.count, 0),
    [data],
  );

  const colorScale = useMemo(() => {
    switch (accentColor) {
      case "green":
        return {
          bg: "#39d353",
          badgeClass: "bg-emerald-500/15 text-emerald-600 border-emerald-500/25",
          badgeText: "Emerald Matrix",
        };
      case "blue":
        return {
          bg: "#3b82f6",
          badgeClass: "bg-blue-500/15 text-blue-600 border-blue-500/25",
          badgeText: "Sky Blue Grid",
        };
      case "purple":
        return {
          bg: "#a855f7",
          badgeClass: "bg-purple-500/15 text-purple-600 border-purple-500/25",
          badgeText: "Violet Pulse",
        };
      case "mono":
      default:
        return {
          bg: isDark ? "#FFFFFF" : "#09090B",
          badgeClass: "bg-black/5 text-neutral-700 border-black/10",
          badgeText: "Monochrome Heat",
        };
    }
  }, [accentColor, isDark]);

  const opacityForLevel = (lvl: ContributionLevel) => {
    switch (lvl) {
      case 0:
        return isDark ? 0.06 : 0.08;
      case 1:
        return 0.3;
      case 2:
        return 0.55;
      case 3:
        return 0.8;
      case 4:
        return 1;
    }
  };

  return (
    <div
      className={cn(
        "relative w-full rounded-[24px] transition-all duration-300 flex flex-col justify-between overflow-hidden p-4 sm:p-5 font-sans",
        compact ? "h-[220px] sm:h-[268px]" : "min-h-[260px]",
        isDark
          ? "bg-[#181818] text-white"
          : "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-neutral-100 text-black",
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold tracking-wider uppercase ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
            >
              GitHub Activity
            </span>
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-1.5 py-0.5 font-mono text-[10px]",
                colorScale.badgeClass,
              )}
            >
              {colorScale.badgeText}
            </span>
          </div>
          <div className="mt-0.5 text-xl font-bold tracking-tight tabular-nums">
            {totalContributions}{" "}
            <span className="text-xs font-normal opacity-70">
              contributions
            </span>
          </div>
        </div>
        {username ? (
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-[11px] font-medium ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
          >
            @{username}
          </a>
        ) : null}
      </div>

      <div
        className={cn(
          "relative flex w-full flex-1 flex-col justify-center overflow-hidden rounded-[14px] p-3",
          isDark ? "bg-[#131313]" : "bg-[#f4f4f6]",
        )}
      >
        <div className="overflow-x-auto">
          <div
            className="mb-1.5 grid px-px"
            style={{
              gridTemplateColumns: `repeat(${weeks.length}, minmax(10px, 11px))`,
              gap: 3,
              width: "max-content",
            }}
          >
            {labels.map((label, index) => (
              <span
                key={`m-${index}`}
                className={`text-[9px] font-mono leading-none ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
              >
                {label ?? ""}
              </span>
            ))}
          </div>

          <div
            className="flex w-max items-center gap-[3px] py-1"
          >
            {weeks.map((week, wIdx) => (
              <div
                key={wIdx}
                className="flex shrink-0 flex-col items-center gap-[3px]"
              >
                {week.map((day) => (
                  <Tooltip
                    key={day.date}
                    side="top"
                    delay={40}
                    content={`${day.count} ${day.count === 1 ? "contribution" : "contributions"} on ${DATE_FORMAT.format(new Date(`${day.date}T00:00:00`))}`}
                    wrapperClassName="flex"
                  >
                    <motion.div
                      className="h-[10px] w-[10px] min-h-[10px] min-w-[10px] cursor-pointer rounded-[2px] sm:h-[11px] sm:w-[11px] sm:min-h-[11px] sm:min-w-[11px]"
                      style={{
                        backgroundColor: colorScale.bg,
                        opacity: opacityForLevel(day.level),
                      }}
                      whileHover={{ scale: 1.35, zIndex: 10 }}
                    />
                  </Tooltip>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
