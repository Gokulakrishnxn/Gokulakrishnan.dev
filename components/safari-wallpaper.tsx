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
      {/* macOS Wallpaper Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black">
        {/* macOS-style wallpaper pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, #1e293b 0%, transparent 40%),
                            radial-gradient(circle at 80% 80%, #334155 0%, transparent 40%),
                            radial-gradient(circle at 50% 50%, #0f172a 0%, transparent 60%)`,
          }}></div>
        </div>
      </div>

      {/* macOS Menu Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="flex items-center justify-between px-4 py-2 text-sm">
          {/* Left side - Apple menu and app menus */}
          <div className="flex items-center gap-6 text-gray-300">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-400 to-gray-600"></div>
              <span className="font-medium">Safari</span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-xs">
              <span className="hover:text-white cursor-pointer">File</span>
              <span className="hover:text-white cursor-pointer">Edit</span>
              <span className="hover:text-white cursor-pointer">View</span>
              <span className="hover:text-white cursor-pointer">History</span>
              <span className="hover:text-white cursor-pointer">Bookmarks</span>
              <span className="hover:text-white cursor-pointer">Window</span>
              <span className="hover:text-white cursor-pointer">Help</span>
            </div>
          </div>

          {/* Right side - system info */}
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-green-500"></div>
              <span>Wi-Fi</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-blue-500"></div>
              <span>Bluetooth</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 border border-gray-500 rounded-sm">
                <div className="w-3 h-1.5 bg-green-500 rounded-sm m-0.5"></div>
              </div>
              <span>100%</span>
            </div>
            <div className="text-gray-300 font-mono">
              {currentTime.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Safari Browser Window */}
      <div className={cn(
        "absolute transition-all duration-500 ease-in-out",
        isMinimized ? "scale-0 opacity-0" : "scale-100 opacity-100",
        isMaximized 
          ? "top-12 left-4 right-4 bottom-20" 
          : "top-24 left-1/2 transform -translate-x-1/2 w-[90%] max-w-6xl h-[75vh]"
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

      {/* macOS Dock */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl px-6 py-3 border border-white/10 shadow-2xl">
          <div className="flex items-center gap-4">
            {/* Safari Icon */}
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer hover:scale-125 transition-all duration-200 hover:shadow-xl group">
              <svg className="w-7 h-7 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            
            {/* Finder Icon */}
            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer hover:scale-125 transition-all duration-200 hover:shadow-xl group">
              <svg className="w-7 h-7 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z"/>
              </svg>
            </div>
            
            {/* Mail Icon */}
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer hover:scale-125 transition-all duration-200 hover:shadow-xl group">
              <svg className="w-7 h-7 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            
            {/* Photos Icon */}
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer hover:scale-125 transition-all duration-200 hover:shadow-xl group">
              <svg className="w-7 h-7 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
            </div>

            {/* VS Code Icon */}
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer hover:scale-125 transition-all duration-200 hover:shadow-xl group">
              <svg className="w-7 h-7 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a1.266 1.266 0 0 0-1.52 0L.15 7.17a1.185 1.185 0 0 0-.15.19v.27a1.133 1.133 0 0 0 .04.3l2.25 7.33a1.5 1.5 0 0 0 .9.95l4.95 1.98a1.5 1.5 0 0 0 1.5-.3l9.46-8.63 4.12 3.128a1.266 1.266 0 0 0 1.52 0l1.66-1.25a1.185 1.185 0 0 0 .15-.19v-.27a1.133 1.133 0 0 0-.04-.3l-2.25-7.33a1.5 1.5 0 0 0-.9-.95z"/>
              </svg>
            </div>

            {/* Terminal Icon */}
            <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer hover:scale-125 transition-all duration-200 hover:shadow-xl group">
              <svg className="w-7 h-7 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 19V7H4v12h16m0-14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16M8 15h8v2H8v-2m0-4h8v2H8v-2m0-4h5v2H8V7z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Icons */}
      <div className="absolute top-32 left-8 space-y-6">
        {/* Trash Icon */}
        <div className="flex flex-col items-center gap-2 cursor-pointer group">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12z"/>
            </svg>
          </div>
          <span className="text-white text-xs text-center">Trash</span>
        </div>

        {/* Downloads Icon */}
        <div className="flex flex-col items-center gap-2 cursor-pointer group">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
          </div>
          <span className="text-white text-xs text-center">Downloads</span>
        </div>
      </div>

      {/* Minimized Window Indicator */}
      {isMinimized && (
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
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
