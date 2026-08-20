export type ProjectItem = {
  title: string;
  description: string;
  about: string;
  href: string;
  stack: string[];
  logo?: string;
};

export const projectItems: ProjectItem[] = [
  {
    title: "Finlio",
    description: "A personal AI finance assistant. Know why your money moved.",
    about:
      "Finlio is a personal AI finance assistant that explains why your money moved — so spending, transfers, and patterns read as a clear story instead of a raw ledger.",
    href: "https://www.finlio.app/",
    stack: ["AI", "Finance"],
    logo: "/Finlio.png",
  },
  {
    title: "Quarix",
    description:
      "A freelance agency turning into a software company, building SaaS applications.",
    about:
      "Quarix began as a freelance studio and is growing into a software company. We build AI agents, websites, mobile apps, and SaaS products for teams that want ideas shipped as polished software.",
    href: "https://www.quarix.one",
    stack: ["Agency", "SaaS"],
  },
];
