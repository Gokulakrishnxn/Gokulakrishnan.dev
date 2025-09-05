import { BrowserNavigation } from "@/components/browser-navigation"
import { DotPattern } from "@/components/dot-pattern"
import { Highlighter } from "@/components/magicui/highlighter"

export default function HomePage() {

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BrowserNavigation />
      
      {/* Dot Pattern Background */}
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        glow={true}
        className="opacity-30"
      />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="flex items-center justify-center min-h-[calc(100vh-120px)] sm:min-h-[calc(100vh-160px)] lg:min-h-[calc(100vh-200px)] animate-in fade-in duration-700">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6">
            <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8 max-w-4xl mx-auto">
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
                  <Highlighter action="highlight" color="#3B82F6" size="lg">
                    <span className="text-primary">Gokulakrishnan</span>
                  </Highlighter>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed px-2">
                  Self taught software engineer love to learn new things and I'm always looking for new challenges to solve :)
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
