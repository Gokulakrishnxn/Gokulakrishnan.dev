"use client";

import { usePathname } from "next/navigation";
import { Tooltip } from "@/components/motion/tooltip";

function GithubIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

const links = [
  { href: "/blogs", label: "Blog", match: "blog" },
  { href: "/album", label: "Library", match: "library" },
  { href: "/projects", label: "Projects", match: "projects" },
] as const;

function isActive(
  pathname: string,
  match: "home" | "blog" | "library" | "projects",
) {
  if (match === "home") return pathname === "/";
  if (match === "blog") {
    return pathname === "/blogs" || pathname.startsWith("/writing");
  }
  if (match === "library") {
    return pathname === "/album" || pathname.startsWith("/album/");
  }
  return pathname === "/projects" || pathname.startsWith("/projects/");
}

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="site-nav" aria-label="Site">
      <a
        className={`site-nav-home${isActive(pathname, "home") ? " is-active" : ""}`}
        href="/"
        aria-label="Gokulakrishnan"
        aria-current={isActive(pathname, "home") ? "page" : undefined}
      >
        <img
          className="site-nav-logo"
          src="/web.png"
          alt=""
          width={22}
          height={22}
        />
      </a>
      <ul className="site-nav-links">
        {links.map((link) => {
          const active = isActive(pathname, link.match);
          return (
            <li key={link.match}>
              <a
                className={active ? "is-active" : undefined}
                href={link.href}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </a>
            </li>
          );
        })}
        <li>
          <Tooltip content="GitHub" side="bottom" delay={80}>
            <a
              className="site-nav-icon"
              href="https://github.com/Gokulakrishnxn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GithubIcon />
            </a>
          </Tooltip>
        </li>
      </ul>
    </nav>
  );
}
