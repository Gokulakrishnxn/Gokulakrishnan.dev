import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProfileCover() {
  return (
      <div
        className={cn(
        "relative aspect-4/1 border-x border-edge select-none sm:aspect-5/1 max-h-48",
          "screen-line-before screen-line-after before:-top-px after:-bottom-px",
        "overflow-hidden"
        )}
      >
      <Image
          id="js-cover-mark"
        src="/banner.jpg"
        alt="Banner"
        fill
        className="object-cover"
        priority
        unoptimized
        />
      </div>
  );
}
