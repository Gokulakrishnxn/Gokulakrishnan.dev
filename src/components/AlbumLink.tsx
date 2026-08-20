import { Tooltip } from "@/components/motion/tooltip";

function AlbumMark() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="6.5" y="3.5" width="14" height="11" rx="2" />
      <rect x="3.5" y="8.5" width="14" height="12" rx="2" />
    </svg>
  );
}

export function AlbumLink() {
  return (
    <Tooltip content="Album" side="top" delay={80}>
      <a className="footer-icon-link" href="/album" aria-label="Album">
        <AlbumMark />
      </a>
    </Tooltip>
  );
}
