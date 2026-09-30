export type WritingItem = {
  year: number;
  title: string;
  date: string;
  datetime: string;
  href: string;
  published: string;
  excerpt: string;
  isNew?: boolean;
  isLive?: boolean;
  icon?: string;
  preview?: string;
  previewFit?: "cover" | "contain";
};

export const writingItems: WritingItem[] = [
  {
    year: 2026,
    title: "How I Design Websites Using AI :)",
    date: "30/09",
    datetime: "2026-09-30",
    published: "30 September, 2026",
    excerpt:
      "I'm not a natural designer. Here's how I go from idea to a real website with AI, without ending up with something generic.",
    href: "/writing/design-websites-ai",
    isNew: true,
    icon: "/web.png",
    preview: "/hero-banner.png",
  },
  {
    year: 2026,
    title: "Finlio.app",
    date: "05/08",
    datetime: "2026-08-05",
    published: "5 August, 2026",
    excerpt:
      "A personal finance teammate. One view of your money, and a brief before the market opens.",
    href: "/writing/finlio",
    isLive: true,
    icon: "/Finlio.png",
    preview: "/finliobanner.jpeg",
  },
  {
    year: 2026,
    title: "ARIA",
    date: "22/07",
    datetime: "2026-07-22",
    published: "22 July, 2026",
    excerpt:
      "A research assistant that answers with sources, not vibes. Retrieve first. Speak second.",
    href: "/writing/aria",
    icon: "/aria-logo.svg",
    preview: "/aria-logo.svg",
    previewFit: "contain",
  },
];

export function groupWritingByYear(items: WritingItem[]) {
  const groups: { year: number; items: WritingItem[] }[] = [];

  for (const item of items) {
    const last = groups[groups.length - 1];
    if (last && last.year === item.year) {
      last.items.push(item);
    } else {
      groups.push({ year: item.year, items: [item] });
    }
  }

  return groups;
}
