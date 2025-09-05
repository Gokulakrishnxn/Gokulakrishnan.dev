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
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigationItems = [
  { href: "/", label: "Home", icon: Home, color: "text-blue-500" },
  { href: "/about", label: "About", icon: User, color: "text-green-500" },
  { href: "/projects", label: "Projects", icon: FolderOpen, color: "text-purple-500" },
  { href: "/experience", label: "Experience", icon: GraduationCap, color: "text-orange-500" },
  { href: "/resume", label: "Resume", icon: FileText, color: "text-red-500" },
  { href: "/blog", label: "Blog", icon: BookOpen, color: "text-indigo-500" },
  { href: "/album", label: "Album", icon: Camera, color: "text-pink-500" },
  { href: "/arcade", label: "Arcade", icon: Gamepad2, color: "text-yellow-500" },
  { href: "/status", label: "Status", icon: Activity, color: "text-cyan-500" },
  { href: "/contact", label: "Contact", icon: Mail, color: "text-emerald-500" },
]

export function MobileNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const pathname = usePathname()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="font-bold text-lg text-foreground">Gokulakrishnan</span>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-2">
            {/* Time */}
            <div className="text-xs text-muted-foreground font-mono">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
            </div>
            
            {/* Theme Toggle */}
            <AnimatedThemeToggler className="w-8 h-8" />
            
            {/* Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm">
          <div className="absolute top-16 left-0 right-0 bg-background border-b border-border/50 shadow-lg">
            <div className="px-4 py-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-lg font-bold text-primary">5+</div>
                  <div className="text-xs text-muted-foreground">Projects</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-lg font-bold text-primary">2+</div>
                  <div className="text-xs text-muted-foreground">Years</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-lg font-bold text-primary">10+</div>
                  <div className="text-xs text-muted-foreground">Skills</div>
                </div>
              </div>

              {/* Navigation Items */}
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const active = isActive(item.href)
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200",
                        active
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted/50"
                      )}
                    >
                      <div className={cn("p-2 rounded-lg", active ? "bg-primary-foreground/20" : "bg-muted")}>
                        <Icon className={cn("h-4 w-4", active ? "text-primary-foreground" : item.color)} />
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  )
                })}
              </div>

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t border-border/50">
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">Let's connect!</p>
                  <div className="flex justify-center space-x-4">
                    <Button variant="outline" size="sm" className="text-xs">
                      <Mail className="h-3 w-3 mr-1" />
                      Email
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      <User className="h-3 w-3 mr-1" />
                      LinkedIn
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  )
}
