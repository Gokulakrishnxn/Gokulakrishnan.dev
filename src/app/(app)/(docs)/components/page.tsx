import type { Metadata } from "next";
import Link from "next/link";

import { ComponentIcon } from "@/components/icons";
import { getPostsByCategory } from "@/features/blog/data/posts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Components",
  description: "A collection of reusable components.",
};

export default function Page() {
  const posts = getPostsByCategory("components");

  return (
    <div className="min-h-svh">
      <div className="screen-line-after px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold sm:text-3xl">Components</h1>
      </div>

      <div className="relative mt-4">
        <div className="absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2 lg:grid-cols-3">
          <div className="border-r border-edge"></div>
          <div className="border-l border-edge lg:border-r"></div>
          <div className="hidden border-l border-edge lg:block"></div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts
            .slice()
            .sort((a, b) =>
              a.metadata.title.localeCompare(b.metadata.title, "en", {
                sensitivity: "base",
              })
            )
            .map((post) => (
              <Link
                key={post.slug}
                href={`/components/${post.slug}`}
                className={cn(
                  "group/post flex flex-col gap-2 p-3 hover:bg-accent2 sm:p-4",
                  "max-sm:screen-line-before max-sm:screen-line-after",
                  "sm:nth-[2n+1]:screen-line-before sm:nth-[2n+1]:screen-line-after",
                  "lg:nth-[3n]:screen-line-after lg:nth-[3n+1]:screen-line-before"
                )}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted ring-1 ring-edge ring-offset-1 ring-offset-background"
                    aria-hidden
                  >
                    <ComponentIcon
                      className="pointer-events-none size-4 text-muted-foreground"
                      variant={post.metadata.icon}
                    />
                  </div>

                  <div className="flex flex-1 items-center gap-2">
                    <h2 className="leading-snug font-medium text-balance underline-offset-4 group-hover/post:underline">
                      {post.metadata.title}
                    </h2>

                    {post.metadata.new && (
                      <span className="flex -translate-x-1 translate-y-px items-center justify-center">
                        <span className="flex size-2 rounded-sm bg-info" />
                        <span className="sr-only">New</span>
                      </span>
                    )}
                  </div>
                </div>

                {post.metadata.description && (
                  <p className="pl-8 text-xs text-muted-foreground sm:pl-10 sm:text-sm">
                    {post.metadata.description}
                  </p>
                )}
              </Link>
            ))}
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
}
