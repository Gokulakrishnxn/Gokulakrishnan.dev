import { Images } from "lucide-react";
import { Tooltip } from "@/components/motion/tooltip";

export function AlbumLink() {
  return (
    <Tooltip content="Album" side="top" delay={80}>
      <a className="footer-icon-link" href="/photos" aria-label="Album">
        <Images size={16} strokeWidth={1.75} aria-hidden="true" />
      </a>
    </Tooltip>
  );
}
