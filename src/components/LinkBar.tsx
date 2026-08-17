function ExternalArrow() {
  return (
    <svg
      className="link-bar-arrow"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 8L8 2M8 2H3.2M8 2V6.8"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NotionIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4.46 3.32c.4-.16.86-.1 1.5.14l12.7 4.08c.42.14.64.3.72.48.08.18.06.46-.08.86l-3.3 9.86c-.18.54-.42.84-.74.94-.32.1-.74 0-1.26-.18L4.3 15.3c-.46-.16-.74-.38-.86-.64-.12-.26-.1-.62.08-1.08l3.12-8.02c.22-.56.42-.98.62-1.24.2-.26.2-.26.2 0ZM7.7 7.08c.08.28-.02.7-.28 1.36L5.7 13.3c-.12.32-.08.5.1.56l8.86 3.12c.2.08.36 0 .46-.28l2.4-7.16c.1-.3.04-.48-.16-.56L8.3 6.7c-.22-.08-.4-.02-.6.38Zm1.7 1.7 5.08 1.7-2.02 5.98-5.1-1.8 2.04-5.88Z"
      />
    </svg>
  );
}

function ResumeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.1 3.4c3.9 0 6.6 2.4 6.6 6.1 0 2.5-1.2 4.4-3.3 5.4l2.8 5.1h-3.1l-2.4-4.5h-1.2V20h-2.8V3.4h3.4Zm-.1 2.5v4.6h1.1c1.6 0 2.6-.9 2.6-2.3S14.7 5.9 13.1 5.9h-1.1Z"
      />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="#FF0033"
        d="M23.5 7.2s-.2-1.6-.9-2.3c-.9-.9-1.8-.9-2.3-1C16.9 3.6 12 3.6 12 3.6h0s-4.9 0-8.3.3c-.5.1-1.4.1-2.3 1-.7.7-.9 2.3-.9 2.3S.2 9.1.2 11v1.8c0 1.9.3 3.8.3 3.8s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.6.3 8.1.3 0 0 4.9 0 8.3-.3.5-.1 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.3-1.9.3-3.8V11c0-1.9-.3-3.8-.3-3.8Z"
      />
      <path fill="#fff" d="M9.8 8.6v6.7l6.4-3.35L9.8 8.6Z" />
    </svg>
  );
}

const links = [
  {
    label: "Notion",
    href: "https://www.notion.so",
    icon: <NotionIcon />,
  },
  {
    label: "Resume",
    href: "/resume.pdf",
    icon: <ResumeIcon />,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com",
    icon: <YouTubeIcon />,
  },
];

export function LinkBar() {
  return (
    <nav className="link-bar" aria-label="Profiles">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="link-bar-icon">{link.icon}</span>
          <span className="link-bar-label">{link.label}</span>
          <ExternalArrow />
        </a>
      ))}
    </nav>
  );
}
