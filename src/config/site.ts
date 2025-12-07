import { USER } from "@/features/portfolio/data/user";
import type { NavItem } from "@/types/nav";

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.APP_URL || "https://gokulakrishnan.dev",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
};

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const MAIN_NAV: NavItem[] = [
  {
    title: "Portfolio",
    href: "/",
  },
  {
    title: "Components",
    href: "/components",
  },
  {
    title: "Blog",
    href: "/blog",
  },
];

export const GITHUB_USERNAME = "Gokulakrishnxn";
export const SOURCE_CODE_GITHUB_REPO = "Gokulakrishnxn/gokulakrishnan.dev";
export const SOURCE_CODE_GITHUB_URL = "https://github.com/Gokulakrishnxn/gokulakrishnan.dev";

export const SPONSORSHIP_URL = "https://github.com/sponsors/ncdai";

export const UTM_PARAMS = {
  utm_source: "gokulakrishnan.dev",
  utm_medium: "referral",
  utm_campaign: "portfolio",
};
