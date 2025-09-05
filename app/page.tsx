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
        <section className="flex items-center justify-center min-h-[calc(100vh-100px)] sm:min-h-[calc(100vh-120px)] lg:min-h-[calc(100vh-160px)] animate-in fade-in duration-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 lg:space-y-8 max-w-5xl mx-auto">
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-balance leading-tight">
                  <Highlighter action="highlight" color="#3B82F6" size="lg">
                    <span className="text-primary">Gokulakrishnan</span>
                  </Highlighter>
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto text-pretty leading-relaxed px-2 sm:px-4">
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
