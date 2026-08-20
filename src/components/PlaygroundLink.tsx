import { Tooltip } from "@/components/motion/tooltip";

function PlaygroundMark() {
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
      <rect x="3.2" y="3.2" width="7.2" height="7.2" rx="1.8" />
      <rect x="13.6" y="3.2" width="7.2" height="7.2" rx="1.8" />
      <rect x="3.2" y="13.6" width="7.2" height="7.2" rx="1.8" />
      <rect x="13.6" y="13.6" width="7.2" height="7.2" rx="1.8" />
    </svg>
  );
}

export function PlaygroundLink() {
  return (
    <Tooltip content="Playground" side="top" delay={80}>
      <a className="footer-icon-link" href="/playground" aria-label="Playground">
        <PlaygroundMark />
      </a>
    </Tooltip>
  );
}
