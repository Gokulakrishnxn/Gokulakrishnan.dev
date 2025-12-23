import Image from "next/image";
import React, { useMemo } from "react";

import { Markdown } from "@/components/markdown";
import { ProseMono } from "@/components/ui/typography";

import type { Experience } from "../../types/experiences";
import { ExperiencePositionItem } from "./experience-position-item";

function parseDate(dateString: string | undefined): number {
  if (!dateString) return 0;

  // Handle formats like "2023", "09.2017", "06.2022"
  if (dateString.includes(".")) {
    const [month, year] = dateString.split(".");
    return parseInt(year || month, 10) * 100 + parseInt(month || "0", 10);
  }

  return parseInt(dateString, 10) * 100;
}

function sortPositionsByDate(positions: Experience["positions"]) {
  return [...positions].sort((a, b) => {
    const aEnd = a.employmentPeriod.end
      ? parseDate(a.employmentPeriod.end)
      : Number.MAX_SAFE_INTEGER;
    const bEnd = b.employmentPeriod.end
      ? parseDate(b.employmentPeriod.end)
      : Number.MAX_SAFE_INTEGER;

    // Sort by end date (most recent first), if end dates are equal, sort by start date
    if (aEnd !== bEnd) {
      return bEnd - aEnd;
    }

    const aStart = parseDate(a.employmentPeriod.start);
    const bStart = parseDate(b.employmentPeriod.start);
    return bStart - aStart;
  });
}

export function ExperienceItem({ experience }: { experience: Experience }) {
  const sortedPositions = useMemo(
    () => sortPositionsByDate(experience.positions),
    [experience.positions]
  );

  return (
    <div className="screen-line-after space-y-4 py-4">
      <div className="flex items-center gap-3">
        <div className="flex size-6 shrink-0 items-center justify-center select-none">
          {experience.companyLogo ? (
            <Image
              src={experience.companyLogo}
              alt={experience.companyName}
              width={24}
              height={24}
              quality={100}
              className="rounded-full"
              unoptimized
              aria-hidden
            />
          ) : (
            <span className="flex size-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          )}
        </div>

        <h3 className="text-lg leading-snug font-medium">
          {experience.companyName}
        </h3>

        {experience.isCurrentEmployer && (
          <span className="relative flex items-center justify-center">
            <span className="absolute inline-flex size-3 animate-ping rounded-full bg-info opacity-50" />
            <span className="relative inline-flex size-2 rounded-full bg-info" />
            <span className="sr-only">Current Employer</span>
          </span>
        )}
      </div>

      {experience.bio && (
        <div className="pb-2 pl-9">
          <ProseMono className="text-sm text-muted-foreground">
            <Markdown>{experience.bio}</Markdown>
          </ProseMono>
        </div>
      )}

      <div className="relative space-y-4 before:absolute before:left-3 before:h-full before:w-px before:bg-border">
        {sortedPositions.map((position) => (
          <ExperiencePositionItem key={position.id} position={position} />
        ))}
      </div>
    </div>
  );
}
