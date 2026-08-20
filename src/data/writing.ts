export type WritingItem = {
  year: number;
  title: string;
  date: string;
  datetime: string;
  href: string;
  isNew?: boolean;
  isLive?: boolean;
  icon?: string;
};

export const writingItems: WritingItem[] = [
  {
    year: 2026,
    title: "Finlio.app",
    date: "05/08",
    datetime: "2026-08-05",
    href: "/writing/finlio",
    isLive: true,
    icon: "/Finlio.png",
  },
  {
    year: 2026,
    title: "ARIA",
    date: "22/07",
    datetime: "2026-07-22",
    href: "/writing/aria",
    icon: "/aria-logo.svg",
  },
  {
    year: 2026,
    title: "Liveline",
    date: "16/02",
    datetime: "2026-02-16",
    href: "https://benji.org/liveline",
  },
  {
    year: 2026,
    title: "Agentation",
    date: "21/01",
    datetime: "2026-01-21",
    href: "https://benji.org/agentation",
  },
  {
    year: 2026,
    title: "Annotating for agents",
    date: "16/01",
    datetime: "2026-01-16",
    href: "https://benji.org/annotating",
  },
  {
    year: 2026,
    title: "Morphing icons with Claude",
    date: "13/01",
    datetime: "2026-01-13",
    href: "https://benji.org/morphing-icons-with-claude",
  },
  {
    year: 2025,
    title: "Honkish",
    date: "23/05",
    datetime: "2025-05-23",
    href: "https://benji.org/honkish",
  },
  {
    year: 2024,
    title: "Family Values",
    date: "08/07",
    datetime: "2024-07-08",
    href: "https://benji.org/family-values",
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
