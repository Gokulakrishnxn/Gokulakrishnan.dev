import type { Metadata, Viewport } from "next";
import { Caveat, Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AnimatedFavicon } from "@/components/AnimatedFavicon";
import { PeterWidget } from "@/components/PeterWidget";
import { SiteBackdrop } from "@/components/SiteBackdrop";
import { Umami } from "@/components/Umami";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Gokulakrishnan",
  description: "Born in London, UK. Based in Los Angeles, CA.",
  icons: {
    icon: [
      { url: "/web.png?v=6", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/web.png?v=6",
    apple: "/web.png?v=6",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(inter.variable, caveat.variable, "font-sans", geist.variable, "dark")}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(()=>{try{document.documentElement.classList.toggle("dark",localStorage.getItem("theme")!=="light")}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <SiteBackdrop />
        {children}
        <PeterWidget />
        <AnimatedFavicon />
        <Umami />
      </body>
    </html>
  );
}
