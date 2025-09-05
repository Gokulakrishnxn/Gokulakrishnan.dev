"use client"

import { useState, useEffect } from "react"
import { MobileNavigation } from "./mobile-navigation"
import { DotPattern } from "./dot-pattern"
import { Highlighter } from "./magicui/highlighter"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { 
  ArrowRight, 
  Database, 
  Brain, 
  Smartphone, 
  Globe,
  Github,
  Mail,
  ExternalLink,
  Star
} from "lucide-react"
import Link from "next/link"

const quickStats = [
  { label: "Projects", value: "5+", icon: Database, color: "text-blue-500" },
  { label: "Technologies", value: "15+", icon: Brain, color: "text-green-500" },
  { label: "Experience", value: "2+", icon: Star, color: "text-purple-500" },
]


export function MobileHomePage() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <MobileNavigation />
      
      {/* Background Pattern */}
      <DotPattern 
        width={20} 
        height={20} 
        cx={1} 
        cy={1} 
        cr={1} 
        glow={true} 
        className="opacity-20" 
      />

      <main className="relative z-10 px-4 py-6 space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-6 pt-4">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground leading-tight">
              <Highlighter action="highlight" color="#3B82F6" size="lg">
                <span className="text-primary">Gokulakrishnan</span>
              </Highlighter>
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed px-2">
              Self taught software engineer love to learn new things and I'm always looking for new challenges to solve :)
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            {quickStats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.label} className="p-3 text-center">
                  <CardContent className="p-0 space-y-2">
                    <div className="flex justify-center">
                      <div className={`p-2 rounded-lg bg-muted`}>
                        <Icon className={`h-4 w-4 ${stat.color}`} />
                      </div>
                    </div>
                    <div className="text-lg font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>



        {/* Recent Activity */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground text-center">
            <Highlighter action="underline" color="#F59E0B" size="md">
              Recent Activity
            </Highlighter>
          </h2>
          
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Star className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">New Project Added</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Github className="h-4 w-4 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Code Updated</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Brain className="h-4 w-4 text-purple-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">AI Model Trained</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-4 pb-8">
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              <Highlighter action="highlight" color="#DC2626" size="md">
                Let's Work Together
              </Highlighter>
            </h2>
            <p className="text-sm text-muted-foreground">
              Ready to bring your ideas to life? Let's discuss your next project.
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <Link href="/contact">
              <Button className="w-full gap-2">
                <Mail className="h-4 w-4" />
                Start a Project
              </Button>
            </Link>
            <Link href="/resume">
              <Button variant="outline" className="w-full gap-2">
                <ExternalLink className="h-4 w-4" />
                View Resume
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
