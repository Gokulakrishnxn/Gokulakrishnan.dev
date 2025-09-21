import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { SafariWallpaper } from "@/components/safari-wallpaper"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Gokulakrishnan - Software Engineer & Data Scientist",
  description:
    "Personal portfolio of Gokulakrishnan - A curious builder who turns ideas into technology. Specializing in full-stack development, AI, and data science.",
  generator: "v0.app",
  keywords: [
    "Software Engineer",
    "Data Scientist",
    "Full Stack Developer",
    "AI",
    "Machine Learning",
    "Web Development",
  ],
  authors: [{ name: "Gokulakrishnan" }],
  creator: "Gokulakrishnan",
  openGraph: {
    title: "Gokulakrishnan - Software Engineer & Data Scientist",
    description:
      "Personal portfolio showcasing projects, skills, and experience in software engineering and data science.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gokulakrishnan - Software Engineer & Data Scientist",
    description:
      "Personal portfolio showcasing projects, skills, and experience in software engineering and data science.",
    creator: "@Gokulakrishnxn",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <SafariWallpaper>
              {children}
            </SafariWallpaper>
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
