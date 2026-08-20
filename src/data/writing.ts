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
