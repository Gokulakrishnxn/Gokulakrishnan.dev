import type { Metadata, Viewport } from "next";
import { Caveat, Inter, Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";
import { PeterWidget } from "@/components/PeterWidget";

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
      className={cn(inter.variable, caveat.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(()=>{try{const t=localStorage.getItem("theme");const d=t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d)}catch(e){}})()`,
          }}
        />
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="ca7e61b1-8b57-484a-b743-8c50ce1aa611"
          strategy="afterInteractive"
        />
      </head>
      <body>
        {children}
        <PeterWidget />
      </body>
    </html>
  );
}
