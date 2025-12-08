import { RssIcon } from "lucide-react";

import { SITE_INFO } from "@/config/site";

import { Icons } from "./icons";
import { IndianTime } from "./indian-time";
import { VisitorCounter } from "./visitor-counter";

export function SiteFooter() {
  return (
    <footer className="max-w-screen overflow-x-hidden px-2 sm:px-4">
      <div className="screen-line-before mx-auto border-x border-edge pt-4 md:max-w-3xl lg:max-w-4xl">
        <div className="screen-line-before screen-line-after flex w-full before:z-1 after:z-1">
          <div className="mx-auto flex items-center justify-center gap-2 border-x border-edge bg-background px-3 sm:gap-3 sm:px-4">
            <a
              className="flex font-mono text-xs font-medium text-muted-foreground"
              href={`${SITE_INFO.url}/llms.txt`}
              target="_blank"
              rel="noopener noreferrer"
            >
              llms.txt
            </a>

            <Separator />

            <IndianTime />

            <Separator />

            <VisitorCounter />

            <Separator />

            <a
              className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
              href={`${SITE_INFO.url}/rss`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <RssIcon className="size-4" />
              <span className="sr-only">RSS</span>
            </a>
          </div>
        </div>
      </div>
      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex h-2" />
      </div>
    </footer>
  );
}

function Separator() {
  return <div className="flex h-11 w-px bg-edge" />;
}
