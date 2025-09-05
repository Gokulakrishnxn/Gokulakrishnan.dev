"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AnimatedThemeToggler } from "@/components/animated-theme-toggler"
import {
  Home,
  User,
  FolderOpen,
  FileText,
  BookOpen,
  Mail,
  Activity,
  Camera,
  GraduationCap,
  Gamepad2,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigationItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/projects", label: "Projects", icon: FolderOpen },
  { href: "/experience", label: "Experience", icon: GraduationCap },
  { href: "/resume", label: "Resume", icon: FileText },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/album", label: "Album", icon: Camera },
  { href: "/arcade", label: "Arcade", icon: Gamepad2 },
  { href: "/status", label: "Status", icon: Activity },
  { href: "/contact", label: "Contact", icon: Mail },
]

export function BrowserNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const pathname = usePathname()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="sticky top-2 sm:top-4 z-50 mx-2 sm:mx-4 lg:mx-8">
      <div className="relative">
        {/* Corner decorations */}
        <div className="absolute -top-1 sm:-top-2 -left-1 sm:-left-2 h-3 w-3 sm:h-4 sm:w-4 border-l-2 border-t-2 border-primary/60"></div>
        <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 h-3 w-3 sm:h-4 sm:w-4 border-r-2 border-t-2 border-primary/60"></div>
        <div className="absolute -bottom-1 sm:-bottom-2 -left-1 sm:-left-2 h-3 w-3 sm:h-4 sm:w-4 border-l-2 border-b-2 border-primary/60"></div>
        <div className="absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 h-3 w-3 sm:h-4 sm:w-4 border-r-2 border-b-2 border-primary/60"></div>

        <nav className="w-full rounded-lg border-2 border-border/50 bg-background/95 backdrop-blur-md shadow-lg supports-[backdrop-filter]:bg-background/80">
          {/* Browser-style header */}
          <div className="flex h-10 sm:h-12 items-center justify-between border-b border-border/50 px-2 sm:px-3 lg:px-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="flex gap-1 sm:gap-1.5 lg:gap-2">
                <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 lg:h-3 lg:w-3 rounded-full bg-red-500"></div>
                <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 lg:h-3 lg:w-3 rounded-full bg-yellow-500"></div>
                <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 lg:h-3 lg:w-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-1 sm:ml-2 lg:ml-4 flex items-center gap-0.5 sm:gap-1 lg:gap-2">
                <Button variant="ghost" size="sm" className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 p-0">
                  <ChevronLeft className="h-2.5 w-2.5 sm:h-3 sm:w-3 lg:h-4 lg:w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 p-0">
                  <ChevronRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 lg:h-4 lg:w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 p-0 hidden sm:flex">
                  <RotateCcw className="h-2.5 w-2.5 sm:h-3 sm:w-3 lg:h-4 lg:w-4" />
                </Button>
              </div>
            </div>

            {/* Address bar */}
            <div className="flex-1 mx-1 sm:mx-2 lg:mx-4 max-w-[120px] sm:max-w-xs lg:max-w-md xl:max-w-2xl">
              <div className="flex items-center gap-0.5 sm:gap-1 lg:gap-2 rounded-md border border-border/50 bg-muted/30 px-1.5 sm:px-2 lg:px-3 py-0.5 sm:py-1 lg:py-1.5 text-[10px] sm:text-xs lg:text-sm">
                <span className="text-muted-foreground hidden sm:inline">🔒</span>
                <span className="text-muted-foreground truncate hidden sm:inline">gokulakrishnan.dev</span>
                <span className="text-foreground truncate">{pathname}</span>
              </div>
            </div>

            <div className="flex items-center gap-0.5 sm:gap-1 lg:gap-2">
              {/* Time Display */}
              <div className="hidden sm:block text-xs sm:text-sm text-muted-foreground font-mono">
                {currentTime.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: false 
                })}
              </div>
              <div className="hidden sm:block">
                <AnimatedThemeToggler className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 p-0 hover:bg-muted/50 rounded-md transition-colors" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 p-0"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-2.5 w-2.5 sm:h-3 sm:w-3 lg:h-4 lg:w-4" />
                ) : (
                  <Menu className="h-2.5 w-2.5 sm:h-3 sm:w-3 lg:h-4 lg:w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="flex h-8 sm:h-10 lg:h-12 items-center px-1 sm:px-2 lg:px-4">
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 overflow-x-auto">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={cn(
                        "flex items-center gap-1.5 xl:gap-2 rounded-t-lg border-x border-t px-2 xl:px-3 2xl:px-4 py-1.5 xl:py-2 text-xs xl:text-sm transition-all duration-200 hover:scale-105",
                        isActive
                          ? "bg-background border-primary/50 text-foreground shadow-sm"
                          : "bg-muted/30 border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:border-border/30",
                      )}
                    >
                      <Icon className="h-3 w-3 xl:h-4 xl:w-4" />
                      <span className="whitespace-nowrap">{item.label}</span>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Mobile/Tablet horizontal scroll navigation */}
            <div className="flex lg:hidden items-center gap-0.5 sm:gap-1 overflow-x-auto scrollbar-hide w-full px-1">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={cn(
                        "flex items-center gap-1 sm:gap-1.5 rounded-lg px-1.5 sm:px-2 lg:px-3 py-1 sm:py-1.5 lg:py-2 text-[10px] sm:text-xs lg:text-sm transition-all duration-200 whitespace-nowrap flex-shrink-0",
                        isActive
                          ? "bg-primary/10 border border-primary/30 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                      )}
                    >
                      <Icon className="h-2.5 w-2.5 sm:h-3 sm:w-3 lg:h-4 lg:w-4" />
                      <span className="hidden sm:inline">{item.label}</span>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Mobile menu dropdown */}
            {isMobileMenuOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-md border border-border/50 rounded-lg shadow-lg lg:hidden">
                <div className="flex flex-col p-3 gap-1">
                  {navigationItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href

                    return (
                      <Link key={item.href} href={item.href}>
                        <div
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                            isActive
                              ? "bg-primary/10 text-primary border border-primary/30"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </div>
                      </Link>
                    )
                  })}
                  <div className="border-t border-border/50 mt-2 pt-2">
                    <div className="px-3 py-2">
                      <AnimatedThemeToggler className="h-6 w-6 p-2 hover:bg-muted/50 rounded-md transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}
