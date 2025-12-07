import { ArrowUpRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import type { Publication } from "../../types/publications";

export function PublicationItem({
  className,
  publication,
}: {
  className?: string;
  publication: Publication;
}) {
  const content = (
    <div
      className={cn(
        "group/pub flex flex-1 items-start border-l border-dashed border-edge p-4 pr-2",
        className
      )}
    >
      <div className="space-y-1">
        <h3 className="leading-snug font-medium text-balance underline-offset-4 group-hover/pub:underline">
          {publication.title}
        </h3>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          <dl>
            <dt className="sr-only">Publication Period</dt>
            <dd>
              {publication.period.start}
              {publication.period.end ? ` — ${publication.period.end}` : ""}
            </dd>
          </dl>
        </div>

        {publication.description && (
          <p className="text-sm text-muted-foreground text-balance">
            {publication.description}
          </p>
        )}
      </div>
    </div>
  );

  if (publication.link) {
    return (
      <a
        className="flex items-center pr-2 hover:bg-accent2"
        href={publication.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}

        <ArrowUpRightIcon className="size-4 text-muted-foreground" aria-hidden />
      </a>
    );
  }

  return <div className="flex pr-2">{content}</div>;
}





