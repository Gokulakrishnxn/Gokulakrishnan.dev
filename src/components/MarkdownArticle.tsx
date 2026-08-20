import { Link } from "@/components/BrandMarks";
import type { ReactNode } from "react";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern =
    /\[([^\]]+)\]\((https?:\/\/[^)]+)\)|==([^=]+)==/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text))) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    if (match[1] && match[2]) {
      nodes.push(
        <Link key={`link-${key++}`} href={match[2]}>
          {match[1]}
        </Link>,
      );
    } else if (match[3]) {
      nodes.push(
        <mark key={`mark-${key++}`} className="writing-mark">
          {match[3]}
        </mark>,
      );
    }
    last = match.index + match[0].length;
  }

  if (last < text.length) {
    nodes.push(text.slice(last));
  }

  return nodes;
}

function AsideNote({ children }: { children: string }) {
  return (
    <span className="writing-aside-note" aria-hidden="true">
      <svg
        className="writing-aside-bracket"
        viewBox="0 0 20 88"
        fill="none"
      >
        <path
          d="M5 6c9.5-1.8 13 3.2 12.2 14.5-0.6 10.4 0.8 22.2 0.1 33.4-0.7 11.8 1.4 22.6-3.8 28.8-3.2 3.8-8.8 4.4-13.5 3.2"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      </svg>
      <span>{children}</span>
    </span>
  );
}

export function MarkdownArticle({
  source,
  skipTitle = false,
  media,
}: {
  source: string;
  skipTitle?: boolean;
  media?: ReactNode;
}) {
  const blocks = source.trim().split(/\n{2,}/);
  let shownMedia = !media;

  return (
    <>
      {blocks.map((block, index) => {
        if (block.startsWith("# ")) {
          if (skipTitle) return null;
          return (
            <h1 key={index} className="writing-title">
              {block.slice(2)}
            </h1>
          );
        }

        if (block.startsWith("## ")) {
          const title = block.slice(3);
          return (
            <h2 key={index} id={slugify(title)} className="writing-heading">
              {title}
            </h2>
          );
        }

        const asideMatch = block.match(/\{aside:([^}]+)\}\s*$/);
        const body = asideMatch
          ? block.replace(/\s*\{aside:[^}]+\}\s*$/, "")
          : block;
        const paragraph = (
          <p key={asideMatch ? `p-${index}` : index}>
            {renderInline(body.replace(/\n/g, " "))}
          </p>
        );

        const node = asideMatch ? (
          <div key={index} className="writing-aside">
            {paragraph}
            <AsideNote>{asideMatch[1]}</AsideNote>
          </div>
        ) : (
          paragraph
        );

        if (!shownMedia) {
          shownMedia = true;
          return (
            <div key={`media-${index}`}>
              {node}
              {media}
            </div>
          );
        }

        return node;
      })}
    </>
  );
}

