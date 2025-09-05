"use client"

import { BrowserNavigation } from "@/components/browser-navigation"
import { MobileHomePage } from "@/components/mobile-home-page"
import { useMobileDetection } from "@/hooks/use-mobile-detection"

export default function HomePage() {
  const { isMobile, isLoading } = useMobileDetection()

  // Show loading state while detecting device
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Render mobile-specific layout
  if (isMobile) {
    return <MobileHomePage />
  }

  // Render desktop layout
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BrowserNavigation />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 lg:space-y-8 max-w-5xl mx-auto">
          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-balance leading-tight">
              <span className="text-primary">Gokulakrishnan</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto text-pretty leading-relaxed px-2 sm:px-4">
              Self taught software engineer love to learn new things and I'm always looking for new challenges to solve :)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
