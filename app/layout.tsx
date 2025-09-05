import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { GridBackground } from "@/components/grid-background"
import { Suspense } from "react"
import { SplashProvider } from "@/components/splash-provider"
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
            <SplashProvider>
              <GridBackground />
              <div className="flex flex-col min-h-screen relative z-10">
                <main className="flex-1">{children}</main>
              </div>
            </SplashProvider>
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
