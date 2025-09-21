"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AnimatedThemeToggler } from "@/components/animated-theme-toggler"
import {
  Minimize2,
  Maximize2,
} from "lucide-react"


interface SafariWallpaperProps {
  children: React.ReactNode
}

export function SafariWallpaper({ children }: SafariWallpaperProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])


  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Black Wallpaper Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #1a1a1a 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, #2a2a2a 0%, transparent 50%)`,
          }}></div>
        </div>
      </div>

      {/* Safari Browser Window */}
      <div className={cn(
        "absolute transition-all duration-500 ease-in-out",
        isMinimized ? "scale-0 opacity-0" : "scale-100 opacity-100",
        isMaximized 
          ? "top-4 left-4 right-4 bottom-20" 
          : "top-20 left-1/2 transform -translate-x-1/2 w-[90%] max-w-6xl h-[80vh]"
      )}>
        <div className="bg-black rounded-2xl shadow-2xl border border-gray-800 overflow-hidden backdrop-blur-sm h-full">
          {/* Safari Title Bar */}
          <div className="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800">
            <div className="flex items-center justify-between px-4 py-3">
              {/* Traffic Light Buttons */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm hover:bg-red-600 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm hover:bg-yellow-600 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm hover:bg-green-600 transition-colors cursor-pointer"></div>
              </div>
              

              {/* Address Bar */}
              <div className="flex-1 mx-4 max-w-md">
                <div className="flex items-center gap-2 rounded-full border border-gray-700 bg-gray-900 px-4 py-2 text-sm shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-gray-400">🔒</span>
                  <span className="text-gray-300 truncate">gokulakrishnan.dev</span>
                  <span className="text-white truncate">{pathname}</span>
                </div>
              </div>

              {/* Right side controls */}
              <div className="flex items-center gap-2">
                <div className="text-xs text-gray-400 font-mono">
                  {currentTime.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: false 
                  })}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0 hover:bg-gray-800 text-gray-400 hover:text-white"
                  onClick={handleMinimize}
                  title="Minimize window"
                >
                  <Minimize2 className="h-3 w-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0 hover:bg-gray-800 text-gray-400 hover:text-white"
                  onClick={handleMaximize}
                  title="Toggle fullscreen"
                >
                  {isMaximized ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
                </Button>
                <AnimatedThemeToggler className="h-6 w-6 p-1 hover:bg-gray-800 text-gray-400 hover:text-white rounded transition-colors" />
              </div>
            </div>
          </div>



          {/* Browser Content Area */}
          <div className="bg-black h-full overflow-auto">
            {children}
          </div>
        </div>
      </div>

      {/* macOS Dock/Taskbar */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/20">
          <div className="flex items-center gap-3">
            {/* Safari Icon */}
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            
            {/* Other App Icons */}
            <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
              <FolderOpen className="w-6 h-6 text-white" />
            </div>
            
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
              <Mail className="w-6 h-6 text-white" />
            </div>
            
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Minimized Window Indicator */}
      {isMinimized && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <div className="bg-white/20 backdrop-blur-md rounded-lg px-3 py-2 border border-white/30 cursor-pointer hover:bg-white/30 transition-colors"
               onClick={() => setIsMinimized(false)}>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded"></div>
              <span className="text-white text-sm">Safari</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
