import { format } from "date-fns";
import { PinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import type { Post } from "@/features/blog/types/post";
import { cn } from "@/lib/utils";

export function PostItem({
  post,
  shouldPreloadImage,
}: {
  post: Post;
  shouldPreloadImage?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group/post flex flex-col gap-2 p-2 sm:p-3",
        "max-sm:screen-line-before max-sm:screen-line-after",
        "sm:nth-[2n+1]:screen-line-before sm:nth-[2n+1]:screen-line-after"
      )}
    >
      {post.metadata.image && (
        <div className="relative aspect-video overflow-hidden rounded-xl select-none sm:aspect-[1200/630]">
          <Image
            src={post.metadata.image}
            alt={post.metadata.title}
            width={1200}
            height={630}
            quality={100}
            priority={shouldPreloadImage}
            unoptimized
            className="h-full w-full object-cover"
          />

          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/10 ring-inset dark:ring-white/10" />

          {/* {post.metadata.new && (
            <span className="absolute top-1.5 right-1.5 rounded-md bg-info px-1.5 font-mono text-sm font-medium text-white text-shadow-xs">
              New
            </span>
          )} */}

          {post.metadata.pinned && (
            <span className="absolute top-1.5 right-1.5 flex size-6 items-center justify-center rounded-md bg-secondary">
              <PinIcon className="size-4 rotate-45 text-secondary-foreground" />
              <span className="sr-only">Pinned</span>
            </span>
          )}
        </div>
      )}

      <div className="flex flex-col gap-1 p-2 sm:p-3">
        <h3 className="text-base leading-snug font-medium text-balance underline-offset-4 group-hover/post:underline sm:text-lg">
          {post.metadata.title}
          {post.metadata.new && (
            <span className="ml-2 inline-block size-2 -translate-y-px rounded-full bg-info">
              <span className="sr-only">New</span>
            </span>
          )}
        </h3>
        {post.metadata.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {post.metadata.description}
          </p>
        )}
        <time
          dateTime={post.metadata.createdAt}
          className="font-mono text-xs text-muted-foreground"
        >
          {format(new Date(post.metadata.createdAt), "MMMM d, yyyy")}
        </time>
      </div>
    </Link>
  );
}
