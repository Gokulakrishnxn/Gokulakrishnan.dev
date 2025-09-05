import { BrowserNavigation } from "@/components/browser-navigation"
import { Camera, Clock, Wrench } from "lucide-react"

export default function AlbumPage() {
  return (
    <div className="min-h-screen bg-background">
      <BrowserNavigation />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="space-y-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Photo <span className="text-muted-foreground">Album</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              A collection of moments captured through my lens. From nature's beauty to urban landscapes, each photo tells a unique story.
            </p>
          </div>
        </section>

        {/* Work in Progress Section */}
        <section className="py-16 max-w-4xl mx-auto">
          <div className="text-center space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl" />
              <div className="relative bg-background border border-border rounded-2xl p-12">
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <div className="relative">
                      <Camera className="h-16 w-16 text-primary" />
                      <div className="absolute -top-1 -right-1">
                        <Wrench className="h-6 w-6 text-muted-foreground animate-pulse" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                      Work in Progress
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                      I'm currently curating my photo collection and setting up the gallery. 
                      Check back soon for amazing photography content!
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Coming soon...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
