"use client"

import { BrowserNavigation } from "@/components/browser-navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Gamepad2, Wrench, Clock } from "lucide-react"

export default function ArcadePage() {
  return (
    <div className="min-h-screen bg-background">
      <BrowserNavigation />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <section className="text-center space-y-8 py-16">
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-primary/10">
                  <Gamepad2 className="h-16 w-16 text-primary" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                Game <span className="text-muted-foreground">Arcade</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Something exciting is brewing! The arcade is currently under development.
              </p>
            </div>
          </section>

          {/* Development Status */}
          <section className="py-16">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8 text-center space-y-6">
                <div className="flex justify-center">
                  <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900">
                    <Wrench className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">Under Development</h2>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    I'm working hard to bring you an amazing gaming experience. 
                    The arcade will feature classic games with modern twists, 
                    interactive challenges, and fun competitions.
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Expected launch: Coming Soon</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Coming Features */}
          <section className="py-16">
            <div className="text-center space-y-8">
              <h2 className="text-3xl font-bold text-foreground">What to Expect</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <Card>
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="text-2xl">🎮</div>
                    <h3 className="font-semibold text-foreground">Classic Games</h3>
                    <p className="text-sm text-muted-foreground">
                      Snake, Tetris, Memory Match, and more beloved classics
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="text-2xl">🏆</div>
                    <h3 className="font-semibold text-foreground">Leaderboards</h3>
                    <p className="text-sm text-muted-foreground">
                      Compete with others and track your high scores
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="text-2xl">✨</div>
                    <h3 className="font-semibold text-foreground">Modern Features</h3>
                    <p className="text-sm text-muted-foreground">
                      Responsive design, smooth animations, and mobile support
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
