export type LibraryItem = {
  title: string;
  href?: string;
  icon?: "shadcn";
  isNew?: boolean;
  external?: boolean;
};

export const libraryItems: LibraryItem[] = [
  {
    title: "shadcn/ui",
    href: "https://ui.shadcn.com/",
    icon: "shadcn",
    isNew: true,
    external: true,
  },
];
