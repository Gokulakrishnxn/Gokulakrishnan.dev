import Image from "next/image";

import { cn } from "@/lib/utils";

export function ProfileCover() {
  return (
    <div
      className={cn(
        "screen-line-before screen-line-after relative border-x border-edge",
        "aspect-[16/6] sm:aspect-[16/5] md:aspect-[16/4] lg:aspect-[16/3.5]",
        "max-h-40 sm:max-h-48 md:max-h-56 lg:max-h-64",
        "overflow-hidden select-none"
      )}
    >
      <Image
        id="js-cover-mark"
        src="/banner.png"
        alt="Banner"
        fill
        className="object-cover object-center"
        priority
        unoptimized
      />
    </div>
  );
}
